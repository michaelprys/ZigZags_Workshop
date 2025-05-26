<script setup lang="ts">
import type { QForm } from 'quasar';
import ItemBalance from 'src/components/items/ItemBalance.vue';
import type { PaymentType } from 'src/stores/storeBalance';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreInventory } from 'src/stores/storeInventory';
import { usePaginatedInventoryGoods } from 'src/use/usePaginatedInventoryGoods';
import { useTopUpPayment } from 'src/use/useTopUpPayment';
import { useTopUpState } from 'src/use/useTopUpState';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, type LocationQueryValue } from 'vue-router';

const topUpForm = ref<QForm | null>(null);

const { currentPage, loadPaginatedInventoryGoods } = usePaginatedInventoryGoods();

const storeInventory = useStoreInventory();
const storeBalance = useStoreBalance();
const route = useRoute();

const preventIncorrectChars = (e: KeyboardEvent) => {
    if (!/[\d.]/.test(e.key)) e.preventDefault();
};

const handlePaste = (e: ClipboardEvent) => {
    const pastedVal = e.clipboardData?.getData('text');
    if (pastedVal && !/^\d+$/.test(pastedVal)) e.preventDefault();
};

const getString = (
    val: LocationQueryValue | LocationQueryValue[] | null | undefined
): string | undefined => {
    if (val == null) return undefined;
    const result = Array.isArray(val) ? val[0] : val;
    return result ?? undefined;
};

const isOpen = ref(false);

const {
    paymentTypes,
    paymentType,
    topUpAmount,
    minAmounts,
    resetAmount,
    increment,
    decrement,
    calculatedAmount
} = useTopUpState();

const { pending, handlePayment } = useTopUpPayment(paymentType, topUpAmount, minAmounts);

onMounted(async () => {
    const session_id = getString(route.query.session_id);
    const status = getString(route.query.status);
    const amountStr = getString(route.query.amount);
    const paymentTypeQuery = getString(route.query.paymentType);

    if (!session_id || !status || !amountStr || !paymentTypeQuery) return;

    const amount = Number(amountStr);
    if (isNaN(amount)) {
        console.error('Invalid amount:', amountStr);
        return;
    }

    const isValidPaymentType = (val: string): val is (typeof paymentTypes)[number]['value'] =>
        paymentTypes.some((pt) => pt.value === val);

    if (!isValidPaymentType(paymentTypeQuery)) {
        console.error('Invalid paymentType:', paymentTypeQuery);
        return;
    }

    await storeBalance.topUpBalance(session_id, status, amount, paymentTypeQuery as PaymentType);
});

watchEffect(async () => {
    for (const pt in storeBalance.balance) {
        if (Object.prototype.hasOwnProperty.call(storeBalance.balance, pt)) {
            await storeBalance.displayBalance();
        }
    }
});

const onSubmit = async () => {
    if (!topUpForm.value) return;
    await handlePayment(topUpForm.value);
};
</script>

<template>
    <div class="footer q-mt-lg">
        <Teleport to="body">
            <q-dialog v-model="isOpen" backdrop-filter="blur(8px) brightness(60%)">
                <q-card dark class="card-inner q-pa-md" style="max-width: 22.25rem; width: 100%">
                    <q-card-section class="q-pt-none">
                        <div class="text-h6 text-primary">Add funds</div>
                    </q-card-section>

                    <q-form
                        ref="topUpForm"
                        @submit.prevent="onSubmit"
                        @keydown.enter.prevent="onSubmit"
                    >
                        <q-card-actions class="q-pb-none" align="center">
                            <q-select
                                v-model="paymentType"
                                :options="paymentTypes"
                                filled
                                style="flex: 1"
                                dark
                                label-color="info"
                                input-class="text-primary"
                                label="Currency of choice *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) => (val && val.value !== '') || 'Choose paymentType'
                                ]"
                                @update:model-value="resetAmount"
                            />
                        </q-card-actions>

                        <q-card-actions class="column q-gutter-x-sm" align="center">
                            <span class="text-secondary">Cost: ${{ calculatedAmount }}</span>
                            <div class="flex items-center q-mt-md" style="gap: 0.5rem">
                                <q-btn
                                    :disable="
                                        !paymentType?.value ||
                                        topUpAmount <=
                                            (paymentType ? (minAmounts[paymentType.value] ?? 0) : 0)
                                    "
                                    icon="remove"
                                    color="primary"
                                    flat
                                    @click="decrement"
                                />

                                <q-input
                                    v-model.number="topUpAmount"
                                    type="number"
                                    input-class="text-primary text-h6 text-center"
                                    style="max-width: 6.25rem"
                                    dense
                                    dark
                                    lazy-rules="ondemand"
                                    :rules="[
                                        (val) =>
                                            val >=
                                                (paymentType
                                                    ? (minAmounts[paymentType.value] ?? 0)
                                                    : 0) ||
                                            `Minimal: ${paymentType ? (minAmounts[paymentType.value] ?? 0) : 0}`
                                    ]"
                                    @keypress="preventIncorrectChars"
                                    @paste="handlePaste"
                                />
                                <q-btn icon="add" color="primary" flat @click="increment" />
                            </div>
                        </q-card-actions>

                        <q-card-actions align="center">
                            <q-btn
                                type="submit"
                                label="Continue"
                                outline
                                style="width: 100%"
                                :loading="pending"
                            />
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-dialog>
        </Teleport>

        <div class="inner flex">
            <q-pagination
                v-model="currentPage"
                class="nav"
                direction-links
                flat
                input
                input-class="text-primary"
                :boundary-numbers="false"
                :max="storeInventory.totalInventoryPages"
                @update:model-value="loadPaginatedInventoryGoods"
            />

            <ItemBalance class="balance-panel">
                <q-btn class="btn" icon="add" flat dense @click="isOpen = true" />
            </ItemBalance>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.card-inner {
    border-radius: $rounded !important;
}
.balance-panel {
    padding-left: 0em;
    padding-right: 0.5em;
    padding-block: 0;
}
.btn {
    height: 100%;
    border-radius: $rounded;
}
.inner {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    width: 100%;
}
.nav {
    grid-column-start: 2;
    justify-self: center;
}
:deep(.nav button:last-child),
:deep(.nav button:first-child) {
    display: none;
}
:deep(.nav .q-btn[disabled]) {
    cursor: default !important;
    pointer-events: none !important;
}
:deep(.nav .q-btn),
:deep(.nav .q-btn .q-icon) {
    cursor: pointer !important;
}
:deep(.nav .q-btn[disabled] .q-icon),
:deep(.nav .q-icon),
:deep(.nav span) {
    cursor: default !important;
}
:deep(.nav label) {
    pointer-events: none !important;
    user-select: none !important;
}

@media (width <= 61.25rem) {
    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .balance-panel {
        margin-top: 2rem;
    }
}
</style>

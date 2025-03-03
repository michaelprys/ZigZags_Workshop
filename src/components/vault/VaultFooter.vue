<script setup lang="ts">
import { useStoreBalance } from 'src/stores/useStoreBalance';
import { useTopUpPayment } from 'src/use/useTopUpPayment';
import { useTopUpState } from 'src/use/useTopUpState';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const storeBalance = useStoreBalance();
const route = useRoute();
const currentPage = ref(1);

const preventIncorrectChars = (e) => {
    if (!/[\d.]/.test(e.key)) {
        e.preventDefault();
    }
};
const handlePaste = (e) => {
    const pastedVal = e.clipboardData.getData('text');

    if (!/^\d+$/.test(pastedVal)) {
        event.preventDefault();
    }
};

const topUpForm = ref(null);

const {
    paymentTypes,
    paymentType,
    topUpAmount,
    minAmounts,
    resetAmount,
    increment,
    decrement,
    calculatedAmount,
} = useTopUpState();

const { pending, handlePayment } = useTopUpPayment(paymentType, topUpAmount, minAmounts);

const isOpen = ref(false);

onMounted(async () => {
    const { session_id, status, amount, currency } = route.query;

    if (!session_id && !status && !amount && !currency) return;

    await storeBalance.updateBalance(session_id, status, amount, currency);
});
</script>

<template>
    <div class="footer">
        <Teleport to="body">
            <q-dialog v-model="isOpen" backdrop-filter="blur(8px); brightness(60%)">
                <q-card dark class="q-pa-md" style="max-width: 22.25rem; width: 100%">
                    <q-card-section class="q-pt-none">
                        <div class="text-h6 text-primary">Add funds</div>
                    </q-card-section>

                    <q-form
                        ref="topUpForm"
                        @submit.prevent="handlePayment(topUpForm)"
                        @keydown.enter.prevent="handlePayment(topUpForm)"
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
                                :rules="[(val) => val.value !== '' || 'Choose currency']"
                                @update:model-value="resetAmount"
                            />
                        </q-card-actions>

                        <q-card-actions class="column q-gutter-x-sm" align="center">
                            <span class="text-secondary">Cost: ${{ calculatedAmount }}</span>
                            <div class="flex items-center q-mt-md" style="gap: 0.5rem">
                                <q-btn
                                    :disable="topUpAmount <= minAmounts[paymentType.value]"
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
                                            val >= minAmounts[paymentType.value] ||
                                            `Minimal: ${minAmounts[paymentType.value]}`,
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
                            >
                            </q-btn>
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-dialog>
        </Teleport>

        <q-pagination
            v-model="currentPage"
            class="q-mt-lg footer__nav"
            :max="3"
            direction-links
            flat
            input
            input-class="text-primary"
        />

        <div class="flex q-mt-lg footer__gold-panel" style="gap: 0.75rem">
            <q-btn
                @click="isOpen = true"
                style="border-radius: var(--rounded)"
                icon="add"
                flat
                dense
            ></q-btn>
            <div class="flex items-center q-gutter-x-sm">
                <span>0</span>
                <q-img src="~assets/vault/gold.avif" width="18px" height="18px" />
                <q-tooltip
                    :delay="500"
                    anchor="bottom right"
                    self="center start"
                    class="bg-primary text-center"
                >
                    <span class="text-caption text-negative">Gold</span>
                </q-tooltip>
            </div>
            <div class="flex items-center q-gutter-x-sm">
                <span>0</span>
                <q-img src="~assets/vault/emberheart-rubies.avif" width="26px" height="26px" />
                <q-tooltip
                    :delay="500"
                    anchor="bottom right"
                    self="center start"
                    class="bg-primary text-center text-dark"
                >
                    <span class="text-caption text-negative">Emberheart rubies</span>
                </q-tooltip>
            </div>
            <div class="flex items-center q-gutter-x-sm">
                <span>0</span>
                <q-img src="~assets/vault/gamblers-lootbox.avif" width="23px" height="23px" />
                <q-tooltip
                    :delay="500"
                    anchor="bottom right"
                    self="center start"
                    class="bg-primary text-center text-dark"
                >
                    <span class="text-caption text-negative">Gambler's lootbox</span>
                </q-tooltip>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    width: 100%;
}
.footer__gold-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--q-medium);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
    grid-column-start: 3;
    justify-self: end;
    padding-right: 0.285em;
    z-index: 0;
}
.footer__nav {
    grid-column-start: 2;
    justify-self: center;
}

:deep(.footer__nav button:last-child),
:deep(.footer__nav button:first-child) {
    display: none;
}
:deep(.footer__nav .q-btn[disabled]) {
    cursor: default !important;
    pointer-events: none !important;
}
:deep(.footer__nav .q-btn),
:deep(.footer__nav .q-btn .q-icon) {
    cursor: pointer !important;
}
:deep(.footer__nav .q-btn[disabled] .q-icon),
:deep(.footer__nav .q-icon),
:deep(.footer__nav span) {
    cursor: default !important;
}
:deep(.footer__nav label) {
    pointer-events: none !important;
    user-select: none !important;
}
</style>

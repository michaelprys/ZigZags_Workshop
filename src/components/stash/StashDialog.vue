<script setup lang="ts">
import type { QForm } from 'quasar';
import { useQuasar } from 'quasar';
import ItemBalance from 'src/components/items/ItemBalance.vue';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreGoods } from 'src/stores/storeGoods';
import { useStoreInventory } from 'src/stores/storeInventory';
import { useManageStash } from 'src/use/useManageStash';
import { delay } from 'src/utils/delay';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const myForm = ref<QForm | null>(null);
const pending = ref(false);
const router = useRouter();
const storeGoods = useStoreGoods();
const storeInventory = useStoreInventory();
const storeBalance = useStoreBalance();

defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const { finalPrice } = useManageStash();
const emberheartRubies = computed(() => Math.floor(finalPrice.value * 0.01));
const gamblersLootbox = computed(() => Math.ceil(finalPrice.value * 0.001));

const paymentTypes = computed(() => [
    { label: `Gold (${finalPrice.value})`, value: 'gold' },
    { label: `Emberheart Rubies (${emberheartRubies.value})`, value: 'emberheart_rubies' },
    { label: `Gambler's Lootbox (${gamblersLootbox.value})`, value: 'gamblers_lootbox' }
]);

type PaymentKey = 'gold' | 'emberheart_rubies' | 'gamblers_lootbox';
const paymentType = ref<{ value: PaymentKey } | null>(null);

const paymentData = reactive<Record<PaymentKey, number>>({
    gold: finalPrice.value,
    emberheart_rubies: emberheartRubies.value,
    gamblers_lootbox: gamblersLootbox.value
});

let selectedPaymentType: PaymentKey | null = null;

const validateFunds = (selectedPaymentType: PaymentKey) => {
    const amount = paymentData[selectedPaymentType];
    const balance = storeBalance.balance[selectedPaymentType];
    if (amount > balance) {
        return `Not enough ${selectedPaymentType.replace('_', ' ')}, top up balance`;
    }
    return true;
};

const tradeCancelled = ref(false);

const trade = async () => {
    if (!selectedPaymentType) {
        throw new Error('Payment type not selected');
    }
    await storeBalance.updateBalance(selectedPaymentType, paymentData[selectedPaymentType]);
    await storeInventory.saveGoodsToInventory();
};

const handleTrade = async () => {
    tradeCancelled.value = false;
    pending.value = true;

    if (!myForm.value) {
        pending.value = false;
        return;
    }

    if (!paymentType.value?.value) {
        $q.notify({
            type: 'negative',
            message: 'Please select payment type.',
            position: 'bottom-right',
            classes: 'toast'
        });
        pending.value = false;
        return;
    }

    try {
        const isValid = await myForm.value.validate();
        if (!isValid) {
            $q.notify({
                type: 'negative',
                message: "Something went wrong. Where's my gold?!",
                position: 'bottom-right',
                classes: 'toast'
            });
            pending.value = false;
            return;
        }

        if (tradeCancelled.value) return;

        await delay(3000);

        if (!tradeCancelled.value) {
            await trade();

            sessionStorage.setItem('purchaseCompleted', 'true');
            await router.push('purchase-success');

            storeBalance.purchaseStatus = '';
            storeGoods.stashGoods = [];

            $q.notify({
                type: 'positive',
                textColor: 'dark',
                message: "Pleasure doin' business!",
                position: 'bottom-right',
                classes: 'toast'
            });

            emit('update:modelValue', false);
        }
    } catch (err) {
        console.error('Validation error:', err);
        $q.notify({
            type: 'negative',
            message: 'Unexpected error occurred',
            position: 'bottom-right',
            classes: 'toast'
        });
    } finally {
        pending.value = false;
    }
};

const cancelTrade = () => {
    tradeCancelled.value = true;
    pending.value = false;
};

watchEffect(() => {
    if (paymentType.value?.value) {
        selectedPaymentType = paymentType.value.value;
    }
});
</script>

<template>
    <Teleport to="body">
        <q-dialog
            :model-value="modelValue"
            backdrop-filter="blur(8px); brightness(60%)"
            @hide="tradeCancelled = true"
            @update:model-value="(val) => emit('update:modelValue', val)"
        >
            <div class="modal">
                <div class="title-wrapper flex items-center justify-between q-pb-none">
                    <h2 class="title text-h5 text-secondary">Complete trade</h2>

                    <ItemBalance class="balance" />
                </div>

                <div>
                    <q-form ref="myForm" class="q-gutter-md q-mt-lg" @submit.prevent="handleTrade">
                        <div class="flex" style="gap: 1rem">
                            <q-select
                                v-model="paymentType"
                                :options="paymentTypes"
                                style="width: 100%"
                                filled
                                dark
                                label-color="info"
                                input-class="text-primary"
                                label="Currency of Choice *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) =>
                                        val && val.value
                                            ? true
                                            : 'Please select currency of choice',
                                    (val) => validateFunds(val.value)
                                ]"
                            ></q-select>
                        </div>

                        <div class="flex justify-between q-mt-md">
                            <q-btn
                                type="submit"
                                :loading="pending"
                                style="width: 10rem"
                                label="Trade"
                                :color="pending ? 'positive' : 'secondary'"
                                text-color="dark"
                            >
                                <template #loading>
                                    <q-spinner-hourglass class="on-left" />
                                    In progress...
                                </template>
                            </q-btn>

                            <q-btn
                                v-close-popup
                                label="Close"
                                flat
                                color="secondary"
                                text-color="primary"
                                @click="cancelTrade"
                            ></q-btn>
                        </div>
                    </q-form>
                </div>
            </div>
        </q-dialog>
    </Teleport>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.toast {
    bottom: 40px !important;
    right: 40px !important;
    padding: 60px;
}
.modal {
    background-color: $dark;
    max-width: 40.25rem;
    width: 100%;
    padding: 1.25em;
    border: 1px solid color-mix(in srgb, $primary 30%, black 90%);
    border-radius: $rounded;
}

@media (width <= $breakpoint-xs) {
    .title-wrapper {
        flex-direction: column;
    }
    .balance {
        margin-top: 1.2rem;
    }
}
</style>

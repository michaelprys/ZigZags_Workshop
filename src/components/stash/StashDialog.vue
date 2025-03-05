<script setup lang="ts">
import { useQuasar } from 'quasar';
import IconLoot from 'src/components/icons/IconLoot.vue';
import ItemBalance from 'src/components/items/ItemBalance.vue';
import { useStoreBalance } from 'src/stores/useStoreBalance';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useManageStash } from 'src/use/useManageStash';
import { delay } from 'src/utils/delay';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const myForm = ref(null);
const pending = ref(false);
const router = useRouter();
const storeGoods = useStoreGoods();
const storeBalance = useStoreBalance();

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const { finalPrice } = useManageStash();
const emberheartRubies = computed(() => Math.floor(finalPrice.value * 0.01));
const gamblersLootbox = computed(() => Math.ceil(finalPrice.value * 0.001));

const paymentTypes = computed(() => {
    return [
        { label: `Gold (${finalPrice.value})`, value: 'gold' },
        { label: `Emberheart Rubies (${emberheartRubies.value})`, value: 'emberheart_rubies' },
        { label: `Gambler's Lootbox (${gamblersLootbox.value})`, value: 'gamblers_lootbox' },
    ];
});

const paymentType = ref(null);

const paymentData = reactive({
    gold: finalPrice.value,
    emberheart_rubies: emberheartRubies,
    gamblers_lootbox: gamblersLootbox,
});

let selectedPaymentType = null;

const validateFunds = (selectedPaymentType) => {
    const amount = paymentData[selectedPaymentType];
    const balance = storeBalance.balance[selectedPaymentType];

    if (amount > balance) {
        return `Not enough ${selectedPaymentType.replace('_', ' ')}, top up balance`;
    }
    return true;
};

const trade = async () => {
    await storeBalance.updateBalance(selectedPaymentType, paymentData[selectedPaymentType]);
    await storeGoods.savePurchasedGoods();
};

const handleTrade = async () => {
    pending.value = true;

    if (!myForm.value) return;
    try {
        const success = await myForm.value.validate();
        if (!success) {
            $q.notify({
                type: 'negative',
                message: "Something went wrong. Where's my gold?!",
                position: 'bottom-right',
                classes: 'toast',
                actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
            });
            pending.value = false;
            return;
        }

        await Promise.all([delay(3000), trade()]);
        storeBalance.purchaseStatus = '';
        storeGoods.stashGoods = [];

        $q.notify({
            type: 'positive',
            textColor: 'dark',
            message: "Pleasure doin' business!",
            position: 'bottom-right',
            classes: 'toast',
            actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
        });

        emit('update:modelValue', false);
    } catch (err) {
        console.error('Validation error:', err);
    } finally {
        pending.value = false;
    }
};

watchEffect(() => {
    if (paymentType.value) {
        selectedPaymentType = paymentType.value?.value;
    }
});
</script>

<template>
    <Teleport to="body">
        <q-dialog
            :modelValue="modelValue"
            @update:modelValue="(val) => emit('update:modelValue', val)"
            backdrop-filter="blur(8px); brightness(60%)"
        >
            <div class="modal">
                <div class="flex items-center justify-between q-pb-none">
                    <span class="text-h5 text-secondary">Complete trade</span>

                    <ItemBalance />
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
                                    (val) => validateFunds(val.value),
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
                            ></q-btn>
                        </div>
                    </q-form>
                </div>
            </div>
        </q-dialog>
    </Teleport>
</template>

<style scoped>
.toast {
    bottom: 40px !important;
    right: 40px !important;
    padding: 60px;
}
.modal {
    background-color: var(--q-dark);
    max-width: 40.25rem;
    width: 100%;
    padding: 1.25em;
    border: 1px solid color-mix(in srgb, var(--q-primary) 30%, black 90%);
    border-radius: var(--rounded);
}
</style>

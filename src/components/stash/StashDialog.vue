<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const myForm = ref(null);
const pending = ref(false);
const router = useRouter();

defineProps(['modelValue']);
const emit = defineEmits('update:modelValue');

const paymentType = ref(null);
const paymentTypes = [
    { label: 'Gold', value: 'gold', conversionRate: 1 },
    { label: 'Crimson gems', value: 'emberheart_rubies', conversionRate: 250 },
    {
        label: "Gambler's lootbox",
        value: 'gamblers-lootbox',
        conversionRate: 100,
    },
];

const onSubmit = async () => {
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
            return;
        }

        pending.value = true;

        setTimeout(() => {
            pending.value = false;
            dialog.value = false;
            trade.value = true;

            storeAuth.stashGoods.value = [];

            router.push({ name: 'workshop' });

            $q.notify({
                type: 'positive',
                textColor: 'dark',
                message: "Pleasure doin' business!",
                position: 'bottom-right',
                classes: 'toast',
                actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
            });
        }, 3000);
    } catch (err) {
        console.error('Validation error:', err);
    }
};
</script>

<template>
    <Teleport to="body">
        <q-dialog
            :modelValue="modelValue"
            @update:modelValue="(val) => emit('update:modelValue', val)"
            backdrop-filter="blur(8px); brightness(60%)"
        >
            <div class="modal">
                <div class="column q-pb-none">
                    <span class="text-h5 text-secondary">Complete trade</span>
                </div>

                <div>
                    <q-form ref="myForm" class="q-gutter-md q-mt-lg" @submit.prevent="onSubmit">
                        <div class="flex" style="gap: 1rem">
                            <q-select
                                v-model="paymentType"
                                style="width: 100%"
                                :options="paymentTypes"
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
                                ]"
                            />
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

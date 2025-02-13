<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from 'src/clients/supabase';
import { callToast } from 'src/utils/callToast';
import { uxDelay } from 'src/utils/uxDelay';

const mailbox = ref('');
const pending = ref(false);

const orderKeyForm = ref(null);

const orderKey = async () => {
    pending.value = true;

    try {
        const valid = await orderKeyForm.value.validate();

        if (valid) {
            const { error } = await Promise.all([
                supabase.auth.resetPasswordForEmail(mailbox.value, {
                    redirectTo: 'http://localhost:9000/set-new-vault-key',
                }),
                uxDelay(500),
            ]);

            if (error) {
                callToast(error ? 'Invalid mailbox format' : 'Something went wrong', false, 'bottom');
            } else {
                callToast("If this mailbox exists in our list, the key's on its way!", true, 'bottom');
            }
        } else {
            console.error('Validation Error');
        }
    } catch (err) {
        console.error("Couldn't order the vault key: ", err);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <q-page>
        <section
            id="order-key"
            class="flex flex-center relative-position"
            style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                <q-form
                    ref="orderKeyForm"
                    class="shadow-10 vault-form"
                    style="background-color: var(--q-bg-modal); width: 100%; max-width: 40rem; margin-inline: auto"
                    @keydown.enter.prevent="orderKey"
                    @submit.prevent="orderKey"
                >
                    <div class="q-gutter-y-md q-pa-lg vault-form__inner">
                        <div class="column q-mt-none">
                            <h2 class="text-h5 text-secondary">Order a vault key</h2>
                            <span class="q-mt-sm">Forgot your key? No worries, we'll get you a new one!</span>
                        </div>
                        <div style="width: 100%; gap: 1rem">
                            <q-input
                                v-model="mailbox"
                                filled
                                bg-color="dark"
                                label-color="info"
                                input-class="text-primary"
                                label="Mailbox *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) => val.length > 0 || 'Got to have a mailbox to order a new vault key.',
                                    (val) => /.+@.+\..+/.test(val) || 'Enter proper mailbox.',
                                ]"
                            />
                        </div>

                        <div class="flex items-center justify-between">
                            <q-btn
                                type="submit"
                                :loading="pending"
                                label="Order"
                                style="width: 10rem"
                                :color="pending ? 'positive' : 'secondary'"
                                text-color="dark"
                            >
                                <template v-slot:loading>
                                    <q-spinner-hourglass class="on-left" />
                                    In progress...
                                </template>
                            </q-btn>

                            <RouterLink :to="{ name: 'access-vault' }">
                                <q-btn class="q-mt-none q-px-sm" flat label="Access vault" text-color="secondary"
                            /></RouterLink>
                        </div>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

<style scoped></style>

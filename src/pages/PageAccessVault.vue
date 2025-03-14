<script setup lang="ts">
import { callToast } from 'src/utils/callToast';
import supabase from 'src/utils/supabase';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const mailbox = ref('');
const vaultKey = ref('');

const isPwd = ref(true);

const accessVaultForm = useTemplateRef('access-vault-form');

const accessVault = async () => {
    try {
        const valid = await accessVaultForm.value.validate();

        if (valid) {
            const { error } = await supabase.auth.signInWithPassword({
                email: mailbox.value,
                password: vaultKey.value
            });

            if (error) {
                callToast(
                    error ? 'Wrong vault key or mailbox. Try again' : 'Something went wrong',
                    false
                );
            } else {
                await router.push({ name: 'vault' });
                callToast('Welcome to vault', true);
            }
        } else {
            console.error('Validation Error');
        }
    } catch (err) {
        console.error('Error opening vault: ', err);
    }
};
</script>

<template>
    <q-page>
        <section
            id="access-vault"
            class="flex flex-center relative-position"
            style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                <q-form
                    ref="access-vault-form"
                    class="shadow-10 vault-form"
                    @keydown.enter.prevent="accessVault"
                    @submit.prevent="accessVault"
                >
                    <div class="q-gutter-y-md q-pa-lg vault-form__inner">
                        <div class="column">
                            <h2 class="text-h5 text-secondary vault-form__title">Access vault</h2>
                            <span class="q-mt-sm">Hey there, stranger!</span>
                        </div>
                        <div style="width: 100%; gap: 1rem">
                            <q-input
                                v-model="mailbox"
                                dark
                                filled
                                label-color="info"
                                input-class="text-primary"
                                label="Mailbox *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) =>
                                        val.length > 0 ||
                                        'Got to have a mailbox to access the vault.'
                                ]"
                            />
                            <q-input
                                v-model="vaultKey"
                                :type="isPwd ? 'password' : 'text'"
                                dark
                                filled
                                label-color="info"
                                input-class="text-primary"
                                label="Vault key *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) =>
                                        (val && val.length >= 6) || 'Must have a valid vault key.'
                                ]"
                            >
                                <template #append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        color="info"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>
                        </div>

                        <div class="flex items-center justify-between q-mt-lg">
                            <q-btn type="submit" label="Open" color="secondary" text-color="dark" />

                            <div class="flex items-center" style="gap: 0.5rem">
                                <RouterLink :to="{ name: 'order-key' }">
                                    <q-btn
                                        class="q-mt-none q-px-sm"
                                        flat
                                        label="Forgot key?"
                                        text-color="secondary"
                                /></RouterLink>
                                <RouterLink :to="{ name: 'setup-vault' }">
                                    <q-btn
                                        class="q-mt-none q-px-sm"
                                        flat
                                        label="Set up Vault"
                                        text-color="secondary"
                                /></RouterLink>
                            </div>
                        </div>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

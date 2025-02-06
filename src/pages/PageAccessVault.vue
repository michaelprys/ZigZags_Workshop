<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from 'src/clients/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();

const mailbox = ref('');
const vaultKey = ref('');

const isPwd = ref(true);

const accessVaultForm = ref(null);

const accessVault = async () => {
    try {
        const valid = await accessVaultForm.value.validate();

        if (valid) {
            const { error } = await supabase.auth.signInWithPassword({
                email: mailbox.value,
                password: vaultKey.value,
            });

            if (error) {
                console.error(error);
            } else {
                await router.push({ name: 'vault' });
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
            <div class="q-px-md" style="max-width: 644px; width: 100%">
                <q-form
                    ref="accessVaultForm"
                    class="q-gutter-y-md q-pa-lg shadow-10"
                    style="background-color: var(--q-bg-modal); width: 100%; max-width: 40rem; margin-inline: auto"
                >
                    <div class="column q-mt-none">
                        <h2 class="text-h5 text-secondary">Access vault</h2>
                        <span class="q-mt-sm">Hey there, stranger!</span>
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
                            :rules="[(val) => val.length > 0 || 'Got to have a mailbox to access the vault.']"
                        />
                        <q-input
                            v-model="vaultKey"
                            :type="isPwd ? 'password' : 'text'"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="Vault key *"
                            lazy-rules="ondemand"
                            :rules="[(val) => (val && val.length >= 6) || 'The key is a must.']"
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    color="info"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                    </div>

                    <div class="flex items-center justify-between">
                        <q-btn label="Open" color="secondary" text-color="dark" @click="accessVault" />

                        <span
                            >Need vault?
                            <RouterLink class="q-ml-xs" :to="{ name: 'setup-vault' }">
                                <q-btn class="q-mt-none" flat dense label="Set up" text-color="secondary"
                            /></RouterLink>
                        </span>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

<style scoped></style>

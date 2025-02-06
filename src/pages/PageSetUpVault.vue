<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { supabase } from 'src/clients/supabase';

const router = useRouter();

const setupVaultForm = ref(null);
const name = ref('');
const mailbox = ref('');
const vaultKey = ref('');
const faction = ref(null);

const isPwd = ref(true);

const factions = ['Horde', 'Alliance', 'No faction (Outsiders)'];

const setupVault = async () => {
    try {
        const valid = await setupVaultForm.value.validate();

        if (valid) {
            const { data, error } = await supabase.auth.signUp({
                email: mailbox.value,
                password: vaultKey.value,

                options: {
                    data: {
                        first_name: name.value,
                        faction: faction.value,
                    },
                },
            });

            if (error) {
                console.error(error);
            } else {
                await router.push({ name: 'access-vault' });
                console.log(data);
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
            id="setup-vault"
            class="flex flex-center relative-position"
            style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                <q-form
                    ref="setupVaultForm"
                    class="q-gutter-y-md q-pa-lg shadow-10"
                    style="
                        background-color: var(--q-bg-modal);

                        width: 100%;
                        max-width: 40rem;
                        margin-inline: auto;
                    "
                >
                    <div class="column q-mt-none">
                        <h2 class="text-h5 text-secondary">Set up vault</h2>
                        <span class="q-mt-sm">Let's set up your vault for safe keeping.</span>
                    </div>

                    <div>
                        <q-input
                            v-model="name"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="True name *"
                            lazy-rules="ondemand"
                            :rules="[(val) => val.length > 0 || 'No name? How do we call ya then?']"
                        />
                        <q-input
                            v-model="mailbox"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="Mailbox *"
                            lazy-rules="ondemand"
                            :rules="[(val) => val.length > 0 || 'A place where we send you stuff.']"
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
                            :rules="[
                                (val) => (val && val.length > 0) || 'That key\'s too easy. Should be least 6 chars.',
                            ]"
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

                        <q-select
                            v-model="faction"
                            :options="factions"
                            filled
                            dark
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="Your faction *"
                            lazy-rules="ondemand"
                            :rules="[(val) => (val && val.length > 0) || 'Who do you fight for?']"
                        />
                    </div>

                    <div class="flex items-center justify-between">
                        <q-btn
                            class="q-mt-none"
                            label="Set up"
                            color="secondary"
                            text-color="dark"
                            @click.prevent="setupVault"
                        />

                        <RouterLink :to="{ name: 'access-vault' }"
                            ><q-btn class="q-mt-none" flat dense label="Access vault" text-color="primary"
                        /></RouterLink>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

<style scoped></style>

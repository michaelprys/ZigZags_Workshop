<script setup lang="ts">
import { callToast } from 'src/utils/callToast';
import supabase from 'src/utils/supabase';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const setupVaultForm = useTemplateRef('setup-vault-form');
const name = ref('');
const mailbox = ref('');
const vaultKey = ref('');
const vaultConfirmKey = ref('');
const faction = ref(null);

const isPwd = ref(true);
const isPwdConfirm = ref(true);
const pending = ref(false);

const factions = ['Horde', 'Alliance', 'No faction (Outsiders)'];

const setupVault = async () => {
    pending.value = true;

    try {
        const valid = await setupVaultForm.value.validate();

        if (valid) {
            const { error } = await supabase.auth.signUp({
                email: mailbox.value,
                password: vaultKey.value,

                options: {
                    data: {
                        first_name: name.value,
                        faction: faction.value
                    }
                }
            });

            if (error) {
                callToast(error ? 'This vault is already claimed' : 'Something went wrong', false);
            } else {
                callToast('Success! Please, check your mailbox', true);
                await router.push({ name: 'access-vault' });
            }
        } else {
            console.error('Validation Error');
        }
    } catch (err) {
        console.error("Couldn't set up the vault: ", err);
    } finally {
        pending.value = false;
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
                    ref="setup-vault-form"
                    class="shadow-10 vault-form"
                    @keydown.enter.prevent="setupVault"
                    @submit.prevent="setupVault"
                >
                    <div class="q-gutter-y-md q-pa-lg vault-form__inner">
                        <div class="column">
                            <h2 class="text-h5 text-secondary vault-form__title">Set up vault</h2>
                            <span class="q-mt-sm">Let's set up your vault for safe keeping.</span>
                        </div>

                        <div>
                            <q-input
                                v-model="name"
                                dark
                                filled
                                label-color="info"
                                input-class="text-primary"
                                label="True name *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) => val.length > 0 || 'No name? How do we call ya then?'
                                ]"
                            />
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
                                        'Got to have a mailbox to order a new vault key.',
                                    (val) => /.+@.+\..+/.test(val) || 'Enter proper mailbox.'
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
                                        (val && val.length >= 6) ||
                                        'The key\'s too easy. Should be least 6 chars'
                                ]"
                                ><template #append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        color="info"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>

                            <q-input
                                v-model="vaultConfirmKey"
                                :type="isPwdConfirm ? 'password' : 'text'"
                                dark
                                filled
                                label-color="info"
                                input-class="text-primary"
                                label="Confirm vault key *"
                                lazy-rules="ondemand"
                                :rules="[(val) => val === vaultKey || 'That keys must match']"
                            >
                                <template #append>
                                    <q-icon
                                        :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                                        color="info"
                                        class="cursor-pointer"
                                        @click="isPwdConfirm = !isPwdConfirm"
                                    />
                                </template>
                            </q-input>

                            <q-select
                                v-model="faction"
                                :options="factions"
                                filled
                                dark
                                label-color="info"
                                input-class="text-primary"
                                label="Your faction *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) => (val && val.length > 0) || 'Who do you fight for?'
                                ]"
                            />
                        </div>

                        <div class="flex items-center justify-between">
                            <q-btn
                                class="q-mt-none"
                                label="Set up"
                                type="submit"
                                style="width: 10rem"
                                :loading="pending"
                                :color="pending ? 'positive' : 'secondary'"
                                text-color="dark"
                            >
                                <template #loading>
                                    <q-spinner-hourglass class="on-left" />
                                    In progress...
                                </template>
                            </q-btn>
                            <RouterLink :to="{ name: 'access-vault' }">
                                <q-btn
                                    class="q-mt-none q-px-sm"
                                    flat
                                    label="Access vault"
                                    text-color="secondary"
                                />
                            </RouterLink>
                        </div>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

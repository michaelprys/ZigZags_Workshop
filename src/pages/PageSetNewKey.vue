<script setup lang="ts">
import type { QForm } from 'quasar';
import { callToast } from 'src/utils/callToast';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const vaultKey = ref('');
const pending = ref(false);

const isPwd = ref(true);

const setNewKeyForm = ref<QForm | null>(null);

const setNewKey = async () => {
    pending.value = true;

    try {
        if (!setNewKeyForm.value) {
            console.error('Form ref is null');
            pending.value = false;
            return;
        }

        const valid = await setNewKeyForm.value.validate();

        if (valid) {
            const { error } = await supabase.auth.updateUser({
                password: vaultKey.value
            });

            if (error) {
                callToast(
                    error ? "Couldn't set a new vault key" : 'Something went wrong',
                    false,
                    'bottom'
                );
            } else {
                callToast('The new vault key has been set', true, 'bottom');
                await router.push({ name: 'access-vault' });
            }
        } else {
            console.error('Validation Error');
        }
    } catch (err) {
        console.error('Error setting a new key: ', err);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <q-page>
        <section id="set-new-vault-key" class="flex flex-center relative-position">
            <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                <q-form
                    ref="set-new-key-form"
                    class="shadow-10 vault-form"
                    @keydown.enter.prevent="setNewKey"
                    @submit.prevent="setNewKey"
                >
                    <div class="q-gutter-y-md q-pa-lg vault-form__inner">
                        <div class="column">
                            <h2 class="text-h5 text-secondary vault-form__title">
                                Set a new vault key
                            </h2>
                            <span class="q-mt-sm"
                                >Almost there, come up with a new key and you're set.</span
                            >
                        </div>
                        <div style="width: 100%; gap: 1rem">
                            <q-input
                                v-model="vaultKey"
                                :type="isPwd ? 'password' : 'text'"
                                filled
                                dark
                                label-color="info"
                                input-class="text-primary"
                                label="New vault key *"
                                lazy-rules="ondemand"
                                :rules="[
                                    (val) =>
                                        (val && val.length >= 6) ||
                                        'Too easy! Must be 6 characters at least.'
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

                        <div class="flex items-center justify-between">
                            <q-btn
                                type="submit"
                                :loading="pending"
                                label="Order"
                                style="width: 10rem"
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
                            /></RouterLink>
                        </div>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

<style lang="scss" scoped>
#set-new-vault-key {
    padding-top: 4.625em;
    padding-bottom: 8.5em;
    min-height: calc(100svh - 4.625em);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
const name = ref('');
const passphrase = ref('');

const territory = ref(null);

const territories = ['Horde', 'Alliance', 'Argent Dawn', 'Scarlet Crusade', 'Kirin Tor'];
</script>

<template>
    <q-page>
        <section
            id="access-vault"
            class="flex flex-center relative-position"
            style="padding-bottom: 8.5em; min-height: 100svh"
        >
            <div class="q-px-md" style="max-width: 644px; width: 100%">
                <q-form
                    class="q-gutter-y-md q-pa-lg shadow-10"
                    style="
                        background-color: var(--q-bg-modal);

                        width: 100%;
                        max-width: 40rem;
                        margin-inline: auto;
                    "
                >
                    <div class="column q-mt-none">
                        <h2 class="text-h5 text-secondary">Access vault</h2>
                        <span class="q-mt-sm">Greetings, traveller!</span>
                    </div>
                    <div style="width: 100%; gap: 1rem">
                        <q-input
                            v-model="name"
                            style="flex: 1"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="True name *"
                            lazy-rules="ondemand"
                            :rules="[(val) => val.length > 0 || 'No name? How do we call ya then?']"
                        />
                        <q-input
                            v-model="passphrase"
                            class="q-mt-sm"
                            style="flex: 1"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="Passphrase *"
                            lazy-rules="ondemand"
                            :rules="[(val) => (val && val.length > 0) || 'What\'s the magic word, friend?']"
                        />
                    </div>

                    <div class="flex items-center justify-between">
                        <q-btn class="q-mt-none" label="Open" type="submit" color="secondary" text-color="dark" />

                        <span
                            >No vault?
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

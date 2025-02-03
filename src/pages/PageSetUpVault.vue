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
            id="vault"
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
                            v-model="passphrase"
                            filled
                            bg-color="dark"
                            label-color="info"
                            input-class="text-primary"
                            label="Passphrase *"
                            lazy-rules="ondemand"
                            :rules="[(val) => (val && val.length > 0) || 'What\'s the magic word, friend?']"
                        />
                        <q-select
                            v-model="territory"
                            :options="territories"
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
                        <q-btn class="q-mt-none" label="Set up" type="submit" color="secondary" text-color="dark" />

                        <RouterLink :to="{ name: 'vault' }"
                            ><q-btn class="q-mt-none" flat label="Access vault" text-color="primary"
                        /></RouterLink>
                    </div>
                </q-form>
            </div></section
    ></q-page>
</template>

<style scoped>
/* :deep(.q-field__bottom--animated) {
    transform: translateY(0%);
    position: static;
    padding-bottom: 1rem;
}
:deep(.q-field--with-bottom) {
    padding-bottom: 0;
} */
</style>

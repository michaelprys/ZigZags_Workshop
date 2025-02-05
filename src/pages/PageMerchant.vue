<script setup lang="ts">
import { ref } from 'vue';

const isAuthorized = ref(true);
</script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section
                id="black-market-access"
                class="flex flex-center relative-position"
                style="padding-bottom: 8.5em; min-height: 100svh"
            >
                <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                    <div
                        class="column flex-center q-pa-lg shadow-10"
                        style="
                            background-color: var(--q-bg-modal);
                            border-radius: var(--rounded);
                            width: 100%;
                            max-width: 40rem;
                            margin-inline: auto;
                        "
                    >
                        <div v-if="!isAuthorized" class="column items-center">
                            <h2 class="text-h5 text-secondary">Secrets have a price. Got the gold?</h2>

                            <span class="q-mt-sm text-center">Access the Vault to check your balance.</span>

                            <RouterLink class="q-mt-lg" :to="{ name: 'vault' }"
                                ><q-btn color="secondary" label="Go to vault" text-color="dark"
                            /></RouterLink>
                        </div>

                        <q-form v-else class="full-width">
                            <div class="column q-mt-none">
                                <h2 class="q-mt-none text-h5 text-secondary">
                                    Get an invitation<span class="text-subtitle1">&nbsp;&nbsp;(1000 gold)</span>
                                </h2>
                                <span class="q-mt-sm">Who am I dealing with?</span>
                            </div>
                            <div class="flex q-mt-md" style="width: 100%; gap: 1rem">
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
                            </div>

                            <div class="flex items-center justify-between">
                                <q-btn
                                    class="q-mt-none"
                                    label="Purchase"
                                    type="submit"
                                    color="secondary"
                                    text-color="dark"
                                />

                                <!-- <RouterLink :to="{ name: 'black-market-access' }"
                                    ><q-btn class="q-mt-none" flat label="To entrance" text-color="primary"
                                /></RouterLink> -->
                            </div>
                        </q-form>
                    </div>
                </div>
            </section>
        </div></q-page
    >
</template>

<style scoped>
.bg {
    background-image: url('src/assets/merchant/2.jpeg');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    filter: blur(4px) grayscale(40%) brightness(50%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>

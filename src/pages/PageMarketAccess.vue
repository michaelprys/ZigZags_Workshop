<script setup lang="ts">
import { ref } from 'vue';

const isAuthorized = ref(true);
const hasRune = ref(true);

console.log(isAuthorized.value);
</script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section
                id="market-access"
                class="flex flex-center relative-position"
                style="padding-bottom: 8.5em; min-height: 100svh"
            >
                <div class="q-px-md" style="max-width: 40.25rem; width: 100%">
                    <div class="bg-dark message q-pa-lg shadow-10 text-center">
                        <template v-if="!isAuthorized">
                            <h2 class="text-h5 text-negative">Got the rune? Show it... or turn back.</h2>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'vault' }"
                                    ><q-btn class="q-mt-none" outline label="Look in my vault"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="isAuthorized && !hasRune">
                            <h2 class="text-h4 text-negative">No rune, no passage.</h2>
                            <h3 class="q-mt-sm text-caption text-info">
                                Find the merchant. Get the rune. Or wander forever...
                            </h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'merchant' }"
                                    ><q-btn class="q-mt-none" outline label="Go to merchant"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="isAuthorized && hasRune">
                            <h2 class="text-h4 text-negative">Got the rune?</h2>
                            <h3 class="q-mt-sm text-caption text-info">Show it, and step forward.</h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'black-market' }"
                                    ><q-btn class="q-mt-none" outline label="Attempt"
                                /></RouterLink>
                            </div>
                        </template>
                    </div>
                </div>
            </section></div
    ></q-page>
</template>

<style scoped>
.message {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
}

.bg {
    background-image: url('src/assets/market-access/bg.avif');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    filter: blur(4px) grayscale(40%) brightness(30%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>

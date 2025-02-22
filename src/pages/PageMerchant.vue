<script setup lang="ts"></script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section
                id="black-market-access"
                class="flex flex-center relative-position"
                style="
                    padding-top: 4.625em;
                    padding-bottom: 8.5em;
                    min-height: calc(100svh - 4.625em);
                "
            >
                <div class="q-px-md">
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
                        <div class="flex full-width x">
                            <div class="column q-mt-none">
                                <h2 class="q-mt-none text-h5 text-secondary">
                                    Get an invitation<span class="text-subtitle1"
                                        >&nbsp;&nbsp;(1000 gold)</span
                                    >
                                </h2>
                                <span class="q-mt-sm">Are you ready to pay?</span>
                            </div>
                            <div class="flex q-mt-md" style="width: 100%; gap: 1rem"></div>

                            <div class="flex items-center justify-between">
                                <q-btn
                                    class="q-mt-none"
                                    label="Purchase"
                                    type="submit"
                                    color="secondary"
                                    text-color="dark"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section></div
    ></q-page>
</template>

<style scoped>
.bg {
    background-image: url('src/assets/merchant/bg-merchant.avif');
    position: absolute;
    inset: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    filter: blur(4px) grayscale(40%) brightness(50%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>

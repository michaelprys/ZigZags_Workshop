<script setup lang="ts"></script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section
                id="market-access"
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
                        <h2 class="q-mt-none text-h5">You're at the entrance</h2>
                        <q-input
                            v-model="name"
                            filled
                            label="Tell the word *"
                            dark
                            lazy-rules
                            :rules="[
                                (val) =>
                                    (val && val.length > 0) ||
                                    'GRRRAAAHHH! Stop messing around — tell me the word, quickly!',
                            ]"
                        />

                        <div class="flex items-center justify-between">
                            <q-btn
                                class="q-mt-none"
                                label="Attempt"
                                type="submit"
                                color="secondary"
                                text-color="dark"
                            />

                            <RouterLink :to="{ name: 'request-access' }"
                                ><q-btn class="q-mt-none" flat label="Gain access" text-color="primary"
                            /></RouterLink>
                        </div>
                    </q-form>
                </div>
            </section></div
    ></q-page>
</template>

<style scoped>
.bg {
    background-image: url('src/assets/market-access/27.jpeg');
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

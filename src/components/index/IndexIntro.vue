<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
    <section id="intro" style="padding-top: 4.25em; padding-bottom: 8.5em">
        <h1 class="sr-only">Introduction</h1>

        <div class="flex flex-center q-px-md">
            <div class="relative-position section__wrapper shadow-8 text-center">
                <div class="absolute-top fit rounded">
                    <q-parallax class="fit">
                        <template v-slot:media>
                            <video
                                width="1516"
                                height="926"
                                style="object-fit: cover; z-index: -1; filter: brightness(150%)"
                                poster="~assets/index/intro/poster.avif"
                                loop
                                muted
                                autoplay
                            >
                                <source src="~assets/index/intro/intro.mp4" type="video/mp4" />
                            </video>
                        </template>
                    </q-parallax>
                </div>
                <div class="column fit flex-center">
                    <div>
                        <h2 class="text-glow-dark text-h3 text-primary">Time is money, friend!</h2>
                        <h3 class="q-mt-lg text-h5 text-secondary">I got the best deals anywhere</h3>

                        <q-select
                            v-model="model"
                            class="q-mt-lg"
                            label-color="info"
                            color="secondary"
                            dark
                            label="Search for loot"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="0"
                            :options="options"
                            style="width: 100%"
                            @filter="filterFn"
                        >
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-primary"> No results </q-item-section>
                                </q-item>
                            </template>
                        </q-select>

                        <div class="q-pa-md">
                            <div class="q-gutter-md row"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="divider"></div>
</template>

<style scoped>
.section__wrapper {
    width: 100%;
    max-width: 92.5rem;
    height: 40rem;
}
</style>

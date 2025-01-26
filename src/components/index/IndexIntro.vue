<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
    <section id="intro" style="padding-top: 4.25rem; padding-bottom: 8.5rem">
        <h1 class="sr-only">Introduction</h1>

        <div class="flex flex-center">
            <div class="relative-position section__wrapper shadow-8 text-center">
                <div class="absolute-top fit rounded">
                    <q-parallax class="fit">
                        <template v-slot:media>
                            <video
                                width="1516"
                                height="926"
                                style="object-fit: cover; z-index: -1; filter: brightness(150%)"
                                poster="src/assets/index/intro/placeholder.webp"
                                loop
                                muted
                                autoplay
                            >
                                <source src="src/assets/index/intro/intro.mp4" type="video/mp4" />
                            </video>
                        </template>
                    </q-parallax>
                </div>
                <div class="column fit flex-center">
                    <div>
                        <h2 class="q-my-none text-glow-dark text-h3 text-primary">Time is money, friend!</h2>
                        <h3 class="q-my-lg text-h5 text-secondary">I got the best deals anywhere</h3>
                        <q-input v-model="text" label-color="info" color="secondary" dark label="Search an item">
                            <template v-slot:append>
                                <q-btn class="bg-primary text-dark">Search</q-btn>
                            </template>
                        </q-input>
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

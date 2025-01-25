<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
    <section class="section-intro">
        <div class="relative-position section-intro__inner shadow-8 text-center">
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
                    <h1 class="q-my-none text-glow-dark text-h3 text-primary">Time is money, friend!</h1>
                    <h2 class="text-h5 text-secondary">I got the best deals anywhere</h2>
                    <q-input v-model="text" label-color="info" color="secondary" dark label="Search an item">
                        <template v-slot:append>
                            <q-btn class="bg-primary text-dark">Search</q-btn>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-intro {
    min-height: calc(100svh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.section-intro__inner {
    /* border: 4px solid var(--q-dark); */
    width: 1480px;
    height: 640px;
}
</style>

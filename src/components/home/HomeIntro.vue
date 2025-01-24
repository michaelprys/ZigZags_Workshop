<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
    <section class="section-intro relative-position">
        <div class="section-intro__inner relative-position text-center">
            <video
                class="absolute-top fit shadow-8"
                style="object-fit: cover; z-index: -1; filter: brightness(125%) blur(5px) contrast(107%)"
                width="1516"
                height="926"
                autoplay
                loop
                muted
                preload="auto"
                ref="videoRef"
            >
                <source src="/src/assets/videos/Intro.mp4" type="video/mp4" />
            </video>

            <div>
                <h1 class="text-h3 text-secondary q-my-none">Time is money, friend!</h1>
                <h2 class="text-h5 text-warning">I got the best deals anywhere</h2>
                <q-input color="secondary" label-color="info" dark label="Search an item" v-model="text">
                    <template v-slot:append>
                        <q-btn class="bg-secondary text-accent">Search</q-btn>
                    </template>
                </q-input>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section-intro {
    min-height: calc(100svh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    &__inner {
        border: 4px solid $primary;
        padding-inline: 28em;
        padding-block: 15em;
        border-radius: 0.75em;
    }
}
</style>

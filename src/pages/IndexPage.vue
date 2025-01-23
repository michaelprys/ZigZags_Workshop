<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<template>
    <q-page class="row items-center justify-evenly">
        <div class="relative-position text-center intro">
            <video
                class="absolute-top fit"
                style="object-fit: cover; z-index: -1"
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
    </q-page>
</template>

<style lang="scss" scoped>
.intro {
    border: 4px solid $primary;
    padding-inline: 400px;
    padding-block: 200px;
    border-radius: 12px;
}
</style>

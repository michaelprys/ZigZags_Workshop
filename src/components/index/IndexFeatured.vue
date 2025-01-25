<script setup lang="ts">
import { ref } from 'vue';

const activeSlide = ref(1);

const slides = [
    [
        { col: 'col', name: 'image-7' },
        { col: 'col-5', name: 'image-8' },
        { col: 'col', name: 'image-9' },
    ],
    [
        { col: 'col', name: 'image-2' },
        { col: 'col-5', name: 'image-1' },
        { col: 'col', name: 'image-3' },
    ],
    [
        { col: 'col', name: 'image-4' },
        { col: 'col-5', name: 'image-5' },
        { col: 'col', name: 'image-6' },
    ],
];
</script>

<template>
    <section class="section">
        <div class="column items-center">
            <div class="text-center">
                <h1 class="q-my-none text-glow-dark text-h3 text-primary">You want it?</h1>
                <h2 class="text-h5 text-secondary">It's yours... for a price!</h2>
            </div>

            <div class="q-pa-md">
                <q-carousel
                    v-model="activeSlide"
                    class="bg-transparent non-selectable"
                    style="width: 1300px"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    swipeable
                    animated
                    control-color="secondary"
                    padding
                    navigation
                    infinite
                    arrows
                    height="24rem"
                >
                    <q-carousel-slide
                        v-for="(slide, idx) in slides"
                        :key="idx"
                        class="cursor-pointer no-wrap"
                        :name="idx + 1"
                    >
                        <div class="fit items-center row">
                            <div
                                v-for="content in slide"
                                :key="content.name"
                                class="full-height q-mr-md"
                                :class="content.col"
                            >
                                <q-img
                                    class="full-height inner slide-image"
                                    :src="`src/assets/index/featured/${content.name}.jpeg`"
                                />
                            </div>
                        </div> </q-carousel-slide
                    >R
                </q-carousel>
            </div>
        </div>
    </section>
</template>

<style scoped>
:deep(.q-carousel__control) {
    margin-top: -2rem;
}

.slide-image {
    border: 4px solid var(--q-dark);
    border-radius: 0.375em;
}
</style>

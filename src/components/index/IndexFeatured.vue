<script setup lang="ts">
import { ref } from 'vue';

const activeSlide = ref(1);

const imgSrc = (name: string) => {
    return new URL(`/src/assets/index/featured/${name}.avif`, import.meta.url).href;
};

const slides = [
    [
        { col: 'col', name: 'image-7', src: imgSrc('image-7') },
        { col: 'col-5', name: 'image-8', src: imgSrc('image-8') },
        { col: 'col', name: 'image-9', src: imgSrc('image-9') },
    ],
    [
        { col: 'col', name: 'image-2', src: imgSrc('image-2') },
        { col: 'col-5', name: 'image-1', src: imgSrc('image-1') },
        { col: 'col', name: 'image-3', src: imgSrc('image-3') },
    ],
    [
        { col: 'col', name: 'image-4', src: imgSrc('image-4') },
        { col: 'col-5', name: 'image-5', src: imgSrc('image-5') },
        { col: 'col', name: 'image-6', src: imgSrc('image-6') },
    ],
];
</script>

<template>
    <section id="featured" style="padding-top: 6.625em; padding-bottom: 8.5em">
        <h1 class="sr-only">Featured</h1>

        <div class="flex flex-center q-px-md">
            <div>
                <div class="text-center">
                    <h2 class="text-glow-dark text-h3 text-primary">You want it?</h2>
                    <h3 class="q-my-lg text-h5 text-secondary">It's yours... for a price!</h3>
                </div>

                <div class="q-pa-md">
                    <q-carousel
                        v-model="activeSlide"
                        class="bg-transparent non-selectable"
                        style="width: 81.25rem"
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        swipeable
                        animated
                        autoplay
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
                                    <q-img class="full-height inner rounded shadow-1" :src="content.src" />
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
        </div>
    </section>

    <div class="divider"></div>
</template>

<style scoped>
:deep(.q-carousel__control) {
    margin-top: -2rem;
}
</style>

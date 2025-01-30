<script setup lang="ts">
import { ref } from 'vue';

const activeSlide = ref(2);

const imgSrc = (name: string) => {
    return new URL(`/src/assets/index/featured/${name}.avif`, import.meta.url).href;
};

const slides = [
    [
        { name: 'image-7', src: imgSrc('image-7') },
        { name: 'image-8', src: imgSrc('image-8') },
    ],
    [
        { name: 'image-2', src: imgSrc('image-2') },
        { name: 'image-1', src: imgSrc('image-1') },
    ],
    [
        { name: 'image-4', src: imgSrc('image-4') },
        { name: 'image-5', src: imgSrc('image-5') },
    ],
];
</script>

<template>
    <section class="column flex-center relative-position" style="padding-top: 6.625em; padding-bottom: 8.5em">
        <q-img
            class="absolute-top"
            width="1024px"
            height="1024px"
            style="
                top: 2rem;
                left: 50%;
                transform: translateX(-50%);
                width: 90px;
                height: 90px;
                mix-blend-mode: lighten;
                filter: brightness(90%);
            "
            src="~assets/stash/goblin.avif"
        >
        </q-img>

        <div class="column items-center q-mt-xl">
            <span class="text-h3">Your stash</span>

            <div class="q-mt-sm">
                <div class="q-pa-md">
                    <q-carousel
                        v-model="activeSlide"
                        style="min-height: 400px"
                        class="bg-transparent carousel non-selectable"
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        swipeable
                        animated
                        control-color="secondary"
                        padding
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
                                <div v-for="content in slide" :key="content.name" class="full-height q-mr-md">
                                    <div class="card shadow-1">
                                        <q-img class="card__image" :src="content.src"> </q-img>
                                        <div class="column q-px-lg q-py-md">
                                            <span class="text-bold">Sneaky Boots of Swift Exit</span>
                                            <span class="text-bold">Price: 250 Gold</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
        </div>

        <div class="column q-mt-md">
            <span class="text-center text-h6 text-secondary">Price to pay: 500 Gold</span>
            <q-btn class="q-mt-md" outline color="primary">Proceed</q-btn>
        </div>
    </section>
</template>

<style scoped>
.q-carousel__slide div:last-child {
    margin-right: 0;
}
.card {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    border-radius: var(--rounded);
    /* box-shadow: color-mix(in srgb, var(--q-primary) 100%, black 50%) 0px 1px 4px; */
    /* transition: box-shadow 0.15s linear; */
    /* cursor: pointer; */
}
/* .card:hover {
    box-shadow: color-mix(in srgb, var(--q-primary) 100%, black 50%) 0px 1px 4px;
} */
.card__image {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    width: 100%;
    height: 300px;
}
</style>

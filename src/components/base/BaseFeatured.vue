<script setup lang="ts">
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { computed, onMounted, ref } from 'vue';

const storeGoods = useStoreGoods();
const activeSlide = ref(1);

const slideGroup = computed(() => {
    const img = storeGoods.featuredGoods;

    return [
        [img[4], img[3], img[8]],
        [img[0], img[1], img[2]],
        [img[5], img[6], img[7]],
    ];
});

onMounted(async () => {
    await storeGoods.loadFeaturedGoods();
});
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
                        control-color="secondary"
                        padding
                        navigation
                        infinite
                        arrows
                        autoplay
                        height="24rem"
                    >
                        <q-carousel-slide
                            v-for="(slide, idx) in slideGroup"
                            :key="idx"
                            :name="idx + 1"
                            class="cursor-pointer no-wrap"
                        >
                            <div class="fit items-center row">
                                <div
                                    v-for="(img, imgIdx) in slide"
                                    :key="imgIdx + 1"
                                    :class="imgIdx === 1 ? 'col-5' : 'col'"
                                    class="full-height q-mr-md"
                                    style="border-radius: var(--rounded)"
                                >
                                    <q-img
                                        :src="img?.image_url"
                                        :alt="img?.name"
                                        class="full-height inner shadow-1"
                                        style="border-radius: var(--rounded)"
                                    />
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

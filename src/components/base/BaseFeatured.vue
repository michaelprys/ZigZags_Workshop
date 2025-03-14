<script setup lang="ts">
import { useQuery } from '@pinia/colada';
import { useStoreGoods } from 'src/stores/storeGoods';
import { delay } from 'src/utils/delay';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const storeGoods = useStoreGoods();
const activeSlide = ref(1);

const { data: queryData, isPending } = useQuery({
    key: ['featuredGoods'],
    query: () => storeGoods.loadFeaturedGoods(),
    staleTime: 1000 * 60 * 5
});

const slideGroup = computed(() => {
    const img = queryData.value ?? [];

    return [
        [img[4], img[3], img[8]],
        [img[0], img[1], img[2]],
        [img[5], img[6], img[7]]
    ];
});

const imgLoaded = ref({});

watch(
    () => queryData.value,
    (newQuery) => {
        if (!newQuery) return;

        newQuery.forEach((good) => {
            const img = new Image();
            img.onload = async () => {
                if (img.complete) {
                    imgLoaded.value[good?.id] = true;
                } else {
                    await delay(200);
                    imgLoaded.value[good?.id] = true;
                }
            };
            img.src = good?.image_url;
        });
    },
    { immediate: true }
);
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
                                    class="relative full-height q-mr-md"
                                    :class="imgIdx === 1 ? 'col-5' : 'col'"
                                    style="border-radius: var(--rounded)"
                                >
                                    <div style="position: relative; height: 100%">
                                        <q-skeleton
                                            v-if="!imgLoaded[img?.id]"
                                            animation="wave"
                                            animation-speed="1800"
                                            dark
                                            square
                                            :style="imgIdx === 1 ? 'col-5' : 'col'"
                                            style="
                                                position: absolute;
                                                inset: 0;
                                                background-color: var(--q-placeholder-secondary);
                                                border-radius: var(--rounded);
                                            "
                                        >
                                        </q-skeleton>
                                        <q-img
                                            :src="img?.image_url"
                                            :alt="img?.name"
                                            class="full-height inner shadow-1"
                                            style="border-radius: var(--rounded)"
                                        />
                                    </div>
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

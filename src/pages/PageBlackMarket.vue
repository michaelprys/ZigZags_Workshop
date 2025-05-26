<script setup lang="ts">
import IconDebuff from 'src/components/icons/IconDebuff.vue';
import ItemCategories from 'src/components/items/ItemCategories.vue';
import { useStoreGoods } from 'src/stores/storeGoods';
import type { Category } from 'src/types';
import { useFilters } from 'src/use/useFilters';
import { useManageStash } from 'src/use/useManageStash';
import { usePaginatedGoods } from 'src/use/usePaginatedGoods';
import { useTransition } from 'src/use/useTransition';
import { delay } from 'src/utils/delay';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { applyTransition } = useTransition();
const storeGoods = useStoreGoods();
const route = useRoute();
const router = useRouter();
const { addToStash } = useManageStash();

const categories = ref<Category[]>([
    { label: 'consumables', active: false },
    { label: 'trinkets', active: false },
    { label: 'weapons', active: false },
    { label: 'companions', active: false },
    { label: 'mounts', active: false }
]);

const { currentPage, queryData, isPending, loadPaginatedGoods } = usePaginatedGoods(true);

const { updateSelectedCategories, resetCategories } = useFilters(
    categories,
    loadPaginatedGoods,
    route,
    router,
    currentPage
);

const imgLoaded = ref<Record<string, boolean>>({});

watch(
    () => queryData.value,
    (newGoods) => {
        if (!newGoods) return;

        newGoods.forEach((good) => {
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
    { immediate: true, deep: true }
);
</script>

<template>
    <q-page>
        <div class="overlay"></div>

        <section id="black-market">
            <h1 class="text-center text-h3 title">Hunt treasures</h1>

            <ItemCategories
                :categories="categories"
                :update-selected-categories="updateSelectedCategories"
                :reset-categories="resetCategories"
            />

            <div class="column flex-center q-px-md relative-position">
                <ul
                    class="flex flex-center q-gutter-lg q-mt-none q-pl-none"
                    style="max-width: 84.5rem"
                >
                    <li
                        v-for="good in queryData"
                        :key="good.id"
                        class="card"
                        style="cursor: pointer; z-index: 5"
                    >
                        <q-card style="background-color: transparent; box-shadow: none">
                            <div>
                                <div class="image-wrapper relative">
                                    <Transition name="fade">
                                        <q-skeleton
                                            v-if="!imgLoaded[good.id]"
                                            animation="blink"
                                            animation-speed="1800"
                                            dark
                                            square
                                            class="skeleton-img"
                                        />
                                    </Transition>
                                    <q-img class="image" :src="good.image_url" />
                                </div>

                                <q-card-section>
                                    <div class="relative items-center no-wrap row">
                                        <Transition name="fade">
                                            <q-skeleton
                                                v-if="!imgLoaded[good.id]"
                                                animation="blink"
                                                dark
                                                animation-speed="1800"
                                                class="skeleton-name"
                                            />
                                        </Transition>
                                        <div class="col ellipsis text-h6 text-primary">
                                            {{ good.name }}
                                        </div>
                                    </div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                    <div class="relative items-center no-wrap row">
                                        <Transition name="fade">
                                            <q-skeleton
                                                v-if="!imgLoaded[good.id]"
                                                animation="blink"
                                                dark
                                                animation-speed="1800"
                                                class="skeleton-content"
                                            />
                                        </Transition>
                                        <div>
                                            <div class="flex items-center" style="gap: 5px">
                                                <span class="text-secondary text-subtitle1"
                                                    >Price: {{ good.price }} gold
                                                </span>
                                                <div
                                                    v-if="good.debuff"
                                                    class="flex items-center text-negative"
                                                    style="margin-bottom: 3px"
                                                >
                                                    <IconDebuff>
                                                        <q-tooltip
                                                            :delay="500"
                                                            anchor="center right"
                                                            self="top start"
                                                            class="tooltip-debuff column text-center text-dark"
                                                        >
                                                            <span
                                                                class="text-caption"
                                                                style="color: #ff7f50"
                                                                >Debuff</span
                                                            >
                                                        </q-tooltip>
                                                    </IconDebuff>
                                                </div>
                                            </div>
                                            <span class="inline-block text-caption text-grey">
                                                {{ good.short_description }}
                                            </span>
                                        </div>
                                    </div>
                                </q-card-section>
                            </div>

                            <q-card-actions class="flex justify-between">
                                <div class="relative items-center no-wrap row">
                                    <Transition name="fade">
                                        <q-skeleton
                                            v-if="!imgLoaded[good.id]"
                                            animation="blink"
                                            dark
                                            animation-speed="1800"
                                            type="QBtn"
                                            class="skeleton-add"
                                        />
                                    </Transition>
                                    <q-btn flat color="primary" @click="addToStash(good)">
                                        💰 &nbsp; Add to stash
                                    </q-btn>
                                </div>

                                <q-card-actions>
                                    <div class="relative items-center no-wrap row">
                                        <Transition name="fade">
                                            <q-skeleton
                                                v-if="!imgLoaded[good.id]"
                                                animation="blink"
                                                dark
                                                animation-speed="1800"
                                                type="QBtn"
                                                class="skeleton-details"
                                            />
                                        </Transition>
                                        <RouterLink
                                            :to="{
                                                name: 'good-details',
                                                params: {
                                                    category: good?.category,
                                                    slug: good?.slug
                                                }
                                            }"
                                            @click="storeGoods.selectGood(good)"
                                        >
                                            <q-btn flat color="primary"> Details </q-btn>
                                        </RouterLink>
                                    </div>
                                </q-card-actions>
                            </q-card-actions>
                        </q-card>
                    </li>
                </ul>

                <div @click="applyTransition('pagination', 150)">
                    <div class="flex flex-center q-pa-lg">
                        <q-pagination
                            v-if="!isPending"
                            v-model="currentPage"
                            class="q-mt-md"
                            color="secondary"
                            active-text-color="dark"
                            size="lg"
                            :boundary-numbers="false"
                            :max="storeGoods.totalPages"
                            @update:model-value="loadPaginatedGoods"
                        />
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
@use 'sass:map';

#black-market {
    min-height: 75rem;
    padding-top: 4.625em;
    padding-bottom: 8.5em;
}
.skeleton-img {
    position: absolute;
    height: 13.125rem;
    border-top-left-radius: $rounded;
    border-top-right-radius: $rounded;
    inset: 0;
}
.skeleton-name {
    position: absolute;
    height: 2rem;
    margin: 1rem;
    background-color: $placeholder-primary;
    inset: 0;
}
.skeleton-content {
    position: absolute;
    height: 5.25rem;
    margin-inline: 1rem;
    background-color: $placeholder-primary;
    inset: 0;
}
.skeleton-add {
    position: absolute;
    background-color: $placeholder-primary;
    width: 9.3448rem;
    margin-inline: 0.5rem;
}
.skeleton-details {
    position: absolute;
    background-color: $placeholder-primary;
    width: 4.6019rem;
    margin-right: 0.5rem;
}
.tooltip-debuff {
    background-color: $dark;
    border: 1px solid color-mix(in srgb, $primary 50%, #ff7f50 90%);
    border-radius: $rounded;
    box-shadow:
        0px 3px 8px rgba(0, 0, 0, 0.4),
        2px 5px 12px #ff7f50;
}
:deep(.q-checkbox__bg) {
    background: $negative-dimmed;
    outline: $negative;
    border-color: $negative-dimmed;
}
.card {
    width: 19.625rem;
    min-height: 26.875rem;
    position: relative;
    border: 2px solid transparent;
    border-radius: $rounded;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(50, 0, 0, 1) 100%);
    color: #ddd;
    overflow: hidden;
    padding-inline: 0.9375rem;
    padding-top: 0.9375rem;
    background-clip: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120%;
        height: 120%;
        transform: translate(-50%, -50%) rotate(45deg);
        border-radius: 50%;
        z-index: -2;
        opacity: 0.3;
    }
    &:hover {
        & .image {
            transform: scale(1.05);
        }
    }
    & .image {
        transition: transform 0.15s linear;
        transform: scale(1);
        height: 13.125rem;
    }
    & .image-wrapper {
        border-radius: $rounded;
        overflow: hidden;
    }
}
.title {
    color: #710b03;
}
.overlay {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 50%;
    z-index: -1;
    &::before {
        content: '';
        position: absolute;
        top: 13%;
        left: 50%;
        width: 120%;
        min-height: 100svh;
        background: radial-gradient(
            ellipse at center,
            rgba(10, 10, 60, 0.6) 0%,
            rgba(20, 10, 50, 0.5) 30%,
            rgba(0, 0, 0, 0) 80%
        );
        transform: translateX(-50%) scaleY(1.2);
        filter: blur(50px);
        z-index: -1;
    }
}
.debuff {
    transition: filter 0.15s linear;
    &:hover {
        filter: brightness(120%);
    }
}

@media (width <= $breakpoint-md) {
    .title {
        font-size: map.get($h4, 'size');
    }
}
</style>

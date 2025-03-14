<script setup lang="ts">
import IconDebuff from 'src/components/icons/IconDebuff.vue';
import ItemCategories from 'src/components/items/ItemCategories.vue';
import { useStoreGoods } from 'src/stores/storeGoods';
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

const categories = ref([
    { label: 'consumables', active: false },
    { label: 'trinkets', active: false },
    { label: 'weapons', active: false },
    { label: 'companions', active: false },
    { label: 'mounts', active: false }
]);

const { currentPage, queryData, isPending, loadPaginatedGoods } = usePaginatedGoods(true, router);

const { updateSelectedCategories, resetCategories } = useFilters(
    categories,
    loadPaginatedGoods,
    route,
    router,
    currentPage
);

const imgLoaded = ref({});

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

        <section id="black-market" style="padding-top: 4.625em; padding-bottom: 8.5em">
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
                        class="card"
                        v-for="good in queryData"
                        :key="good.id"
                        style="cursor: pointer; z-index: 5"
                    >
                        <q-card style="background-color: transparent; box-shadow: none">
                            <div>
                                <div class="card__image-wrapper relative">
                                    <Transition name="fade">
                                        <q-skeleton
                                            v-if="!imgLoaded[good.id]"
                                            animation="blink"
                                            animation-speed="1800"
                                            dark
                                            square
                                            class="skeleton"
                                            style="
                                                height: 13.125rem;
                                                border-top-left-radius: var(--rounded);
                                                border-top-right-radius: var(--rounded);
                                            "
                                        />
                                    </Transition>
                                    <q-img class="card__image" :src="good.image_url" />
                                </div>

                                <q-card-section>
                                    <div class="relative items-center no-wrap row">
                                        <Transition name="fade">
                                            <q-skeleton
                                                v-if="!imgLoaded[good.id]"
                                                animation="blink"
                                                dark
                                                animation-speed="1800"
                                                class="skeleton"
                                                style="height: 2rem; margin: 1rem"
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
                                                class="skeleton"
                                                style="height: 5.25rem; margin-inline: 1rem"
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
                                                    <IconDebuff class="debuff">
                                                        <q-tooltip
                                                            :delay="500"
                                                            anchor="center right"
                                                            self="top start"
                                                            class="column text-center text-dark"
                                                            style="
                                                                background-color: var(--q-dark);
                                                                border: 1px solid
                                                                    color-mix(
                                                                        in srgb,
                                                                        var(--q-primary) 50%,
                                                                        #ff7f50 90%
                                                                    );
                                                                border-radius: var(--rounded);
                                                                box-shadow:
                                                                    0px 3px 8px rgba(0, 0, 0, 0.4),
                                                                    2px 5px 12px #ff7f50;
                                                            "
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
                                            style="
                                                position: absolute;
                                                background-color: var(--q-placeholder-primary);
                                                width: 9.3448rem;
                                                margin-inline: 0.5rem;
                                            "
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
                                                style="
                                                    position: absolute;
                                                    background-color: var(--q-placeholder-primary);
                                                    width: 4.6019rem;
                                                    margin-right: 0.5rem;
                                                "
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
                            v-model="currentPage"
                            v-if="!isPending"
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

<style scoped>
.card {
    width: 19.625rem;
    min-height: 26.875rem;
    position: relative;
    border: 2px solid transparent;
    border-radius: var(--rounded);
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(50, 0, 0, 1) 100%);
    color: #ddd;
    overflow: hidden;
    padding-inline: 0.9375rem;
    padding-top: 0.9375rem;
    background-clip: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card::after {
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

.card .card__image-wrapper {
    border-radius: var(--rounded);
}

.card:hover .card__image {
    transform: scale(1.05);
}

.card__image-wrapper {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    overflow: hidden;
}

.card__image {
    transition: transform 0.15s linear;
    transform: scale(1);
    height: 13.125rem;
}

#black-market {
    min-height: 75rem;
}

:deep(.q-checkbox__bg) {
    background: var(--q-negative-dimmed);
    outline: var(--q-negative);
    border-color: var(--q-negative-dimmed);
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
}

.overlay::before {
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

.debuff {
    transition: filter 0.15s linear;
}
.debuff:hover {
    filter: brightness(120%);
}
</style>

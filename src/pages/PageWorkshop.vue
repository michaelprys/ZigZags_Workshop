<script setup lang="ts">
import { useAddToStash } from 'src/use/useAddToStash';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { usePaginatedGoods } from 'src/use/usePaginatedGoods';

const store = useStoreGoods();
const { totalPages, currentPage, loadPaginatedGoods, imageUrl } =
    usePaginatedGoods(false);
const { addToStash } = useAddToStash();
</script>

<template>
    <q-page>
        <section
            id="workshop"
            style="padding-top: 4.625em; padding-bottom: 8.5em"
        >
            <h1 class="text-center text-h3">Explore goods</h1>
            <div class="column flex-center q-px-md relative-position">
                <ul
                    class="flex q-mt-lg text-subtitle1"
                    style="gap: 2rem; user-select: none"
                >
                    <li><q-checkbox label="All" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Gadgets" size="md"></q-checkbox></li>
                    <li>
                        <q-checkbox label="Trinkets" size="md"></q-checkbox>
                    </li>
                    <li><q-checkbox label="Weapons" size="md"></q-checkbox></li>
                    <li>
                        <q-checkbox label="Companions" size="md"></q-checkbox>
                    </li>
                    <li><q-checkbox label="Mounts" size="md"></q-checkbox></li>
                </ul>

                <ul
                    class="flex flex-center q-gutter-lg q-mt-none q-pl-none"
                    style="max-width: 84.5rem"
                >
                    <li
                        v-for="(good, idx) in store.goods"
                        :key="good.id"
                        style="cursor: pointer"
                    >
                        <q-card class="card" flat dark>
                            <div>
                                <div class="card__image-wrapper">
                                    <q-img
                                        class="card__image"
                                        :src="imageUrl[idx]"
                                        style="height: 210px"
                                    />
                                </div>

                                <q-card-section>
                                    <div class="items-center no-wrap row">
                                        <div
                                            class="col ellipsis text-h6 text-primary"
                                        >
                                            {{ good.name }}
                                        </div>
                                    </div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                    <div
                                        class="flex items-center q-gutter-x-xs text-negative"
                                    >
                                        <span
                                            class="inline-block text-secondary text-subtitle1"
                                            >Price: {{ good.price }} gold</span
                                        >
                                    </div>
                                    <span
                                        class="inline-block text-caption text-grey"
                                    >
                                        {{ good.short_description }}
                                    </span>
                                </q-card-section>

                                <q-separator />
                            </div>

                            <q-card-actions class="flex justify-between">
                                <q-btn flat color="primary" @click="addToStash">
                                    💰 &nbsp; Add to stash
                                </q-btn>
                                <q-btn flat color="info">
                                    <RouterLink
                                        :to="{
                                            name: 'good-details',
                                            params: {
                                                category: good.category,
                                                slug: good.slug,
                                            },
                                        }"
                                        @click="store.selectGood(good)"
                                    >
                                        Details
                                    </RouterLink></q-btn
                                >
                            </q-card-actions>
                        </q-card>
                    </li>
                </ul>

                <div class="flex flex-center q-pa-lg">
                    <q-pagination
                        v-model="currentPage"
                        class="q-mt-md"
                        color="secondary"
                        active-text-color="dark"
                        size="lg"
                        :boundary-numbers="false"
                        :max="totalPages"
                        @update:model-value="loadPaginatedGoods"
                    />
                </div>
            </div></section
    ></q-page>
</template>

<style scoped>
:deep(.q-checkbox__svg),
:deep(.q-checkbox__bg) {
    background: var(--q-secondary-dimmed);
    outline: var(--q-secondary-dimmed);
    border-color: var(--q-secondary-dimmed);
}

.card {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    max-width: 19.625rem;
    min-height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
</style>

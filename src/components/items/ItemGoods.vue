<script setup lang="ts">
import { useAddToStash } from 'src/use/useAddToStash';
import { useStoreGoods } from 'src/stores/useStoreGoods';

const store = useStoreGoods();
const { pending } = store;
const { addToStash } = useAddToStash();

defineProps<{
    categories: string[];
    imageUrl: string[];
    classCard: string;
}>();
</script>

<template>
    <div class="column flex-center q-px-md relative-position">
        <ul class="flex flex-center q-mt-lg text-subtitle1" style="gap: 2rem; user-select: none">
            <li v-for="(category, idx) in categories" :key="idx">
                <q-checkbox :label="category" size="md"></q-checkbox>
            </li>
        </ul>

        <ul class="flex flex-center q-gutter-lg q-mt-none q-pl-none" style="max-width: 84.5rem">
            <li v-for="(good, idx) in store.goods" :key="good.id" style="cursor: pointer">
                <q-card :class="classCard" flat dark>
                    <div>
                        <div class="card__image-wrapper">
                            <q-skeleton
                                v-if="pending"
                                animation="blink"
                                dark
                                square
                                style="width: 100%; height: 13.125rem"
                            />
                            <q-img v-else class="card__image" :src="imageUrl[idx]" />
                        </div>

                        <q-card-section>
                            <div class="items-center no-wrap row">
                                <q-skeleton
                                    v-if="pending"
                                    animation="blink"
                                    dark
                                    style="width: 100%; height: 2rem"
                                />
                                <div class="col ellipsis text-h6 text-primary">
                                    {{ good.name }}
                                </div>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-skeleton
                                v-if="pending"
                                animation="blink"
                                dark
                                style="width: 100%; height: 4.25rem"
                            />
                            <div v-else>
                                <div class="flex items-center" style="gap: 5px">
                                    <span class="text-secondary text-subtitle1"
                                        >Price: {{ good.price }} gold
                                    </span>
                                    <div
                                        v-if="good.debuff"
                                        class="flex items-center text-negative"
                                        style="margin-bottom: 3px"
                                    >
                                        <slot name="debuff"></slot>
                                    </div>
                                </div>
                                <span class="inline-block text-caption text-grey">
                                    {{ good.short_description }}
                                </span>
                            </div>
                        </q-card-section>
                    </div>

                    <q-card-actions class="flex justify-between">
                        <div>
                            <q-skeleton
                                v-if="pending"
                                animation="blink"
                                dark
                                type="QBtn"
                                style="width: 9.3448rem; margin-left: 0.5rem"
                            />
                            <q-btn v-else flat color="primary" @click="addToStash">
                                💰 &nbsp; Add to stash
                            </q-btn>
                        </div>

                        <q-card-actions>
                            <q-skeleton
                                v-if="pending"
                                animation="blink"
                                dark
                                type="QBtn"
                                style="width: 4.6019rem; margin-right: 0.5rem"
                            />
                            <q-btn v-else flat color="info">
                                <RouterLink
                                    :to="{
                                        name: 'good-details',
                                        params: {
                                            category: good?.category,
                                            slug: good?.slug,
                                        },
                                    }"
                                    @click="store.selectGood(good)"
                                >
                                    Details
                                </RouterLink>
                            </q-btn>
                        </q-card-actions>
                    </q-card-actions>
                </q-card>
            </li>
        </ul>

        <slot name="pagination"></slot>
    </div>
</template>

<style scoped>
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
</style>

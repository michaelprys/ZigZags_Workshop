<script setup lang="ts">
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useTransition } from 'src/use/useTransition';

const { transitionName, applyTransition } = useTransition();

const storeGoods = useStoreGoods();
const { pending } = storeGoods;
const { addToStash } = useManageStash();

const props = defineProps<{
    categories: string[];
    resetCategories: () => void;
    classCard: string;
}>();

const emit = defineEmits(['update:selected-categories']);

const updateSelectedCategories = () => {
    const selectedCategories = props.categories.filter((cat) => cat.active).map((cat) => cat.label);

    emit('update:selected-categories', selectedCategories);
};
</script>

<template>
    <div class="column flex-center q-px-md relative-position">
        <div class="flex items-center q-mt-lg" style="gap: 1.6rem">
            <q-btn
                flat
                class="text-primary text-subtitle1"
                color="primary"
                label="All"
                @click="
                    resetCategories();
                    applyTransition('list', 400);
                "
            ></q-btn>
            <ul class="flex flex-center text-subtitle1" style="gap: 2rem; user-select: none">
                <li v-for="(category, idx) in categories" :key="idx">
                    <q-checkbox
                        v-model="category.active"
                        :label="category.label"
                        size="md"
                        left-label
                        @click="
                            updateSelectedCategories();
                            applyTransition('list', 400);
                        "
                    ></q-checkbox>
                </li>
            </ul>
        </div>

        <TransitionGroup
            :name="transitionName"
            tag="ul"
            class="flex flex-center q-gutter-lg q-mt-none q-pl-none"
            style="max-width: 84.5rem"
        >
            <li v-for="good in storeGoods.goods" :key="good.id" style="cursor: pointer">
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
                            <q-img v-else class="card__image" :src="good.image_url" />
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
                            <q-btn v-else flat color="primary" @click="addToStash(good)">
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
                            <q-btn v-else flat color="primary">
                                <RouterLink
                                    :to="{
                                        name: 'good-details',
                                        params: {
                                            category: good?.category,
                                            slug: good?.slug,
                                        },
                                    }"
                                    @click="storeGoods.selectGood(good)"
                                >
                                    Details
                                </RouterLink>
                            </q-btn>
                        </q-card-actions>
                    </q-card-actions>
                </q-card>
            </li>
        </TransitionGroup>

        <div @click="applyTransition('pagination', 150)">
            <slot name="pagination"></slot>
        </div>
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

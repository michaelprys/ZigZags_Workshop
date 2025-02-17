<script setup lang="ts">
import IconDebuff from 'src/components/icons/IconDebuff.vue';
import { useAddToStash } from 'src/use/useAddToStash';
import { usePaginatedGoods } from 'src/use/usePaginatedGoods';
import { useStoreGoods } from 'src/stores/useStoreGoods';

const store = useStoreGoods();
const { totalPages, currentPage, loadPaginatedGoods, imageUrl } = usePaginatedGoods(true);
const { addToStash } = useAddToStash();
</script>

<template>
    <q-page>
        <div class="overlay"></div>

        <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
            <h1 class="text-center text-h3 title">Find treasures</h1>

            <div class="column flex-center q-px-md relative-position">
                <ul class="flex q-mt-lg text-subtitle1" style="gap: 2rem; user-select: none">
                    <li><q-checkbox label="All" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Consumables" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Scrolls" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Weapons" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Companions" size="md"></q-checkbox></li>
                    <li><q-checkbox label="Mounts" size="md"></q-checkbox></li>
                </ul>

                <ul class="flex flex-center q-gutter-lg q-mt-none q-pl-none" style="max-width: 84.5rem">
                    <li v-for="(good, idx) in store.goods" :key="good.id" style="cursor: pointer">
                        <q-card class="card" style="max-width: 19.625rem" flat dark>
                            <div>
                                <div class="card__image-wrapper">
                                    <q-img class="card__image" :src="imageUrl[idx]" />
                                </div>

                                <q-card-section>
                                    <div class="items-center no-wrap row">
                                        <div class="col ellipsis text-h6 text-primary">{{ good.name }}</div>
                                    </div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                    <div class="flex items-center text-subtitle1">
                                        <span class="q-mr-sm text-negative">Price: {{ good.price }} gold</span>

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
                                                            color-mix(in srgb, var(--q-primary) 50%, #ff7f50 90%);
                                                        border-radius: var(--rounded);
                                                        box-shadow:
                                                            0px 3px 8px rgba(0, 0, 0, 0.4),
                                                            2px 5px 12px #ff7f50;
                                                    "
                                                >
                                                    <span class="text-caption" style="color: #ff7f50">Debuff</span>
                                                </q-tooltip>
                                            </IconDebuff>
                                        </div>
                                    </div>
                                    <span class="inline-block text-caption text-grey">
                                        {{ good.short_description }}
                                    </span>
                                </q-card-section>
                            </div>

                            <q-card-actions class="flex justify-between q-pt-none">
                                <q-btn flat color="primary" @click="addToStash">💰 &nbsp; Add to stash </q-btn>
                                <q-btn flat color="info">
                                    <RouterLink :to="{ name: 'black-market-details', params: { id: 1 } }">
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
                        class="pagination q-mt-md"
                        color="negative"
                        active-text-color="primary"
                        size="lg"
                        :boundary-numbers="false"
                        :max="totalPages"
                        @update:model-value="loadPaginatedGoods"
                    />
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped>
.notification {
    background-color: #fff;
}

.title {
    color: #710b03;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
        rgba(10, 0, 0, 0.9) 0%,
        rgba(20, 0, 0, 0.85) 50%,
        rgba(0, 0, 0, 1) 80%
    );
    transform: translateX(-50%) scaleY(1.2);
    filter: blur(50px);
    z-index: -1;
}

:deep(.q-checkbox__bg) {
    background: var(--q-negative-dimmed);
    outline: var(--q-negative);
    border-color: var(--q-negative-dimmed);
}

/* card */

.card {
    position: relative;
    border: 2px solid transparent;
    border-radius: var(--rounded);
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(50, 0, 0, 1) 100%);
    color: #ddd;
    box-shadow:
        inset 0 0 15px rgba(0, 0, 0, 0.8),
        0 0 25px rgba(255, 0, 0, 0.5);
    overflow: hidden;
    padding: 0.9375rem;
    background-clip: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 27.25rem;
}

.card::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 50%;
    z-index: -2;
    opacity: 0.3;
}

.card:hover .card__image {
    transform: scale(1.05);
}

.card__image-wrapper {
    overflow: hidden;
}

.card__image {
    transition: transform 0.15s linear;
    transform: scale(1);
    height: 210px;
}

.debuff {
    transition: filter 0.15s linear;
}
.debuff:hover {
    filter: brightness(120%);
}
</style>

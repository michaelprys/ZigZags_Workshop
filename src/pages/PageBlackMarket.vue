<script setup lang="ts">
import { ref } from 'vue';
import IconDebuff from 'src/components/icons/IconDebuff.vue';
import ItemGoods from 'src/components/items/ItemGoods.vue';
import { useRouter, useRoute } from 'vue-router';
import { usePaginatedGoods } from 'src/use/usePaginatedGoods';

import { useFilters } from 'src/use/useFilters';

const route = useRoute();
const router = useRouter();

const categories = ref([
    { label: 'consumables', active: false },
    { label: 'trinkets', active: false },
    { label: 'weapons', active: false },
    { label: 'companions', active: false },
    { label: 'mounts', active: false },
]);

const { totalPages, currentPage, loadPaginatedGoods } = usePaginatedGoods(true, router);
const { selectCategories, resetCategories } = useFilters(
    categories,
    loadPaginatedGoods,
    route,
    router,
);
</script>

<template>
    <q-page>
        <div class="overlay"></div>

        <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
            <h1 class="text-center text-h3 title">Find treasures</h1>

            <ItemGoods
                :resetCategories="resetCategories"
                :categories="categories"
                :totalPages="totalPages"
                :currentPage="currentPage"
                :requiresAuth="false"
                classCard="card"
                :loadPaginatedGoods="loadPaginatedGoods"
                @update:selected-categories="selectCategories"
            >
                <template #debuff>
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
                </template>

                <template #pagination>
                    <div class="flex flex-center q-pa-lg">
                        <q-pagination
                            v-model="currentPage"
                            class="q-mt-md"
                            color="secondary"
                            active-text-color="dark"
                            size="lg"
                            :boundary-numbers="false"
                            :max="totalPages"
                            @update:model-value="loadPaginatedGoods(categories)"
                        />
                    </div>
                </template>
            </ItemGoods>
        </section>
    </q-page>
</template>

<style scoped>
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
        rgba(10, 0, 0, 0.9) 0%,
        rgba(20, 0, 0, 0.85) 50%,
        rgba(0, 0, 0, 1) 80%
    );
    transform: translateX(-50%) scaleY(1.2);
    filter: blur(50px);
    z-index: -1;
}

:deep(.card) {
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

:deep(.card)::after {
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

.debuff {
    transition: filter 0.15s linear;
}
.debuff:hover {
    filter: brightness(120%);
}
</style>

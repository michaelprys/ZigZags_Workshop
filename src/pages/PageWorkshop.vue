<script setup lang="ts">
import { ref } from 'vue';
import ItemGoods from 'src/components/items/ItemGoods.vue';
import { usePaginatedGoods } from 'src/use/usePaginatedGoods';

const { totalPages, currentPage, loadPaginatedGoods } = usePaginatedGoods(false);

const categories = ref([
    { label: 'gadgets', state: false },
    { label: 'trinkets', state: false },
    { label: 'weapons', state: false },
    { label: 'companions', state: false },
    { label: 'mounts', state: false },
]);
</script>

<template>
    <q-page>
        <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
            <h1 class="text-center text-h3">Explore goods</h1>

            <ItemGoods
                :categories="categories"
                :totalPages="totalPages"
                :currentPage="currentPage"
                :requiresAuth="false"
                classCard="card"
                :loadPaginatedGoods="loadPaginatedGoods"
            >
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
:deep(.q-checkbox__svg),
:deep(.q-checkbox__bg) {
    background: var(--q-secondary-dimmed);
    outline: var(--q-secondary-dimmed);
    border-color: var(--q-secondary-dimmed);
}

:deep(.card) {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    width: 19.625rem;
    min-height: 26.875rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>

<script setup lang="ts">
import { type Category } from 'src/types';

defineProps<{
    categories: Category[];
    resetCategories: () => void;
    updateSelectedCategories: () => void;
}>();
</script>

<template>
    <div class="flex items-center justify-center q-mt-lg" style="gap: 1.6rem">
        <q-btn
            flat
            class="text-primary text-subtitle1"
            color="primary"
            label="All"
            @click="resetCategories"
        ></q-btn>

        <ul class="flex flex-center text-subtitle1" style="gap: 2rem; user-select: none">
            <li v-for="(category, idx) in categories" :key="idx">
                <q-checkbox
                    v-model="category.active"
                    :label="category.label"
                    size="md"
                    left-label
                    @click="updateSelectedCategories"
                ></q-checkbox>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { type Category } from 'src/types';

defineProps<{
    categories: Category[];
    resetCategories: () => void;
    updateSelectedCategories: () => void;
}>();
</script>

<template>
    <div class="wrapper q-mt-lg">
        <ul class="inner text-subtitle1">
            <q-btn
                flat
                class="text-primary text-subtitle1"
                color="primary"
                label="All"
                @click="resetCategories"
            ></q-btn>
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

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    margin-inline: auto;
}
.inner {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    user-select: none;
}

@media (width <= 63.8125rem) {
    .inner {
        grid-template-columns: repeat(3, 1fr);
        place-items: end;
    }
}
@media (width <= 42.8125rem) {
    .inner {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

import { watch } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import type { Category } from 'src/types';

export const useFilters = (categories: Category[], loadPaginatedGoods, route, router) => {
    const store = useStoreGoods();

    const selectCategories = async (selected: string[]) => {
        if (selected.length === 0) {
            await router.push({ query: {} });
            selected = [];
        } else {
            categories.value.forEach((cat) => (cat.active = selected.includes(cat.label)));
            await router.push({ query: { categories: selected.join(',') } });
        }
        await loadPaginatedGoods();
    };

    const resetCategories = async () => {
        categories.value.forEach((cat) => (cat.active = false));
        await selectCategories([]);
    };

    watch(
        () => route.query.categories,
        (newValue) => {
            store.selectedCategories = newValue ? newValue.split(',') : [];
        },
        {
            immediate: true,
        },
    );

    return {
        selectCategories,
        resetCategories,
    };
};

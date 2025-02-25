import { watch, watchEffect } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import type { Category } from 'src/types';

export const useFilters = (
    categories: Category[],
    loadPaginatedGoods,
    route,
    router,
    currentPage,
    totalPages,
) => {
    const storeGoods = useStoreGoods();

    const selectCategories = async (selected: string[]) => {
        if (selected.length === 0) {
            await router.push({ query: { page: 1 } });
            selected = [];
        } else {
            const newPage = Math.min(currentPage.value, totalPages.value || 1);

            await router.push({
                query: {
                    categories: selected.join(','),
                    page: newPage,
                },
            });

            currentPage.value = newPage;
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
            storeGoods.selectedCategories = newValue ? newValue.split(',') : [];
        },
        {
            immediate: true,
        },
    );

    watchEffect(() => {
        categories.value.forEach(
            (cat) => (cat.active = storeGoods.selectedCategories.includes(cat.label)),
        );
    });

    return {
        selectCategories,
        resetCategories,
    };
};

import { useStoreGoods } from 'src/stores/useStoreGoods';
import { watch, watchEffect } from 'vue';

export const useFilters = (categories, loadPaginatedGoods, route, router, currentPage) => {
    const storeGoods = useStoreGoods();

    const selectCategories = async (selected: string[]) => {
        if (selected.length === 0) {
            await router.push({ query: { page: 1 } });
            selected = [];
        } else {
            await router.push({
                query: {
                    categories: selected.join(','),
                    page: currentPage.value,
                },
            });
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

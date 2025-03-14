import { useStoreGoods } from 'src/stores/storeGoods';
import { watch, watchEffect } from 'vue';

export const useFilters = (categories, loadPaginatedGoods, route, router, currentPage) => {
    const storeGoods = useStoreGoods();

    const updateSelectedCategories = async () => {
        let selected = categories.value.filter((cat) => cat.active).map((cat) => cat.label);

        if (route.name === 'workshop') {
            storeGoods.selectedWorkshopCategories = selected;
        } else if (route.name === 'black-market') {
            storeGoods.selectedBlackMarketCategories = selected;
        }

        if (selected.length === 0) {
            await router.push({ query: { page: 1 } });
            selected = [];
        } else {
            await router.push({
                query: {
                    categories: selected.join(','),
                    page: currentPage.value
                }
            });
        }

        await loadPaginatedGoods();
    };

    const resetCategories = async () => {
        categories.value.forEach((cat) => (cat.active = false));
        await router.replace({ query: { page: 1 } });
        await updateSelectedCategories();
    };

    watch(
        () => route.query.categories,
        async (newCategories) => {
            if (route.name === 'workshop') {
                storeGoods.selectedWorkshopCategories = newCategories
                    ? newCategories.split(',')
                    : [];
            }
            if (route.name === 'black-market') {
                storeGoods.selectedBlackMarketCategories = newCategories
                    ? newCategories.split(',')
                    : [];
            }

            if (!newCategories || newCategories.length === 0) {
                categories.value.forEach((cat) => (cat.active = false));
            }

            await loadPaginatedGoods();
        }
    );

    watchEffect(() => {
        categories.value.forEach((cat) => {
            if (route.name === 'workshop') {
                cat.active = storeGoods.selectedWorkshopCategories.includes(cat.label);
            } else if (route.name === 'black-market') {
                cat.active = storeGoods.selectedBlackMarketCategories.includes(cat.label);
            }
        });
    });

    return {
        updateSelectedCategories,
        resetCategories
    };
};

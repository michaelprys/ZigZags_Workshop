import { useStoreInventory } from 'src/stores/storeInventory';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePaginatedInventoryGoods = () => {
    const storeInventory = useStoreInventory();
    const route = useRoute();
    const router = useRouter();

    const currentPage = ref(parseInt(route.query.page) || 1);
    const inventoryGoodsPerPage = 55;

    const loadPaginatedInventoryGoods = async () => {
        await nextTick();

        if (currentPage.value > storeInventory.totalInventoryPages) {
            await router.replace({ query: { ...route.query, page: 1 } });
        }

        await storeInventory.loadInventoryGoods(currentPage.value, inventoryGoodsPerPage);
    };

    watch(
        () => route.query.page,
        async (newPage) => {
            const page = parseInt(newPage) || 1;

            if (page !== currentPage.value) {
                currentPage.value = page;
                await loadPaginatedInventoryGoods();
            }
        }
    );

    watch(currentPage, async (newPage) => {
        if (newPage !== parseInt(route.query.page)) {
            await router.push({ query: { ...route.query, page: newPage } });
        }
    });

    onMounted(async () => {
        await storeInventory.loadInventoryGoods(currentPage.value, inventoryGoodsPerPage);
    });

    return {
        currentPage,
        inventoryGoodsPerPage,
        loadPaginatedInventoryGoods
    };
};

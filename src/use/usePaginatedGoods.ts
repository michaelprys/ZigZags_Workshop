import { useStoreGoods } from 'src/stores/useStoreGoods';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePaginatedGoods = (requiresAccess: boolean) => {
    const storeGoods = useStoreGoods();
    const route = useRoute();
    const router = useRouter();

    const currentPage = ref(parseInt(route.query.page) || 1);
    const goodsPerPage = 8;

    const loadPaginatedGoods = async () => {
        await storeGoods.loadGoods(currentPage.value, goodsPerPage, requiresAccess);

        if (currentPage.value > storeGoods.totalPages) {
            await router.replace({ query: { ...route.query, page: 1 } });
        }
    };

    watch(
        () => route.query.page,
        async (newPage) => {
            const page = parseInt(newPage) || 1;

            if (page !== currentPage.value) {
                currentPage.value = page;
                await loadPaginatedGoods();
            }
        },
    );

    watch(currentPage, async (newPage) => {
        if (newPage !== parseInt(route.query.page)) {
            await router.push({ query: { ...route.query, page: newPage } });
        }
    });

    onMounted(async () => {
        await loadPaginatedGoods();
    });

    return {
        currentPage,
        loadPaginatedGoods,
    };
};

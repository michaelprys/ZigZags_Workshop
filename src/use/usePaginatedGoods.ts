import { useQuery } from '@pinia/colada';
import { useStoreGoods } from 'src/stores/storeGoods';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePaginatedGoods = (requiresAccess: boolean) => {
    const storeGoods = useStoreGoods();
    const route = useRoute();
    const router = useRouter();

    const pageStr = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page;
    const currentPage = ref(parseInt(pageStr ?? '1') || 1);
    const goodsPerPage = 8;

    const { data: queryData, isPending } = useQuery({
        key: () => [
            'paginatedGoods',
            Array.isArray(route.query.categories)
                ? route.query.categories.join(',')
                : String(route.query.categories ?? ''),
            String(route.query.page ?? '1'),
            requiresAccess.toString()
        ],

        query: () => storeGoods.loadGoods(currentPage.value, goodsPerPage, requiresAccess),
        staleTime: 1000 * 60 * 5
    });

    const loadPaginatedGoods = async () => {
        await nextTick();

        if (currentPage.value > storeGoods.totalPages) {
            await router.replace({ query: { ...route.query, page: 1 } });
        }
    };

    watch(
        () => route.query.page,
        async (newPage) => {
            const pageStr = Array.isArray(newPage) ? newPage[0] : newPage;
            const page = parseInt(pageStr ?? '') || 1;

            if (page !== currentPage.value) {
                currentPage.value = page;
                await loadPaginatedGoods();
            }
        }
    );

    watch(currentPage, async (newPage) => {
        const pageStr = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page;
        if (newPage !== parseInt(pageStr ?? '')) {
            await router.push({ query: { ...route.query, page: newPage } });
        }
    });

    onMounted(async () => {
        await loadPaginatedGoods();
    });

    return {
        currentPage,
        queryData,
        isPending,
        loadPaginatedGoods
    };
};

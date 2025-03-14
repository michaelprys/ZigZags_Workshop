import { useQuery } from '@pinia/colada';
import { useStoreGoods } from 'src/stores/storeGoods';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePaginatedGoods = (requiresAccess: boolean) => {
    const storeGoods = useStoreGoods();
    const route = useRoute();
    const router = useRouter();

    const currentPage = ref(parseInt(route.query.page) || 1);
    const goodsPerPage = 8;

    const { data: queryData, isPending } = useQuery({
        key: () => ['paginatedGoods', route.query.categories, route.query.page, requiresAccess],
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
            const page = parseInt(newPage) || 1;

            if (page !== currentPage.value) {
                currentPage.value = page;
                console.log('Page changed:', newPage);
                await loadPaginatedGoods();
            }
        }
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
        queryData,
        isPending,
        loadPaginatedGoods
    };
};

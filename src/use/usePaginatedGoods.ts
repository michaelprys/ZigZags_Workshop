import { ref, computed, watch, onMounted } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useRoute, useRouter } from 'vue-router';

export const usePaginatedGoods = (requiresAccess: boolean) => {
    const storeGoods = useStoreGoods();
    const route = useRoute();
    const router = useRouter();

    const goodsPerPage = 8;

    const currentPage = ref(parseInt(route.query.page) || 1);

    const totalPages = computed(() => {
        return Math.ceil(storeGoods.totalGoods / goodsPerPage);
    });

    const loadPaginatedGoods = async () => {
        if (currentPage.value > totalPages.value) {
            currentPage.value = 1;
            await router.replace({ query: { ...route.query, page: 1 } });
        }

        const start = (currentPage.value - 1) * goodsPerPage;
        const end = start + goodsPerPage - 1;

        if (start < 0 || currentPage.value > totalPages.value) {
            currentPage.value = 1;
        }

        await router.push({ query: { ...route.query, page: currentPage.value } });

        await storeGoods.loadGoods(start, end, requiresAccess);
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
        { immediate: true },
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
        totalPages,
        loadPaginatedGoods,
    };
};

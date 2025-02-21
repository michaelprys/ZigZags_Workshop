import { ref, computed, onMounted } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import type { Category } from 'src/types';

export const usePaginatedGoods = (requiresAuth: boolean) => {
    const store = useStoreGoods();

    const currentPage = ref(1);
    const goodsPerPage = 8;

    const totalPages = computed(() => {
        return Math.ceil(store.totalGoods / goodsPerPage);
    });

    const loadPaginatedGoods = async (categories: Category[] = []) => {
        const selectedCategories = categories.filter((c) => c.state).map((c) => c.label);

        const start = (currentPage.value - 1) * goodsPerPage;
        const end = start + goodsPerPage - 1;
        await store.loadGoods(start, end, requiresAuth, selectedCategories);
    };

    onMounted(async () => {
        await loadPaginatedGoods();
    });

    return {
        totalPages,
        currentPage,
        loadPaginatedGoods,
    };
};

import { ref, computed, onMounted } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';

export const usePaginatedGoods = (requiresAuth: boolean) => {
    const store = useStoreGoods();

    const currentPage = ref(1);
    const goodsPerPage = 8;

    const totalPages = computed(() => {
        return Math.ceil(store.totalGoods / goodsPerPage);
    });

    const loadPaginatedGoods = async () => {
        const start = (currentPage.value - 1) * goodsPerPage;
        const end = start + goodsPerPage - 1;
        await store.loadGoods(start, end, requiresAuth);
    };

    const imageUrl = computed(() => {
        return store.goods.map((good) => new URL(good.image_url, import.meta.url).href);
    });

    onMounted(async () => {
        await loadPaginatedGoods();
    });

    return {
        totalPages,
        currentPage,
        loadPaginatedGoods,
        imageUrl,
    };
};

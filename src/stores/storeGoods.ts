import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/storeAuth';
import supabase from 'src/utils/supabase';
import { computed, ref } from 'vue';

export type Good = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    short_description: string;
    description: string;
    source: string;
    image_url: string;
    requires_access: boolean;
    debuff?: string;
    quantity?: number;
};

export const useStoreGoods = defineStore(
    'goods',
    () => {
        const pending = ref(false);
        const totalGoods = ref(0);
        const selectedGood = ref<Good | null>(null);
        const selectedWorkshopCategories = ref<string[]>([]);
        const selectedBlackMarketCategories = ref<string[]>([]);
        const stashGoods = ref<Good[]>([]);

        const totalPages = computed(() => Math.ceil(totalGoods.value / 8));

        const loadGoods = async (
            currentPage: number,
            goodsPerPage: number,
            requiresAccess: boolean
        ) => {
            pending.value = true;

            try {
                let countQuery = supabase
                    .from('goods')
                    .select('*', { count: 'exact' })
                    .eq('requires_access', requiresAccess);

                if (selectedWorkshopCategories.value?.length > 0) {
                    countQuery = countQuery.in('category', selectedWorkshopCategories.value);
                }
                if (selectedBlackMarketCategories.value?.length > 0) {
                    countQuery = countQuery.in('category', selectedBlackMarketCategories.value);
                }

                const { count } = await countQuery;

                totalGoods.value = count;

                if (currentPage > totalPages.value) {
                    currentPage = 1;
                }

                const start = (currentPage - 1) * goodsPerPage;
                const end = Math.min(start + goodsPerPage - 1, count - 1);

                let query = supabase
                    .from('goods')
                    .select('*', { count: 'exact' })
                    .eq('requires_access', requiresAccess)
                    .range(start, end)
                    .order('id');

                if (selectedWorkshopCategories.value?.length > 0) {
                    query = query.in('category', selectedWorkshopCategories.value);
                }
                if (selectedBlackMarketCategories.value?.length > 0) {
                    query = query.in('category', selectedBlackMarketCategories.value);
                }

                const { data, error } = await query;

                if (error) {
                    throw new Error(error.message);
                }

                return data || [];
            } catch (error) {
                console.error(error);
            } finally {
                pending.value = false;
            }
        };

        const loadSuggestedGoods = async () => {
            pending.value = true;

            try {
                const storeAuth = useStoreAuth();

                const query = supabase.from('goods').select('*').order('id');

                let filteredData = [];

                if (!storeAuth.session) {
                    filteredData = await query.eq('requires_access', false);
                } else {
                    filteredData = await query;
                }

                const { data, error } = filteredData;

                if (error) {
                    throw new Error(error.message);
                }

                return data;
            } catch (error) {
                console.error(error);
            } finally {
                pending.value = false;
            }
        };

        const loadFeaturedGoods = async () => {
            try {
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { data, error } = await supabase
                    .from('goods')
                    .select('id, name, image_url')
                    .eq('is_featured', true);

                if (error) {
                    throw new Error(error.message);
                }

                return data;
            } catch (error) {
                console.error(error);
            }
        };

        const selectGood = (good: Good) => {
            selectedGood.value = good;
        };

        return {
            pending,
            totalGoods,
            selectedGood,
            selectedWorkshopCategories,
            selectedBlackMarketCategories,
            stashGoods,
            totalPages,
            loadGoods,
            loadSuggestedGoods,
            loadFeaturedGoods,
            selectGood
        };
    },
    {
        persist: {
            storage: sessionStorage,
            pick: [
                'selectedGood',
                'selectedWorkshopCategories',
                'selectedBlackMarketCategories',
                'stashGoods',
                'purchaseSuccessful'
            ]
        }
    }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGoods, import.meta.hot));
}

import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import supabase from 'src/utils/supabase';

interface Good {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    short_description: string;
    description: string;
    source: string;
    image_url: string;
    requires_auth: boolean;
}

export const useStoreGoods = defineStore('goods', {
    state: () => ({
        goods: [] as Good[],
        suggestedGoods: [] as Good[],
        totalGoods: 0,
        selectedGood: null as Good | null,
    }),

    persist: {
        pick: ['selectedGood'],
    },

    actions: {
        async loadGoods(start: number, end: number, requiresAuth: boolean) {
            const { data, error, count } = await supabase
                .from('goods')
                .select('*', { count: 'exact' })
                .range(start, end)
                .filter('requires_auth', 'eq', requiresAuth)
                .order('id');

            if (error) {
                console.error(error);
            } else {
                this.goods = data;
                this.totalGoods = count;
            }
        },

        async loadSuggestedGoods() {
            const storeAuth = useStoreAuth();

            const query = supabase.from('goods').select('*').order('id');

            let filteredData = [];

            if (!storeAuth.session) {
                filteredData = await query.eq('requires_auth', false);
            } else {
                filteredData = await query;
            }

            const { data, error } = filteredData;

            if (error) {
                console.error(error);
            } else {
                this.suggestedGoods = data;
            }
        },

        selectGood(good: Good) {
            this.selectedGood = good;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGoods, import.meta.hot));
}

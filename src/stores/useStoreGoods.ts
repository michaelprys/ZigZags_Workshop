import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import supabase from 'src/utils/supabase';
import { delay } from 'src/utils/delay';

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
    debuff?: string;
}

type FeaturedGood = {
    name: string;
    image_url: string;
};

export const useStoreGoods = defineStore('goods', {
    state: () => ({
        goods: [] as Good[],
        suggestedGoods: [] as Good[],
        totalGoods: 0,
        selectedGood: null as Good | null,
        featuredGoods: [] as FeaturedGood[],
        pending: false,
    }),

    persist: {
        pick: ['selectedGood'],
    },

    actions: {
        async loadGoods(start: number, end: number, requiresAuth: boolean) {
            this.pending = true;

            try {
                // await delay(2500);

                const { data, error, count } = await supabase
                    .from('goods')
                    .select('*', { count: 'exact' })
                    .range(start, end)
                    .eq('requires_auth', requiresAuth)
                    .order('id');

                if (error) {
                    throw new Error(error.message);
                }

                this.goods = data;
                this.totalGoods = count;
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async loadSuggestedGoods() {
            this.pending = true;

            try {
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
                    throw new Error(error.message);
                } else {
                    this.suggestedGoods = data;
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async loadFeaturedGoods() {
            this.pending = true;

            try {
                const { data, error } = await supabase
                    .from('goods')
                    .select('name, image_url')
                    .filter('is_featured', 'eq', true);

                if (error) {
                    throw new Error(error.message);
                } else {
                    this.featuredGoods = data;
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
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

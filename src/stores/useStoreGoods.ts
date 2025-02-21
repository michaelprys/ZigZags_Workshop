import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import supabase from 'src/utils/supabase';
import type { Category } from 'src/types';

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
        pending: false,
        totalGoods: 0,
        goods: [] as Good[],
        selectedGood: null as Good | null,
        featuredGoods: [] as FeaturedGood[],
        suggestedGoods: [] as Good[],
    }),

    persist: {
        pick: ['selectedGood'],
    },

    actions: {
        async loadGoods(
            start: number,
            end: number,
            requiresAuth: boolean,
            selectedCategories?: Category[],
        ) {
            this.pending = true;

            try {
                let query = supabase
                    .from('goods')
                    .select('*', { count: 'exact' })
                    .eq('requires_auth', requiresAuth)
                    .range(start, end)
                    .order('id');

                if (selectedCategories.length > 0) {
                    query = query.in('category', selectedCategories);
                }

                const { data, error, count } = await query;

                if (error) {
                    throw new Error(error.message);
                } else {
                    this.goods = data;
                    this.totalGoods = count;
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
                    .eq('is_featured', true);

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
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGoods, import.meta.hot));
}

import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreBalance } from 'src/stores/useStoreBalance';
import supabase from 'src/utils/supabase';

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

type FeaturedGood = {
    name: string;
    image_url: string;
};

export const useStoreGoods = defineStore('goods', {
    state: () => ({
        pending: false,
        goods: [] as Good[],
        totalGoods: 0,
        totalPages: 0,
        featuredGoods: [] as FeaturedGood[],
        suggestedGoods: [] as Good[],
        selectedGood: null as Good | null,
        selectedCategories: [] as string[],
        stashGoods: [] as Good[],
        inventoryGoods: [],
    }),

    persist: {
        storage: sessionStorage,
        pick: ['selectedGood', 'selectedCategories', 'stashGoods', 'purchaseSuccessful'],
    },

    getters: {
        totalPages: (state) => Math.ceil(state.totalGoods / 8),
    },

    actions: {
        async loadGoods(currentPage: number, goodsPerPage: number, requiresAccess: boolean) {
            this.pending = true;

            try {
                let countQuery = supabase
                    .from('goods')
                    .select('*', { count: 'exact' })
                    .eq('requires_access', requiresAccess);

                if (this.selectedCategories?.length > 0) {
                    countQuery = countQuery.in('category', this.selectedCategories);
                }

                const { count } = await countQuery;

                this.totalGoods = count;

                if (currentPage > this.totalPages) {
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

                if (this.selectedCategories?.length > 0) {
                    query = query.in('category', this.selectedCategories);
                }

                const { data, error } = await query;
                if (error) {
                    throw new Error(error.message);
                }
                this.goods = data || [];
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
                    filteredData = await query.eq('requires_access', false);
                } else {
                    filteredData = await query;
                }

                const { data, error } = filteredData;

                if (error) {
                    throw new Error(error.message);
                }
                this.suggestedGoods = data;
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async loadFeaturedGoods() {
            this.pending = true;

            try {
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { data, error } = await supabase
                    .from('goods')
                    .select('name, image_url')
                    .eq('is_featured', true);

                if (error) {
                    throw new Error(error.message);
                }
                this.featuredGoods = data;
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async savePurchasedGoods() {
            this.pending = true;

            try {
                const storeBalance = useStoreBalance();
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                if (storeBalance.purchaseStatus === 'purchased') {
                    const goodsToInsert = this.stashGoods.map((good) => ({
                        good_id: good.id,
                        user_id: storeAuth.session?.id,
                        quantity: good.quantity || 1,
                        status: 'purchased',
                    }));

                    const { error } = await supabase.from('user_goods').upsert(goodsToInsert);

                    if (error) {
                        throw new Error(error.message);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async loadGoodsToInventory() {
            this.pending = true;

            try {
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { data, error } = await supabase
                    .from('user_goods')
                    .select(
                        `
                        good_id, quantity,
                        goods (id, name, image_url, price, short_description, category)`,
                    )
                    .eq('user_id', storeAuth.session?.id);

                if (error) {
                    throw new Error(error.message);
                }

                this.inventoryGoods = data || [];

                if (error) {
                    throw new Error(error.message);
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async removeGoodFromInventory(selectedGood) {
            this.pending = true;

            try {
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { data, error } = await supabase
                    .from('user_goods')
                    .delete()
                    .eq('user_id', storeAuth.session?.id)
                    .eq('good_id', selectedGood);

                if (error) {
                    throw new Error(error.message);
                }

                this.inventoryGoods[selectedGood] = null;
                await this.loadGoodsToInventory();
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

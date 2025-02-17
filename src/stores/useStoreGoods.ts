import { defineStore, acceptHMRUpdate } from 'pinia';
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
        goods: [] as Good,
        totalGoods: 0,
    }),

    actions: {
        async loadGoods(this: void, start: number, end: number, requiresAuth: boolean) {
            const { data, error, count } = await supabase
                .from('goods')
                .select('*', { count: 'exact' })
                .range(start, end)
                .filter('requires_auth', 'eq', requiresAuth)
                .order('id');

            if (error) {
                console.log(error);
            } else {
                this.goods = data;
                this.totalGoods = count;
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGoods, import.meta.hot));
}

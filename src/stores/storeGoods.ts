import { acceptHMRUpdate, defineStore } from 'pinia';
import { Notify } from 'quasar';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreInventory } from 'src/stores/storeInventory';
import { default as supabase } from 'src/utils/supabase';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

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

        const router = useRouter();

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

                totalGoods.value = count ?? 0;

                if (currentPage > totalPages.value) {
                    currentPage = 1;
                }

                const start = (currentPage - 1) * goodsPerPage;
                const end = Math.min(start + goodsPerPage - 1, (count ?? 0) - 1);

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
            } catch (err) {
                console.error(err);
            } finally {
                pending.value = false;
            }
        };

        const loadSuggestedGoods = async () => {
            pending.value = true;

            try {
                const storeAuth = useStoreAuth();

                const query = supabase.from('goods').select('*').order('id');

                let data, error;

                if (!storeAuth.session) {
                    ({ data, error } = await query.eq('requires_access', false));
                } else {
                    ({ data, error } = await query);
                }

                if (error) {
                    throw new Error(error.message);
                }

                return data;
            } catch (err) {
                console.error(err);
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
            } catch (err) {
                console.error(err);
            }
        };

        const purchaseInvitation = async () => {
            pending.value = true;

            try {
                const storeBalance = useStoreBalance();
                const storeInventory = useStoreInventory();
                const storeAuth = useStoreAuth();

                if (!storeAuth.session) await storeAuth.checkSession();

                const { data: invitationInGoods, error: invitationInGoodsError } = await supabase
                    .from('goods')
                    .select('id, name, image_url, short_description, price, category')
                    .eq('slug', 'invitation')
                    .single();

                if (invitationInGoodsError) throw new Error(invitationInGoodsError.message);

                const { data: existingInvitation, error: existingInvitationError } = await supabase
                    .from('user_goods')
                    .select('good_id')
                    .eq('user_id', storeAuth.session?.id)
                    .eq('good_id', invitationInGoods.id)
                    .maybeSingle();

                if (existingInvitationError) throw new Error(existingInvitationError.message);

                if (existingInvitation) {
                    Notify.create({
                        type: 'negative',
                        textColor: 'primary',
                        message: 'You already got the invite!',
                        position: 'bottom',
                        classes: 'toast',
                        actions: [{ icon: 'close', color: 'primary', dense: true, size: 'xs' }]
                    });
                    return;
                }

                const { data: userBalance, error: userBalanceError } = await supabase
                    .from('user_balances')
                    .select('gold')
                    .eq('user_id', storeAuth.session?.id)
                    .single();

                if (userBalanceError) throw new Error(userBalanceError.message);

                if (userBalance.gold < 20000) {
                    Notify.create({
                        type: 'negative',
                        textColor: 'primary',
                        message: 'Not enough gold! Top up balance',
                        position: 'bottom',
                        classes: 'toast',
                        actions: [{ icon: 'close', color: 'primary', dense: true, size: 'xs' }]
                    });
                    return;
                }

                await storeBalance.updateBalance('gold', 20000);

                const { error: insertError } = await supabase.from('user_goods').insert([
                    {
                        user_id: storeAuth.session?.id,
                        good_id: invitationInGoods.id,
                        quantity: 1,
                        status: 'purchased'
                    }
                ]);

                if (insertError) throw new Error(insertError.message);

                storeInventory.inventoryGoods.push({
                    good_id: invitationInGoods.id,
                    user_id: Number(storeAuth.session!.id),
                    status: 'purchased',
                    quantity: 1,
                    goods: [invitationInGoods]
                });

                sessionStorage.setItem('purchaseCompleted', 'true');

                await router.push('purchase-success');

                storeBalance.purchaseStatus = '';

                Notify.create({
                    type: 'positive',
                    textColor: 'dark',
                    message: "You got the invite! Now, don't get caught!",
                    position: 'bottom-right',
                    classes: 'toast',
                    actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }]
                });
            } catch (err) {
                console.error(err);
            } finally {
                pending.value = false;
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
            selectGood,
            purchaseInvitation
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

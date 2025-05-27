import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreGoods } from 'src/stores/storeGoods';
import supabase from 'src/utils/supabase';
import { computed, ref } from 'vue';

export type InventoryGood = {
    good_id: number;
    user_id: number;
    status?: string;
    quantity?: number;
    slot?: number;
};

type InventoryGoodWithGoods = InventoryGood & {
    goods: {
        id: number;
        name: string;
        image_url: string;
        price: number;
        short_description: string;
        category: string;
    }[];
};

export const useStoreInventory = defineStore('inventory', () => {
    const pending = ref(false);
    const totalInventoryGoods = ref(0);
    const inventoryGoods = ref<InventoryGoodWithGoods[]>([]);
    const invitation = ref<any>(null);

    const totalInventoryPages = computed(() => Math.ceil(totalInventoryGoods.value / 55));

    const saveGoodsToInventory = async () => {
        console.log('Calling saveGoodsToInventory...');

        pending.value = true;

        try {
            const storeGoods = useStoreGoods();
            const storeBalance = useStoreBalance();
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            const userId = storeAuth.session?.id;

            if (!userId) {
                throw new Error('User ID is missing from session');
            }

            console.log('User ID:', userId);
            console.log('stashGoods:', storeGoods.stashGoods);

            if (storeBalance.purchaseStatus === 'purchased') {
                console.log('stashGoods:', storeGoods.stashGoods);
                const goodsToInsert = storeGoods.stashGoods.map((good) => ({
                    good_id: good.id,
                    user_id: userId,
                    quantity: good.quantity,
                    status: 'purchased'
                }));

                const { data, error } = await supabase.rpc('update_goods', {
                    goods: goodsToInsert
                });

                if (error) {
                    console.error('update_goods RPC error:', error);
                    throw new Error(error.message);
                }

                inventoryGoods.value = data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const loadInventoryGoods = async (currentPage: number, inventoryGoodsPerPage: number) => {
        pending.value = true;

        try {
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            const countQuery = supabase
                .from('user_goods')
                .select(`good_id, goods (id)`, { count: 'exact' })
                .eq('user_id', storeAuth.session!.id);

            const { count } = await countQuery;

            totalInventoryGoods.value = count ?? 0;

            if (currentPage > totalInventoryPages.value) {
                currentPage = 1;
            }

            const start = (currentPage - 1) * inventoryGoodsPerPage;
            const end = Math.min(start + inventoryGoodsPerPage - 1, (count ?? 1) - 1);

            const query = supabase
                .from('user_goods')
                .select(
                    `good_id, user_id, quantity, slot,
                    goods (id, name, image_url, price, short_description, category)`,
                    { count: 'exact' }
                )
                .eq('user_id', storeAuth.session!.id)
                .range(start, end)
                .order('good_id');

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            inventoryGoods.value = data ?? [];
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const removeGoodFromInventory = async (selectedGood: number) => {
        pending.value = true;

        try {
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            const { error } = await supabase
                .from('user_goods')
                .delete()
                .eq('user_id', storeAuth.session!.id)
                .eq('good_id', selectedGood);

            if (error) {
                throw new Error(error.message);
            }

            inventoryGoods.value.splice(
                inventoryGoods.value.findIndex((g) => g.good_id === selectedGood),
                1
            );

            await loadInventoryGoods(1, 55);
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const updateGoodSlot = async (goodId: number, nextSlot: number) => {
        pending.value = true;

        try {
            const { data: currentSlot, error: currentSlotError } = await supabase
                .from('user_goods')
                .select('slot')
                .eq('good_id', goodId);

            if (currentSlotError) {
                throw new Error(`currentSlotError: ${currentSlotError.message}`);
            }

            const prevSlot = currentSlot?.[0]?.slot ?? 0;

            const { data: nextGoods, error: nextGoodError } = await supabase
                .from('user_goods')
                .select('good_id')
                .eq('slot', nextSlot);

            if (nextGoodError) {
                throw new Error(`nextGoodError: ${nextGoodError.message}`);
            }

            if (nextGoods && nextGoods.length > 0) {
                const nextGoodId = nextGoods[0]?.good_id;
                if (nextGoodId === undefined) {
                    throw new Error('nextGoodId is undefined');
                }

                const { error: updateNextGoodError } = await supabase
                    .from('user_goods')
                    .update({ slot: prevSlot })
                    .eq('good_id', nextGoodId);

                if (updateNextGoodError) {
                    throw new Error(`updateNextGoodError: ${updateNextGoodError.message}`);
                }
            }

            const { error: updateCurrentGoodError } = await supabase
                .from('user_goods')
                .update({ slot: nextSlot })
                .eq('good_id', goodId);

            if (updateCurrentGoodError) {
                throw new Error(`updateCurrentGoodError: ${updateCurrentGoodError.message}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const checkInvitation = async () => {
        pending.value = true;

        try {
            const storeAuth = useStoreAuth();
            if (!storeAuth.session) await storeAuth.checkSession();

            const { data, error } = await supabase
                .from('user_goods')
                .select('goods!inner(slug)')
                .eq('user_id', storeAuth.session!.id)
                .eq('goods.slug', 'invitation');

            if (error || !data?.length) {
                console.error('No invitation found', error?.message);
                invitation.value = null;
                return;
            }

            invitation.value = data;
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    return {
        pending,
        inventoryGoods,
        totalInventoryGoods,
        totalInventoryPages,
        saveGoodsToInventory,
        loadInventoryGoods,
        removeGoodFromInventory,
        updateGoodSlot,
        checkInvitation,
        invitation
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreInventory, import.meta.hot));
}

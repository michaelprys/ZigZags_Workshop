import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreGoods } from 'src/stores/storeGoods';
import supabase from 'src/utils/supabase';
import { computed, ref } from 'vue';

export const useStoreInventory = defineStore('inventory', () => {
    const pending = ref(false),
        totalInventoryGoods = ref(0),
        inventoryGoods = ref([]),
        invitation = ref(null);

    const totalInventoryPages = computed(() => Math.ceil(totalInventoryGoods.value / 55));

    const saveGoodsToInventory = async () => {
        pending.value = true;

        try {
            const storeGoods = useStoreGoods();
            const storeBalance = useStoreBalance();
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            if (storeBalance.purchaseStatus === 'purchased') {
                const goodsToInsert = storeGoods.stashGoods.map((good) => ({
                    good_id: good.id,
                    user_id: storeAuth.session?.id,
                    quantity: good.quantity,
                    status: 'purchased'
                }));

                const { data, error } = await supabase.rpc('update_goods', {
                    goods: goodsToInsert
                });

                if (error) {
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
                .select(
                    `good_id,
                        goods (id)`,
                    { count: 'exact' }
                )
                .eq('user_id', storeAuth.session?.id);

            const { count } = await countQuery;

            totalInventoryGoods.value = count;

            if (currentPage > totalInventoryPages.value) {
                currentPage = 1;
            }

            const start = (currentPage - 1) * inventoryGoodsPerPage;
            const end = Math.min(start + inventoryGoodsPerPage - 1, count - 1);

            const query = supabase
                .from('user_goods')
                .select(
                    `good_id, quantity, slot,
                        goods (id, name, image_url, price, short_description, category)`,
                    { count: 'exact' }
                )
                .eq('user_id', storeAuth.session?.id)
                .range(start, end)
                .order('good_id');

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            inventoryGoods.value = data || [];
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const removeGoodFromInventory = async (selectedGood) => {
        pending.value = true;

        try {
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            const { error } = await supabase
                .from('user_goods')
                .delete()
                .eq('user_id', storeAuth.session?.id)
                .eq('good_id', selectedGood);

            if (error) {
                throw new Error(error.message);
            }

            inventoryGoods.value[selectedGood] = null;
            await loadInventoryGoods(1, 55);
        } catch (err) {
            console.error(err);
        } finally {
            pending.value = false;
        }
    };

    const updateGoodSlot = async (goodId, nextSlot) => {
        pending.value = true;

        try {
            const { data: currentSlot, error: currentSlotError } = await supabase
                .from('user_goods')
                .select('slot')
                .eq('good_id', goodId);

            if (currentSlotError) {
                throw new Error('currentSlotError: ', currentSlotError.message);
            }

            const prevSlot = currentSlot.slot;

            const { data: nextGood, error: nextGoodError } = await supabase
                .from('user_goods')
                .select('good_id')
                .eq('slot', nextSlot);

            if (nextGoodError) {
                throw new Error('nextGoodError: ', nextGoodError.message);
            }

            if (nextGood) {
                const { error: updateNextGoodError } = await supabase
                    .from('user_goods')
                    .update({ slot: prevSlot })
                    .eq('good_id', nextGood.good_id);

                if (updateNextGoodError) {
                    throw new Error('updateNextGoodError: ', updateNextGoodError.message);
                }
            }

            const { error: updateCurrentGoodError } = await supabase
                .from('user_goods')
                .update({ slot: nextSlot })
                .eq('good_id', goodId);

            if (updateCurrentGoodError) {
                throw new Error('updateCurrentGoodError: ', updateCurrentGoodError.message);
            }
        } catch (err) {
            pending.value = false;
            console.error(err);
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
                .eq('user_id', storeAuth.session?.id)
                .eq('goods.slug', 'invitation');

            if (error) {
                console.error('No invitation found', error.message);
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

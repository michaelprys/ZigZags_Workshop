import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreGoods } from 'src/stores/storeGoods';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

export const useStoreInventory = defineStore('inventory', () => {
    const pending = ref(false),
        inventoryGoods = ref([]);

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
        } catch (error) {
            console.error(error);
        } finally {
            pending.value = false;
        }
    };

    const loadInventoryGoods = async () => {
        pending.value = true;

        try {
            const storeAuth = useStoreAuth();

            if (!storeAuth.session) {
                await storeAuth.checkSession();
            }

            const { data, error } = await supabase
                .from('user_goods')
                .select(
                    `
                        good_id, quantity, slot,
                        goods (id, name, image_url, price, short_description, category)`
                )
                .eq('user_id', storeAuth.session?.id)
                .order('slot', { ascending: true });

            if (error) {
                throw new Error(error.message);
            }

            inventoryGoods.value = data || [];
        } catch (error) {
            console.error(error);
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
            await loadInventoryGoods();
        } catch (error) {
            console.error(error);
        } finally {
            pending.value = false;
        }
    };

    const updateGoodSlot = async (goodId, nextSlot) => {
        pending.value = true;

        try {
            // get current good's slot
            const { data: currentSlot, error: currentSlotError } = await supabase
                .from('user_goods')
                .select('slot')
                .eq('good_id', goodId);

            if (currentSlotError) {
                throw new Error('currentSlotError: ', currentSlotError.message);
            }

            // record current good's slot as the previous slot
            const prevSlot = currentSlot.slot;

            // check if any good exist in the next slot
            const { data: nextGood, error: nextGoodError } = await supabase
                .from('user_goods')
                .select('good_id')
                .eq('slot', nextSlot);

            if (nextGoodError) {
                throw new Error('nextGoodError: ', nextGoodError.message);
            }

            // if good exists in the next slot, then put it in the slot of a current good
            if (nextGood) {
                const { error: updateNextGoodError } = await supabase
                    .from('user_goods')
                    .update({ slot: prevSlot })
                    .eq('good_id', nextGood.good_id);

                if (updateNextGoodError) {
                    throw new Error('updateNextGoodError: ', updateNextGoodError.message);
                }
            }

            // replace the current one with the next one
            const { error: updateCurrentGoodError } = await supabase
                .from('user_goods')
                .update({ slot: nextSlot })
                .eq('good_id', goodId);

            if (updateCurrentGoodError) {
                throw new Error('updateCurrentGoodError: ', updateCurrentGoodError.message);
            }
        } catch (error) {
            pending.value = false;
            console.error(error);
        }
    };

    return {
        pending,
        inventoryGoods,
        saveGoodsToInventory,
        loadInventoryGoods,
        removeGoodFromInventory,
        updateGoodSlot
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreInventory, import.meta.hot));
}

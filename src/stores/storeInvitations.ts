import { acceptHMRUpdate, defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreInventory } from 'src/stores/storeInventory';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useStoreGoods = defineStore('invitations', () => {
    const pending = ref(false),
        invitations = ref([]);

    const trade = async () => {
        pending.value = true;

        try {
            const $q = useQuasar();
            const router = useRouter();
            const storeBalance = useStoreBalance();
            const storeInventory = useStoreInventory();
            const storeAuth = useStoreAuth();
            if (!storeAuth.session) await storeAuth.checkSession();

            const { data: invitationInGoods, error: invitationInGoodsError } = await supabase
                .from('goods')
                .select('id')
                .eq('slug', 'invitation')
                .single();

            if (invitationInGoodsError) throw new Error(invitationInGoodsError.message);

            const { data: userBalance, error: userBalanceError } = await supabase
                .from('user_balances')
                .select('gold')
                .eq('user_id', storeAuth.session?.id)
                .single();

            if (userBalanceError) throw new Error(userBalanceError.message);

            if (userBalance.gold >= 20000) {
                const { data: existingInvitation, error: invitationError } = await supabase
                    .from('user_invitations')
                    .select('invitation_id')
                    .eq('user_id', storeAuth.session?.id);

                if (invitationError) throw new Error(invitationError.message);

                if (existingInvitation) {
                    $q.notify({
                        type: 'negative',
                        textColor: 'primary',
                        message: "Look at ya, tryin' again! You already got the invite, go on!",
                        position: 'bottom',
                        classes: 'toast',
                        actions: [{ icon: 'close', color: 'primary', dense: true, size: 'xs' }]
                    });
                    return;
                }

                await storeBalance.updateBalance('gold', 20000);

                const { error: userInvitationError } = await supabase
                    .from('user_invitations')
                    .insert([
                        {
                            invitation_id: invitationInGoods.id,
                            user_id: storeAuth.session?.id
                        }
                    ])
                    .eq('user_id', storeAuth.session?.id);

                if (userInvitationError) throw new Error(userInvitationError.message);

                const { data, error } = await supabase
                    .from('user_invitations')
                    .select(
                        `
                                invitation_id,
                                goods (id, name, image_url, short_description)`
                    )
                    .eq('user_id', storeAuth.session?.id)
                    .single();

                if (error) throw new Error(error.message);

                storeInventory.inventoryGoods.push(data.goods);

                sessionStorage.setItem('purchaseCompleted', 'true');
                await router.push('purchase-success');
                storeBalance.purchaseStatus = '';

                $q.notify({
                    type: 'positive',
                    textColor: 'dark',
                    message: "You got the invite! Now, don't get caught!",
                    position: 'bottom-right',
                    classes: 'toast',
                    actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }]
                });
            } else {
                $q.notify({
                    type: 'negative',
                    textColor: 'primary',
                    message: 'Not enough gold! Top up balance',
                    position: 'bottom',
                    classes: 'toast',
                    actions: [{ icon: 'close', color: 'primary', dense: true, size: 'xs' }]
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            pending.value = false;
        }
    };

    return {
        invitations,
        trade
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGoods, import.meta.hot));
}

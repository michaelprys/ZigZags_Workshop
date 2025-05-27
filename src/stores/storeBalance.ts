//@ts-nocheck
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/storeAuth';
import supabase from 'src/utils/supabase';
import { reactive, ref } from 'vue';

export type PaymentType = 'gold' | 'emberheart_rubies' | 'gamblers_lootbox';

export const useStoreBalance = defineStore(
    'balance',
    () => {
        const pending = ref(false);
        const sessionId = ref<string | null>(null);
        const purchaseStatus = ref('');
        const balance = reactive<Record<PaymentType, number>>({
            gold: 0,
            emberheart_rubies: 0,
            gamblers_lootbox: 0
        });

        const balanceAfterTrade = (paymentType: PaymentType, amount: number): number => {
            const currentBalance = balance[paymentType] ?? 0;
            return currentBalance >= amount ? currentBalance - amount : currentBalance;
        };

        const topUpBalance = async (
            urlSessionId: string,
            transactionStatus: string,
            amount: number,
            paymentType: PaymentType
        ) => {
            if (sessionId.value === urlSessionId) {
                return;
            }

            pending.value = true;
            const storeAuth = useStoreAuth();

            try {
                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { error: transactionError } = await supabase.from('transactions').upsert(
                    {
                        user_id: storeAuth.session?.id,
                        session_id: urlSessionId,
                        status: transactionStatus,
                        amount,
                        payment_type: paymentType
                    },
                    { onConflict: 'session_id' }
                );

                if (transactionError && transactionError.code !== '23505') {
                    throw new Error(transactionError.message);
                }

                if (transactionStatus === 'success') {
                    const { error: balanceError } = await supabase.rpc('increment_balance', {
                        user_id: storeAuth.session?.id,
                        amount,
                        payment_type: paymentType
                    });

                    if (balanceError) {
                        throw new Error(balanceError.message);
                    }
                }

                sessionId.value = urlSessionId;
            } catch (err) {
                console.error('Error updating balance:', err);
            } finally {
                pending.value = false;
            }
        };

        const displayBalance = async () => {
            pending.value = true;
            const storeAuth = useStoreAuth();

            try {
                if (!storeAuth.session) {
                    return;
                }

                const { data: retrievedBalance, error: retrievedBalanceError } = await supabase
                    .from('user_balances')
                    .select('*')
                    .eq('user_id', storeAuth.session?.id);

                if (retrievedBalanceError) {
                    throw new Error(retrievedBalanceError.message);
                }

                if (retrievedBalance && retrievedBalance.length > 0) {
                    const balanceData = retrievedBalance[0];
                    for (const key in balanceData) {
                        if (
                            Object.prototype.hasOwnProperty.call(balanceData, key) &&
                            ['gold', 'emberheart_rubies', 'gamblers_lootbox'].includes(key)
                        ) {
                            const paymentType = key as PaymentType;
                            balance[paymentType] = balanceData[paymentType];
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                pending.value = false;
            }
        };

        const updateBalance = async (paymentType: PaymentType, amount: number) => {
            pending.value = true;
            const storeAuth = useStoreAuth();

            try {
                const { data: userBalance, error: fetchBalanceError } = await supabase
                    .from('user_balances')
                    .select('*')
                    .eq('user_id', storeAuth.session?.id)
                    .single();

                if (fetchBalanceError) {
                    throw new Error(fetchBalanceError.message);
                }

                if (userBalance) {
                    const newBalance = balanceAfterTrade(paymentType, amount);

                    if (typeof newBalance !== 'number') {
                        throw new Error(`Error: newBalance is not a number (${newBalance})`);
                    }

                    const { error: updateError } = await supabase
                        .from('user_balances')
                        .update({ [paymentType]: newBalance })
                        .eq('user_id', storeAuth.session?.id);

                    if (updateError) {
                        throw new Error(updateError.message);
                    }
                    purchaseStatus.value = 'purchased';
                } else {
                    const { error: insertError } = await supabase.from('user_balances').insert([
                        {
                            user_id: storeAuth.session?.id,
                            [paymentType]: amount
                        }
                    ]);

                    if (insertError) {
                        throw new Error(insertError.message);
                    }

                    purchaseStatus.value = 'purchased';
                }
            } catch (err) {
                console.error('Error during balance update:', err);
            } finally {
                pending.value = false;
            }
        };

        return {
            pending,
            balance,
            sessionId,
            purchaseStatus,
            balanceAfterTrade,
            topUpBalance,
            displayBalance,
            updateBalance
        };
    },
    {
        persist: {
            pick: ['sessionId']
        }
    }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreBalance, import.meta.hot));
}

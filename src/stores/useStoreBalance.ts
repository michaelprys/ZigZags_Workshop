import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import supabase from 'src/utils/supabase';

export const useStoreBalance = defineStore('balance', {
    state: () => ({
        pending: false,
        balance: {
            gold: 0,
            emberheart_rubies: 0,
            gamblers_lootbox: 0,
        },
        sessionId: null,
        purchaseStatus: '',
    }),

    persist: {
        pick: ['sessionId'],
    },

    getters: {
        balanceAfterTrade: (state) => (paymentType, amount) => {
            const balance = state.balance[paymentType] ?? 0;
            return balance >= amount ? balance - amount : balance;
        },
    },

    actions: {
        async topUpBalance(sessionId, transactionStatus, amount, paymentType) {
            if (this.sessionId === sessionId) return;

            this.pending = true;
            const storeAuth = useStoreAuth();

            try {
                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { error: transactionError } = await supabase.from('transactions').insert(
                    {
                        user_id: storeAuth.session?.id,
                        session_id: sessionId,
                        status: transactionStatus,
                        amount: amount,
                        payment_type: paymentType,
                    },
                    { onConflict: ['session_id'] },
                );

                if (transactionError && transactionError.code !== '23505') {
                    throw new Error(transactionError.message);
                }

                if (transactionStatus === 'success') {
                    const { error: balanceError } = await supabase.rpc('increment_balance', {
                        user_id: storeAuth.session?.id,
                        amount: amount,
                        payment_type: paymentType,
                    });

                    if (balanceError) {
                        throw new Error(balanceError.message);
                    }
                }

                this.sessionId = sessionId;
            } catch (error) {
                console.error('Error updating balance: ', error);
            } finally {
                this.pending = false;
            }
        },

        async displayBalance() {
            this.pending = true;
            const storeAuth = useStoreAuth();

            try {
                if (!storeAuth.session) {
                    await storeAuth.checkSession();
                }

                const { data: retrievedBalance, error: retrievedBalanceError } = await supabase
                    .from('user_balances')
                    .select('*')
                    .eq('user_id', storeAuth.session?.id);

                if (retrievedBalanceError) {
                    throw new Error(retrievedBalanceError.message);
                }

                if (retrievedBalance && retrievedBalance.length > 0) {
                    const balance = retrievedBalance[0];
                    for (const paymentType in balance) {
                        if (balance.hasOwnProperty(paymentType)) {
                            this.balance[paymentType] = balance[paymentType];
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.pending = false;
            }
        },

        async updateBalance(paymentType, amount) {
            this.pending = true;
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
                    const newBalance = this.balanceAfterTrade(paymentType, amount);

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

                    this.purchaseStatus = 'purchased';
                } else {
                    const { error: insertError } = await supabase.from('user_balances').insert([
                        {
                            user_id: storeAuth.session?.id,
                            [paymentType]: amount,
                        },
                    ]);

                    if (insertError) {
                        throw new Error(insertError.message);
                    }

                    this.purchaseStatus = 'purchased';
                }
            } catch (error) {
                console.error('Error during balance update:', error);
            } finally {
                this.pending = false;
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreBalance, import.meta.hot));
}

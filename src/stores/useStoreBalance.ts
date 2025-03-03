import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import supabase from 'src/utils/supabase';

export const useStoreBalance = defineStore('balance', {
    state: () => ({
        pending: false,
        status: '',
        balance: {
            gold: 0,
            emberheart_rubies: 0,
            gamblers_lootbox: 0,
        },
        sessionId: null,
    }),

    persist: {
        pick: ['sessionId'],
    },

    actions: {
        async updateBalance(sessionId, status, amount, currency) {
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
                        status: status,
                        amount: amount,
                        currency: currency,
                    },
                    { onConflict: ['session_id'] },
                );

                if (transactionError && transactionError.code !== '23505') {
                    throw new Error(transactionError.message);
                }

                this.status = status;

                if (this.status === 'success') {
                    const { error: balanceError } = await supabase.rpc('increment_balance', {
                        user_id: storeAuth.session?.id,
                        amount: amount,
                        currency: currency,
                    });

                    if (balanceError) {
                        throw new Error(balanceError.message);
                    } else {
                        this.balance[currency] += amount;
                    }

                    if (balanceError) {
                        throw new Error(balanceError.message);
                    } else {
                        this.balance[currency] += amount;
                    }
                }

                this.sessionId = sessionId;
            } catch (error) {
                console.error('Error updating balance: ', error);
            } finally {
                this.pending = false;
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreBalance, import.meta.hot));
}

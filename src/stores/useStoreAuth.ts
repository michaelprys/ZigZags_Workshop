import { defineStore, acceptHMRUpdate } from 'pinia';
import supabase from 'src/utils/supabase';

type User = {
    id: number;
    first_name: string;
    email: string;
};

export const useStoreAuth = defineStore('auth', {
    state: () => ({
        session: null as User,
    }),

    actions: {
        async checkSession(this: void) {
            const { data } = await supabase.auth.getSession();

            this.session = data.session?.user || null;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

import { acceptHMRUpdate, defineStore } from 'pinia';
import supabase from 'src/utils/supabase';

type User = {
    id: string;
    first_name: string;
    email: string;
};

type AuthSession = {
    user: User | null;
};

export const useStoreAuth = defineStore('auth', {
    state: () => ({
        session: null as AuthSession | null,
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

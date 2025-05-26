import { acceptHMRUpdate, defineStore } from 'pinia';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

type User = {
    id: string;
    first_name?: string;
    email?: string;
    user_metadata?: {
        faction?: string;
        first_name?: string;
    };
};

export const useStoreAuth = defineStore('auth', () => {
    const session = ref<User | null>(null);

    const checkSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Session fetch error:', error);
            return;
        }

        const user = data.session?.user;
        if (user && user.email) {
            session.value = user as User;
        } else {
            session.value = null;
        }
    };

    return {
        session,
        checkSession
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

import { acceptHMRUpdate, defineStore } from 'pinia';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

type User = {
    id: string;
    first_name: string;
    email: string;
};

type AuthSession = {
    user: User | null;
};

export const useStoreAuth = defineStore('auth', () => {
    const session = ref<AuthSession | null>(null);

    const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        session.value = data.session?.user || null;
    };

    return {
        session,
        checkSession
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}

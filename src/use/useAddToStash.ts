import { Dialog, Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { useStoreAuth } from 'src/stores/useStoreAuth';

export const useAddToStash = () => {
    const route = useRoute();
    const store = useStoreAuth();

    const addToStash = async () => {
        if (!store.session) {
            await store.checkSession();
        }

        if (
            !store.session &&
            route.name !== 'black-market' &&
            route.name !== 'black-market-access'
        ) {
            Dialog.create({
                dark: true,
                title: 'Access required',
                message: 'Please, access the vault before purchasing',
                ok: {
                    label: 'Ok',
                    color: 'secondary',
                    'text-color': 'dark',
                },
                style: 'padding: 1rem',
            });
        } else {
            Notify.create({
                timeout: 2000,
                message: 'Item added to stash',
                color: 'positive',
                textColor: 'dark',
                position: 'bottom-right',
                progress: true,
                progressClass: 'progress',
            });
        }
    };

    return {
        addToStash,
    };
};

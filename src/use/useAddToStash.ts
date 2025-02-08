import { Dialog, Notify } from 'quasar';
import { supabase } from 'src/clients/supabase';

export const useAddToStash = (color, textColor) => {
    const addToStash = async () => {
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
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
                color,
                textColor,
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

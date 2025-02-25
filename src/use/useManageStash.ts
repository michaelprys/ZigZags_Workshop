import { Dialog, Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { type Good, useStoreGoods } from 'src/stores/useStoreGoods';

export const useManageStash = () => {
    const route = useRoute();
    const storeAuth = useStoreAuth();
    const storeGoods = useStoreGoods();

    const addToStash = async (selected: Good[]) => {
        if (!storeAuth.session) {
            await storeAuth.checkSession();
        }

        if (
            !storeAuth.session &&
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
            let existingGood = storeGoods.stashGoods.find((good) => good.slug === selected.slug);

            if (!existingGood) {
                existingGood = {
                    id: selected.id,
                    quantity: 1,
                    name: selected.name,
                    slug: selected.slug,
                    category: selected.category,
                    image_url: selected.image_url,
                    price: selected.price,
                };
                storeGoods.stashGoods.push(existingGood);
            } else {
                if (existingGood.quantity < 5) {
                    existingGood.quantity++;
                    Notify.create({
                        timeout: 2000,
                        message: 'Item added to stash',
                        color: 'positive',
                        textColor: 'dark',
                        position: 'bottom-right',
                        progress: true,
                        progressClass: 'progress',
                        actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
                    });
                } else {
                    Notify.create({
                        timeout: 2000,
                        message: 'Limit per item reached (max 5)',
                        color: 'negative',
                        textColor: 'primary',
                        position: 'bottom-right',
                        progress: true,
                        progressClass: 'progress',
                        actions: [{ icon: 'close', color: 'primary', dense: true, size: 'xs' }],
                    });
                }
            }
        }
    };

    const removeFromStash = (goodIdx: number) => {
        storeGoods.stashGoods.splice(goodIdx, 1);
    };

    const decreaseGoodQuantity = (good: Good) => {
        if (good.quantity > 1) {
            good.quantity--;
        }
    };

    const increaseGoodQuantity = (good: Good) => {
        if (good.quantity < 5) {
            good.quantity++;
        }
    };

    return {
        addToStash,
        removeFromStash,
        decreaseGoodQuantity,
        increaseGoodQuantity,
    };
};

import { Dialog, Notify } from 'quasar';
import { useStoreAuth } from 'src/stores/storeAuth';
import { type Good, useStoreGoods } from 'src/stores/storeGoods';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useManageStash = () => {
    const route = useRoute();
    const storeAuth = useStoreAuth();
    const storeGoods = useStoreGoods();

    const showToast = (message: string, color: 'positive' | 'negative') => {
        Notify.create({
            timeout: 2000,
            message,
            color,
            textColor: color === 'positive' ? 'dark' : 'primary',
            position: 'bottom-right',
            progress: true,
            progressClass: 'progress',
            actions: [
                {
                    icon: 'close',
                    color: color === 'positive' ? 'dark' : 'primary',
                    dense: true,
                    size: 'xs'
                }
            ]
        });
    };

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
                    'text-color': 'dark'
                },
                style: 'padding: 1rem'
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
                    price: selected.price
                };
                storeGoods.stashGoods.push(existingGood);

                showToast('Item added to stash', 'positive');
            } else {
                if (existingGood.quantity < 5) {
                    existingGood.quantity++;
                    showToast('Item added to stash', 'positive');
                } else {
                    showToast('Limit per item reached (max 5)', 'negative');
                }
            }
        }
    };

    const removeFromStash = (goodIdx: number) => {
        storeGoods.stashGoods.splice(goodIdx, 1);
    };

    const basePrice = computed(() => {
        return (basePrice.value = storeGoods.stashGoods.reduce(
            (total, currentGood) => total + currentGood.price * currentGood.quantity,
            0
        ));
    });

    const goblinTax = computed(() => {
        return Math.floor(basePrice.value * 0.05);
    });

    const finalPrice = computed(() => {
        return basePrice.value + goblinTax.value;
    });

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
        basePrice,
        goblinTax,
        finalPrice,
        addToStash,
        removeFromStash,
        decreaseGoodQuantity,
        increaseGoodQuantity
    };
};

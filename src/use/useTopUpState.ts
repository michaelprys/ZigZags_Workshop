import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { computed, ref } from 'vue';

export const useTopUpState = () => {
    const storeAuth = useStoreAuth();
    const storeGoods = useStoreGoods();

    const paymentTypes = [
        { value: 'gold', label: 'Gold', price: import.meta.env.VITE_PRICE_GOLD },
        {
            value: 'emberheart_rubies',
            label: 'Emberheart Rubies',
            price: import.meta.env.VITE_PRICE_EMBERHEART_RUBIES,
        },
        {
            value: 'gamblers_lootbox',
            label: "Gambler's Lootbox",
            price: import.meta.env.VITE_PRICE_GAMBLERS_LOOTBOX,
        },
    ];

    const paymentType = ref(paymentTypes[0]);
    const topUpAmount = ref(100);
    const minAmounts = { gold: 100, emberheart_rubies: 10, gamblers_lootbox: 1 };

    const resetAmount = () => {
        topUpAmount.value = minAmounts[paymentType.value.value];
    };

    const increment = () => {
        topUpAmount.value += minAmounts[paymentType.value.value];
    };

    const decrement = () => {
        const min = minAmounts[paymentType.value.value];
        topUpAmount.value = Math.max(topUpAmount.value - min, min);
    };

    const calculatedAmount = computed(() => {
        let goldEquivalent = topUpAmount.value;

        if (paymentType.value.value === 'emberheart_rubies') {
            goldEquivalent = topUpAmount.value * 100;
        } else if (paymentType.value.value === 'gamblers_lootbox') {
            goldEquivalent = topUpAmount.value * 1000;
        }

        const goldToUsd = 0.01;
        return (goldEquivalent * goldToUsd).toFixed(2);
    });

    return {
        paymentTypes,
        paymentType,
        topUpAmount,
        minAmounts,
        resetAmount,
        increment,
        decrement,
        calculatedAmount,
    };
};

import { loadStripe } from '@stripe/stripe-js';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

export const useTopUpPayment = (paymentType, topUpAmount, minAmounts) => {
    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    const pending = ref(false);

    const handlePayment = async (topUpForm) => {
        pending.value = true;
        const stripe = await stripePromise;

        if (!stripe) return;

        try {
            const valid = topUpForm.validate();

            const minAmount = minAmounts[paymentType.value.value];

            if (topUpAmount.value < minAmount) {
                console.error(`The minimal quantity is ${minAmount}`);
                return;
            }

            if (valid) {
                const price = paymentType.value?.price;

                if (!price) {
                    console.error('Price not found for the selected type');
                    return;
                }

                const {
                    data: { session },
                    error
                } = await supabase.auth.getSession();

                if (error || !session) {
                    console.error(error);
                    return;
                }

                const sessionData = {
                    sessionData: {
                        price: paymentType.value?.price,
                        quantity: topUpAmount.value,
                        paymentType: paymentType.value.value
                    }
                };

                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/create-checkout-session`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session.access_token}`
                        },
                        body: JSON.stringify(sessionData)
                    }
                );

                const contentType = res.headers.get('Content-Type');

                if (contentType && contentType.includes('application/json')) {
                    const jsonResponse = await res.json();

                    const { sessionID } = jsonResponse;

                    if (sessionID) {
                        const { error } = stripe.redirectToCheckout({
                            sessionId: sessionID
                        });

                        if (error) {
                            console.error(error);
                        }
                    }
                } else {
                    const textResponse = await res.text();
                    console.error('Response is not JSON:', textResponse);
                }
            } else {
                console.error('Validation error');
            }
        } catch (err) {
            console.error('Payment processing error:', err);
        } finally {
            pending.value = false;
        }
    };

    return {
        pending,
        handlePayment
    };
};

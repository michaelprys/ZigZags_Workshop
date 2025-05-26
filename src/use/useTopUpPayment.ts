import { loadStripe } from '@stripe/stripe-js';
import { QForm } from 'quasar';
import supabase from 'src/utils/supabase';
import { ref, Ref } from 'vue';

type PaymentType = {
    value: string;
    label: string;
    price: number | string;
};

export const useTopUpPayment = (
    paymentType: Ref<PaymentType | undefined>,
    topUpAmount: Ref<number>,
    minAmounts: Record<string, number>
) => {
    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    const pending = ref(false);

    const handlePayment = async (topUpForm: QForm) => {
        pending.value = true;
        const stripe = await stripePromise;

        if (!stripe) return;

        try {
            const valid = await topUpForm.validate();

            const minAmount = paymentType.value ? minAmounts[paymentType.value.value] : 0;

            const safeMinAmount = minAmount ?? 0;

            if (topUpAmount.value < safeMinAmount) {
                console.error(`The minimal quantity is ${safeMinAmount}`);
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
                        price: paymentType.value?.value ?? 'defaultPrice',
                        quantity: topUpAmount.value,
                        paymentType: paymentType.value?.value ?? 'defaultPaymentType'
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
                        const res = await stripe.redirectToCheckout({
                            sessionId: sessionID
                        });

                        if (res?.error) {
                            console.error(res.error);
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

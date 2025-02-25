<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import supabase from 'src/utils/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { callToast } from 'src/utils/callToast';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { vDraggable } from 'vue-draggable-plus';

const list = ref([1, 2, 3]);

const storeAuth = useStoreAuth();
const storeGoods = useStoreGoods();

const leaveVault = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        callToast(error ? 'Unable to leave the vault' : 'Something went wrong', false);
    } else {
        await storeAuth.checkSession();
        if (storeGoods.goods.find((good) => good.requires_access === true)) {
            localStorage.removeItem('goods');
        }
        callToast('Safe travels!', true);
    }
};

const router = useRouter();

const currentPage = ref(1);

const $q = useQuasar();

const alert = () => {
    $q.dialog({
        dark: true,
        title: 'Exit',
        message: 'Are you sure you want to leave?',
        ok: {
            label: 'Yes',
            color: 'secondary',
            'text-color': 'dark',
        },
        cancel: {
            label: 'No',
            flat: true,
            'text-color': 'primary',
        },
        style: 'padding: 1rem',
    })
        .onOk(() => {
            leaveVault()
                .then(() => {
                    return router.push({ name: 'access-vault' });
                })
                .catch((err) => {
                    console.error('Error leaving vault: ', err);
                });
        })
        .onCancel(() => {})
        .onDismiss(() => {});
};

const determineFaction = computed(() => {
    const faction = storeAuth.session?.user_metadata.faction;

    if (faction === 'Horde') {
        return 'horde';
    } else if (faction === 'Alliance') {
        return 'alliance';
    } else {
        return 'outsiders';
    }
});

const imgSrc = (ext) => {
    return new URL(`/src/assets/vault/${determineFaction.value}.${ext}`, import.meta.url).href;
};

// top-up

const balanceDialog = ref(false);

const topUpAmount = ref(100);

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

const minAmounts = {
    gold: 100,
    emberheart_rubies: 10,
    gamblers_lootbox: 1,
};

const paymentType = ref(paymentTypes[0]);

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

const preventIncorrectChars = (e) => {
    if (!/[\d.]/.test(e.key)) {
        e.preventDefault();
    }
};

const handlePaste = (e) => {
    const pastedVal = e.clipboardData.getData('text');

    if (!/^\d+$/.test(pastedVal)) {
        event.preventDefault();
    }
};

const goldToUsd: number = 0.01;

const calculatedAmount = computed(() => {
    let goldEquivalent: number = topUpAmount.value;

    if (paymentType.value.value === 'emberheart_rubies') {
        goldEquivalent = topUpAmount.value * 100;
    } else if (paymentType.value.value === 'gamblers_lootbox') {
        goldEquivalent = topUpAmount.value * 1000;
    }

    return (goldEquivalent * goldToUsd).toFixed(2);
});

// stripe

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const topUpForm = ref(null);

const pending = ref(false);

const handlePayment = async () => {
    pending.value = true;

    const stripe = await stripePromise;

    if (!topUpForm.value || !stripe) return;

    try {
        const valid = topUpForm.value.validate();

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
                error,
            } = await supabase.auth.getSession();

            if (error || !session) {
                console.error(error);
                return;
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    price,
                    quantity: topUpAmount.value,
                }),
            });

            const contentType = res.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                const jsonResponse = await res.json();
                const { sessionID } = jsonResponse;
                const { error } = stripe.redirectToCheckout({
                    sessionId: sessionID,
                });

                if (error) {
                    console.error(error);
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

onMounted(async () => {
    await storeAuth.checkSession();
});
</script>

<template>
    <q-page>
        <section
            id="vault"
            class="flex flex-center"
            style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <h1 class="sr-only">Vault</h1>
            <div class="bg"></div>

            <q-dialog v-model="balanceDialog" backdrop-filter="blur(8px); brightness(60%)">
                <q-card dark class="q-pa-md" style="max-width: 22.25rem; width: 100%">
                    <q-card-section class="q-pt-none">
                        <div class="text-h6 text-primary">Add funds</div>
                    </q-card-section>

                    <q-form
                        ref="topUpForm"
                        @submit.prevent="handlePayment"
                        @keydown.enter.prevent="handlePayment"
                    >
                        <q-card-actions class="q-pb-none" align="center">
                            <q-select
                                v-model="paymentType"
                                :options="paymentTypes"
                                filled
                                style="flex: 1"
                                dark
                                label-color="info"
                                input-class="text-primary"
                                label="Currency of choice *"
                                lazy-rules="ondemand"
                                :rules="[(val) => val.value !== '' || 'Choose currency']"
                                @update:model-value="resetAmount"
                            />
                        </q-card-actions>

                        <q-card-actions class="column q-gutter-x-sm" align="center">
                            <span class="text-secondary">Cost: ${{ calculatedAmount }}</span>
                            <div class="flex items-center q-mt-md" style="gap: 0.5rem">
                                <q-btn
                                    :disable="topUpAmount <= minAmounts[paymentType.value]"
                                    icon="remove"
                                    color="primary"
                                    flat
                                    @click="decrement"
                                />

                                <q-input
                                    v-model.number="topUpAmount"
                                    type="number"
                                    input-class="text-primary text-h6 text-center"
                                    style="max-width: 6.25rem"
                                    dense
                                    dark
                                    lazy-rules="ondemand"
                                    :rules="[
                                        (val) =>
                                            val >= minAmounts[paymentType.value] ||
                                            `Minimal: ${minAmounts[paymentType.value]}`,
                                    ]"
                                    @keypress="preventIncorrectChars"
                                    @paste="handlePaste"
                                />
                                <q-btn icon="add" color="primary" flat @click="increment" />
                            </div>
                        </q-card-actions>

                        <q-card-actions align="center">
                            <q-btn
                                type="submit"
                                label="Continue"
                                outline
                                style="width: 100%"
                                :loading="pending"
                            >
                            </q-btn>
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-dialog>

            <div class="q-px-md">
                <div class="q-pa-lg vault-form">
                    <div class="vault-form__inner">
                        <div class="vault-form__header">
                            <div class="vault-form__title-wrapper">
                                <div class="q-ma-none" style="cursor: pointer">
                                    <q-img
                                        :src="`${imgSrc('avif')}`"
                                        width="819px"
                                        height="819px"
                                        style="width: 2.2rem; height: 2.5rem"
                                    />
                                    <q-tooltip
                                        :delay="500"
                                        class="bg-primary text-center"
                                        anchor="center start"
                                        self="bottom end"
                                    >
                                        <span class="text-caption text-negative">{{
                                            determineFaction
                                        }}</span>
                                    </q-tooltip>
                                </div>
                                <h2 class="text-center text-h6 vault-form__title">
                                    {{ storeAuth.session?.user_metadata.first_name }}'s Inventory
                                </h2>
                            </div>

                            <q-btn icon="close" color="primary" flat dense @click="alert"></q-btn>
                        </div>

                        <ul
                            v-draggable="[
                                list,
                                {
                                    animation: 150,
                                },
                            ]"
                            class="q-mt-lg vault-form__slots"
                        >
                            <li v-for="i in 55" :key="i" class="vault-form__slot">
                                <q-tooltip
                                    :delay="500"
                                    anchor="bottom right"
                                    self="center start"
                                    class="bg-primary column text-center text-dark"
                                    style="width: 11.25rem"
                                >
                                    <span class="text-caption text-negative"
                                        >Boots of swiftness</span
                                    >
                                    <span>
                                        Speedy boots for fast getaways. Run like a goblin on fire!
                                    </span>
                                </q-tooltip>

                                <div class="vault-form__slot-placeholder"></div>
                                <!-- <q-img
                                    class="vault-form__slot-image"
                                    src="https://placehold.co/500"
                                    width="1024px"
                                    height="1024px"
                                    style="width: 100%; height: 100%"
                                /> -->
                            </li>
                        </ul>

                        <div class="vault-form__footer">
                            <q-pagination
                                v-model="currentPage"
                                class="q-mt-lg vault-form__nav"
                                :max="3"
                                direction-links
                                flat
                                input
                                input-class="text-primary"
                            />

                            <div class="flex q-mt-lg vault-form__gold-panel" style="gap: 0.75rem">
                                <q-btn
                                    style="border-radius: var(--rounded)"
                                    icon="add"
                                    flat
                                    dense
                                    @click="balanceDialog = true"
                                ></q-btn>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img
                                        src="~assets/vault/gold.avif"
                                        width="18px"
                                        height="18px"
                                    />
                                    <q-tooltip
                                        :delay="500"
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center"
                                    >
                                        <span class="text-caption text-negative">Gold</span>
                                    </q-tooltip>
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img
                                        src="~assets/vault/emberheart-rubies.avif"
                                        width="26px"
                                        height="26px"
                                    />
                                    <q-tooltip
                                        :delay="500"
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative"
                                            >Emberheart rubies</span
                                        >
                                    </q-tooltip>
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img
                                        src="~assets/vault/gamblers-lootbox.avif"
                                        width="23px"
                                        height="23px"
                                    />
                                    <q-tooltip
                                        :delay="500"
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative"
                                            >Gambler's lootbox
                                        </span>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped>
.vault-form {
    position: relative;
    background: linear-gradient(180deg, #25211f 0%, #100f0d 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow:
        inset 0 0 10px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.1);
}

.vault-form::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(3px);
    border-radius: 8px;
    z-index: -1;
}

.vault-form__inner {
    position: relative;
    z-index: 1;
}

.vault-form__header {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr auto 1fr;
    color: var(--q-primary);
    font-size: 1.2rem;
    text-align: center;
    position: relative;
    /* padding-bottom: 1em; */
}
/* .vault-form__header::after {
    content: '';
    position: absolute;
    inset-block: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-block: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    mask-image: linear-gradient(to right, transparent, white 1%, white 99%, transparent);
    width: 100.5%;
    z-index: -1;
} */

.vault-form__header h2 {
    grid-column-start: 2;
}
.vault-form__header .q-btn {
    justify-self: end;
    grid-column-start: 3;
}

.vault-form__title-wrapper {
    grid-column-start: 2;
    display: flex;
    align-items: center;
    gap: 16px;
}

.vault-form__slots {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    place-items: center;
}

.vault-form__slot:hover {
    box-shadow: 0 1px 12px rgba(92, 90, 78, 0.6);
}

.vault-form__slot {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    width: 5.25rem;
    height: 5.25rem;
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
}

.vault-form__slot-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, rgba(45, 45, 45, 0.7), rgba(25, 25, 25, 0.9));
    /* background: linear-gradient(145deg, rgba(82, 82, 82, 0.5), rgba(20, 20, 20, 0.9)); */
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
}

.vault-form__slot-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 0.3125rem;
}

.vault-form__slot-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    user-select: none;
    border-radius: var(--rounded);
    filter: grayscale(20%) contrast(90%) brightness(90%);
}
.vault-form__slot-image::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid rgb(120, 120, 120);
    border-radius: var(--rounded);
    z-index: 3;
}

.vault-form__footer {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    width: 100%;
}

.vault-form__nav {
    grid-column-start: 2;
    justify-self: center;
}

:deep(.vault-form__nav button:last-child),
:deep(.vault-form__nav button:first-child) {
    display: none;
}
:deep(.vault-form__nav .q-btn[disabled]) {
    cursor: default !important;
    pointer-events: none !important;
}
:deep(.vault-form__nav .q-btn),
:deep(.vault-form__nav .q-btn .q-icon) {
    cursor: pointer !important;
}
:deep(.vault-form__nav .q-btn[disabled] .q-icon),
:deep(.vault-form__nav .q-icon),
:deep(.vault-form__nav span) {
    cursor: default !important;
}
:deep(.vault-form__nav label) {
    pointer-events: none !important;
    user-select: none !important;
}

.vault-form__gold-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--q-medium);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
    grid-column-start: 3;
    justify-self: end;
    padding-right: 0.285em;
    z-index: 0;
}
</style>

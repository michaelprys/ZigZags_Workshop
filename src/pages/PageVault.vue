<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from 'src/clients/supabase';
import { loadStripe } from '@stripe/stripe-js';

const vault = ref(null);

const getCurrentOwner = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error('Error getting current user', error);
    } else {
        vault.value = data.session;
    }
};

const leaveVault = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    } else {
        console.log('You have successfully left the vault');
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
    const faction = vault.value?.user.user_metadata.faction;

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
    { value: 'gold', label: 'Gold' },
    { value: 'crimson_gems', label: 'Crimson Gems' },
    { value: 'gamblers_lootbox', label: 'Gamblers Lootbox' },
];

const minAmounts = {
    gold: 100,
    crimson_gems: 10,
    gamblers_lootbox: 1,
};

const paymentType = ref(paymentTypes[0]);

const resetAmount = () => {
    topUpAmount.value = minAmounts[paymentType.value.value];
};

const increment = () => {
    if (paymentType.value.value === 'gold') {
        topUpAmount.value += 100;
    } else if (paymentType.value.value === 'crimson_gems') {
        topUpAmount.value += 5;
    } else {
        topUpAmount.value += 1;
    }
};

const decrement = () => {
    const step = minAmounts[paymentType.value.value];
    topUpAmount.value = Math.max(topUpAmount.value - step, step);
};

const validateInput = (e) => {
    if (!/[\d.]/.test(e.key)) {
        event.preventDefault();
    }
};

const goldToUsd: number = 0.01;

const calculatedAmount = computed(() => {
    let goldEquivalent: number = topUpAmount.value;

    if (paymentType.value.value === 'crimson_gems') {
        goldEquivalent = topUpAmount.value * 100;
    } else if (paymentType.value.value === 'gamblers_lootbox') {
        goldEquivalent = topUpAmount.value * 1000;
    }

    return (goldEquivalent * goldToUsd).toFixed(2);
});

// stripe

// const stripe = ref(null);

onMounted(async () => {
    await getCurrentOwner();
    // stripe.value = await loadStripe(import.meta.env.VITE_PUBLISHABLEKEY);
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

            <q-dialog v-model="balanceDialog">
                <q-card dark class="q-pa-md" style="max-width: 22.25rem; width: 100%">
                    <q-card-section class="q-pt-none">
                        <div class="text-h6 text-primary">Add gold</div>
                    </q-card-section>

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
                            :rules="[(val) => (val && val.length > 0) || 'Choose payment type']"
                            @update:model-value="resetAmount"
                        />
                    </q-card-actions>

                    <q-card-actions class="column q-gutter-x-sm" align="center">
                        <span class="text-secondary">Price: ${{ calculatedAmount }}</span>
                        <div class="flex q-mt-md">
                            <q-btn icon="remove" color="primary" flat @click="decrement" />

                            <q-input
                                v-model.number="topUpAmount"
                                type="number"
                                input-class="text-primary text-h6 text-center"
                                dense
                                dark
                                style="max-width: 6.25rem"
                                @keypress="validateInput"
                            />
                            <q-btn icon="add" color="primary" flat @click="increment" />
                        </div>
                    </q-card-actions>

                    <q-card-actions class="q-mt-lg" align="center">
                        <q-btn
                            v-close-popup
                            label="Accept"
                            outline
                            color="secondary"
                            text-color="primary"
                            style="width: 100%"
                        />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <div class="q-px-md">
                <div class="q-pa-lg vault">
                    <div class="vault__inner">
                        <div class="vault__header">
                            <div class="vault__title-wrapper">
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
                                        <span class="text-caption text-negative">{{ determineFaction }}</span>
                                    </q-tooltip>
                                </div>
                                <h2 class="text-center text-h6">
                                    {{ vault?.user.user_metadata.first_name }}'s Inventory
                                </h2>
                            </div>

                            <q-btn icon="close" color="grey" flat dense @click="alert"></q-btn>
                        </div>

                        <div class="q-mt-lg vault__cells">
                            <div v-for="i in 36" :key="i" class="vault__cell">
                                <q-tooltip
                                    :delay="500"
                                    anchor="bottom right"
                                    self="center start"
                                    class="bg-primary column text-center text-dark"
                                    style="width: 11.25rem"
                                >
                                    <span class="text-caption text-negative">Boots of swiftness</span>
                                    <span> Speedy boots for fast getaways. Run like a goblin on fire! </span>
                                </q-tooltip>

                                <div class="vault__cell-placeholder"></div>
                                <q-img
                                    class="vault__cell-image"
                                    src="~assets/index/featured/image-2.avif"
                                    width="1024px"
                                    height="1024px"
                                    style="width: 4.8125rem; height: 4.8125rem"
                                />
                            </div>
                        </div>

                        <div class="vault__footer">
                            <q-pagination
                                v-model="currentPage"
                                class="q-mt-lg vault__nav"
                                :max="3"
                                direction-links
                                flat
                                input
                                input-class="text-primary"
                            />

                            <div class="flex q-mt-lg vault__gold-panel" style="gap: 0.75rem">
                                <q-btn
                                    style="border-radius: var(--rounded)"
                                    icon="add"
                                    flat
                                    dense
                                    @click="balanceDialog = true"
                                ></q-btn>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/gold.avif" width="18px" height="18px" />
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
                                    <q-img src="~assets/vault/ruby.avif" width="18px" height="18px" />
                                    <q-tooltip
                                        :delay="500"
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative">Crimson gems</span>
                                    </q-tooltip>
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/gamblers-lootbox.avif" width="22px" height="22px" />
                                    <q-tooltip
                                        :delay="500"
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative">Gambler's lootbox</span>
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
.vault {
    position: relative;
    background-color: var(--q-dark-page);
    border-radius: var(--rounded);
    box-shadow:
        rgba(0, 0, 0, 0.15) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.vault::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    /* background: radial-gradient(circle at top, rgba(60, 30, 15, 0.35), transparent); */
    /* background: linear-gradient(
            135deg,
            rgba(24, 24, 24, 0.2) 0%,
            rgba(27, 27, 27, 0.3) 50%,
            rgba(140, 140, 140, 0.2) 100%
        ); */

    background: linear-gradient(
        135deg,
        rgba(80, 80, 80, 0.2) 0%,
        rgba(200, 200, 200, 0.3) 50%,
        rgba(80, 80, 80, 0.2) 100%
    );

    /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.125);
}

.vault__header {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr auto 1fr;
}
.vault__header h2 {
    grid-column-start: 2;
}
.vault__header .q-btn {
    justify-self: end;
    grid-column-start: 3;
}

.vault__title-wrapper {
    grid-column-start: 2;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 0;
}

.vault__cells {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    place-items: center;
}

.vault__cell {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    width: 5.25rem;
    height: 5.25rem;
    /* border-radius: 0.625rem; */
    border-radius: var(--rounded);
    background: linear-gradient(145deg, rgba(30, 18, 12, 0.85), rgba(60, 30, 15, 0.7));
    box-shadow:
        0 6px 15px rgba(0, 0, 0, 0.6),
        inset 0 0 12px rgba(255, 255, 255, 0.3);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: box-shadow 0.15s linear;
    z-index: 3;
}

.vault__cell:hover {
    box-shadow: 0 8px 20px rgba(92, 90, 78, 0.5);
    background: linear-gradient(145deg, rgb(50, 50, 50), rgba(0, 0, 0, 0.7));
}

.vault__cell-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1e1e1e, #191919, #0a0a0a);
    box-shadow:
        0 0 15px rgba(255, 255, 255, 0.1),
        inset 0 0 10px rgba(255, 255, 255, 0.3);
}

.vault__cell-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    user-select: none;
    z-index: 0;
}

.vault__footer {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    width: 100%;
}

.vault__nav {
    grid-column-start: 2;
    justify-self: center;
}

:deep(.vault__nav button:last-child),
:deep(.vault__nav button:first-child) {
    display: none;
}
:deep(.vault__nav .q-btn[disabled]) {
    cursor: default !important;
    pointer-events: none !important;
}
:deep(.vault__nav .q-btn),
:deep(.vault__nav .q-btn .q-icon) {
    cursor: pointer !important;
}
:deep(.vault__nav .q-btn[disabled] .q-icon),
:deep(.vault__nav .q-icon),
:deep(.vault__nav span) {
    cursor: default !important;
}
:deep(.vault__nav label) {
    pointer-events: none !important;
    user-select: none !important;
}

.vault__gold-panel {
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

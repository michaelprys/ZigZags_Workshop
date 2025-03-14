<script setup lang="ts">
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreBalance } from 'src/stores/storeBalance';
// import { delay } from 'src/utils/delay';
// import { useStoreInventory } from 'src/stores/storeInventory';
import { computed, onMounted, ref } from 'vue';

const storeAuth = useStoreAuth();
const storeBalance = useStoreBalance();

const hasInvitation = ref(true);
const dialog = ref(false);
// const storeInventory = useStoreInventory();
// const inventoryGoods = computed(() => storeInventory.inventoryGoods);

// const handleTrade = async () => {
//     await Promise.all([delay(3000), trade()]);
// };

onMounted(async () => {
    // if (!storeAuth.session) await storeAuth.checkSession();
    // await storeBalance.displayBalance();
});
</script>

<template>
    <q-page>
        <Teleport to="body">
            <q-dialog v-model="dialog" backdrop-filter="blur(8px); brightness(60%)">
                <div class="modal">
                    <div class="flex items-center justify-between q-pb-none">
                        <span class="text-h5 text-secondary">Complete trade</span>

                        <div class="balance-panel" style="gap: 0.75rem">
                            <div class="flex items-center justify-between" style="gap: 10px">
                                <span>{{ storeBalance.balance['gold'] }}</span>
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
                        </div>
                    </div>

                    <div class="q-gutter-md q-mt-md">
                        <div class="text-body1">Pay with gold</div>

                        <div class="flex justify-between q-mt-md">
                            <q-btn
                                type="submit"
                                :loading="pending"
                                style="width: 10rem"
                                label="Trade"
                                :color="pending ? 'positive' : 'secondary'"
                                text-color="dark"
                                @click="handleTrade"
                            >
                                <template #loading>
                                    <q-spinner-hourglass class="on-left" />
                                    In progress...
                                </template>
                            </q-btn>

                            <q-btn
                                v-close-popup
                                label="Close"
                                flat
                                color="secondary"
                                text-color="primary"
                            ></q-btn>
                        </div>
                    </div>
                </div>
            </q-dialog>
        </Teleport>
        <section
            id="black-market-access"
            class="column flex-center relative-position"
            style="padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <div class="q-mt-lg q-px-md" style="width: 100%; max-width: 43rem">
                <div
                    class="bg-dark column shadow-10"
                    style="
                        border-bottom-left-radius: var(--rounded);
                        border-bottom-right-radius: var(--rounded);
                        background-color: var(--q-bg-modal);
                        width: 100%;
                        margin-inline: auto;
                    "
                >
                    <q-img
                        class="black-market-access-img"
                        src="~assets/black-market-access/black-market-access.avif"
                        height="457px"
                    />

                    <template v-if="!storeAuth.session && !hasInvitation">
                        <div class="q-pa-lg flex-center column">
                            <h2 class="text-h4 text-negative">Invitation unconfirmed</h2>
                            <h3 class="q-mt-sm text-info text-subtitle2">
                                Access vault to verify invitation
                            </h3>

                            <div class="flex flex-center q-mt-md">
                                <RouterLink :to="{ name: 'vault' }"
                                    ><q-btn
                                        class="q-mt-none"
                                        color="secondary"
                                        outline
                                        label="Go to vault"
                                /></RouterLink>
                            </div>
                        </div>
                    </template>

                    <template v-if="storeAuth.session && !hasInvitation">
                        <div class="q-pa-lg flex-center column">
                            <h2 class="text-h4 text-negative">Invitation: 20000 gold</h2>
                            <h3 class="q-mt-sm text-info text-subtitle1">
                                Get access to the black market
                            </h3>

                            <div class="flex flex-center q-mt-md">
                                <q-btn
                                    class="q-mt-none"
                                    outline
                                    color="secondary"
                                    label="Buy invitation"
                                    @click="dialog = true"
                                />
                            </div>
                        </div>
                    </template>

                    <template v-if="storeAuth.session && hasInvitation">
                        <div class="q-pa-lg flex-center column">
                            <h2 class="text-h4 text-primary">Greetings</h2>
                            <h3 class="q-mt-sm text-info text-subtitle1">
                                Not everything in the black market is what it seems
                            </h3>

                            <div class="flex flex-center q-mt-md">
                                <div
                                    :loading="!pending"
                                    style="pointer-events: none"
                                    class="q-mt-none flex flex-center text-subtitle1 text-positive"
                                    outline
                                    label="Enter"
                                    flat
                                >
                                    <q-spinner-hourglass class="text-h5 on-left" />
                                    Entering...
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped>
:deep(.q-img__image) {
    object-fit: 100% !important;
    object-position: 20% 45% !important;
}

.black-market-access-img {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    filter: grayscale(0.2);
    width: 100%;
    max-height: 18.75rem;
}
.message {
    background-color: var(--q-dark);
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
}

.toast {
    bottom: 40px !important;
    right: 40px !important;
    padding: 60px;
}
.modal {
    background-color: var(--q-dark);
    max-width: 30rem;
    width: 100%;
    padding: 1.25em;
    border: 1px solid color-mix(in srgb, var(--q-primary) 30%, black 90%);
    border-radius: var(--rounded);
}

.balance-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 0.1875em;
    padding-inline: 0.75em;
    background-color: var(--q-medium);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
    grid-column-start: 3;
    justify-self: end;
    z-index: 0;
}
</style>

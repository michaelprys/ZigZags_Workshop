<script setup lang="ts">
import { useStoreBalance } from 'src/stores/storeBalance';
import { useStoreInventory } from 'src/stores/storeInventory';
import { delay } from 'src/utils/delay';
import { computed, onMounted, ref } from 'vue';

const storeBalance = useStoreBalance();
const storeInventory = useStoreInventory();
const inventoryGoods = computed(() => storeInventory.inventoryGoods);
const dialog = ref(false);

const handleTrade = async () => {
    await Promise.all([delay(3000), trade()]);
};

onMounted(async () => {
    await storeBalance.displayBalance();
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

        <div class="relative-position">
            <section
                id="merchant"
                class="column flex-center relative-position"
                style="padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
            >
                <div class="q-mt-lg q-px-md" style="width: 100%; max-width: 43rem">
                    <q-img
                        class="merchant-img"
                        src="~assets/merchant/merchant.avif"
                        height="457px"
                    />
                    <div
                        class="bg-dark column q-pa-lg shadow-10"
                        style="
                            border-bottom-left-radius: var(--rounded);
                            border-bottom-right-radius: var(--rounded);
                            background-color: var(--q-bg-modal);
                            width: 100%;
                            margin-inline: auto;
                        "
                    >
                        <div>
                            <div class="column q-mt-none">
                                <h2 class="q-mt-none text-h5 text-secondary">
                                    Think you can afford it? (20000 gold)
                                </h2>
                                <span class="q-mt-sm text-subtitle2"
                                    >Better have your socks on, the place is wild!</span
                                >
                            </div>

                            <q-btn
                                style="max-width: 11.25rem; width: 100%"
                                class="q-mt-md"
                                label="Buy invitation"
                                type="submit"
                                color="secondary"
                                text-color="dark"
                                @click="dialog = true"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </q-page>
</template>

<style scoped>
:deep(.merchant-img .q-img__image) {
    object-fit: 100% !important;
    object-position: 20% 45% !important;
}

.merchant-img {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    filter: grayscale(0.2);
    width: 100%;
    max-height: 18.75rem;
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

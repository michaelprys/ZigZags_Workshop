<script setup lang="ts">
import { useStoreBalance } from 'src/stores/storeBalance';
import { onMounted } from 'vue';

const storeBalance = useStoreBalance();

onMounted(async () => {
    await storeBalance.displayBalance();
});
</script>

<template>
    <div class="balance-panel" style="gap: 0.75rem">
        <slot />

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
        <div class="flex items-center" style="gap: 6px">
            <span>{{ storeBalance.balance['emberheart_rubies'] }}</span>
            <q-img src="~assets/vault/emberheart-rubies.avif" width="26px" height="26px" />
            <q-tooltip
                :delay="500"
                anchor="bottom right"
                self="center start"
                class="bg-primary text-center text-dark"
            >
                <span class="text-caption text-negative">Emberheart rubies</span>
            </q-tooltip>
        </div>
        <div class="flex items-center" style="gap: 8px">
            <span>{{ storeBalance.balance['gamblers_lootbox'] }}</span>
            <q-img src="~assets/vault/gamblers-lootbox.avif" width="23px" height="23px" />
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
</template>

<style scoped>
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

<script setup lang="ts">
import VaultContent from 'src/components/vault/VaultContent.vue';
import VaultFooter from 'src/components/vault/VaultFooter.vue';
import VaultHeader from 'src/components/vault/VaultHeader.vue';
import { ref } from 'vue';

const balanceDialog = ref(false);
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

            <div class="q-px-md">
                <div class="q-pa-lg inventory">
                    <div class="inventory__inner">
                        <VaultHeader />
                        <VaultContent />
                        <VaultFooter />
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped>
.inventory {
    position: relative;
    background: linear-gradient(180deg, #25211f 0%, #100f0d 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow:
        inset 0 0 10px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.1);
}

.inventory::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(3px);
    border-radius: 8px;
    z-index: -1;
}

.inventory__inner {
    position: relative;
    z-index: 1;
}
</style>

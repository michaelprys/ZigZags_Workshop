<script setup lang="ts">
import VaultContent from 'src/components/vault/VaultContent.vue';
import VaultFooter from 'src/components/vault/VaultFooter.vue';
import VaultHeader from 'src/components/vault/VaultHeader.vue';
</script>

<template>
    <q-page>
        <section id="vault" class="flex flex-center">
            <h1 class="sr-only">Vault</h1>
            <div class="bg"></div>

            <div class="q-px-md">
                <div class="inventory q-pa-lg">
                    <div class="inner">
                        <VaultHeader />
                        <VaultContent />
                        <VaultFooter />
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
#vault {
    padding-top: 4.625em;
    padding-bottom: 8.5em;
    min-height: calc(100svh - 4.625em);
}

.inventory {
    position: relative;
    background: linear-gradient(180deg, #25211f 0%, #100f0d 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow:
        inset 0 0 10px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.1);
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(3px);
        border-radius: 8px;
        z-index: -1;
    }
}

.inner {
    position: relative;
    z-index: 1;
}
</style>

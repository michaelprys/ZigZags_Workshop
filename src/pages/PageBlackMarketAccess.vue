<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStoreAuth } from 'src/stores/useStoreAuth';

const hasInvitation = ref(false);

const pending = ref(false);
const storeAuth = useStoreAuth();

const enterMarket = async () => {};

onMounted(async () => {
    await storeAuth.checkSession();
});
</script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section id="black-market-access" class="flex flex-center relative-position">
                <div class="flex flex-center q-px-md" style="width: 100%">
                    <div
                        class="bg-dark message q-px-xl q-py-lg text-center"
                        style="max-width: 40rem; width: 100%"
                    >
                        <template v-if="!storeAuth.session && !hasInvitation">
                            <h2 class="text-h4 text-negative">INVITATION UNCONFIRMED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">
                                ACCESS VAULT TO VERIFY INVITATION
                            </h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'vault' }"
                                    ><q-btn class="q-mt-none" outline label="Go to vault"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="storeAuth.session && !hasInvitation">
                            <h2 class="text-h4 text-negative">ACCESS DENIED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">NO INVITATION FOUND</h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'merchant' }"
                                    ><q-btn class="q-mt-none" outline label="Get invitation"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="storeAuth.session && hasInvitation">
                            <h2 class="text-h4 text-positive">INVITATION DETECTED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">
                                INITIATING PROTOCOL... PROCEED
                            </h3>

                            <div class="flex flex-center q-mt-lg">
                                <q-btn
                                    :loading="pending"
                                    style="width: 160px"
                                    :color="pending ? 'positive' : 'primary'"
                                    class="q-mt-none"
                                    outline
                                    label="Enter"
                                    @click="enterMarket"
                                >
                                    <template #loading>
                                        <q-spinner-hourglass class="on-left" />
                                        Entering...
                                    </template>
                                </q-btn>
                            </div>
                        </template>
                    </div>
                </div>
            </section>
        </div></q-page
    >
</template>

<style scoped>
#black-market-access {
    padding-top: 17rem;
    padding-bottom: 19em;
}

.message {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
}
</style>

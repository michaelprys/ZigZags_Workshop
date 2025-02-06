<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isAuthorized = ref(true);
const hasInvitation = ref(true);
const loading = ref(false);

const enter = () => {
    loading.value = true;
    setTimeout(() => {
        router.push({ name: 'black-market' });
        loading.value = false;
    }, 3000);
};
</script>

<template>
    <q-page>
        <div class="relative-position">
            <div class="bg"></div>

            <section
                id="black-market-access"
                class="flex flex-center relative-position"
                style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
            >
                <div class="flex flex-center q-px-md" style="width: 100%">
                    <div
                        class="bg-dark message q-px-xl q-py-lg shadow-10 text-center"
                        style="max-width: 40rem; width: 100%"
                    >
                        <template v-if="!isAuthorized && !hasInvitation">
                            <h2 class="text-h4 text-negative">INVITATION UNCONFIRMED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">ACCESS VAULT TO VERIFY INVITATION</h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'merchant' }"
                                    ><q-btn class="q-mt-none" outline label="Get invitation"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="isAuthorized && !hasInvitation">
                            <h2 class="text-h4 text-negative">ACCESS DENIED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">NO INVITATION FOUND</h3>

                            <div class="flex flex-center q-mt-lg">
                                <RouterLink :to="{ name: 'merchant' }"
                                    ><q-btn class="q-mt-none" outline label="Get invitation"
                                /></RouterLink>
                            </div>
                        </template>

                        <template v-if="isAuthorized && hasInvitation">
                            <h2 class="text-h4 text-positive">INVITATION DETECTED</h2>
                            <h3 class="q-mt-xs text-info text-subtitle1">INITIATING PROTOCOL... PROCEED</h3>

                            <div class="flex flex-center q-mt-lg">
                                <q-btn
                                    :loading="loading"
                                    style="width: 160px"
                                    :color="loading ? 'positive' : 'primary'"
                                    class="q-mt-none"
                                    outline
                                    label="Enter"
                                    @click="enter"
                                >
                                    <template v-slot:loading>
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
.message {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
}

.bg {
    background-image: url('src/assets/black-market-access/bg.avif');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    filter: blur(4px) grayscale(40%) brightness(30%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>

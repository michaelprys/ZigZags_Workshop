<script setup lang="ts">
import { ref } from 'vue';

const isAuthorized = ref(false);
</script>

<template>
    <div>
        <q-layout class="relative-position">
            <div class="bg" :class="[isAuthorized ? 'img-access' : 'img-vault']"></div>

            <q-page-container>
                <RouterView #="{ Component }">
                    <Transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style scoped>
.bg {
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
    transition: opacity 0.3s linear;
    opacity: 0;
}

.img-access {
    background-image: url('src/assets/access-vault/bg.avif');
    opacity: 1;
}
.img-vault {
    background-image: url('src/assets/vault/bg.avif');
    opacity: 1;
}
</style>

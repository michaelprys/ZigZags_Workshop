<script setup lang="ts"></script>

<template>
    <div>
        <q-layout class="relative-position">
            <div class="bg"></div>

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
    background-image: url('src/assets/layout-vault/5.jpeg');
}
</style>

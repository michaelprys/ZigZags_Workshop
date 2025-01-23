<script setup lang="ts"></script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header class="relative-position flex justify-between items-center q-py-lg q-pl-lg q-pr-xl" elevated>
            <div
                class="absolute-position absolute-top fit"
                style="
                    background-image: url('./src/assets/images/header-texture.avif');
                    background-size: 100.8% 114%;
                    filter: brightness(80%) hue-rotate(100deg);
                "
            ></div>
            <RouterLink to="/" class="q-pl-sm q-py-sm z-top flex items-center q-gutter-lg">
                <img
                    style="filter: sepia(17%)"
                    src="/src/assets/images/logo.avif"
                    width="119px"
                    height="72px"
                    alt="Zigzag's Workshop logo"
                />
                <div class="flex column font-secondary text-accent">
                    <span class="text-h6">Zigzag's</span>
                    <span class="text-h4">Workshop</span>
                </div>
            </RouterLink>

            <div class="flex q-gutter-xl">
                <q-tabs class="text-subtitle1 text-accent">
                    <q-tab class="q-px-lg" name="home">Home</q-tab>
                    <q-tab class="q-px-lg" name="about">About</q-tab>
                    <q-tab class="q-px-lg" name="shop">Shop</q-tab>
                    <q-tab class="q-px-lg" name="delivery">Delivery</q-tab>
                </q-tabs>
                <q-btn padding="none">
                    <q-avatar rounded>
                        <img
                            style="object-fit: cover; filter: grayscale(40%)"
                            src="https://i.redd.it/5k3vtg13qsj31.jpg"
                        />
                    </q-avatar>
                </q-btn>
            </div>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

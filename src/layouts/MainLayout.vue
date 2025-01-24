<script setup lang="ts">
import ItemBackground from 'src/components/items/ItemBackground.vue';
</script>

<template>
    <q-layout view="lhh LpR lff">
        <q-header
            class="bg-transparent flex justify-between items-center q-pt-lg q-pb-xl q-pl-lg q-pr-xl bg-dark"
            style="position: fixed"
        >
            <div
                class="absolute-top fit"
                style="
                    background-image: url('./src/assets/images/header-texture.avif');
                    background-size: 101.47% 114%;
                    background-position: 36%;
                    filter: brightness(70%) hue-rotate(-5deg);
                "
            ></div>
            <RouterLink to="/" class="q-pl-sm q-py-sm z-top flex items-center q-gutter-lg">
                <img
                    style="filter: grayscale(8%) contrast(110%)"
                    src="/src/assets/images/logo.avif"
                    width="119px"
                    height="72px"
                    alt="Zigzag's Workshop logo"
                />
                <div class="column font-secondary text-secondary">
                    <span class="text-h6">Zigzag's</span>
                    <span class="text-h4">Workshop</span>
                </div>
            </RouterLink>

            <div class="flex q-gutter-xl q-pt-sm">
                <q-tabs class="text-subtitle1">
                    <q-tab class="q-px-lg text-secondary" name="home">Home</q-tab>
                    <q-tab class="q-px-lg text-secondary" name="about">About</q-tab>
                    <q-tab class="q-px-lg text-secondary" name="shop">Shop</q-tab>
                    <q-tab class="q-px-lg text-negative" name="blackMarket">Black Market</q-tab>
                    <q-tab class="q-px-lg text-secondary" name="delivery">Delivery</q-tab>
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

        <q-page-container class="q-pa-md">
            <ItemBackground />
            <router-view />
        </q-page-container>
    </q-layout>
</template>

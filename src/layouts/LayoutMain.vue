<script setup lang="ts">
import IconCart from 'src/components/icons/IconCart.vue';
import ItemScrollTop from 'src/components/items/ItemScrollTop.vue';
// import { ref } from 'vue';

// const drawer = ref(false);
</script>

<template>
    <q-layout view="lhh LpR lff">
        <q-header
            class="bg-dark-page bg-transparent flex items-center justify-between q-pb-xl q-pl-lg q-pr-xl q-pt-lg"
            style="position: fixed"
        >
            <div
                class="absolute-top fit"
                style="
                    background-image: url('src/assets/common/header.avif');
                    background-size: 101.47% 114%;
                    background-position: 36%;
                    filter: hue-rotate(348deg) grayscale(65%);
                    mask-image: linear-gradient(to bottom, black 91%, transparent 100%);
                "
            ></div>
            <RouterLink class="flex items-center q-gutter-lg q-pl-sm z-top" to="/">
                <img src="src/assets/common/logo.avif" width="119px" height="72px" alt="Zigzag's Workshop logo" />
                <div class="column font-secondary text-primary">
                    <span class="text-h6">Zigzag's</span>
                    <span class="text-h4">Workshop</span>
                </div>
            </RouterLink>

            <div class="flex q-gutter-lg">
                <div class="flex items-center q-gutter-x-xl">
                    <q-tabs class="text-subtitle1">
                        <q-tab class="q-px-lg text-primary" name="home">Home</q-tab>
                        <q-tab class="q-px-lg text-primary" name="goods">Workshop</q-tab>
                        <q-tab class="font-extra q-px-lg text-secondary text-subtitle2" name="blackMarket"
                            >Black Market</q-tab
                        >
                        <q-tab class="q-px-lg text-primary" name="about">About</q-tab>
                        <q-tab class="q-px-lg text-primary" name="delivery">Login</q-tab>
                    </q-tabs>
                    <q-btn class="text-primary text-subtitle1" unelevated square>
                        <IconCart />
                    </q-btn>
                </div>
                <!-- <q-btn padding="none">
                    <q-avatar rounded>
                        <img
                            style="object-fit: cover; filter: grayscale(40%)"
                            src="https://i.redd.it/5k3vtg13qsj31.jpg"
                        />
                    </q-avatar>
                </q-btn> -->
            </div>
        </q-header>

        <!-- <q-drawer v-model="drawer" class="bg-primary sm" show-if-above :width="200" :breakpoint="500" overlay>
            <q-scroll-area class="fit">
                <q-list padding>
                    <q-item v-ripple clickable>
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section> Inbox </q-item-section>
                    </q-item>

                    <q-item v-ripple clickable>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section> Send </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item v-ripple clickable>
                        <q-item-section avatar>
                            <q-icon name="drafts" />
                        </q-item-section>

                        <q-item-section> Drafts </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer> -->

        <q-page-container>
            <Teleport to="body">
                <ItemScrollTop />
            </Teleport>

            <div
                class="absolute-top fit"
                style="background-image: url('src/assets/common/bg.avif'); opacity: 23%; z-index: -1"
            ></div>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

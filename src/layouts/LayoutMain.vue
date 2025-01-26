<script setup lang="ts">
import IconCart from 'src/components/icons/IconCart.vue';
import ItemScrollTop from 'src/components/items/ItemScrollTop.vue';

// import { ref } from 'vue';

// const drawer = ref(false);
</script>

<template>
    <q-layout view="lhh LpR lff">
        <q-header
            class="bg-dark-page bg-transparent justify-between q-px-md q-py-lg"
            style="box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.5)"
        >
            <div class="flex justify-between">
                <div class="absolute-top fit header-texture"></div>
                <RouterLink class="flex items-center q-gutter-lg q-pl-sm relative-position" to="/">
                    <img
                        style="margin-bottom: 0.5625rem; filter: hue-rotate(335deg) contrast(105%)"
                        src="src/assets/common/logo.avif"
                        width="109px"
                        height="62px"
                        alt="Zigzag's Workshop logo"
                    />
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
                        <q-btn class="text-subtitle1" unelevated square>
                            <IconCart class="cart" />
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
            </div>
        </q-header>

        <q-footer class="q-px-md" style="background-color: var(--q-dark-page); z-index: -1">
            <div class="divider"></div>

            <div
                style="
                    max-width: 48.375rem;
                    width: 100%;
                    margin-inline: auto;
                    text-align: center;
                    padding-top: 2.625em;
                    padding-bottom: 4.0625em;
                "
            >
                <q class="font-quote text-h6 text-info">
                    <i
                        >Not everything that glitters is worth a coin&nbsp; — &nbsp;but Zigzag always has what you need
                    </i>
                </q>
            </div>
        </q-footer>

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

        <q-page-container class="q-px-md relative-position">
            <Teleport to="body">
                <ItemScrollTop />
            </Teleport>

            <div
                class="absolute-bottom fit"
                style="background-image: url('src/assets/common/bg.avif'); opacity: 23%; z-index: -1"
            ></div>

            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.header-texture {
    background: linear-gradient(
            0deg,
            rgba(39, 22, 11, 0) -0.01%,
            rgba(39, 22, 11, 0) 20%,
            rgba(11, 5, 4, 0.66) 50%,
            rgba(39, 22, 11, 0.82) 100%
        ),
        linear-gradient(90deg, #000 -40%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 55%, #000 170%),
        linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('src/assets/common/header1.webp');
    mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
    /* type 1 */
    /* filter: sepia(30%) hue-rotate(340deg) brightness(20%); */

    /* type 2 */
    filter: hue-rotate(370deg) saturate(70%) brightness(100%) contrast(101%);

    /* type 3 */
    /* filter: saturate(60%) brightness(110%); */
    /* filter: hue-rotate(352deg) saturate(50%) brightness(90%); */

    background-position: 0% 10%;
    background-blend-mode: color, normal, normal, normal, normal;
}

.cart {
    color: var(--q-primary);
}
</style>

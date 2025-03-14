<script setup lang="ts">
import IconLoot from 'src/components/icons/IconLoot.vue';
</script>

<template>
    <q-header
        class="bg-dark-page bg-transparent justify-between q-py-lg"
        style="box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.5)"
    >
        <div class="flex justify-between q-px-md">
            <div class="absolute-top fit texture"></div>

            <RouterLink class="flex items-center q-gutter-lg q-pl-sm relative-position" to="/">
                <q-img
                    style="
                        width: 109px;
                        height: 62px;
                        margin-bottom: 0.5625rem;
                        filter: hue-rotate(335deg) contrast(105%);
                    "
                    src="~assets/common/logo.avif"
                    alt="Zigzag's Workshop logo"
                    :spinner-size="'0'"
                />
                <div class="column font-secondary text-primary">
                    <span class="text-h6">Zigzag's</span>
                    <span class="text-h4">Workshop</span>
                </div>
            </RouterLink>

            <div class="flex q-gutter-lg">
                <div class="flex items-center q-gutter-x-xl">
                    <q-tabs class="text-subtitle1">
                        <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'base' }"
                            >Base</q-route-tab
                        >
                        <q-route-tab exact class="q-px-lg text-primary" to="/guide"
                            >Guide</q-route-tab
                        >
                        <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'vault' }"
                            >Vault</q-route-tab
                        >
                        <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'workshop' }"
                            >Workshop</q-route-tab
                        >
                        <div class="custom-tab">
                            <q-route-tab
                                exact
                                class="custom-font font-extra q-px-lg text-secondary text-subtitle2"
                                :to="{ name: 'black-market' }"
                                name="black-market"
                                >Black Market</q-route-tab
                            >
                            <div class="button-animation"></div>
                        </div>
                        <q-route-tab
                            exact
                            :to="{ name: 'stash' }"
                            class="text-subtitle1"
                            unelevated
                            square
                        >
                            <IconLoot class="loot shadow-6" style="color: var(--q-primary)" />
                        </q-route-tab>
                    </q-tabs>
                </div>
            </div>
        </div>
    </q-header>
</template>

<style scoped>
.texture {
    background:
        linear-gradient(
            0deg,
            rgba(39, 22, 11, 0) -0.01%,
            rgba(39, 22, 11, 0) 20%,
            rgba(11, 5, 4, 0.66) 50%,
            rgba(39, 22, 11, 0.82) 100%
        ),
        linear-gradient(
            9deg,
            #000 -40%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0) 55%,
            #000 170%
        ),
        linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%),
        url('/src/assets/common/header-common.webp');
    width: 100%;
    height: 100%;
    filter: brightness(125%);
    background-position: 0% 10%;
    background-blend-mode: color, normal, normal, normal, normal;
}

.custom-tab {
    position: relative;
}
.button-animation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        var(--q-warning) 50%,
        rgba(0, 0, 0, 0) 100%
    );
    transform-origin: top center;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}
.custom-tab:hover .button-animation {
    transform: scaleX(1);
}
.custom-font {
    transition:
        color 0.3s ease-in-out,
        text-shadow 0.3s ease-in-out;
}
.custom-tab:hover .custom-font {
    color: var(--q-warning) !important;
    text-shadow: #170101 0px 0px 8px;
}
</style>

<script setup lang="ts">
import IconLoot from 'src/components/icons/IconLoot.vue';

const emit = defineEmits(['toggle-drawer']);
</script>

<template>
    <q-header
        class="header bg-dark-page bg-transparent justify-between q-py-lg relative"
        style="box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.5)"
    >
        <div class="absolute-top fit texture"></div>

        <div class="inner">
            <div class="flex justify-between items-center q-px-md">
                <RouterLink
                    class="logo flex items-center q-gutter-lg q-pl-sm relative-position"
                    to="/"
                >
                    <q-img
                        class="logo-img"
                        src="~assets/common/logo.avif"
                        alt="Zigzag's Workshop logo"
                        :spinner-size="'0'"
                    />
                    <div class="logo-title-wrapper column font-secondary text-primary">
                        <span class="logo-title-top text-h6">Zigzag's</span>
                        <span class="logo-title-bottom text-h4">Workshop</span>
                    </div>
                </RouterLink>

                <div class="tabs flex q-gutter-lg">
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
                            <q-route-tab
                                exact
                                class="q-px-lg text-primary"
                                :to="{ name: 'workshop' }"
                                >Workshop</q-route-tab
                            >
                            <div class="tab">
                                <q-route-tab
                                    exact
                                    class="tab-font font-extra q-px-lg text-secondary text-subtitle2"
                                    :to="{ name: 'black-market' }"
                                    name="black-market"
                                    >Black Market</q-route-tab
                                >
                                <div class="tab-animation"></div>
                            </div>
                            <q-route-tab
                                exact
                                :to="{ name: 'stash' }"
                                class="text-subtitle1"
                                unelevated
                                square
                            >
                                <IconLoot class="icon-loot shadow-6" />
                            </q-route-tab>
                        </q-tabs>
                    </div>
                </div>
            </div>

            <div class="q-px-md">
                <q-btn
                    class="hamburger"
                    size="lg"
                    text-color="primary"
                    dense
                    flat
                    icon="menu"
                    @click="emit('toggle-drawer')"
                />
            </div>
        </div>
    </q-header>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.logo-img {
    width: 109px;
    height: 62px;
    margin-bottom: 0.5625rem;
    filter: hue-rotate(335deg) contrast(105%);
}
.hamburger {
    display: none;
}
.icon-loot {
    color: $primary;
}
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
.tab {
    position: relative;
    &:hover {
        &__tab-animation {
            transform: scaleX(1);
        }
        &__font {
            color: $warning !important;
            text-shadow: #170101 0px 0px 8px;
        }
    }
}
.tab-animation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, $warning 50%, rgba(0, 0, 0, 0) 100%);
    transform-origin: top center;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}
.font {
    transition:
        color 0.3s ease-in-out,
        text-shadow 0.3s ease-in-out;
}

@media (width <= $breakpoint-md) {
    .logo-img {
        width: 79px;
        height: 100%;
    }
    .logo-title-top {
        font-size: map.get($body1, 'size');
    }
    .logo-title-bottom {
        font-size: map.get($h5, 'size');
    }
    .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tabs {
        display: none;
    }
    .hamburger {
        display: block;
    }
}
</style>

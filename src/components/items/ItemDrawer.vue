<script setup lang="ts">
const menuList = [
    {
        label: 'Base',
        route: 'base'
    },
    {
        label: 'Guide',
        route: 'guide'
    },
    {
        label: 'Vault',
        route: 'vault'
    },
    {
        label: 'Workshop',
        route: 'workshop'
    },
    {
        label: 'Black-Market',
        route: 'black-market'
    },
    {
        label: 'Stash',
        route: 'stash'
    }
];
</script>

<template>
    <q-drawer overlay class="drawer" :width="300" bordered dark side="left" elevated>
        <q-scroll-area class="fit">
            <q-list class="q-py-lg">
                <template v-for="(menuItem, index) in menuList" :key="index">
                    <RouterLink :to="{ name: `${menuItem.route}` }">
                        <q-item clickable :active="menuItem.label === 'Outbox'">
                            <q-item-section class="q-py-sm q-px-md text-subtitle1">
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                    </RouterLink>
                </template>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<style lang="scss" scoped>
@media (width <= $breakpoint-sm) {
    .drawer {
        display: none;
    }
}
@media (width > $breakpoint-sm) {
    .drawer {
        display: block;
    }
}
</style>

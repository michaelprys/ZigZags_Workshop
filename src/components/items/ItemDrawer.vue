<script setup lang="ts">
import { ref } from 'vue';

const menuList = [
    {
        icon: 'inbox',
        label: 'Inbox',
        separator: true
    },
    {
        icon: 'send',
        label: 'Outbox',
        separator: false
    }
];

const drawer = ref(false);
</script>

<template>
    <q-drawer
        v-model="drawer"
        class="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
        bordered
        dark
        overlay
        side="left"
        elevated
    >
        <q-scroll-area class="fit">
            <q-list>
                <template v-for="(menuItem, index) in menuList" :key="index">
                    <q-item v-ripple clickable :active="menuItem.label === 'Outbox'">
                        <q-item-section avatar>
                            <q-icon :name="menuItem.icon" />
                        </q-item-section>
                        <q-item-section>
                            {{ menuItem.label }}
                        </q-item-section>
                    </q-item>
                    <q-separator v-if="menuItem.separator" :key="'sep' + index" />
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

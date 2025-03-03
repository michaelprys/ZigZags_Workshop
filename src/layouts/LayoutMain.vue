<script setup lang="ts">
import ItemScrollTop from 'src/components/items/ItemScrollTop.vue';
import LayoutMainFooter from 'src/components/layout-main/LayoutMainFooter.vue';
import LayoutMainHeader from 'src/components/layout-main/LayoutMainHeader.vue';
</script>

<template>
    <q-layout view="lhh LpR lff">
        <div class="bg"></div>

        <LayoutMainHeader />
        <LayoutMainFooter />

        <q-page-container>
            <Teleport to="body">
                <ItemScrollTop />
            </Teleport>

            <RouterView #="{ Component }">
                <Transition name="fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </q-page-container>
    </q-layout>
</template>

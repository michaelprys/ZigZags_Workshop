<script setup lang="ts"></script>

<template>
    <div>
        <q-layout class="relative-position">
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

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(5);
</script>

<template>
    <q-page>
        <div class="bg"></div>

        <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
            <h1 class="text-center text-h3 text-negative">Trade in Shadows</h1>

            <div class="column flex-center q-px-md relative-position">
                <ul class="flex q-gutter-x-xl q-mt-lg text-subtitle1" style="user-select: none">
                    <li>
                        <q-checkbox label="All" size="lg"></q-checkbox>
                    </li>
                    <li><q-checkbox label="Gadgets" size="lg"></q-checkbox></li>
                    <li><q-checkbox label="Trinkets" size="lg"></q-checkbox></li>
                    <li><q-checkbox label="Craft" size="lg"></q-checkbox></li>
                </ul>

                <ul class="flex flex-center q-gutter-lg q-mt-none q-pl-none" style="max-width: 84.5rem">
                    <li v-for="item in 8" :key="item" style="cursor: pointer">
                        <q-card class="card" style="max-width: 19.625rem" flat dark>
                            <div class="card__image-wrapper">
                                <q-img
                                    class="card__image"
                                    src="~assets/index/featured/image-7.avif"
                                    style="height: 210px"
                                />
                            </div>

                            <q-card-section>
                                <div class="items-center no-wrap row">
                                    <div class="col ellipsis text-h6">Boots of swiftness</div>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="text-negative text-subtitle1">
                                    <span class="q-mr-sm">Price: 500 gold</span>
                                    <q-icon name="science"
                                        ><q-tooltip
                                            anchor="center right"
                                            self="top start"
                                            class="column text-center text-dark"
                                            style="
                                                background-color: var(--q-dark);
                                                border: 1px solid color-mix(in srgb, var(--q-primary) 50%, black 90%);
                                                border-radius: var(--rounded);
                                                box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
                                            "
                                        >
                                            <span class="text-caption text-negative">Dangerous</span>
                                        </q-tooltip></q-icon
                                    >
                                </div>
                                <div class="text-caption text-grey">
                                    Speedy boots for fast getaways. Run like a goblin on fire!
                                </div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions class="flex justify-between">
                                <q-btn flat color="primary">💰 &nbsp Add to stash </q-btn>
                                <q-btn flat color="info">
                                    <RouterLink :to="{ name: 'item-details', params: { id: 1 } }">
                                        Details
                                    </RouterLink></q-btn
                                >
                            </q-card-actions>
                        </q-card>
                    </li>
                </ul>

                <div class="flex flex-center q-pa-lg">
                    <q-pagination
                        v-model="current"
                        class="q-mt-md"
                        color="negative"
                        active-text-color="primary"
                        size="lg"
                        :max="10"
                        :max-pages="6"
                        :boundary-numbers="false"
                    />
                </div>
            </div></section
    ></q-page>
</template>

<style scoped>
.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 50%;
    /* background: linear-gradient(to bottom, rgba(10, 0, 50, 0.4) 0%, rgba(50, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 80%); */
}

.bg::before {
    content: '';
    /* position: fixed; */
    position: absolute;
    top: 13%;
    left: 50%;
    width: 120%;
    min-height: 100svh;
    /* background: radial-gradient(
        ellipse at center,
        rgba(255, 150, 0, 0.5) 0%,
        rgba(200, 30, 0, 0.3) 40%,
        rgba(0, 0, 0, 0) 80%
    ); */

    /* background: radial-gradient(
        ellipse at center,
        rgba(10, 10, 60, 0.6) 0%,
        rgba(20, 10, 50, 0.5) 30%,
        rgba(0, 0, 0, 0) 80%
    ); */

    /* background: radial-gradient(
        ellipse at center,
        rgba(80, 0, 0, 0.6) 0%,
        rgba(100, 0, 0, 0.4) 40%,
        rgba(0, 0, 0, 0) 80%
    ); */

    /* background: radial-gradient(
        ellipse at center,
        rgba(255, 150, 0, 0.5) 0%,
        rgba(200, 30, 0, 0.3) 10%,
        rgba(0, 0, 0, 0) 80%
    ); */

    background: radial-gradient(
        ellipse at center,
        rgba(10, 0, 0, 0.9) 0%,
        rgba(20, 0, 0, 0.85) 50%,
        rgba(0, 0, 0, 1) 80%
    );

    transform: translateX(-50%) scaleY(1.2);
    filter: blur(50px);
    z-index: -1;
}

:deep(.q-checkbox__svg),
:deep(.q-checkbox__bg) {
    background: var(--q-negative-dimmed);
    outline: var(--q-negative);
    border-color: var(--q-negative-dimmed);
}

/* card */

.card {
    position: relative;
    border: 2px solid transparent;
    border-radius: var(--rounded);
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(50, 0, 0, 1) 100%);
    color: #ddd;
    box-shadow:
        inset 0 0 15px rgba(0, 0, 0, 0.8),
        0 0 25px rgba(255, 0, 0, 0.5);
    overflow: hidden;
    padding: 15px;
    border: 2px solid transparent;
    background-clip: border-box;
    position: relative;
}

.card::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 50%;
    z-index: -2;
    opacity: 0.3;
}

.card:hover .card__image {
    transform: scale(1.05);
}

.card__image-wrapper {
    overflow: hidden;
}

.card__image {
    transition: transform 0.15s linear;
    transform: scale(1);
}
</style>

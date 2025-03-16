<script setup lang="ts">
import { useStoreGoods } from 'src/stores/storeGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useMoveImage } from 'src/use/useMoveImage';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const storeGoods = useStoreGoods();

const isAuth = storeGoods.selectedGood?.requires_access;

const { addToStash } = useManageStash();

const imgRef = useTemplateRef('img-ref');

const { moveImage, resetImage } = useMoveImage(imgRef);
</script>

<template>
    <q-page>
        <section
            id="good-details"
            class="relative-position"
            style="padding-top: 5.3em; padding-bottom: 8.5em; min-height: calc(100svh - 5.3em)"
        >
            <h1 class="sr-only">Item details</h1>

            <div class="bg" :class="isAuth ? 'bg-black-market' : 'bg-workshop'"></div>

            <div class="flex flex-center">
                <div class="wrapper">
                    <div class="image-wrapper">
                        <img
                            ref="img-ref"
                            class="image"
                            :src="storeGoods.selectedGood.image_url"
                            @mousemove="moveImage"
                            @mouseleave="resetImage"
                        />
                    </div>

                    <div class="content q-pa-lg">
                        <div
                            class="overlay"
                            :class="isAuth ? 'overlay-black-market' : 'overlay-workshop'"
                        ></div>
                        <div class="column">
                            <div class="flex items-center justify-between">
                                <h2 class="text-bold text-h4">
                                    {{ storeGoods.selectedGood.name }}
                                </h2>

                                <q-btn
                                    class="back-button q-px-md"
                                    dense
                                    outline
                                    text-color="primary"
                                    @click="router.back()"
                                    >Back</q-btn
                                >
                            </div>

                            <h3 class="q-mt-md text-bold text-h6 text-secondary">
                                Category: {{ storeGoods.selectedGood.category }}
                            </h3>

                            <p class="q-mt-md text-body2" style="text-align: justify">
                                {{ storeGoods.selectedGood.description }}
                            </p>

                            <span class="q-mt-lg text-secondary text-subtitle1"
                                >Price: {{ storeGoods.selectedGood.price }} gold</span
                            >

                            <q-btn
                                class="button q-mt-lg"
                                outline
                                color="primary"
                                style="max-width: 6rem"
                                @click="addToStash(storeGoods.selectedGood)"
                                >Purchase</q-btn
                            >
                        </div>

                        <div class="q-mt-lg">
                            <h2 class="text-bold text-h6 text-secondary">More about this item</h2>

                            <p class="q-mt-md text-body2" style="text-align: justify">
                                {{ storeGoods.selectedGood.source }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section></q-page
    >
</template>

<style lang="scss" scoped>
.bg {
    position: absolute;
    top: 2.2rem;
    left: calc(50% + 15rem);
    transform: translateX(-50%);
    max-width: 71.5rem;
    width: 100%;
    min-height: 40rem;
    z-index: -1;
    margin-block: 2.5rem;
    background-position: center;
    background-repeat: no-repeat;
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 100%);
    border-radius: 0.3125rem;
}
.bg-workshop {
    filter: brightness(50%);
    background-image: url('src/assets/good-details/bg-workshop-details.avif');
}
.bg-black-market {
    filter: brightness(80%);
    background-image: url('src/assets/good-details/bg-black-market-details.avif');
}
.wrapper {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
}
.content {
    position: relative;
    border: 1px solid color-mix(in srgb, $primary 40%, black 90%);
    border-radius: $rounded;
    max-width: 40rem;
    min-height: 42rem;
    border-radius: 0.3125rem;
    border: 1px solid rgba(255, 255, 255, 0.125);
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.12),
        0 2px 2px rgba(0, 0, 0, 0.12);
}
.overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    backdrop-filter: blur(16px) saturate(180%);
    filter: brightness(60%);
}
.overlay-workshop {
    background-color: rgba(21, 36, 44, 0.9);
}
.overlay-black-market {
    background-color: rgba(15, 22, 32, 0.9);
}
.image-wrapper {
    width: 28.9375rem;
    height: 19.5rem;
    margin-top: 5rem;
    overflow: hidden;
    border-radius: 0.3125rem;
}
.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3125rem;
    user-select: none;
    &:hover {
        transform: scale(1.5);
    }
}
</style>

<script setup lang="ts">
import { useStoreGoods } from 'src/stores/storeGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useMoveImage } from 'src/use/useMoveImage';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const storeGoods = useStoreGoods();

const isAuth = storeGoods.selectedGood?.requires_access;

const { addToStash } = useManageStash();

const imgRef = useTemplateRef('img-ref');

const { moveImage, resetImage } = useMoveImage(imgRef.value);
</script>

<template>
    <q-page class="">
        <section id="good-details" class="relative-position">
            <h1 class="sr-only">Item details</h1>

            <div class="bg" :class="isAuth ? 'bg-black-market' : 'bg-workshop'"></div>

            <div class="q-px-md flex flex-center">
                <div class="wrapper">
                    <div class="img-wrapper">
                        <img
                            ref="img-ref"
                            class="img"
                            :src="storeGoods.selectedGood?.image_url || ''"
                            @mousemove="moveImage"
                            @mouseleave="resetImage"
                        />
                    </div>

                    <div class="content q-pa-lg">
                        <div
                            class="overlay"
                            :class="isAuth ? 'overlay-black-market' : 'overlay-workshop'"
                        ></div>
                        <div class="panel column">
                            <div
                                class="panel-top-wrapper flex items-center justify-between"
                                style="gap: 1.5rem"
                            >
                                <h2 class="name text-bold text-h4">
                                    {{ storeGoods.selectedGood?.name }}
                                </h2>

                                <q-btn
                                    class="back-btn q-px-md"
                                    dense
                                    outline
                                    text-color="primary"
                                    @click="router.back()"
                                    >Back</q-btn
                                >
                            </div>

                            <h3 class="category q-mt-md text-bold text-h6 text-secondary">
                                Category: {{ storeGoods.selectedGood?.category }}
                            </h3>

                            <p class="q-mt-md text-body2" style="text-align: justify">
                                {{ storeGoods.selectedGood?.description }}
                            </p>

                            <span class="q-mt-lg text-secondary text-subtitle1"
                                >Price: {{ storeGoods.selectedGood?.price }} gold</span
                            >

                            <q-btn
                                class="purchase-btn q-mt-lg"
                                outline
                                color="primary"
                                @click="
                                    storeGoods.selectedGood
                                        ? addToStash(storeGoods.selectedGood)
                                        : null
                                "
                                >Purchase</q-btn
                            >
                        </div>

                        <div class="q-mt-lg">
                            <h2 class="text-bold text-h6 text-secondary">More about this item</h2>

                            <p class="q-mt-md text-body2" style="text-align: justify">
                                {{ storeGoods.selectedGood?.source }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
@use 'sass:map';

#good-details {
    padding-top: 5.3em;
    padding-bottom: 8.5em;
    min-height: calc(100svh - 5.3em);
    overflow: hidden;
}
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
.img-wrapper {
    width: 28.9375rem;
    height: 19.5rem;
    margin-top: 5rem;
    overflow: hidden;
    border-radius: 0.3125rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3125rem;
    user-select: none;
    &:hover {
        transform: scale(1.5);
    }
}
.purchase-btn {
    max-width: 6rem;
}

@media (width <= $breakpoint-md) {
    .wrapper {
        flex-direction: column;
        align-items: center;
        max-width: 50rem;
        width: 100%;
        gap: 1.5rem;
    }
    .img-wrapper {
        width: 24.9375rem;
        height: 16.5rem;
        margin-left: auto;
        margin-right: 5rem;
    }
    .bg {
        left: 50%;
        transform: translateX(-50%);
    }
    .content {
        max-width: 100%;
    }
    .name {
        font-size: map.get($h5, 'size');
    }
    .category {
        font-size: map.get($subtitle1, 'size');
    }
}
@media (width <= $breakpoint-xs) {
    .img-wrapper {
        width: 18.9375rem;
        height: 13.5rem;
        margin-inline: auto;
    }
    .panel-top-wrapper {
        flex-direction: column-reverse;
        align-items: start;
    }
    .purchase-btn {
        max-width: 100%;
    }
}
</style>

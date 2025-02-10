<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMoveImage } from 'src/use/useMoveImage';
import { useAddToStash } from 'src/use/useAddToStash';

const { addToStash } = useAddToStash('negative', 'primary');

const router = useRouter();

const imgRef = ref<HTMLImageElement | null>(null);
const { moveImage, resetImage } = useMoveImage(imgRef);
</script>

<template>
    <q-page>
        <section id="workshop-details" class="relative-position" style="padding-top: 5.3em; padding-bottom: 8.5em">
            <h1 class="sr-only">Item details</h1>

            <div class="bg"></div>
            <div class="overlay"></div>

            <div class="flex flex-center">
                <div class="wrapper">
                    <div class="image-wrapper">
                        <img
                            ref="imgRef"
                            class="image"
                            src="~assets/index/image-3.avif"
                            @mousemove="moveImage"
                            @mouseleave="resetImage"
                        />
                    </div>

                    <div class="content-wrapper q-pa-lg">
                        <div class="column">
                            <div class="flex items-center justify-between">
                                <h2 class="text-bold text-h4">Boots of swiftness</h2>

                                <q-btn
                                    class="q-px-md"
                                    dense
                                    style="background-color: #240302"
                                    text-color="primary"
                                    filled
                                    @click="router.back()"
                                    >Back</q-btn
                                >
                            </div>

                            <h3 class="q-mt-md text-bold text-h6 text-secondary">Category: Gadgets</h3>

                            <p class="q-mt-sm text-body2" style="text-align: justify">
                                "Boots of Swiftness" are a coveted item in the goblin workshop, designed to enhance
                                speed and agility. Crafted with precision and a dash of goblin ingenuity, these boots
                                allow the wearer to move faster than ever before. Whether you're escaping a sticky
                                situation or making a quick getaway, these boots ensure you're always one step ahead.
                            </p>

                            <span class="q-mt-lg text-subtitle1">Price: 500 gold</span>

                            <q-btn
                                class="button q-mt-lg"
                                outline
                                color="primary"
                                style="max-width: 96px"
                                @click="addToStash"
                                >Purchase</q-btn
                            >
                        </div>

                        <div class="q-mt-lg">
                            <h2 class="text-bold text-h6 text-secondary">How it's made</h2>

                            <p class="q-mt-md text-body2" style="text-align: justify">
                                Ahh, the <i>Boots of Swiftness</i>! A true masterpiece of goblin craftsmanship, these
                                boots are forged in the depths of our secret workshops, hidden away from the prying eyes
                                of those pesky adventurers. First, we gather the finest leather from the swiftest of
                                creatures—caught with a clever trap, of course! Then, we mix in a bit of goblin magic, a
                                dash of speed potion, and a pinch of… well, let's just say
                                <i>"special ingredients"</i> that only goblins know about. Each boot is stitched
                                together with the precision of a seasoned goblin artisan, ensuring that they don't just
                                fit — they enhance every step! And once you slip them on, don't be surprised if you find
                                yourself running faster than a greased rat on market day. Perfect for evading traps,
                                escaping rivals, or just getting away from a sticky situation...
                                <i>these boots will have you running circles around anyone</i>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section></q-page
    >
</template>

<style scoped>
.bg {
    position: absolute;
    top: 35.2px;
    left: calc(50% + 240px);
    transform: translateX(-50%);
    max-width: 1144px;
    width: 100%;
    min-height: 640px;
    z-index: -1;
    margin-block: 40px;
    background-image: url('src/assets/black-market-details/bg.avif');
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(50%);
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 100%);
}

.overlay {
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
    background: linear-gradient(to bottom, rgba(30, 0, 0, 0.3) 0%, rgba(60, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0) 80%);
    z-index: -1;
}

.wrapper {
    display: flex;
    justify-content: center;
    gap: 40px;
}

.content-wrapper {
    position: relative;
    border: 0.0625rem solid color-mix(in srgb, var(--q-primary) 40%, black 90%);
    border-radius: var(--rounded);
    max-width: 640px;
    border-radius: 5px;
    border: 0.0625rem solid rgba(255, 255, 255, 0.125);
    box-shadow:
        0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.12),
        0 0.125rem 0.125rem rgba(0, 0, 0, 0.12);
}

.content-wrapper::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
    backdrop-filter: blur(1rem) saturate(180%);
    -webkit-backdrop-filter: blur(1rem) saturate(180%);
    background-color: rgba(35, 0, 0, 0.75);
    filter: brightness(60%);
}

.image-wrapper {
    width: 463px;
    height: 312px;
    margin-top: 80px;
    overflow: hidden;
    border-radius: 5px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    user-select: none;
}

.image:hover {
    transform: scale(1.5);
}
</style>

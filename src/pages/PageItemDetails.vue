<script setup lang="ts">
import { ref } from 'vue';

const image = ref<HTMLImageElement | null>(null);

const moveImage = (e: MouseEvent) => {
    if (!image.value) return;

    const { left, top, width, height } = image.value.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.value.style.transformOrigin = `${x}% ${y}%`;
};

const resetImage = () => {
    if (!image.value) return;

    image.value.style.transformOrigin = 'center center';
};
</script>

<template>
    <section id="item-details" class="relative-position" style="padding-top: 5.3em; padding-bottom: 7.5em">
        <h1 class="sr-only">Item details</h1>

        <div class="bg"></div>

        <div class="flex flex-center">
            <div class="wrapper">
                <div class="image-wrapper">
                    <img
                        ref="image"
                        class="image"
                        src="~assets/index/featured/image-2.avif"
                        @mousemove="moveImage"
                        @mouseleave="resetImage"
                    />
                </div>

                <div class="content-wrapper q-pa-lg">
                    <div class="column">
                        <h2 class="text-bold text-h4">Boots of swiftness</h2>

                        <h2 class="q-mt-md text-bold text-h6 text-secondary">Category: Gadgets</h2>

                        <p class="q-mt-md text-body2" style="text-align: justify">
                            "Boots of Swiftness" are a coveted item in the goblin workshop, designed to enhance speed
                            and agility. Crafted with precision and a dash of goblin ingenuity, these boots allow the
                            wearer to move faster than ever before. Whether you're escaping a sticky situation or making
                            a quick getaway, these boots ensure you're always one step ahead.
                        </p>

                        <span class="q-mt-lg text-subtitle1">Price: 500 gold</span>

                        <q-btn class="button q-mt-lg" outline color="primary" style="max-width: 6rem">Purchase</q-btn>
                    </div>

                    <div class="q-mt-lg">
                        <h2 class="text-bold text-h6 text-secondary">How it's made</h2>

                        <p class="q-mt-md text-body2" style="text-align: justify">
                            Ahh, the <i>Boots of Swiftness</i>! A true masterpiece of goblin craftsmanship, these boots
                            are forged in the depths of our secret workshops, hidden away from the prying eyes of those
                            pesky adventurers. First, we gather the finest leather from the swiftest of creatures—caught
                            with a clever trap, of course! Then, we mix in a bit of goblin magic, a dash of speed
                            potion, and a pinch of… well, let's just say <i>"special ingredients"</i> that only goblins
                            know about. Each boot is stitched together with the precision of a seasoned goblin artisan,
                            ensuring that they don't just fit—they enhance every step! And once you slip them on, don't
                            be surprised if you find yourself running faster than a greased rat on market day. Perfect
                            for evading traps, escaping rivals, or just getting away from a sticky situation...
                            <i>these boots will have you running circles around anyone</i>!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
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
    background-image: url('src/assets/item-details/bg.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(50%);
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 100%);
}

.wrapper {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
}

.content-wrapper {
    position: relative;
    border: 1px solid color-mix(in srgb, var(--q-primary) 40%, black 90%);
    border-radius: var(--rounded);
    max-width: 40rem;
    border-radius: 0.3125rem;
    border: 1px solid rgba(255, 255, 255, 0.125);
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.12),
        0 2px 2px rgba(0, 0, 0, 0.12);
}

.content-wrapper::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    filter: brightness(60%);
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
}

.image:hover {
    transform: scale(1.5);
}
</style>

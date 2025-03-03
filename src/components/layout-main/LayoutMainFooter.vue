<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const footerImageRef = ref<HTMLImageElement | null>(null);
const isVideoLoaded = ref(false);
const onLoaded = () => {
    isVideoLoaded.value = true;
    setTimeout(() => {
        isVideoLoaded.value = true;
    }, 100);
};
const getSrc = (ext: string) => {
    return new URL(`/src/assets/footer/zigzag.${ext}`, import.meta.url).href;
};
onMounted(() => {
    const img = new Image();
    img.onload = onLoaded;
    img.src = getSrc('avif');
});
const quotes = [
    'Not everything that glitters is worth a coin — but Zigzag always has what you need',
    'Some deals are too good for daylight.',
    "If it's hard to find, it's probably here.",
    "Why settle for what's available, when you can have what's exclusive?",
    "A goblin's life is full of risks... and the rewards are always shiny.",
    'Sparks fly, gears grind, and treasure waits for no one!',
    "Better to steal a rat's cheese than beg for scraps.",
    "A goblin's silence is worth more than gold... unless you're buying.",
    'The shadows whisper, but only the brave dare to listen.',
    'A vault is only as strong as its keeper.',
    'Some locks are meant to be opened, some secrets are meant to be kept.',
];
const quote = ref<string>('');
const lastQuoteIdx = ref(null);
const randomizeQuote = () => {
    let randIdx = Math.floor(Math.random() * quotes.length);
    if (randIdx === lastQuoteIdx.value) {
        randIdx = Math.floor(Math.random() * quotes.length);
    }
    lastQuoteIdx.value = randIdx;
    return quotes[randIdx];
};
const route = useRoute();
watch(
    () => route.name,
    () => {
        quote.value = randomizeQuote();
    },
    { immediate: true },
);
</script>

<template>
    <q-footer class="footer relative-position">
        <div class="footer__zigzag">
            <div class="footer__wrapper">
                <q-img
                    ref="footerImageRef"
                    class="footer__image"
                    src="~assets/footer/zigzag.avif"
                    style="width: 9.375rem; height: 9.375rem"
                    alt="Zigzag"
                />
                <video
                    :style="{ opacity: isVideoLoaded ? 1 : 0 }"
                    class="footer__candle"
                    width="1920"
                    height="1080"
                    loop
                    muted
                    autoplay
                    disablePictureInPicture="true"
                    disableRemotePlayback="true"
                    controlslist="nodownload nofullscreen noremoteplayback"
                >
                    <source src="~assets/footer/candle.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
        <div class="separator"></div>
        <div
            class="q-px-md"
            style="
                max-width: 48.375rem;
                width: 100%;
                margin-inline: auto;
                text-align: center;
                padding-top: 2.625em;
                padding-bottom: 4.0625em;
            "
        >
            <Transition name="fade" mode="out-in">
                <q :key="quote" class="font-quote text-h6 text-info">
                    <i>{{ quote }}</i>
                </q>
            </Transition>
        </div>
    </q-footer>
</template>

<style scoped>
.footer {
    background-color: transparent;
    z-index: 0;
}

.footer__zigzag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 8.5em;
    padding-bottom: 1.875em;
    user-select: none;
}
.footer__zigzag::before {
    content: '';
    position: absolute;
    top: 9.6rem;
    left: calc(50% - 2.95rem);
    transform: translateX(-50%);
    width: 4rem;
    height: 4rem;
    background: linear-gradient(
            oklch(from var(--q-dark-page) l c h / 0.23),
            oklch(from var(--q-dark-page) l c h / 0.23)
        ),
        url('/src/assets/footer/patch.avif');
    background-position: center;
    pointer-events: none;
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 100%);
}
.footer__wrapper {
    position: relative;
}
.footer__image {
    height: 9.375rem;
    width: 9.375rem;
    filter: brightness(70%) contrast(93%);
    transition: filter 0.2s linear;
    cursor: pointer;
}
.footer__image:hover {
    filter: brightness(90%);
}
.footer__candle {
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    left: 0.9rem;
    top: 3.75rem;
    mix-blend-mode: screen;
    object-fit: cover;
    filter: brightness(110%) blur(0.0437rem);
    margin-top: 0.5rem;
}
</style>

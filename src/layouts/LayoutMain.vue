<script setup lang="ts">
import IconLoot from 'src/components/icons/IconLoot.vue';
import ItemScrollTop from 'src/components/items/ItemScrollTop.vue';
import { ref, onMounted, watch } from 'vue';
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
    <q-layout view="lhh LpR lff">
        <q-header
            class="bg-dark-page bg-transparent justify-between q-py-lg"
            style="box-shadow: 0rem 0.25rem 0.625rem rgba(0, 0, 0, 0.5)"
        >
            <div class="flex justify-between q-px-md">
                <div class="absolute-top fit header-texture"></div>
                <RouterLink class="flex items-center q-gutter-lg q-pl-sm relative-position" to="/">
                    <q-img
                        style="
                            width: 109px;
                            height: 62px;
                            margin-bottom: 0.5625rem;
                            filter: hue-rotate(335deg) contrast(105%);
                        "
                        src="~assets/common/logo.avif"
                        alt="Zigzag's Workshop logo"
                        :spinnerSize="'0'"
                    />
                    <div class="column font-secondary text-primary">
                        <span class="text-h6">Zigzag's</span>
                        <span class="text-h4">Workshop</span>
                    </div>
                </RouterLink>
                <div class="flex q-gutter-lg">
                    <div class="flex items-center q-gutter-x-xl">
                        <q-tabs class="text-subtitle1">
                            <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'base' }">Base</q-route-tab>
                            <q-route-tab exact class="q-px-lg text-primary" to="/guide">Guide</q-route-tab>
                            <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'vault' }">Vault</q-route-tab>
                            <q-route-tab exact class="q-px-lg text-primary" :to="{ name: 'workshop' }"
                                >Workshop</q-route-tab
                            >
                            <div class="custom-tab">
                                <q-route-tab
                                    exact
                                    class="custom-font font-extra q-px-lg text-secondary text-subtitle2"
                                    :to="{ name: 'black-market' }"
                                    name="black-market"
                                    >Black Market</q-route-tab
                                >
                                <div class="button-animation"></div>
                            </div>
                            <q-route-tab exact :to="{ name: 'stash' }" class="text-subtitle1" unelevated square>
                                <IconLoot class="loot shadow-6" style="color: var(--q-primary)" />
                            </q-route-tab>
                        </q-tabs>
                    </div>
                    <!-- <q-btn padding="none">
                    <q-avatar rounded>
                          <q-img
                        style=" object-fit: cover; filter: grayscale(40%)
                        "
                        src="https://i.redd.it/5k3vtg13qsj31.jpg"
                        :spinnerSize="'0'"

                    />
                    </q-avatar>
                </q-btn> -->
                </div>
            </div>
        </q-header>
        <q-footer class="footer relative-position">
            <div class="zigzag">
                <div class="zigzag__wrapper">
                    <q-img
                        ref="footerImageRef"
                        class="zigzag__image"
                        src="~assets/footer/zigzag.avif"
                        style="width: 9.375rem; height: 9.375rem"
                        alt="Zigzag"
                    />
                    <video
                        :style="{ opacity: isVideoLoaded ? 1 : 0 }"
                        class="zigzag__candle"
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
            <div class="divider"></div>
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
<style scoped>
.header-texture {
    background: linear-gradient(
            0deg,
            rgba(39, 22, 11, 0) -0.01%,
            rgba(39, 22, 11, 0) 20%,
            rgba(11, 5, 4, 0.66) 50%,
            rgba(39, 22, 11, 0.82) 100%
        ),
        linear-gradient(9deg, #000 -40%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 55%, #000 170%),
        linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('/src/assets/common/header.webp');
    /* mask-image: linear-gradient(to bottom, black 95%, transparent 100%); */
    width: 100%;
    height: 100%;
    filter: brightness(125%);
    background-position: 0% 10%;
    background-blend-mode: color, normal, normal, normal, normal;
}
.footer {
    background-color: transparent;
    z-index: 0;
}
.cart {
    color: var(--q-primary);
}
/* zigzag */
.zigzag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 8.5em;
    padding-bottom: 1.875em;
    user-select: none;
}
.zigzag::before {
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
.zigzag__wrapper {
    position: relative;
}
.zigzag__image {
    height: 9.375rem;
    width: 9.375rem;
    filter: brightness(70%) contrast(93%);
    transition: filter 0.2s linear;
    cursor: pointer;
}
.zigzag__image:hover {
    filter: brightness(90%);
}
.zigzag__candle {
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
.custom-tab {
    position: relative;
}
.button-animation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, var(--q-warning) 50%, rgba(0, 0, 0, 0) 100%);
    transform-origin: top center;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}
.custom-tab:hover .button-animation {
    transform: scaleX(1);
}
.custom-font {
    transition:
        color 0.3s ease-in-out,
        text-shadow 0.3s ease-in-out;
}
.custom-tab:hover .custom-font {
    color: var(--q-warning) !important;
    text-shadow: #170101 0px 0px 8px;
}
</style>

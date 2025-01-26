<script setup lang="ts"></script>

<template>
    <section id="black-market" style="position: relative; padding-top: 9.8125rem">
        <h1 class="sr-only">Goblin Black Market</h1>

        <div class="flex flex-center">
            <div style="display: flex; gap: 2.8rem; max-width: 1400px">
                <q-img class="rounded shadow-8" src="src/assets/index/black-market/bg.webp" style="width: 45%" />

                <div style="width: 55%">
                    <h2 class="q-mb-lg q-mt-none text-h3">Goblin Black Market</h2>
                    <div class="text-info">
                        <p class="q-mb-md text-subtitle1">
                            All shiny stuff from Goblin Black Market come with
                            <i class="text-primary">zero</i> guarantees! Not deadly (well, <i>mostly</i>), but these
                            trinkets pack wild surprises that'll leave ya cacklin' or cryin'! The Black Market ain't for
                            softlings — it's where power beyond imagining waits clever (or crazy) enough to snatch it!
                            But don't worry, if you just want somethin' useful, we've got treasures for every sneaky,
                            greedy, grubby need!
                        </p>
                        <p class="q-mb-md text-negative text-subtitle2">
                            Warning: Use at your own risk! Once ya grab it, no refunds — and don't bother tryin' to
                            haggle!
                        </p>
                        <q-btn class="text-subtitle1" outline color="secondary" label="Explore goods"></q-btn>
                    </div>
                </div>
            </div>
        </div>

        <div class="zigzag">
            <div class="zigzag__wrapper">
                <img class="zigzag__image" src="src/assets/index/black-market/zigzag.avif" alt="Zigzag" />
                <video
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
                    <source src="src/assets/index/black-market/candle.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    </section>
</template>

<style scoped>
.zigzag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 220px;
    padding-bottom: 1.875rem;
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
</style>

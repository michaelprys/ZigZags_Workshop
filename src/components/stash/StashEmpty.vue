<template>
    <section id="empty-stash" class="column flex-center relative-position">
        <div class="column q-px-md flex-center" style="max-width: 34rem; width: 100%">
            <q-img class="img" src="~assets/stash/empty-stash.avif" width="522px" height="457px" />
            <div class="wrapper column flex-center q-mt-xl">
                <span class="title text-h4 text-secondary">Your stash is dry</span>
                <p class="text q-mt-md text-center text-primary text-subtitle1">
                    Hey, what gives?! Go fetch some treasures so we ain't walkin' around with
                    nothin'!
                </p>
                <q-btn
                    class="btn q-mt-lg"
                    color="secondary"
                    text-color="dark"
                    unelevated
                    :to="{ name: 'workshop' }"
                    label="Explore goods"
                    no-caps
                />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use 'sass:map';

#empty-stash {
    padding-bottom: 19em;
    padding-top: 10.5rem;
}
.img {
    filter: grayscale(0.2);
    width: 12rem !important;
    height: 100% !important;
}

@media (width <= $breakpoint-md) {
    .img {
        width: 10rem !important;
    }
}
@media (width <= $breakpoint-xs) {
    .wrapper {
        max-width: 25rem;
        width: 100%;
    }
    .title {
        font-size: map.get($h5, 'size');
    }
    .text {
        font-size: map.get($subtitle2, 'size');
    }
}
</style>

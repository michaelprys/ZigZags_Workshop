<template>
    <section id="empty-stash" class="column flex-center relative-position">
        <div class="column flex-center" style="max-width: 34rem; width: 100%">
            <q-img
                src="~assets/stash/empty-stash.avif"
                width="522px"
                height="457px"
                style="filter: grayscale(0.2); width: 12.5rem; height: 100%"
            />
            <div class="column flex-center q-mt-xl">
                <span class="text-h4 text-secondary">Your stash is dry</span>
                <p class="q-mt-md text-center text-primary text-subtitle1">
                    Hey, what gives?! Go fetch some treasures so we ain't walkin' around with
                    nothin'!
                </p>
                <q-btn
                    class="q-mt-lg"
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
#empty-stash {
    padding-bottom: 19em;
}
#empty-stash {
    padding-top: 10.5rem;
}
</style>

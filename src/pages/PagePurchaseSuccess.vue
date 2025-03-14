<template>
    <section id="purchase-success" class="column flex-center relative-position">
        <div class="column flex-center" style="max-width: 34rem; width: 100%">
            <q-img
                src="~assets/stash/success-stash.avif"
                width="1024px"
                height="1024px"
                style="border-radius: 50%; filter: grayscale(0.2); width: 12.5rem; height: 100%"
            />
            <div class="column flex-center q-mt-xl">
                <span class="text-h4 text-secondary">Deal done!</span>
                <p class="q-mt-md text-center text-primary text-subtitle1">
                    Hah! You got it! Hope yer pockets ain't <br />
                    growin' legs now... Check yer loot, quick!
                </p>
                <q-btn
                    class="q-mt-lg"
                    color="secondary"
                    text-color="dark"
                    unelevated
                    :to="{ name: 'vault' }"
                    label="Open vault"
                    no-caps
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
#purchase-success {
    padding-bottom: 19em;
}
#purchase-success {
    padding-top: 10.5rem;
}
</style>

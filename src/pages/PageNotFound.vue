<template>
    <div
        class="absolute-bottom fit"
        style="background-image: url('~assets/common/bg.avif'); opacity: 23%; z-index: -1"
    ></div>

    <section id="not-found" class="flex flex-center fullscreen q-pa-md text-center text-white">
        <div class="" style="max-width: 700px">
            <q-img
                src="~assets/not-found/not-found.avif"
                style="width: 250px; border-radius: 50%"
                class="shadow-4"
            ></q-img>
            <div class="q-pt-xl">
                <div class="text-h4">Oopsie! The path is closed, chum!</div>

                <div class="q-mt-lg text-h6 text-info">
                    Better turn back before Zigzag spots you.
                </div>

                <q-btn
                    class="q-mt-lg"
                    color="secondary"
                    text-color="dark"
                    unelevated
                    to="/"
                    label="Back to Safety"
                    no-caps
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
#not-found {
    padding-bottom: 19em;
}
#not-found {
    padding-top: 10.5rem;
}
</style>

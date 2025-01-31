<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const activeSlide = ref(2);
const myForm = ref(null);

const imgSrc = (name: string) => {
    return new URL(`/src/assets/index/featured/${name}.avif`, import.meta.url).href;
};

const stashItems = ref([
    [
        { name: 'image-7', src: imgSrc('image-7') },
        { name: 'image-8', src: imgSrc('image-8') },
    ],
    [
        { name: 'image-2', src: imgSrc('image-2') },
        { name: 'image-1', src: imgSrc('image-1') },
    ],
    [
        { name: 'image-4', src: imgSrc('image-4') },
        { name: 'image-5', src: imgSrc('image-5') },
    ],
]);

const dialog = ref(false);

const name = ref('');

const territory = ref(null);
const paymentType = ref(null);

const territories = ['Horde', 'Alliance', 'Argent Dawn', 'Scarlet Crusade', 'Kirin Tor'];

const paymentTypes = [
    { label: 'Gold', value: 'gold', conversionRate: 1 },
    { label: 'Magic gems', value: 'magic-gems', conversionRate: 250 },
    { label: 'Mystic Trinket Box', value: 'mystic-trinket-box', conversionRate: 100 },
];

const $q = useQuasar();
const router = useRouter();

const trade = ref(false);
const loading = ref(false);

const onSubmit = async () => {
    if (!myForm.value) return;
    try {
        const success = await myForm.value.validate();
        if (!success) {
            $q.notify({
                type: 'negative',
                message: "Something went wrong. Where's my gold?!",
                position: 'bottom-right',
                classes: 'toast',
            });
            return;
        }

        loading.value = true;

        setTimeout(() => {
            loading.value = false;
            dialog.value = false;
            trade.value = true;

            stashItems.value = [];

            router.push('/');

            $q.notify({
                type: 'positive',
                message: "Pleasure doin' business!",
                position: 'bottom-right',
                classes: 'toast',
            });
        }, 3000);
    } catch (err) {
        console.error('Validation error:', err);
    }
};
</script>

<template>
    <section
        v-if="stashItems.length > 0"
        class="column flex-center relative-position"
        style="padding-top: 6.625em; padding-bottom: 8.5em"
    >
        <q-img
            class="absolute-top"
            width="1024px"
            height="1024px"
            style="border-radius: 50%; top: 2rem; left: 50%; transform: translateX(-50%); width: 90px; height: 90px"
            src="~assets/stash/goblin.avif"
        >
        </q-img>

        <div class="column items-center q-mt-xl">
            <span class="block text-h3">Your stash</span>

            <div class="q-mt-sm">
                <div class="q-pa-md">
                    <q-carousel
                        v-model="activeSlide"
                        style="min-height: 400px"
                        class="bg-transparent carousel non-selectable"
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        swipeable
                        animated
                        control-color="secondary"
                        padding
                        infinite
                        arrows
                        height="24rem"
                    >
                        <q-carousel-slide
                            v-for="(slide, idx) in stashItems"
                            :key="idx"
                            class="cursor-pointer no-wrap"
                            :name="idx + 1"
                        >
                            <div class="fit items-center row">
                                <div v-for="content in slide" :key="content.name" class="full-height q-mr-md">
                                    <div class="card shadow-1">
                                        <q-img class="card__image" :src="content.src"> </q-img>
                                        <div class="column q-px-lg q-py-md">
                                            <span class="text-bold">Sneaky Boots of Swift Exit</span>
                                            <span class="text-bold">Price: 250 Gold</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
        </div>

        <div class="column q-mt-md">
            <span class="text-center text-h6 text-secondary"
                >Price to pay: <span class="text-bold">500</span> Gold</span
            >
            <q-btn class="q-mt-md" outline color="primary" @click="dialog = true">Begin trade</q-btn>

            <Teleport to="body">
                <q-dialog v-model="dialog" backdrop-filter="brightness(60%)">
                    <q-card style="background-color: var(--q-bg-modal); max-width: 40.25rem; width: 100%">
                        <q-card-section class="column q-pb-none">
                            <span class="text-h5 text-secondary">Trade details</span>
                            <span class="q-mt-sm">Form's a must! Who am I dealing with?</span>
                        </q-card-section>

                        <q-card-section>
                            <q-form ref="myForm" class="q-gutter-md" @submit="onSubmit">
                                <div class="flex q-mt-lg" style="gap: 1rem">
                                    <div class="flex" style="width: 100%; gap: 1rem">
                                        <q-input
                                            v-model="name"
                                            style="flex: 1"
                                            filled
                                            bg-color="dark"
                                            label-color="info"
                                            input-class="text-primary"
                                            label="Your name *"
                                            lazy-rules="ondemand"
                                            :rules="[(val) => val.length > 0 || 'Please type your name']"
                                        />
                                        <q-select
                                            v-model="territory"
                                            style="flex: 1"
                                            :options="territories"
                                            filled
                                            dark
                                            bg-color="dark"
                                            label-color="info"
                                            input-class="text-primary"
                                            label="Your faction *"
                                            lazy-rules="ondemand"
                                            :rules="[(val) => (val && val.length > 0) || 'Please select your faction']"
                                        />
                                    </div>
                                    <q-select
                                        v-model="paymentType"
                                        style="width: 100%"
                                        :options="paymentTypes"
                                        filled
                                        dark
                                        bg-color="dark"
                                        label-color="info"
                                        input-class="text-primary"
                                        label="Currency of Choice *"
                                        lazy-rules="ondemand"
                                        :rules="[
                                            (val) => (val && val.value ? true : 'Please select currency of choice'),
                                        ]"
                                    />
                                </div>

                                <div class="flex justify-between q-mt-lg">
                                    <q-btn
                                        :loading="loading"
                                        style="width: 160px"
                                        type="submit"
                                        label="Trade"
                                        :color="loading ? 'positive' : 'secondary'"
                                        text-color="dark"
                                    >
                                        <template v-slot:loading>
                                            <q-spinner-hourglass class="on-left" />
                                            In process...
                                        </template>
                                    </q-btn>

                                    <q-btn v-close-popup label="Close" flat color="secondary" text-color="primary">
                                    </q-btn>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </Teleport>
        </div>
    </section>

    <section v-else class="column flex-center relative-position" style="padding-top: 19em">
        <div class="column flex-center">
            <span class="text-h3 text-secondary">The stash is bone dry, mate!</span>
        </div>
    </section>
</template>

<style scoped>
.toast {
    bottom: 40px !important;
    right: 40px !important;
    padding: 60px;
}

.q-carousel__slide div:last-child {
    margin-right: 0;
}
.card {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    border-radius: var(--rounded);
    background-color: var(--q-dark);
    /* box-shadow: color-mix(in srgb, var(--q-primary) 100%, black 50%) 0px 1px 4px; */
    /* transition: box-shadow 0.15s linear; */
    /* cursor: pointer; */
}
/* .card:hover {
    box-shadow: color-mix(in srgb, var(--q-primary) 100%, black 50%) 0px 1px 4px;
} */
.card__image {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    width: 100%;
    height: 300px;
}
</style>

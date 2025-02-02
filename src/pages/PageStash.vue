<script setup lang="ts">
import { ref } from 'vue';
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

const quantity = ref(1);
</script>

<template>
    <div>
        <Teleport to="body">
            <q-dialog v-model="dialog" backdrop-filter="blur(8px); brightness(60%)">
                <div class="modal">
                    <div class="column q-pb-none">
                        <span class="text-h5 text-secondary">Trade details</span>
                        <span class="q-mt-sm">Form's a must! Who am I dealing with?</span>
                    </div>

                    <div>
                        <q-form ref="myForm" class="q-gutter-md" @submit="onSubmit">
                            <div class="flex q-mt-lg" style="gap: 1rem">
                                <div class="flex q-mt-md" style="width: 100%; gap: 1rem">
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
                                    :rules="[(val) => (val && val.value ? true : 'Please select currency of choice')]"
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

                                <q-btn v-close-popup label="Close" flat color="secondary" text-color="primary"> </q-btn>
                            </div>
                        </q-form>
                    </div>
                </div>
            </q-dialog>
        </Teleport>

        <section
            v-if="stashItems.length > 0"
            class="column flex-center relative-position"
            style="padding-top: 2em; padding-bottom: 8.5em"
        >
            <div class="q-pa-md">
                <div class="column items-center q-gutter-lg">
                    <q-img
                        width="1024px"
                        height="1024px"
                        style="
                            user-select: none;
                            border-radius: 50%;
                            width: 90px;
                            height: 90px;
                            filter: contrast(96%) brightness(89%);
                        "
                        src="~assets/stash/goblin.jpeg"
                    >
                    </q-img>

                    <h1 class="block text-h4">Your stash</h1>
                </div>

                <div class="flex q-mt-lg">
                    <div class="column q-mr-xl wrapper">
                        <q-scroll-area dark class="panel q-pa-lg" style="height: 486px; width: 45rem">
                            <div v-for="card in 10" :key="card" class="card shadow-1">
                                <q-img class="card__image" src="~assets/index/featured/image-1.avif" />

                                <div class="flex justify-between q-pa-md" style="width: 100%">
                                    <div>
                                        <div class="column">
                                            <span class="text-bold">Sneaky Boots of Swift Exit</span>
                                            <span class="text-bold">Enchantments: None</span>
                                            <span class="q-mt-lg text-bold"
                                                ><span class="text-secondary">Price</span>: 250 Gold</span
                                            >
                                        </div>
                                    </div>

                                    <div class="column justify-between" style="align-items: flex-end">
                                        <q-btn v-model="quantity" outline color="info" size="sm" dense icon="close" />

                                        <div class="flex items-center q-gutter-x-md">
                                            <q-btn
                                                v-model="quantity"
                                                dense
                                                icon="remove"
                                                @click="quantity > 1 ? quantity-- : 0"
                                            />
                                            <span>{{ quantity }}</span>
                                            <q-btn
                                                v-model="quantity"
                                                dense
                                                icon="add"
                                                @click="quantity < 5 ? quantity++ : 5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-scroll-area>
                    </div>

                    <div
                        class="column price q-pa-lg"
                        style="background-color: var(--q-dark-page); border-radius: var(--rounded); height: 100%"
                    >
                        <span class="text-subtitle1"><span class="text-secondary">💰 Base price:</span> 250 Gold</span>
                        <span class="q-mt-xs text-subtitle1"
                            ><span class="text-secondary">💎 Goblin Tax:</span> +50 Gold</span
                        >

                        <div class="divider-single q-my-md"></div>

                        <span class="q-mt-xs text-subtitle1"
                            ><span class="text-secondary">Final Price: </span>300 Gold</span
                        >

                        <q-btn class="q-mt-md" outline color="primary" @click="dialog = true">Begin trade</q-btn>
                    </div>
                </div>
            </div>
        </section>

        <section v-else class="column flex-center relative-position" style="padding-top: 19em">
            <div class="column flex-center">
                <span class="text-h3 text-secondary">The stash is bone dry, mate!</span>
            </div>
        </section>
    </div>
</template>

<style scoped>
.panel {
    background-color: var(--q-dark-page);
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
}

.toast {
    bottom: 40px !important;
    right: 40px !important;
    padding: 60px;
}

.q-carousel__slide div:last-child {
    margin-right: 0;
}

.modal {
    background-color: var(--q-bg-modal);
    max-width: 40.25rem;
    width: 100%;
    padding: 1.25em;
    border: 1px solid color-mix(in srgb, var(--q-primary) 30%, black 90%);
    border-radius: var(--rounded);
}

.wrapper {
    display: flex;
}

.card {
    display: flex;
    justify-content: space-between;
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    border-radius: var(--rounded);
    background-color: var(--q-dark);
    margin-bottom: 1.25rem;
}

.card:last-child {
    margin-bottom: 0;
}

.card__image {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    width: 200px;
    height: 130px;
    background-size: cover;
}

.price {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    border-radius: var(--rounded);
}
</style>

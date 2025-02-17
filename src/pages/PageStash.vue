<script setup lang="ts">
import { ref, onMounted } from 'vue';
import supabase from 'src/utils/supabase';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

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

const paymentType = ref(null);

const paymentTypes = [
    { label: 'Gold', value: 'gold', conversionRate: 1 },
    { label: 'Crimson gems', value: 'emberheart_rubies', conversionRate: 250 },
    { label: "Gambler's lootbox", value: 'gamblers-lootbox', conversionRate: 100 },
];

const $q = useQuasar();
const router = useRouter();

const trade = ref(false);
const pending = ref(false);

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

        pending.value = true;

        setTimeout(() => {
            pending.value = false;
            dialog.value = false;
            trade.value = true;

            stashItems.value = [];

            router.push({ name: 'workshop' });

            $q.notify({
                type: 'positive',
                textColor: 'dark',
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

const vaultAccessed = ref(false);

onMounted(async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        vaultAccessed.value = false;
    } else {
        vaultAccessed.value = true;
    }
});
</script>

<template>
    <q-page>
        <div>
            <Teleport to="body">
                <q-dialog v-model="dialog" backdrop-filter="blur(8px); brightness(60%)">
                    <div class="modal">
                        <div class="column q-pb-none">
                            <span class="text-h5 text-secondary">Complete trade</span>
                        </div>

                        <div>
                            <q-form ref="myForm" class="q-gutter-md q-mt-lg" @submit.prevent="onSubmit">
                                <div class="flex" style="gap: 1rem">
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

                                <div class="flex justify-between q-mt-md">
                                    <q-btn
                                        type="submit"
                                        :loading="pending"
                                        style="width: 10rem"
                                        label="Trade"
                                        :color="pending ? 'positive' : 'secondary'"
                                        text-color="dark"
                                    >
                                        <template #loading>
                                            <q-spinner-hourglass class="on-left" />
                                            In progress...
                                        </template>
                                    </q-btn>

                                    <q-btn
                                        v-close-popup
                                        label="Close"
                                        flat
                                        color="secondary"
                                        text-color="primary"
                                    ></q-btn>
                                </div>
                            </q-form>
                        </div>
                    </div>
                </q-dialog>
            </Teleport>

            <section
                v-if="stashItems.length > 0"
                class="column flex-center relative-position"
                style="padding-top: 2em; padding-bottom: 7.5em"
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
                            src="~assets/stash/goblin.avif"
                        />

                        <h1 class="block text-h4">Your stash</h1>
                    </div>

                    <div class="flex q-mt-lg">
                        <div dark class="panel q-mr-xl q-pa-lg">
                            <div v-for="card in 10" :key="card" class="card shadow-1">
                                <q-img class="card__image" src="~assets/index/image-1.avif" />

                                <div class="flex justify-between q-pa-md" style="width: 100%">
                                    <div class="column">
                                        <span class="text-bold">Sneaky Boots of Swift Exit</span>
                                        <span class="text-bold">Enchantment: None</span>
                                        <span class="q-mt-lg text-bold"
                                            ><span class="text-secondary">Price</span>: 250 Gold</span
                                        >
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
                        </div>

                        <div class="column price q-pa-lg">
                            <span class="text-subtitle1"
                                ><span class="text-secondary">💰 Base price:</span> 250 Gold</span
                            >
                            <span class="q-mt-xs text-subtitle1"
                                ><span class="text-secondary">💎 Goblin Tax:</span> +50 Gold</span
                            >

                            <div class="divider-single q-my-md"></div>

                            <span class="q-mt-xs text-subtitle1"
                                ><span class="text-secondary">Final Price: </span>300 Gold</span
                            >

                            <q-btn
                                class="q-mt-md"
                                outline
                                color="primary"
                                :disable="!vaultAccessed"
                                :label="vaultAccessed ? 'Begin trade' : 'Access vault to pay'"
                                @click="dialog = true"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section v-else class="column flex-center relative-position" style="padding-top: 19em">
                <div class="column flex-center">
                    <span class="text-h3 text-secondary">The stash is bone dry, mate!</span>
                </div>
            </section>
        </div></q-page
    >
</template>

<style scoped>
.divider-single {
    margin-inline: auto;
    content: '';
    width: 100%;
    height: 1px;
    top: 0;
    background-color: rgba(255, 255, 255, 0.125);
    position: relative;
    display: block;
    z-index: 100;
}

.panel {
    position: relative;
    background-color: var(--q-dark-page);
    border-radius: var(--rounded);
    width: 60rem;
}

.panel::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: var(--rounded);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.125);
    background: radial-gradient(circle at top, rgba(60, 30, 15, 0.35), rgba(0, 0, 0, 0.35));
}

.price {
    position: relative;
    background-color: var(--q-dark-page);
    border-radius: var(--rounded);
    height: 100%;
    padding: 2.5em;
}

.price > * {
    z-index: 1;
}

.price::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.125);
    background: radial-gradient(circle at top, rgba(60, 30, 15, 0.35), rgba(9, 9, 9, 0.35));
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

.card {
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.125);
    border-radius: var(--rounded);
    background-color: rgba(18, 9, 4, 0.5);
    margin-bottom: 1.25rem;
}

.card:last-child {
    margin-bottom: 0;
}

.card__image {
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
    width: 200px;
    /* height: 130px; */
    background-size: cover;
}
</style>

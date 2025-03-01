<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useTransition } from 'src/use/useTransition';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { transitionName, applyTransition } = useTransition();

const storeGoods = useStoreGoods();
const { removeFromStash, increaseGoodQuantity, decreaseGoodQuantity } = useManageStash();

const myForm = ref(null);

const dialog = ref(false);

const paymentType = ref(null);

const paymentTypes = [
    { label: 'Gold', value: 'gold', conversionRate: 1 },
    { label: 'Crimson gems', value: 'emberheart_rubies', conversionRate: 250 },
    {
        label: "Gambler's lootbox",
        value: 'gamblers-lootbox',
        conversionRate: 100,
    },
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
                actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
            });
            return;
        }

        pending.value = true;

        setTimeout(() => {
            pending.value = false;
            dialog.value = false;
            trade.value = true;

            storeAuth.stashGoods.value = [];

            router.push({ name: 'workshop' });

            $q.notify({
                type: 'positive',
                textColor: 'dark',
                message: "Pleasure doin' business!",
                position: 'bottom-right',
                classes: 'toast',
                actions: [{ icon: 'close', color: 'dark', dense: true, size: 'xs' }],
            });
        }, 3000);
    } catch (err) {
        console.error('Validation error:', err);
    }
};

const vaultAccessed = ref(false);

const storeAuth = useStoreAuth();

const isAnimating = ref(false);

onMounted(async () => {
    if (!storeAuth.session) {
        await storeAuth.checkSession();
    }

    vaultAccessed.value = !!storeAuth.session;
    isAnimating.value = true;
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
                            <q-form
                                ref="myForm"
                                class="q-gutter-md q-mt-lg"
                                @submit.prevent="onSubmit"
                            >
                                <div class="flex" style="gap: 1rem">
                                    <q-select
                                        v-model="paymentType"
                                        style="width: 100%"
                                        :options="paymentTypes"
                                        filled
                                        dark
                                        label-color="info"
                                        input-class="text-primary"
                                        label="Currency of Choice *"
                                        lazy-rules="ondemand"
                                        :rules="[
                                            (val) =>
                                                val && val.value
                                                    ? true
                                                    : 'Please select currency of choice',
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

            <Transition name="fade">
                <section
                    v-if="storeGoods.stashGoods.length > 0"
                    id="stash"
                    class="column flex-center relative-position"
                >
                    <div class="q-pa-md">
                        <h1 class="block text-center text-h3">Your stash</h1>

                        <div class="flex q-mt-xl">
                            <div dark class="panel q-mr-xl">
                                <TransitionGroup :name="transitionName" tag="ul">
                                    <li
                                        v-for="(good, goodIdx) in storeGoods.stashGoods"
                                        :key="good.id"
                                        class="card"
                                    >
                                        <q-img class="card__image shadow-1" :src="good.image_url" />

                                        <div
                                            class="flex justify-between q-pa-md"
                                            style="width: 100%"
                                        >
                                            <div class="card__info column">
                                                <span class="text-body1 text-bold">{{
                                                    good.name
                                                }}</span>
                                                <span class="text-bold text-info"
                                                    >Category: {{ good.category }}</span
                                                >
                                                <span class="q-mt-lg text-bold"
                                                    ><span class="text-secondary">Price</span>:
                                                    {{ good.price }} Gold</span
                                                >
                                            </div>

                                            <div
                                                class="column justify-between"
                                                style="align-items: flex-end"
                                            >
                                                <q-btn
                                                    outline
                                                    color="primary"
                                                    size="sm"
                                                    dense
                                                    icon="close"
                                                    @click="
                                                        removeFromStash(goodIdx);
                                                        applyTransition('list', 400);
                                                    "
                                                />

                                                <div class="flex items-center q-gutter-x-md">
                                                    <q-btn
                                                        dense
                                                        icon="remove"
                                                        flat
                                                        @click="decreaseGoodQuantity(good)"
                                                    />
                                                    <span>{{ good.quantity }}</span>
                                                    <q-btn
                                                        dense
                                                        icon="add"
                                                        flat
                                                        @click="increaseGoodQuantity(good)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </TransitionGroup>
                            </div>

                            <div class="column panel-price q-pa-lg">
                                <span class="text-subtitle1"
                                    ><span class="text-secondary">💰 Base price:</span> 250
                                    Gold</span
                                >
                                <span class="q-mt-xs text-subtitle1"
                                    ><span class="text-secondary">💎 Goblin Tax:</span> +50
                                    Gold</span
                                >

                                <div class="q-my-md separator-single"></div>

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

                <section v-else id="empty-stash" class="column flex-center relative-position">
                    <div class="column flex-center" style="max-width: 34rem; width: 100%">
                        <q-img
                            src="~assets/stash/empty-stash.avif"
                            width="522px"
                            height="457px"
                            style="filter: grayscale(0.2); width: 12.5rem; height: 100%"
                        />
                        <div class="flex flex-center q-mt-xl">
                            <span class="text-h4 text-secondary">Your stash is dry</span>
                            <p class="q-mt-md text-center text-primary text-subtitle1">
                                Hey, what gives?! Go fetch some treasures so we ain't walkin' around
                                with nothin'!
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
            </Transition>
        </div>
    </q-page>
</template>

<style scoped>
.separator-single {
    margin-inline: auto;
    content: '';
    width: 100%;
    top: 0;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.125);
    position: relative;
    display: block;
    z-index: 100;
}
.panel,
.panel-price {
    height: 100%;
    border-radius: var(--rounded);
    position: relative;
    background-color: var(--q-dark);
    border: 1px solid rgba(255, 255, 255, 0.125);
}
.panel {
    width: 60rem;
    min-height: 35.6688rem;
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
    background-color: var(--q-dark);
    max-width: 40.25rem;
    width: 100%;
    padding: 1.25em;
    border: 1px solid color-mix(in srgb, var(--q-primary) 30%, black 90%);
    border-radius: var(--rounded);
}

.card {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-block: 0.8rem;
    padding-left: 1rem;
    z-index: 1;
}
.card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.125);
    mask-image: linear-gradient(to right, transparent, white 5%, white 95%, transparent);
    z-index: -1;
}
.card:nth-child(n + 3):last-child::before {
    content: none;
}
.card__image {
    width: 200px;
    background-size: cover;
    border-radius: var(--rounded);
}

#stash,
#empty-stash {
    padding-bottom: 19em;
}
#stash {
    padding-top: 2em;
}
#empty-stash {
    padding-top: 10.5rem;
}
</style>

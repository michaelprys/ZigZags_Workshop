<script setup lang="ts">
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useTransition } from 'src/use/useTransition';
import { onMounted, ref } from 'vue';

const { removeFromStash, increaseGoodQuantity, decreaseGoodQuantity } = useManageStash();
const storeAuth = useStoreAuth();
const storeGoods = useStoreGoods();

const { transitionName, applyTransition } = useTransition();

const trade = ref(false);
const vaultAccessed = ref(false);

const emit = defineEmits(['openDialog']);

onMounted(async () => {
    if (!storeAuth.session) {
        await storeAuth.checkSession();
    }
    vaultAccessed.value = !!storeAuth.session;
});
</script>

<template>
    <section id="stash" class="column flex-center relative-position">
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

                            <div class="flex justify-between q-pa-md" style="width: 100%">
                                <div class="card__info column">
                                    <span class="text-body1 text-bold">{{ good.name }}</span>
                                    <span class="text-bold text-info"
                                        >Category: {{ good.category }}</span
                                    >
                                    <span class="q-mt-lg text-bold"
                                        ><span class="text-secondary">Price</span>:
                                        {{ good.price }} Gold</span
                                    >
                                </div>

                                <div class="column justify-between" style="align-items: flex-end">
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
                        ><span class="text-secondary">💰 Base price:</span> 250 Gold</span
                    >
                    <span class="q-mt-xs text-subtitle1"
                        ><span class="text-secondary">💎 Goblin Tax:</span> +50 Gold</span
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
                        @click="emit('openDialog')"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
#stash {
    padding-bottom: 19em;
    padding-top: 2em;
}

.q-carousel__slide div:last-child {
    margin-right: 0;
}

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
</style>

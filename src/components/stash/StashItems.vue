<script setup lang="ts">
import gsap from 'gsap';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreGoods } from 'src/stores/storeGoods';
import { useManageStash } from 'src/use/useManageStash';
import { useTransition } from 'src/use/useTransition';
import { onMounted, reactive, ref, watch } from 'vue';

const { basePrice, goblinTax, removeFromStash, increaseGoodQuantity, decreaseGoodQuantity } =
    useManageStash();
const storeAuth = useStoreAuth();
const storeGoods = useStoreGoods();

const { transitionName, applyTransition } = useTransition();

const vaultAccessed = ref(false);

const emit = defineEmits(['openDialog']);

onMounted(async () => {
    if (!storeAuth.session) {
        await storeAuth.checkSession();
    }
    vaultAccessed.value = !!storeAuth.session;
});

const tweened = reactive({
    tweenedBasePrice: basePrice.value,
    tweenedGoblinTax: goblinTax.value,
    tweenedFinalPrice: basePrice.value + goblinTax.value
});

watch([basePrice, goblinTax], ([newBasePrice, newGoblinTax]) => {
    gsap.to(tweened, {
        duration: 0.5,
        tweenedBasePrice: newBasePrice,
        tweenedGoblinTax: newGoblinTax,
        tweenedFinalPrice: newBasePrice + newGoblinTax
    });
});
</script>

<template>
    <section id="stash" class="column flex-center relative-position">
        <div class="q-pa-md">
            <h1 class="title text-center text-h3">Your stash</h1>

            <div class="wrapper q-mt-xl">
                <div dark class="panel">
                    <TransitionGroup :name="transitionName" tag="ul">
                        <li
                            v-for="(good, goodIdx) in storeGoods.stashGoods"
                            :key="good.id"
                            class="card"
                        >
                            <q-img class="img shadow-1" :src="good.image_url" />

                            <div class="inner q-pa-md">
                                <div class="info column">
                                    <span class="text-body1 text-bold">{{ good.name }}</span>
                                    <span class="text-bold text-info"
                                        >Category: {{ good.category }}</span
                                    >
                                    <span class="good-price q-mt-lg text-bold"
                                        ><span class="text-secondary">Price</span>:
                                        {{ good.price }} Gold</span
                                    >
                                </div>

                                <div class="actions">
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
                                            :disable="good.quantity <= 1"
                                            @click="decreaseGoodQuantity(good)"
                                        />
                                        <span>{{ good.quantity }}</span>
                                        <q-btn
                                            dense
                                            icon="add"
                                            flat
                                            :disable="good.quantity >= 5"
                                            @click="increaseGoodQuantity(good)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </TransitionGroup>
                </div>

                <div class="column panel-price">
                    <div class="panel-price-inner q-pa-lg">
                        <div class="flex text-subtitle1" style="gap: 0.3125rem">
                            <span class="text-secondary">💰 Base price:</span>

                            <span>{{ tweened.tweenedBasePrice.toFixed(0) }} Gold</span>
                        </div>

                        <div class="flex q-mt-xs text-subtitle1" style="gap: 0.3125rem">
                            <span class="text-secondary">💎 Goblin Tax:</span>
                            <span>{{ tweened.tweenedGoblinTax.toFixed(0) }} Gold</span>
                        </div>

                        <div class="q-my-md separator-single"></div>

                        <div class="flex text-subtitle1" style="gap: 0.3125rem">
                            <span class="text-secondary">Final Price: </span>
                            <span>{{ tweened.tweenedFinalPrice.toFixed(0) }} Gold</span>
                        </div>

                        <q-btn
                            class="full-width q-mt-md"
                            outline
                            color="primary"
                            :disable="!vaultAccessed"
                            :label="vaultAccessed ? 'Begin trade' : 'Access vault to pay'"
                            @click="emit('openDialog')"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use 'sass:map';

#stash {
    padding-bottom: 19em;
    padding-top: 2em;
}
.q-carousel__slide div:last-child {
    margin-right: 0;
}
.wrapper {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 75rem;
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
    border-radius: $rounded;
    position: relative;
    background-color: $dark;
    border: 1px solid rgba(255, 255, 255, 0.125);
}
.panel {
    width: 100%;
    min-height: 562.3px;
    overflow: hidden;
}
.panel-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 18rem;
    width: 100%;
}
.panel-price-inner {
    width: 100%;
}
.card {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-block: 0.8rem;
    padding-left: 1rem;
    z-index: 1;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.125);
        mask-image: linear-gradient(to right, transparent, white 5%, white 95%, transparent);
        z-index: -1;
    }
    &:nth-child(n + 3):last-child::before {
        content: none;
    }
}
.img {
    width: 12.5rem;
    background-size: cover;
    border-radius: $rounded;
}
.inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

@media (width <= 81.9375rem) {
    .title {
        font-size: map.get($h4, 'size');
    }
    .subtitle {
        font-size: map.get($body1, 'size');
        margin-top: 0.5rem;
    }
    .wrapper {
        width: 100%;
        display: flex;
        gap: 1.5rem;
        justify-content: center;
    }
    .panel {
        margin-right: 0;
        width: 48.75rem;
    }
    .card {
        &::before {
            &:nth-child(n + 2):last-child::before {
                content: none;
            }
        }
    }
    .inner {
        padding-bottom: 0;
    }
    .panel-price-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .good-price {
        margin-top: 0.5rem;
    }
}
@media (width <= 964px) {
    .panel {
        width: 100%;
        max-width: 31.9875rem;
        min-height: 30.6719rem;
    }
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        gap: 1.5rem;
    }
    .panel-price {
        max-width: 100%;
    }
}
@media (width <= $breakpoint-xs) {
    .panel {
        min-height: 30.7969rem;
    }
    .inner {
        display: flex;
        flex-direction: column;
    }
    .actions {
        margin-top: 1rem;
        flex-direction: row-reverse;
        align-items: center;
        width: 100%;
    }
}
</style>

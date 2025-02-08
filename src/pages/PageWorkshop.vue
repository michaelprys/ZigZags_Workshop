<script setup lang="ts">
import { ref } from 'vue';
import IconEnchantable from 'src/components/icons/IconEnchantable.vue';
import ItemTooltipEffect from 'src/components/items/ItemTooltipEffect.vue';
import { useAddToStash } from 'src/use/useAddToStash';

const { addToStash } = useAddToStash('positive', 'dark');

const current = ref(5);
</script>

<template>
    <q-page>
        <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
            <h1 class="text-center text-h3">Explore goods</h1>

            <div class="column flex-center q-px-md relative-position">
                <ul class="flex q-gutter-x-xl q-mt-lg text-subtitle1" style="user-select: none">
                    <li>
                        <q-checkbox label="All" size="lg"></q-checkbox>
                    </li>
                    <li><q-checkbox label="Gadgets" size="lg"></q-checkbox></li>
                    <li><q-checkbox label="Trinkets" size="lg"></q-checkbox></li>
                    <li><q-checkbox label="Craft" size="lg"></q-checkbox></li>
                </ul>

                <ul class="flex flex-center q-gutter-lg q-mt-none q-pl-none" style="max-width: 84.5rem">
                    <li v-for="item in 8" :key="item" style="cursor: pointer">
                        <q-card class="card" style="max-width: 19.625rem" flat dark>
                            <div class="card__image-wrapper">
                                <q-img
                                    class="card__image"
                                    src="~assets/index/featured/image-2.avif"
                                    style="height: 210px"
                                />
                            </div>

                            <q-card-section>
                                <div class="items-center no-wrap row">
                                    <div class="col ellipsis text-h6 text-primary">Boots of swiftness</div>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="flex items-center q-gutter-x-xs text-negative">
                                    <span class="inline-block text-secondary text-subtitle1">Price: 500 gold</span>
                                    <IconEnchantable style="color: #00bcd4; width: 1.5em; height: 1.5em">
                                        <ItemTooltipEffect />
                                    </IconEnchantable>
                                </div>
                                <span class="inline-block text-caption text-grey">
                                    Speedy boots for fast getaways. Run like a goblin on fire!
                                </span>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions class="flex justify-between">
                                <q-btn flat color="primary" @click="addToStash"> 💰 &nbsp; Add to stash </q-btn>
                                <q-btn flat color="info">
                                    <RouterLink :to="{ name: 'workshop-details', params: { id: 1 } }">
                                        Details
                                    </RouterLink></q-btn
                                >
                            </q-card-actions>
                        </q-card>
                    </li>
                </ul>

                <div class="flex flex-center q-pa-lg">
                    <q-pagination
                        v-model="current"
                        class="q-mt-md"
                        color="secondary"
                        active-text-color="dark"
                        size="lg"
                        :max="10"
                        :max-pages="6"
                        :boundary-numbers="false"
                    />
                </div>
            </div></section
    ></q-page>
</template>

<style scoped>
:deep(.q-checkbox__svg),
:deep(.q-checkbox__bg) {
    background: var(--q-secondary-dimmed);
    outline: var(--q-secondary-dimmed);
    border-color: var(--q-secondary-dimmed);
}

.card {
    border: 1px solid color-mix(in srgb, var(--q-primary) 20%, black 90%);
    border-radius: var(--rounded);
    border-radius: var(--rounded);
}

.card:hover .card__image {
    transform: scale(1.05);
}

.card__image-wrapper {
    overflow: hidden;
}

.card__image {
    transition: transform 0.15s linear;
    transform: scale(1);
}
</style>

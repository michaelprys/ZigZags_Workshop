<script setup lang="ts">
import { ref } from 'vue';

const current = ref(5);
</script>

<template>
    <section id="workshop" style="padding-top: 4.625em; padding-bottom: 8.5em">
        <h1 class="sr-only">Browse goods</h1>

        <div class="column flex-center q-px-md">
            <h2 class="text-h3">Explore the goods</h2>

            <ul class="flex q-gutter-x-xl q-mt-lg text-subtitle1">
                <li><q-checkbox label="All" size="lg" color="positive"></q-checkbox></li>
                <li><q-checkbox label="Gadgets" size="lg" color="positive"></q-checkbox></li>
                <li><q-checkbox label="Trinkets" size="lg" color="positive"></q-checkbox></li>
                <li><q-checkbox label="Craft" size="lg" color="positive"></q-checkbox></li>
            </ul>

            <ul class="flex flex-center q-mt-none q-pl-none q-gutter-lg">
                <li v-for="item in 10" :key="item" style="cursor: pointer">
                    <q-card class="card" style="max-width: 300px" flat bordered dark>
                        <div class="card__image-wrapper">
                            <q-img
                                class="card__image"
                                src="~assets/index/featured/image-2.avif"
                                style="height: 200px"
                            />
                        </div>

                        <q-card-section>
                            <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">Boots of swiftness</div>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-subtitle1 text-positive">Price: 500 gold</div>
                            <div class="text-caption text-grey">
                                Speedy boots for fast getaways. Run like a goblin on fire!
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                            <q-btn flat color="primary">
                                <q-icon name="attach_money" class="q-mr-sm q-px-xs" style="margin-left: -6px" />
                                Add to stash
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                    <!-- <q-img
                        src="~assets/index/featured/image-1.avif"
                        width="1024px"
                        height="1024px"
                        style="width: 100px; height: 100px"
                    />
                    <span>Boots of swift</span>
                    <span>Description</span>
                    <span>Price</span>
                    <span>Availability</span>
                    <q-btn>Add to cart</q-btn> -->
                </li>
            </ul>

            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    class="q-mt-md"
                    v-model="current"
                    color="positive"
                    size="1rem"
                    :max="10"
                    :max-pages="6"
                    :boundary-numbers="false"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
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

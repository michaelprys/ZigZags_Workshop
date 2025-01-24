<script setup lang="ts">
import { ref } from 'vue';

const slide = ref(1);
</script>

<template>
    <section class="section">
        <div class="column items-center">
            <div class="text-center">
                <h1 class="text-h3 text-secondary q-my-none">You want it?</h1>
                <h2 class="text-h5 text-warning">It's yours... for a price!</h2>
            </div>

            <div class="q-pa-md">
                <q-carousel
                    class="bg-transparent non-selectable"
                    style="width: 1200px"
                    v-model="slide"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    swipeable
                    animated
                    control-color="secondary"
                    padding
                    navigation
                    infinite
                    arrows
                    height="340px"
                >
                    <q-carousel-slide :name="1" class="no-wrap cursor-pointer">
                        <div class="row fit justify-start items-center no-wrap">
                            <q-img
                                class="q-mr-md rounded-borders col full-height"
                                src="src/assets/images/featured/image-7.jpeg"
                            />
                            <q-img
                                class="q-mr-md rounded-borders col-5 full-height"
                                src="src/assets/images/featured/image-8.jpeg"
                            />
                            <q-img
                                class="rounded-borders col full-height"
                                src="src/assets/images/featured/image-9.jpeg"
                            />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="2" class="no-wrap cursor-pointer">
                        <div class="row fit justify-start items-center no-wrap">
                            <q-img
                                class="q-mr-md rounded-borders col full-height"
                                src="src/assets/images/featured/image-2.jpeg"
                            />
                            <q-img
                                class="q-mr-md rounded-borders col-5 full-height"
                                src="src/assets/images/featured/image-1.jpeg"
                            />
                            <q-img
                                class="rounded-borders col full-height"
                                src="src/assets/images/featured/image-3.jpeg"
                            />
                        </div>
                    </q-carousel-slide>

                    <q-carousel-slide :name="3" class="no-wrap cursor-pointer">
                        <div class="row fit justify-start items-center no-wrap">
                            <q-img
                                class="q-mr-md rounded-borders col full-height"
                                src="src/assets/images/featured/image-4.jpeg"
                            />
                            <q-img
                                class="q-mr-md rounded-borders col-5 full-height"
                                src="src/assets/images/featured/image-5.jpeg"
                            />
                            <q-img
                                class="rounded-borders col full-height"
                                src="src/assets/images/featured/image-6.jpeg"
                            />
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.q-carousel__control {
    margin-top: -32px;
}
// .q-carousel__control .q-btn__content {
//     background-color: $primary !important;
//     border-radius: 100%;
//     transition: background-color 0.3s ease;

//     &:hover {
//         background-color: lighten($primary, 4%) !important;
//     }
// }
</style>

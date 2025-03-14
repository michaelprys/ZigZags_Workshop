<script setup lang="ts">
import { useStoreGoods } from 'src/stores/storeGoods';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const storeGoods = useStoreGoods();
const model = ref(null);

type Suggestion = {
    label: string;
    value: string;
    link: string;
};

const suggestions = ref<Suggestion[]>([]);

const formattedSuggestions = computed(() => {
    return storeGoods.suggestedGoods.map((good) => ({
        label: good.name,
        value: good.slug,
        link: `/goods/${good.category}/${good.slug}`
    }));
});

const filterFn = (val: string, update: (fn: () => void) => void) => {
    if (val.length < 1) {
        return;
    }

    if (val === '') {
        update(() => {
            suggestions.value = formattedSuggestions.value;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        suggestions.value = formattedSuggestions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
    });
};

const goToLink = async (option: Suggestion) => {
    const foundSuggestion = storeGoods.suggestedGoods.find(
        (suggestion) => suggestion.slug === option.value
    );

    if (foundSuggestion) {
        storeGoods.selectGood(foundSuggestion);
        await router.push(option.link);
    }
};

onMounted(async () => {
    await storeGoods.loadSuggestedGoods();
});
</script>

<template>
    <section id="intro" style="padding-top: 6.5em; padding-bottom: 8.5em">
        <h1 class="sr-only">Introduction</h1>

        <div class="flex flex-center q-px-md">
            <div class="relative-position shadow-8 text-center wrapper">
                <div class="column fit flex-center">
                    <div style="z-index: 1">
                        <h2 class="text-glow-dark text-h3 text-primary">Time is money, friend!</h2>
                        <h3 class="q-mt-lg text-h5 text-secondary">
                            I got the best deals anywhere
                        </h3>

                        <q-select
                            v-model="model"
                            :options="suggestions"
                            class="q-mt-lg"
                            label-color="info"
                            color="secondary"
                            dark
                            label="Search for goods"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="0"
                            style="width: 100%"
                            @filter="filterFn"
                            @update:model-value="goToLink"
                        >
                            <template #option="scope">
                                <q-item clickable @click="goToLink(scope.opt)">
                                    <q-item-section class="text-primary">
                                        <q-item-label>
                                            {{ scope.opt.label }}
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                            <template #no-option>
                                <q-item>
                                    <q-item-section class="text-primary">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>

                        <div class="q-pa-md">
                            <div class="q-gutter-md row"></div>
                        </div>
                    </div>
                </div>
                <div class="absolute-top fit" style="border-radius: var(--rounded)">
                    <q-parallax class="fit">
                        <template #media>
                            <video
                                class="wrapper__intro-video"
                                width="1516"
                                height="926"
                                poster="~assets/index/poster.avif"
                                loop
                                muted
                                autoplay
                            >
                                <source src="~assets/index/intro.mp4" type="video/mp4" />
                            </video>
                            <div class="layer"></div>
                        </template>
                    </q-parallax>
                </div>
            </div>
        </div>
    </section>

    <div class="separator"></div>
</template>

<style scoped>
.wrapper {
    position: relative;
    max-width: 92.5rem;
    width: 100%;
    height: 40rem;
}
</style>

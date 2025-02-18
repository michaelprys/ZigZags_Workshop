<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStoreGoods();
const model = ref(null);
const suggestions = ref([]);

const formattedSuggestions = computed(() => {
    return store.suggestedGoods.map((good) => ({
        label: good.name,
        value: good.slug,
        link: `/goods/${good.category}/${good.slug}`,
    }));
});

const filterFn = (val, update) => {
    if (val === '') {
        update(() => {
            suggestions.value = formattedSuggestions.value;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        suggestions.value = formattedSuggestions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1,
        );
    });
};

const goToLink = async (option) => {
    const foundSuggestion = store.suggestedGoods.find(
        (suggestion) => suggestion.slug === option.value,
    );

    if (foundSuggestion) {
        store.selectGood(foundSuggestion);
        await router.push(option.link);
    }

    console.log('Found suggestion:', foundSuggestion);
    console.log('Selected good:', store.selectedGood);
};

onMounted(async () => {
    await store.loadSuggestedGoods();
});
</script>

<template>
    <section id="intro" style="padding-top: 6.5em; padding-bottom: 8.5em">
        <h1 class="sr-only">Introduction</h1>

        <div class="flex flex-center q-px-md">
            <div
                class="relative-position section__wrapper shadow-8 text-center"
            >
                <div class="column fit flex-center">
                    <div style="z-index: 1">
                        <h2 class="text-glow-dark text-h3 text-primary">
                            Time is money, friend!
                        </h2>
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
                            @update:modelValue="goToLink"
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
                <div
                    class="absolute-top fit"
                    style="border-radius: var(--rounded)"
                >
                    <q-parallax class="fit">
                        <template #media>
                            <video
                                width="1516"
                                height="926"
                                style="
                                    object-fit: cover;
                                    filter: brightness(150%);
                                "
                                poster="~assets/index/poster.avif"
                                loop
                                muted
                                autoplay
                            >
                                <source
                                    src="~assets/index/intro.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </template>
                    </q-parallax>
                </div>
            </div>
        </div>
    </section>

    <div class="divider"></div>
</template>

<style scoped>
.section__wrapper {
    width: 100%;
    max-width: 92.5rem;
    height: 40rem;
}
</style>

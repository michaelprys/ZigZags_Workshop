<script setup lang="ts">
import IndexIntro from 'src/components/index/IndexIntro.vue';
import IndexFeatured from 'src/components/index/IndexFeatured.vue';
import IndexBlackMarket from 'src/components/index/IndexBlackMarket.vue';
</script>

<template>
    <q-page class="q-pa-md">
        <IndexIntro />
        <div class="divider"></div>
        <IndexFeatured />
        <div class="divider"></div>
        <IndexBlackMarket />
    </q-page>
</template>

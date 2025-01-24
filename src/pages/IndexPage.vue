<script setup lang="ts">
import HomeIntro from 'src/components/home/HomeIntro.vue';
import HomeFeatured from 'src/components/home/HomeFeatured.vue';
</script>

<template>
    <q-page class="row items-center justify-evenly">
        <div>
            <HomeIntro />
            <HomeFeatured />
        </div>
    </q-page>
</template>

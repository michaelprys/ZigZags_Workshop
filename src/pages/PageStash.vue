<script setup lang="ts">
import StashDialog from 'src/components/stash/StashDialog.vue';
import StashEmpty from 'src/components/stash/StashEmpty.vue';
import StashItems from 'src/components/stash/StashItems.vue';
import StashSuccess from 'src/components/stash/StashSuccess.vue';
import { useStoreBalance } from 'src/stores/useStoreBalance';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const storeGoods = useStoreGoods();
const dialog = ref(false);
</script>

<template>
    <q-page>
        <StashDialog v-model="dialog" />

        <Transition name="fade">
            <StashItems @openDialog="dialog = true" v-if="storeGoods.stashGoods.length > 0" />
            <!-- <StashSuccess v-else-if="storeGoods.stashGoods.length === 0 && isSuccess" /> -->
            <StashEmpty v-else />
        </Transition>
    </q-page>
</template>

<script setup lang="ts">
import StashDialog from 'src/components/stash/StashDialog.vue';
import StashEmpty from 'src/components/stash/StashEmpty.vue';
import StashItems from 'src/components/stash/StashItems.vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { ref } from 'vue';

const storeGoods = useStoreGoods();
const dialog = ref(false);
</script>

<template>
    <q-page>
        <div>
            <StashDialog v-model="dialog" />

            <Transition name="fade">
                <StashItems @openDialog="dialog = true" v-if="storeGoods.stashGoods.length > 0" />
                <StashEmpty v-else />
            </Transition>
        </div>
    </q-page>
</template>

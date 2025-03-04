<script setup lang="ts">
import StashDialog from 'src/components/stash/StashDialog.vue';
import StashEmpty from 'src/components/stash/StashEmpty.vue';
import StashItems from 'src/components/stash/StashItems.vue';
import StashSuccess from 'src/components/stash/StashSuccess.vue';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const storeGoods = useStoreGoods();
const dialog = ref(false);
const isSuccess = ref(false);
const pending = ref(true);

watch(isSuccess, (newValue) => {
    localStorage.setItem('isSuccess', newValue.toString());
});

onBeforeRouteLeave(() => {
    isSuccess.value = false;
    localStorage.removeItem('isSuccess');
});

onMounted(() => {
    isSuccess.value = localStorage.getItem('isSuccess') === 'true';
    pending.value = false;
});
</script>

<template>
    <q-page>
        <div v-if="!pending">
            <StashDialog v-model="dialog" @trade="isSuccess = true" />

            <Transition name="fade">
                <StashItems @openDialog="dialog = true" v-if="storeGoods.stashGoods.length > 0" />
                <StashSuccess v-else-if="storeGoods.stashGoods.length === 0 && isSuccess" />
                <StashEmpty v-else />
            </Transition>
        </div>
    </q-page>
</template>

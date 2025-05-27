<script setup>
import { useQuasar } from 'quasar';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreInventory } from 'src/stores/storeInventory';
import { callToast } from 'src/utils/callToast';
import { delay } from 'src/utils/delay';
import supabase from 'src/utils/supabase';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const storeAuth = useStoreAuth();
const storeInventory = useStoreInventory();
const router = useRouter();
const $q = useQuasar();

const isLeft = ref(false);

const leaveVault = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        callToast(error ? 'Unable to leave the vault' : 'Something went wrong', false);
        return;
    } else {
        await storeAuth.checkSession();
        await delay(150);
        callToast('Safe travels!', true);
        storeInventory.inventoryGoods = [];
        isLeft.value = true;
    }
};

const alert = () => {
    $q.dialog({
        dark: true,
        title: 'Exit',
        message: 'Are you sure you want to leave?',
        ok: {
            label: 'Yes',
            color: 'secondary',
            'text-color': 'dark'
        },
        cancel: {
            label: 'No',
            flat: true,
            'text-color': 'primary'
        },
        style: 'padding: 1rem; border-radius: 0.5em'
    })
        .onOk(() => {
            leaveVault()
                .then(() => {
                    return router.push({ name: 'access-vault' });
                })
                .catch((err) => {
                    console.error('Error leaving vault: ', err);
                });
        })
        .onCancel(() => {})
        .onDismiss(() => {});
};

const userFaction = ref('');

const determineFaction = async () => {
    const faction = storeAuth.session?.user_metadata.faction;

    if (faction === 'Horde') {
        userFaction.value = 'horde';
    } else if (faction === 'Alliance') {
        userFaction.value = 'alliance';
    } else if (faction === 'No faction (Outsiders)') {
        userFaction.value = 'outsiders';
    } else {
        await delay(150);
        userFaction.value = '';
    }
};

const imgSrc = (ext) => {
    return new URL(`/src/assets/vault/${userFaction.value}.${ext}`, import.meta.url).href;
};

onMounted(async () => {
    await storeAuth.checkSession();
});

watch(
    () => storeAuth.session?.user_metadata?.faction,
    () => {
        determineFaction();
    },
    { immediate: true }
);
</script>

<template>
    <div class="header">
        <div class="title-wrapper">
            <div class="q-ma-none" style="cursor: pointer">
                <q-img
                    class="faction-img"
                    :src="`${imgSrc('avif')}`"
                    width="819px"
                    height="819px"
                />
                <q-tooltip
                    :delay="500"
                    class="bg-primary text-center"
                    anchor="center start"
                    self="bottom end"
                >
                    <span class="text-caption text-negative">{{ userFaction }}</span>
                </q-tooltip>
            </div>

            <h2 class="title text-center text-h6">
                {{ storeAuth.session?.user_metadata?.first_name }}'s Inventory
            </h2>
        </div>

        <q-btn class="alert-btn" icon="logout" color="primary" flat dense @click="alert"></q-btn>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.header {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr auto 1fr;
    color: $primary;
    font-size: 1.2rem;
    text-align: center;
    position: relative;
}
.faction-img {
    width: 2.2rem !important;
    height: 2.5rem !important;
}
.title {
    grid-column-start: 2;
}
.title-wrapper {
    grid-column-start: 2;
    display: flex;
    align-items: center;
    gap: 16px;
}
.alert-btn {
    justify-self: end;
    grid-column-start: 3;
}

@media (width <= $breakpoint-md) {
    .title {
        font-size: map.get($subtitle1, 'size');
    }
    .faction-img {
        width: 1.8rem !important;
        height: 2rem !important;
    }
}
@media (width <= $breakpoint-sm) {
    .header {
        display: flex;
        justify-content: space-between;
    }
}
@media (width <= $breakpoint-xs) {
    .title {
        font-size: map.get($subtitle2, 'size');
    }
}
</style>

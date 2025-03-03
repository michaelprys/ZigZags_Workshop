<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreAuth } from 'src/stores/useStoreAuth';
import { useStoreGoods } from 'src/stores/useStoreGoods';
import { callToast } from 'src/utils/callToast';
import supabase from 'src/utils/supabase';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const storeGoods = useStoreGoods();
const storeAuth = useStoreAuth();
const router = useRouter();
const $q = useQuasar();

const leaveVault = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        callToast(error ? 'Unable to leave the vault' : 'Something went wrong', false);
    } else {
        await storeAuth.checkSession();
        if (storeGoods.goods.find((good) => good.requires_access === true)) {
            localStorage.removeItem('goods');
        }
        callToast('Safe travels!', true);
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
            'text-color': 'dark',
        },
        cancel: {
            label: 'No',
            flat: true,
            'text-color': 'primary',
        },
        style: 'padding: 1rem',
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

const determineFaction = computed(() => {
    const faction = storeAuth.session?.user_metadata.faction;

    if (faction === 'Horde') {
        return 'horde';
    } else if (faction === 'Alliance') {
        return 'alliance';
    } else {
        return 'outsiders';
    }
});

const imgSrc = (ext) => {
    return new URL(`/src/assets/vault/${determineFaction.value}.${ext}`, import.meta.url).href;
};

onMounted(async () => {
    await storeAuth.checkSession();
});
</script>

<template>
    <div class="header">
        <div class="header__title-wrapper">
            <div class="q-ma-none" style="cursor: pointer">
                <q-img
                    :src="`${imgSrc('avif')}`"
                    width="819px"
                    height="819px"
                    style="width: 2.2rem; height: 2.5rem"
                />
                <q-tooltip
                    :delay="500"
                    class="bg-primary text-center"
                    anchor="center start"
                    self="bottom end"
                >
                    <span class="text-caption text-negative">{{ determineFaction }}</span>
                </q-tooltip>
            </div>
            <h2 class="text-center text-h6 header__title">
                {{ storeAuth.session?.user_metadata.first_name }}'s Inventory
            </h2>
        </div>

        <q-btn
            class="header__alert-btn"
            icon="close"
            color="primary"
            flat
            dense
            @click="alert"
        ></q-btn>
    </div>
</template>

<style scoped>
.header {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr auto 1fr;
    color: var(--q-primary);
    font-size: 1.2rem;
    text-align: center;
    position: relative;
}
.header__title {
    grid-column-start: 2;
}
.header__title-wrapper {
    grid-column-start: 2;
    display: flex;
    align-items: center;
    gap: 16px;
}
.header__alert-btn {
    justify-self: end;
    grid-column-start: 3;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from 'src/clients/supabase';

const vault = ref(null);

const getCurrentOwner = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error('Error getting current user', error);
    } else {
        vault.value = data.session;
    }
};

const leaveVault = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    } else {
        console.log('You have successfully left the vault');
    }
};

const router = useRouter();

const currentPage = ref(1);

const $q = useQuasar();

const alert = () => {
    $q.dialog({
        dark: true,
        title: 'Exit',
        message: 'Are you sure you want to leave the vault?',
        ok: {
            label: 'Yes',
            color: 'secondary',
            'text-color': 'dark',
        },
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
    const faction = vault.value?.user.user_metadata.faction;

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
    await getCurrentOwner();
});
</script>

<template>
    <q-page>
        <section
            id="vault"
            class="flex flex-center"
            style="padding-top: 4.625em; padding-bottom: 8.5em; min-height: calc(100svh - 4.625em)"
        >
            <h1 class="sr-only">Vault</h1>

            <div class="q-px-md">
                <div class="q-pa-lg storage">
                    <div class="storage__inner">
                        <div class="flex items-center justify-between storage__header">
                            <div style="cursor: pointer">
                                <q-img
                                    :src="`${imgSrc('png')}`"
                                    width="819px"
                                    height="819px"
                                    style="justify-self: left; width: 2.2rem; height: 2.5rem"
                                />
                                <q-tooltip class="bg-primary text-center" anchor="center end" self="bottom start">
                                    <span class="text-caption text-negative">{{ determineFaction }}</span>
                                </q-tooltip>
                            </div>

                            <h2 class="text-h6">{{ vault?.user.user_metadata.first_name }}'s Inventory</h2>

                            <q-btn icon="close" color="grey" flat dense @click="alert"></q-btn>
                        </div>

                        <div class="q-mt-lg storage__cells">
                            <div v-for="i in 28" :key="i" class="storage__cell">
                                <q-tooltip
                                    anchor="bottom right"
                                    self="center start"
                                    class="bg-primary column text-center text-dark"
                                    style="width: 11.25rem"
                                >
                                    <span class="text-caption text-negative">Boots of swiftness</span>
                                    <span> Speedy boots for fast getaways. Run like a goblin on fire! </span>
                                </q-tooltip>

                                <div class="storage__cell-placeholder"></div>
                                <!-- <q-img
                                    class="storage__cell-image"
                                    src="~assets/index/featured/image-1.avif"
                                    width="1024px"
                                    height="1024px"
                                    style="width: 4.8125rem; height: 4.8125rem"
                                /> -->
                            </div>
                        </div>

                        <div class="storage__footer">
                            <q-pagination
                                v-model="currentPage"
                                class="q-mt-lg storage__nav"
                                :max="3"
                                direction-links
                                flat
                                input
                                input-class="text-primary"
                            />

                            <div class="flex q-mt-lg storage__gold-panel" style="gap: 0.75rem">
                                <q-btn icon="add" flat dense></q-btn>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/gold.avif" width="18px" height="18px" />
                                    <q-tooltip anchor="bottom right" self="center start" class="bg-primary text-center">
                                        <span class="text-caption text-negative">Gold</span>
                                    </q-tooltip>
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/ruby.avif" width="18px" height="18px" />
                                    <q-tooltip
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative">Crimson gems</span>
                                    </q-tooltip>
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/gamblers-lootbox.avif" width="22px" height="22px" />
                                    <q-tooltip
                                        anchor="bottom right"
                                        self="center start"
                                        class="bg-primary text-center text-dark"
                                    >
                                        <span class="text-caption text-negative">Gambler's lootbox</span>
                                    </q-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped>
.storage {
    background-color: var(--q-dark-page);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
}

.storage__header {
    width: 100%;
}
.storage__header h2 {
    grid-column-start: 2;
}
.storage__header .q-btn {
    justify-self: end;
    grid-column-start: 3;
}

.storage__cells {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    grid-template-areas:
        '. . . . . .'
        '. . . . . .'
        '. . . . . .'
        '. . . . . .';
}

.storage__cell {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    width: 5.25rem;
    height: 5.25rem;
    border-radius: 0.625rem;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2));
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.2),
        inset 0 0 5px rgba(255, 255, 255, 0.5);
    overflow: hidden;
}

.storage__cell-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2a2a2a, #1f1f1f, #0a0a0a);
    box-shadow:
        0 0 15px rgba(255, 255, 255, 0.1),
        inset 0 0 10px rgba(255, 255, 255, 0.3);
}

.storage__cell-image {
    user-select: none;
}

.storage__footer {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0px 0px;
    width: 100%;
}

.storage__nav {
    grid-column-start: 2;
    justify-self: center;
}

:deep(.storage__nav button:last-child),
:deep(.storage__nav button:first-child) {
    display: none;
}
:deep(.storage__nav .q-btn[disabled]) {
    cursor: default !important;
    pointer-events: none !important;
}
:deep(.storage__nav .q-btn),
:deep(.storage__nav .q-btn .q-icon) {
    cursor: pointer !important;
}
:deep(.storage__nav .q-btn[disabled] .q-icon),
:deep(.storage__nav .q-icon),
:deep(.storage__nav span) {
    cursor: default !important;
}
:deep(.storage__nav label) {
    pointer-events: none !important;
    user-select: none !important;
}

.storage__gold-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--q-medium);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
    grid-column-start: 3;
    justify-self: end;
    padding-right: 0.285em;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

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
            router
                .push({ name: 'access-vault' })
                .then(() => {})
                .catch(() => {});
        })
        .onCancel(() => {})
        .onDismiss(() => {});
};
</script>

<template>
    <q-page>
        <section id="vault" class="flex flex-center" style="padding-bottom: 8.5em; min-height: 100svh">
            <h1 class="sr-only">Vault</h1>
            <div class="q-px-md">
                <div class="q-pa-lg storage">
                    <div class="storage__inner">
                        <div class="flex items-center justify-between storage__header">
                            <h2 class="text-grey text-h5">Item slots</h2>
                            <q-btn icon="close" color="grey" flat dense @click="alert"></q-btn>
                        </div>

                        <div class="q-mt-lg storage__cells">
                            <div v-for="i in 24" :key="i" class="storage__cell">
                                <q-tooltip
                                    anchor="bottom right"
                                    self="center start"
                                    class="bg-primary column text-center text-dark"
                                    style="width: 11.25rem"
                                >
                                    <span class="text-caption text-negative">Boots of swiftness</span>
                                    <span> Speedy boots for fast getaways. Run like a goblin on fire! </span>
                                </q-tooltip>
                                <q-img
                                    class="storage__cell-frame"
                                    src="~assets/vault/cell-frame.avif"
                                    width="189px"
                                    height="173px"
                                    style="max-width: 110px; height: 100%"
                                />
                                <div class="storage__cell-placeholder"></div>
                                <q-img
                                    class="storage__cell-image"
                                    src="~assets/index/featured/image-2.avif"
                                    width="1024px"
                                    height="1024px"
                                    style="max-width: 77px; height: 77px"
                                />
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
                                color="transparent"
                            />

                            <div class="flex q-mt-lg storage__gold-panel" style="gap: 0.75rem">
                                <q-btn icon="add" color="grey" flat dense></q-btn>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/gold.avif" width="18px" height="18px" />
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/ruby.avif" width="18px" height="18px" />
                                </div>
                                <div class="flex items-center q-gutter-x-sm">
                                    <span>0</span>
                                    <q-img src="~assets/vault/mystic-trinket-box.avif" width="22px" height="22px" />
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
    user-select: none;
}

.storage__inner {
}

.storage__header {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0px 0px;
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
    max-width: 49.375rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    grid-template-areas:
        '. . . . . .'
        '. . . . . .'
        '. . . . . .'
        '. . . . . .';
    background-color: var(--q-dark-page);
    border: 1px solid var(--q-gold-frame);
    border-radius: var(--rounded);
    /* padding: 0.5rem; */
}

.storage__cell {
    position: relative;
    cursor: pointer;
}

.storage__cell-frame {
    z-index: 10;
}

.storage__cell-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.storage__cell-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    background: #2e2e2e;
    background: linear-gradient(135deg, #2e2e2e, #000000);
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
:deep(.storage__nav .q-icon) {
    background-image: url('src/assets/vault/nav-button.avif');
    width: 45px;
    height: 100%;
    z-index: 10;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
:deep(.storage__nav .q-btn:nth-child(2)) {
    transform: rotate(180deg) scaleY(-1);
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

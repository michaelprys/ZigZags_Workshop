<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreInventory } from 'src/stores/storeInventory';
import { computed, onMounted } from 'vue';
import { vDraggable } from 'vue-draggable-plus';

const storeInventory = useStoreInventory();
const { updateGoodSlot, removeGoodFromInventory, loadInventoryGoods } = storeInventory;

const inventoryGoods = computed(() => storeInventory.inventoryGoods);

const $q = useQuasar();

const handleRemoveItem = async (selectedGood) => {
    $q.dialog({
        dark: true,
        title: 'Remove item',
        message: 'This action is irreversible',
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
        style: 'padding: 1rem'
    })
        .onOk(async () => {
            try {
                await removeGoodFromInventory(selectedGood);
            } catch (error) {
                console.error('Error removing good from inventory: ', error);
            }
        })
        .onCancel(() => {})
        .onDismiss(() => {});
};

// const handleSlots = async (event) => {
//     const goodId = inventoryGoods[event.newIndex].good_id;
//     const nextSlot = event.newIndex;
//     await updateGoodSlot(goodId, nextSlot);
//     await loadInventoryGoods();
// };

onMounted(async () => {
    await loadInventoryGoods();
});
</script>

<template>
    <ul
        v-draggable="[
            inventoryGoods,
            {
                animation: 150,
                onUpdate: handleSlots
            }
        ]"
        class="q-mt-lg slots"
    >
        <template v-for="(slot, idx) in 55" :key="idx">
            <li class="slot">
                <div class="placeholder"></div>

                <Transition name="remove">
                    <div v-if="inventoryGoods[idx] && inventoryGoods[idx].goods">
                        <div
                            style="
                                position: absolute;
                                top: 15px;
                                z-index: 150;
                                color: red;
                                font-weight: bold;
                                font-size: 24px;
                            "
                        >
                            {{ inventoryGoods[idx].slot }}
                        </div>
                        <q-tooltip
                            :delay="500"
                            anchor="bottom right"
                            self="center start"
                            class="bg-primary column text-center text-dark"
                            style="width: 11.25rem"
                        >
                            <span class="text-caption text-negative">{{
                                inventoryGoods[idx].goods.name
                            }}</span>
                            <span>{{ inventoryGoods[idx].goods.short_description }}</span>
                        </q-tooltip>

                        <q-btn
                            class="btn-close"
                            dense
                            flat
                            size="xs"
                            icon="close"
                            @click="handleRemoveItem(inventoryGoods[idx].good_id)"
                        ></q-btn>

                        <div class="quantity">
                            {{ inventoryGoods[idx].quantity }}
                        </div>

                        <q-img
                            class="image"
                            :src="inventoryGoods[idx].goods.image_url"
                            width="1024px"
                            height="1024px"
                            style="width: 100%; height: 100%"
                        />
                    </div>
                </Transition>
            </li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>
.slots {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    place-items: center;
}
.slot {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    width: 5.25rem;
    height: 5.25rem;
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    &:hover {
        box-shadow: 0 1px 12px rgba(92, 90, 78, 0.6);
    }
}
.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    background-color: rgb(23, 23, 23);
}
.quantity {
    position: absolute;
    bottom: 3px;
    right: 3px;
    padding-inline: 0.25em;
    height: 1.0625rem;
    background-color: $dark;
    color: $primary;
    z-index: 1;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    border: 2px solid rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
}
.placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, rgba(45, 45, 45, 0.7), rgba(25, 25, 25, 0.9));
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.05);
    transition:
        border-color 0.15s,
        box-shadow 0.15s;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent);
        border-radius: 0.18rem;
    }
}
.image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    user-select: none;
    border-radius: $rounded;
    filter: contrast(95%) brightness(95%);
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: $rounded;
        z-index: 3;
    }
}
</style>

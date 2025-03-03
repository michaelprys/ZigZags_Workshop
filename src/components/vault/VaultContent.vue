<script setup lang="ts">
import { vDraggable } from 'vue-draggable-plus';

const list = [1, 2, 3];
</script>

<template>
    <ul
        v-draggable="[
            list,
            {
                animation: 150,
            },
        ]"
        class="q-mt-lg slots"
    >
        <li v-for="i in 55" :key="i" class="slots__item">
            <q-tooltip
                :delay="500"
                anchor="bottom right"
                self="center start"
                class="bg-primary column text-center text-dark"
                style="width: 11.25rem"
            >
                <span class="text-caption text-negative">Boots of swiftness</span>
                <span> Speedy boots for fast getaways. Run like a goblin on fire! </span>
            </q-tooltip>

            <div class="slots__item-placeholder"></div>
            <!-- <q-img
                                    class="slots__item-image"
                                    src="https://placehold.co/500"
                                    width="1024px"
                                    height="1024px"
                                    style="width: 100%; height: 100%"
                                /> -->
        </li>
    </ul>
</template>

<style scoped>
.slots {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    place-items: center;
}

.slots__item:hover {
    box-shadow: 0 1px 12px rgba(92, 90, 78, 0.6);
}

.slots__item {
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
}

.slots__item-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, rgba(45, 45, 45, 0.7), rgba(25, 25, 25, 0.9));
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
}

.slots__item-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 0.18rem;
}

.slots__item-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
    user-select: none;
    border-radius: var(--rounded);
    filter: grayscale(20%) contrast(90%) brightness(90%);
}
.slots__item-image::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid rgb(120, 120, 120);
    border-radius: var(--rounded);
    z-index: 3;
}
</style>

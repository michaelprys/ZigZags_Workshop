<template>
    <q-tooltip
        :delay="500"
        anchor="center right"
        self="top start"
        class="column text-center text-dark"
        style="
            background-color: var(--q-dark);
            border: 1px solid color-mix(in srgb, var(--q-primary) 50%, #00bcd4 90%);
            border-radius: var(--rounded);
            box-shadow:
                0px 3px 8px rgba(0, 0, 0, 0.4),
                2px 5px 12px #00bcd4;
        "
    >
        <span class="text-caption" style="color: #00bcd4">Enchantable</span>
    </q-tooltip>
</template>

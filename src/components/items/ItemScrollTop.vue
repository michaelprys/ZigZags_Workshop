<script setup lang="ts">
import IconArrow from 'src/components/icons/IconArrow.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isCrossed = ref(false);

const handleScroll = () => {
    if (window.scrollY >= 360) {
        isCrossed.value = true;
    } else {
        isCrossed.value = false;
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    handleScroll();
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <q-btn
        class="scroll-top-btn fade-in-secondary"
        :class="{ 'is-crossed': isCrossed, 'is-not-crossed': !isCrossed }"
        aria-label="Go to the beginning of the page"
        style="box-shadow: inset 0 0 0 12.5rem rgba(255, 255, 255, 0.08)"
        @click="scrollToTop"
    >
        <IconArrow />
    </q-btn>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.scroll-top-btn {
    z-index: 300;
    position: fixed;
    bottom: 3.8rem;
    right: 3rem;
    border-radius: 0.3rem;
    background-color: rgba(35, 35, 35, 0.3);
    padding: 0.5em;
    -webkit-user-drag: none;
    color: $primary;
    backdrop-filter: blur(0.5rem);
    transition:
        transform 0.3s linear,
        background-color 0.1s linear;
    box-shadow: inset 0 0 0 12.5rem rgba(255, 255, 255, 0.08);
    & svg {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &:hover {
        transform: translateY(-0.5rem);
        background-color: rgba(35, 35, 35, 1);
    }
    &.is-crossed {
        transform: translateY(0);
    }
    &.is-not-crossed {
        transform: translateY(700%);
    }
}
</style>

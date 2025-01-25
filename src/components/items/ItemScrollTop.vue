<script setup lang="ts">
import IconArrow from 'src/components/icons/IconArrow.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isCrossed = ref(false);

function scrollToTop() {
    if (window.scrollY >= 360) {
        isCrossed.value = true;
    } else {
        isCrossed.value = false;
    }
}

onMounted(() => {
    window.addEventListener('scroll', scrollToTop);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollToTop);
});
</script>

<template>
    <a
        class="custom-button fade-in-secondary"
        :class="{ 'is-crossed': isCrossed, 'is-not-crossed': !isCrossed }"
        href="#"
        aria-label="Go to the beginning of the page"
        style="box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.08)"
    >
        <IconArrow />
    </a>
</template>

<style scoped>
.custom-button {
    position: fixed;
    bottom: 3.8rem;
    right: 3rem;
    border-radius: 0.1875rem;
    background-color: rgba(35, 35, 35, 0.3);
    padding: 0.5em;
    color: var(--q-primary);
    backdrop-filter: blur(0.5rem);
    transition:
        transform 0.3s linear,
        background-color 0.1s linear;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.08);
}
.custom-button svg {
    display: flex;
    align-items: center;
    justify-content: center;
}
.custom-button:hover {
    transform: translateY(-0.5rem);
    background-color: rgba(35, 35, 35, 1);
}
.custom-button.is-crossed {
    transform: translateY(0);
}
.custom-button.is-not-crossed {
    transform: translateY(700%);
}
</style>

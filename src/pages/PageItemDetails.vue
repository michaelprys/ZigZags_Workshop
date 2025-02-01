<script setup lang="ts"></script>

<template>
    <section id="item-details" style="padding-top: 0.2rem; padding-bottom: 10.5em">
        <h1 class="sr-only">Item details</h1>

        <div class="flex" style="max-width: 53.3125rem; margin-inline: auto">
            <q-img class="book__img" src="~assets/index/featured/image-1.avif" />

            <div class="content">
                <div class="column">
                    <h2 class="text-bold text-h5">Category: Gadgets</h2>

                    <p class="q-mt-lg text-body2" style="text-align: justify">
                        "Boots of Swiftness" are a coveted item in the goblin workshop, designed to enhance speed and
                        agility. Crafted with precision and a dash of goblin ingenuity, these boots allow the wearer to
                        move faster than ever before. Whether you're escaping a sticky situation or making a quick
                        getaway, these boots ensure you're always one step ahead.
                    </p>

                    <span class="q-mt-sm text-h6">Price: 500 gold</span>

                    <q-btn class="button q-mt-sm" outline color="secondary" style="max-width: 6rem">Purchase</q-btn>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.book__img {
    width: 380px;
    height: 380px;
    /* mask-image: radial-gradient(circle, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0) 68%); */
    /* filter: sepia(0.7) brightness(85%) hue-rotate(-13deg); */
    user-select: none;
}

.content {
}

.button {
    border: 1px solid var(--q-text-book);
    color: var(--q-text-book);
}
</style>

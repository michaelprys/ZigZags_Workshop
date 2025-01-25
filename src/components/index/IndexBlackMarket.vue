<script setup lang="ts"></script>

<template>
    <section class="section">
        <div class="black-market">
            <div
                class="rounded shadow-8"
                style="
                    background-image: url('src/assets/index/black-market/bg.jpeg');
                    width: 45%;
                    height: 307px;
                    background-position: 0% 82%;
                    background-size: cover;
                "
                spinner-color="white"
            />
            <div style="width: 55%">
                <h1 class="q-mb-lg q-mt-none text-h3">Goblin Black Market</h1>
                <div class="text-info">
                    <p class="q-mt-none text-h6">
                        All shiny stuff from Goblin Black Market come with <i class="text-primary">zero</i> guarantees!
                        Not deadly (well, <i>mostly</i>), but these trinkets pack wild surprises that'll leave ya
                        cacklin' or cryin'! The Black Market ain't for softlings — it's where power beyond imagining
                        waits clever (or crazy) enough to snatch it! But don't worry, if you just want somethin' useful,
                        we've got treasures for every sneaky, greedy, grubby need!
                    </p>
                    <p class="text-sm">
                        <span class="text-negative">Warning:</span> Use at your own risk! Once you grab it, no refunds —
                        and don't bother tryin' to haggle!
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.black-market {
    margin-inline: auto;
    display: flex;
    gap: 3rem;
    width: 1400px;
}
</style>

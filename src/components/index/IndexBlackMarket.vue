<script setup lang="ts"></script>

<template>
    <section
        id="black-market"
        style="position: relative; padding-top: 9.8125em; padding-bottom: 8.5em"
    >
        <h1 class="sr-only">The Black Market</h1>

        <div class="flex flex-center q-px-md">
            <div
                style="
                    display: flex;
                    gap: 2.8rem;
                    max-width: 87.5rem;
                    border-radius: var(--rounded);
                "
            >
                <q-img
                    class="shadow-8"
                    src="~assets/index/black-market.avif"
                    style="width: 45%; border-radius: var(--rounded)"
                />

                <div style="width: 55%">
                    <h2 class="text-h3">Goblin Black Market</h2>
                    <div class="q-mt-lg text-info">
                        <p class="text-subtitle1">
                            All shiny stuff from the Black Market come with
                            <i class="text-primary">zero</i> guarantees! Not deadly (well,
                            <i>mostly</i>), but these trinkets pack wild surprises that'll leave ya
                            cacklin' or cryin'! The Black Market ain't for softlings — it's where
                            power beyond imagining waits clever (or crazy) enough to snatch it! But
                            don't worry, if you just want somethin' useful, we've got treasures for
                            every sneaky, greedy, grubby need!
                        </p>
                        <p class="q-mt-md text-caption text-negative">
                            Warning: Enter at your own risk! Once ya buy somethin', it's yours — no
                            refunds. And don't bother tryin' to haggle!
                        </p>
                        <q-btn class="q-mt-md text-subtitle1" outline color="secondary">
                            <RouterLink :to="{ name: 'merchant' }">Get an invitation</RouterLink>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>

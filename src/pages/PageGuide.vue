<script setup lang="ts"></script>

<template>
    <Transition name="fade" mode="out-in">
        <q-page>
            <section id="guide" style="padding-bottom: 4rem">
                <h1 class="sr-only">Guide</h1>

                <q-parallax
                    src="~assets/guide/header.avif"
                    style="width: 100%; height: 29rem; object-fit: cover"
                    alt="Goblin Black Market"
                >
                </q-parallax>

                <div class="flex flex-center q-px-md" style="max-width: 90rem; margin-inline: auto; padding-top: 4em">
                    <div>
                        <h2 class="text-h3">Origins</h2>
                        <p class="q-mt-lg text-info text-subtitle1">
                            ZigZag, a goblin with a knack for tinkering, never settled for just fixing wagons and
                            snatching up a few copper. After a bunch of mishaps, he slapped together his own workshop,
                            built from scraps and borrowed blueprints. His gadgets started catching the eye of
                            adventurers, but ZigZag's sights were set higher. He dipped his toes into the Goblin Black
                            Market, selling rare trinkets to the shady folk. Now, ZigZag's known as a trusted merchant,
                            always one step ahead of the law... and his rivals. But there's one thing that gets ZigZag's
                            heart racing more than anything — the Mystic Trinket Boxes. The moment one shows up, his
                            eyes light up, and he'd trade anything for it. Why? Because these boxes are a rare gem,
                            stuffed with magical goodies... or so the stories say. Most adventurers are too scared to
                            open 'em, afraid of the wild, unpredictable magic that could come pouring out. But ZigZag?
                            He knows deep down, there's always something
                            <i>good</i>
                            hiding inside, and he'll go to any lengths to get his hands on one. Those boxes... they're
                            his true obsession.
                        </p>
                    </div>

                    <div style="padding-bottom: 8.5em" class="q-my-xl">
                        <h2 class="q-mt-xl text-h4" style="text-align: center">Zigzag's Workshop</h2>

                        <div class="column q-mt-xl text-info">
                            <div
                                class="flex flex-center justify-between q-gutter-x-lg q-mb-lg"
                                style="width: 100%; max-width: 52.5rem; margin-inline: auto"
                            >
                                <div class="column" style="width: 50%">
                                    <span class="q-mt-sm text-subtitle1">Smuggler's Alley, Tinker Town</span>
                                    <span class="q-mt-sm text-subtitle1"> Operating Hours: </span>
                                    <span class="q-mt-sm text-subtitle1"> Monday to Saturday, 8 AM - 6 PM; </span>
                                    <span class="q-mt-sm text-subtitle1">
                                        Closed on Sundays (<i>unless there's a big deal</i>).
                                    </span>
                                    <span class="q-mt-sm text-secondary text-subtitle1">
                                        Custom engineering orders, Explosive discounts, Sneaky deals.
                                    </span>
                                </div>

                                <q-img
                                    style="
                                        width: 16.5rem;
                                        mix-blend-mode: screen;
                                        filter: contrast(103%) brightness(87%) grayscale(35%);
                                    "
                                    src="~assets/guide/image-3.avif"
                                />
                            </div>

                            <div class="flex">
                                <span class="q-mt-xl text-h4 text-primary">Don't Get Lost!</span>
                                <p class="q-mt-lg text-subtitle1">
                                    Head down Smuggler's Alley, just past the big, rusty cannon and the smoke billowing
                                    out of that old barrel shop. If you're lost, just follow the smell of burning metal.
                                    And don't worry about the big green goblin on the roof — he doesn't bite… unless you
                                    try to steal anything!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <div style="padding-top: 6.625em">
                    <h2 class="text-h3 text-primary" style="text-align: center">The Black Market</h2>

                    <div class="flex flex-center q-mt-xl relative-position">
                        <div class="map-texture" />

                        <div class="map q-mb-lg q-mt-none" />
                    </div>

                    <div
                        class="column q-gutter-y-sm q-mt-lg q-px-md text-info"
                        style="max-width: 90rem; margin-inline: auto"
                    >
                        <p class="q-mt-xl text-subtitle1">
                            <span class="text-h4 text-primary">Beneath</span> the Undercity, where the air smells like
                            rat soup and the sewers are a mess, lies the <i>Goblin Black Market</i> — a place as old as
                            time itself, hidden from the light. Only those with an <b>Whispering Rune</b> can hear the
                            secrets it whispers and unlock the hidden entrance — and you better keep your wits about ya.
                            Inside? It's a wild mess of treasures and tricks: cursed baubles, ticking bombs, and
                            oddities that might just blow yer hands off. No questions, no returns. The market's a
                            twisting maze of shady vendors, always ready to strike a deal, but beware — the air's thick
                            with sneaky stealers and tricksters. Want trouble, danger, or something... <i>weird</i>?
                            This is the place for you, but remember, things here aren't always what they seem. Don't go
                            wanderin' off into the dark corners by yourself — who knows what strange things might be
                            lurking. And don't be fooled, pal, everything here's gonna cost you more than you think —
                            sometimes more than your <i>soul</i>.
                        </p>

                        <div class="column">
                            <span class="q-mt-xl text-h4 text-primary" style="text-align: center"
                                >Finding the market</span
                            >

                            <div class="flex justify-evenly q-mt-xl">
                                <q-img
                                    style="
                                        width: 15.625rem;
                                        height: 15.625rem;
                                        mix-blend-mode: screen;
                                        text-align: center;
                                        filter: contrast(103%);
                                    "
                                    src="~assets/guide/image-1.avif"
                                />
                                <div class="column" style="text-align: center">
                                    <span class="text-subtitle1" style="text-align: center"
                                        >Open at all hours, always waiting</span
                                    >
                                    <span class="q-mt-sm text-subtitle1" style="text-align: center"
                                        >Must have <b>Whispering rune</b> to enter</span
                                    >
                                    <span class="q-mt-sm text-secondary text-subtitle1" style="text-align: center"
                                        >Exclusive bargains, Hidden relics, Forbidden treasures — for the bold!</span
                                    >
                                    <span class="q-mt-sm text-h6" style="text-align: center"
                                        ><span class="text-negative">Caution:</span> Watch your pockets, sharp eyes
                                        everywhere!
                                    </span>
                                </div>
                                <q-img
                                    style="
                                        width: 15.625rem;
                                        height: 15.625rem;
                                        mix-blend-mode: screen;
                                        filter: contrast(103%);
                                    "
                                    src="~assets/guide/image-2.avif"
                                />
                            </div>

                            <div class="q-mt-xl">
                                <span class="text-h4 text-primary">Undercity</span>
                                <p class="q-mt-lg text-subtitle1">
                                    Attention! ZigZag here. Alright, first thing's first. You'll need to get your hands
                                    on a
                                    <strong>Whispering Rune</strong> from me — just swing by for a quick chat if you're
                                    interested. This rune holds the key to an ancient agreement between the traders, and
                                    only those with the rune can access the Black Market. Once you've got it, here's how
                                    you find the entrance: head down to the old sewers near the Rat's Tail Tavern.
                                    There's a bit of a maze down there, so don't get lost — but once you reach the
                                    center, you'll find a hatch. Watch out for "Snot" at the entrance — tell him the
                                    word the rune whispers to you, and don't bother tryin' to explain nothin' to him
                                    (just a lil' advice). After that, all the details are yours to discover! Oh, and by
                                    the way, Snot's the giant troll, in case you're wondering.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </q-page>
    </Transition>
</template>

<style scoped>
.map {
    width: 40rem;
    height: 34rem;
    margin-block: 2.5rem;
    background-image: url('src/assets/guide/map.avif');
    /* mask-image: radial-gradient(circle, rgb(255, 255, 255) 90%, rgba(255, 255, 255, 0) 111%); */
    /* width: 100%; */
    /* height: 100%; */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.8)) hue-rotate(5deg) grayscale(28%) brightness(85%);
}

.map-texture {
    position: absolute;
    background-image: url('src/assets/guide/map-texture.avif');
    width: 100%;
    height: 100%;
    /* top: 30px; */
    /* mix-blend-mode: difference; */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 60%;
    /* filter: sepia(100%) hue-rotate(-30deg); */
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 60%, rgba(255, 255, 255, 0) 100%);

    /* mask-image: linear-gradient(to top, black 80%, transparent 100%); */
}
</style>

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
                        <h2 class="text-h3">Backstory</h2>
                        <p class="q-mt-lg text-info text-subtitle1">
                            ZigZag never bothered with fixing wagons for a handful of copper. He pieced together his
                            workshop from scraps, and before long, his weird gadgets caught the eye of the wrong crowd.
                            But that was just the start. ZigZag knew the real money was in the shadows — in the Goblin
                            Black Market. A filthy, dangerous place where tricks, deals, and threats lurk at every
                            corner. Before long, ZigZag was in, always ahead of the law and the idiots trying to take
                            him down. But there's one thing that really makes his heart race — the thrill. That constant
                            hunger for the next big gamble. Whether it's selling cursed trinkets or flipping
                            <i>Gambler's Lootboxes</i>, it doesn't matter. ZigZag's always chasing the rush, always on
                            the hunt for the next big score. For him, the Black Market isn't just a place to trade —
                            it's the ultimate game, and he's in it to win.
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
                                    <span class="q-mt-sm text-subtitle1">Smuggler's Alley, Tinker Tangle</span>
                                    <span class="q-mt-sm text-subtitle1"> Operating Hours: </span>
                                    <span class="q-mt-sm text-subtitle1"> Monday to Saturday, 8 AM - 6 PM; </span>
                                    <span class="q-mt-sm text-subtitle1">
                                        Closed on Sundays (<i>unless there's a big deal</i>).
                                    </span>
                                    <span class="q-mt-sm text-secondary text-subtitle1">
                                        Mad engineering, Explosive discounts, Sneaky deals.
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

                    <div class="flex flex-center q-mt-xl relative-position wrapper">
                        <div class="map-texture" />

                        <div class="map q-mb-lg q-mt-none shadow-1" />
                    </div>

                    <div
                        class="column q-gutter-y-sm q-mt-lg q-px-md text-info"
                        style="max-width: 90rem; margin-inline: auto"
                    >
                        <p class="q-mt-xl text-subtitle1">
                            <span class="text-h4 text-primary">Beneath</span> the Dice Pit, where the air smells like
                            rat stew and the sewers are a nightmare, lies the Goblin Black Market. Old as the hills and
                            hidden from the light. Only those who've proven themselves — whether through a clever deal
                            or surviving a tough scrape — can be invited to step into the Black Market. Inside? It's
                            chaos — cursed trinkets, ticking bombs, and all sorts of weird stuff that might just blow
                            your fingers off. No questions asked, no refunds. The market's a maze of shady vendors
                            always ready to make a deal, but don't get too comfy — there's a lot of sneaky hands in the
                            air, looking to lift whatever isn't nailed down. Want trouble? Want danger? Or maybe
                            something... <i>strange</i>? This is the place for you. But remember, things here aren't
                            always what they seem. Don't wander off into the shadows alone — who knows what could be
                            lurking in the dark corners. And don't be fooled, pal — everything here's gonna cost you
                            more than you think. Sometimes, more than your <i>soul</i>.
                        </p>

                        <div class="column">
                            <span class="q-mt-xl text-h4 text-primary" style="text-align: center"
                                >Accessing the market</span
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
                                        >Must have an invitation to enter</span
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
                                <span class="text-h4 text-primary">Important</span>

                                <p class="q-mt-lg text-subtitle1">
                                    Attention! ZigZag here. So listen up, if you want to get into the Black Market,
                                    there's just one thing you need — <strong>An Invitation</strong>, and I can sell you
                                    one. Why waste time and energy getting the access when all you need is right here
                                    with me? To get in, you'll need to find the old sewers near the Rat's Tail Tavern.
                                    It's a bit of a maze down there, traps and all, plus you've got to deal with
                                    "Biggie" at the door. You wanna know how I get these invitations? Well, you better
                                    don't. Anyways, once you're in, it's all yours to discover — but be careful! After
                                    that, who knows what you'll find? By the way, Biggie is the giant shredder, in case
                                    you're wondering.
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
.wrapper {
    width: 100%;
    min-height: 39rem;
}

.map {
    width: 32rem;
    height: 26rem;
    background-image: url('src/assets/guide/map.avif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5)) grayscale(30%) brightness(77%);
    border-radius: 0.0625rem;
    margin-bottom: 0;
    z-index: 1;
}

.map-texture {
    position: absolute;
    background-image: url('src/assets/guide/bg.avif');
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 60%;
    filter: grayscale(30%);
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 60%, rgba(255, 255, 255, 0) 100%);
}
</style>

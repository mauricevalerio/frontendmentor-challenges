<template>
    <instructions v-if="store.areInstructionsOpen"></instructions>

    <categories v-else-if="store.areCategoriesOpen"></categories>

    <section v-else class="home">
        <img src="../assets/images/logo.svg" alt="The Hangman Logo" class="logo" />
        
        <button class="btn btn-play" @click="store.toggleCategories">
            <img src="../assets/images/icon-play.svg" alt="Play Button" class="play-logo"/>
        </button>
        <button class="btn btn-how-to" @click="store.toggleInstructions">How To Play</button>
    </section>
</template>

<script>
import Instructions from "./Instructions.vue"
import Categories from "./Categories.vue"
import { store } from "../store"

export default {
    components: {
        Instructions,
        Categories
    },
    data() {
        return {
            store
        }
    }
}

</script>

<style scoped>
.home {
    position: relative;
    max-height: 500px;
    max-width: 600px;
    width: 90%;
    background: linear-gradient(0deg, rgba(52, 74, 186, .8) 0%, rgba(0, 20, 121, .8) 100%);
    border-radius: var(--rounded-sm);
    box-shadow: inset 0px -8px 0px 4px #261676, inset 0px 6px 0px 8px #2463FF;
    padding: 1em;
}

.logo {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
}

.play-logo {
    width: 40px;
    height: 40px;
}

button {
    display: block;
}

.btn-play {
  box-shadow: var(--shadow-play);
  background: var(--bg-pink);
  border-radius: var(--rounded-full);
  padding: 1.5em;
  margin: 3em auto 2em;
}

.btn-how-to {
    box-shadow: var(--shadow-blue);
    background: var(--clr-secondary);
    border-radius: var(--rounded-sm);
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
}

</style>
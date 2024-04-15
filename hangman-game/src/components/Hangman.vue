<template>
    <section class="hangman">
        <div class="component-headers">
            <div class="options">
                <options></options>
                <h2>{{ store.chosenCategory }}</h2>
            </div>

            <div class="life-bar-wrapper">
                <div class="life-bar">
                    <div class="life-bar-inner" :style="lifeBarLength"></div>
                </div>
                <img src="../assets/images/icon-heart.svg" alt="Violet Heart Logo" class="heart"/>
            </div>
        </div>

        <div class="wrap word-group">
            <div class="wrap letter-gap" v-for="(word, wordIdx) in store.wordToGuess" :key="wordIdx">
                <button v-for="(letter, letterIdx) in word" :key="letterIdx" class="playable-letter" :disabled="!letter.wasGuessed">
                    {{ letter.wasGuessed ? letter.letterToGuess : "" }}
                </button>
            </div>
        </div>

        <div class="wrap letter-gap">
            <button 
            class="btn btn-letter-choice"
            v-for="(item, index) in store.letterChoices" 
            :key="index"
            :disabled="item.wasChosen" 
            @click="() => checkAnswer(item.letterChoice)"
            >
            {{ item.letterChoice }}
            </button>
        </div>
    </section>
</template>

<script>
import { store } from "../store"
import Options from './Options.vue'
import { LIFE } from '../constants'

export default {
    components: { Options },
    computed: {
        lifeBarLength() {
            return {
                width: `${(store.remainingLife / LIFE) * 100}%`
            }
        }
    },
    created() {
        store.wordToGuessToArray()
        store.getAlphabetChoices()
    },
    data() {
        return {
            store
        }
    },
    methods: {
        checkAnswer(chosenLetter) {
            store.updateGameLetters(chosenLetter)
            store.reduceLife(chosenLetter)
        }
    }
}

</script>

<style scoped>

.options,
.life-bar-wrapper  {
    display: flex;
    align-items: center;
}

.options {
    gap: .75rem;
}

.life-bar-wrapper {
    gap: .5rem;
}

.options h2 {
    color: var(--clr-white);
}

.life-bar {
    width: 100px;
    height: 10px;
    background: var(--clr-white);
    padding: .1rem;
    border-radius: var(--rounded-xs);
}

.life-bar-inner {
    height: 100%;
    background: var(--clr-primary);
    border-radius: var(--rounded-xs);
    transition: all 100ms linear;
}

.wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 768px;
}

.word-group {
    gap: 1.25rem;
    margin-bottom: 2rem;
}

.letter-gap {
    gap: .2rem;
}

.btn-letter-choice {
    background: var(--clr-white);
    color: var(--clr-primary);
    border-radius: var(--rounded-xs);
}

.btn-letter-choice:disabled {
  cursor: not-allowed;
}

.playable-letter {
    border: none;
    background: var(--clr-secondary);
    border-radius: var(--rounded-xs);
    color: var(--clr-white);
    box-shadow: var(--shadow-letters);
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    transition: all 800ms linear;
}

@media (min-width: 768px) {
    .options h2 {
        font-size: var(--fs-md);
    }
}
</style>
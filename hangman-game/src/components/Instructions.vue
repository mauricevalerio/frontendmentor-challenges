<template>

    <section class="sections">
        <div class="component-headers">
            <back-button @onBack="store.toggleInstructions()"></back-button>
            <h2 class="component-headers-text">How To Play</h2>
        </div>

        <div class="instruction-wrapper">
            <div class="instruction-item">
                <span>01</span>
                <span>Choose a category</span>
                <p>First, choose a word category, like animals or movies.
                The computer then randomly selects a secret word from that
                topic and shows you blanks for each letter of the word.</p>
            </div>

            <div class="instruction-item">
                <span>02</span>
                <span>Guess letters</span>
                <p>Take turns guessing letters. The computer fills in the
                relevant blank spaces if your guess is correct. If it's
                wrong, you lose some health, which empties after eight
                incorrect guesses.</p>
            </div>

            <div class="instruction-item">
                <span>03</span>
                <span>Win or lose</span>
                <p>You win by guessing all the letters in the word before your
                health runs out. If the health bar empties before you guess
                the word, you lose.</p>
            </div>
        </div>
    </section>
</template>

<script>
import { store } from '../store'
import BackButton from "./BackButton.vue"

export default {
    components: { BackButton },
    data() {
        return {
            store
        }
    }
}

</script>

<style scope>

    .instruction-item {
        background: var(--clr-white);
        border-radius: var(--fs-base);
        padding: var(--fs-base);
        margin-bottom: .5rem;
        width: 100%;
    }

    .instruction-item span {
        font-size: var(--fs-base);
    }

    .instruction-item span:first-child {
        color: var(--clr-secondary);
        margin-inline-end: 1rem;
    }

    .instruction-item span:nth-child(2) {
        color: var(--clr-primary);
        text-transform: uppercase;
    }

    .instruction-item p {
        font-size: calc(var(--fs-base) * .7);
        color: var(--clr-gray);
        text-align: justify;
    }

    @media (min-width: 768px) {

        .instruction-item {
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: repeat(2, min-content); 
            gap: .5rem;
        }
        
        .instruction-item span:first-child {
            grid-row: 1 / -1;
            align-self: center;
            font-size: var(--fs-lg);
        }

        .instruction-item span:nth-child(2) {
            font-size: var(--fs-sm);
        }
    }

    @media (min-width: 1024px) {
        .instruction-wrapper {
            display: flex;
            gap: 1rem;
        }

        .instruction-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 380px;
        }
    }

</style>
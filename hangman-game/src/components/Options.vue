<template>
    <div>
        <div class="dialog-wrapper">
            <dialog ref="dialogElementRef">
                <button class="btn btn-close" @click="closeDialog">X</button>
                <h2 class="option-header component-headers-text">{{ resultText }}</h2>
                <button class="btn btn-option-blue" autofocus @click="dialogAction">{{ dialogText }}</button>
                <button class="btn btn-option-blue" @click="chooseNewCategory">New Category</button>
                <button class="btn btn-option-quit" @click="quitGame">Quit Game</button>
            </dialog>
        </div>
        <button class="btn-pink btn" @click="openDialog">
            <img src="../assets/images/icon-menu.svg" alt="Menu Button" />
        </button>
    </div>
</template>

<script>
import { store } from "../store";

export default {
    emits: ["remountComponent"],
    data() {
        return {
            store
        }
    },
    computed: {
        dialogAction() {
            return store.isGameOver ? this.playAgain : this.closeDialog
        },
        dialogText() {
            return store.isGameOver ? "Play Again" : "Continue" 
        },
        resultText() {
            if (store.isGameOver) { 
                this.openDialog()
                return store.isWinner ? "You Win" : "You Lose"
            } else {
                return "Pause"
            }
        },
    },
    methods: {
        openDialog() {
            this.$refs.dialogElementRef.showModal()
        },
        closeDialog() {
            this.$refs.dialogElementRef.close()
        },
        playAgain() {
            store.playAgain()
            store.getAvailableWords(store.chosenCategory)
            store.updateSelected()
            store.wordToGuessToArray()
            store.getAlphabetChoices()
            this.closeDialog()
        },
        chooseNewCategory() {
            this.closeDialog()
            store.newCategory()
        },
        quitGame() {
            this.closeDialog()
            store.quitGame()
        },
    }
}

</script>

<style scoped>
    .dialog-wrapper {
        height: 100%;
        position: absolute;
        margin-top: 0;
    }

    dialog {
        overflow: visible;
        position: absolute;
        margin-top: 0;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        padding: 1rem;
        width: 80%;
        max-width: 500px;
        border: none;
        background: linear-gradient(0deg, rgba(52, 74, 186, .8) 0%, rgba(0, 20, 121, .8) 100%);
        border-radius: var(--rounded-sm);
        box-shadow: inset 0px -8px 0px 4px #261676, inset 0px 6px 0px 8px #2463FF;
    }

    .option-header {
        position: absolute;
        top: -10%;
        left: 50%;
        transform: translateX(-50%);
    }

    dialog button:not(.btn-close) {
        width: 100%;
        max-width: 350px;
        margin: 1rem auto 1rem;
        display: block;
    }

    .btn-close {
        position: absolute;
        top: -10px;
        right: 0;
        border-radius: var(--rounded-full);
        padding: .2rem .75rem;
        background: var(--bg-pink);
    }

    .btn-option-blue {
        box-shadow: var(--shadow-blue);
        background: var(--clr-secondary);
        border-radius: var(--rounded-sm);

    }

    .btn-option-quit {
        background: var(--bg-pink);
        border-radius: var(--rounded-sm);
    }

    @media (min-width: 768px) {
        .option-header {
            top: -15%;
        }
    }
</style>
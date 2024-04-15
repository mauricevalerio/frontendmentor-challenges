import { reactive, watch } from 'vue'
import { getRandomNumber, generateLetterChoices, removePunctuations } from './utils'
import { LIFE } from "./constants"

export const store = reactive({
    categoriesData: {},
    remainingLife: LIFE,
    areCategoriesOpen: false,
    areInstructionsOpen: false,
    hasGameStarted: false,
    isWinner: false,
    isGameOver: false,

    chosenCategory: "",
    wordToGuessIdx: 0,
    wordToGuess: [],
    letterChoices: [],
    async getCategories() {
        const response = await fetch("data.json")
        const data = await response.json()
        this.categoriesData = data.categories
    },
    toggleCategories() {
        this.areCategoriesOpen = !this.areCategoriesOpen
    },
    toggleInstructions() {
        this.areInstructionsOpen = !this.areInstructionsOpen
    },
    toggleGameStarted() {
        this.hasGameStarted = !this.hasGameStarted
    },
    getAvailableWords(chosenCategory) {
        this.chosenCategory = chosenCategory
        let hasSelected = false
        while (!hasSelected) {
            let tempIdx = getRandomNumber(this.categoriesData[chosenCategory].length)
            if (!this.categoriesData[chosenCategory][tempIdx].selected) {
                this.wordToGuessIdx = tempIdx
                hasSelected = true
            }
        }
    },
    updateSelected() {
        this.categoriesData[this.chosenCategory][this.wordToGuessIdx].selected = true
    },
    wordToGuessToArray() {
        let splitToWords = this.categoriesData[this.chosenCategory][this.wordToGuessIdx].name.split(" ")

        this.wordToGuess = splitToWords.map(word => {
            return removePunctuations(word).split("").map(letter => {
                return {
                    letterToGuess: letter.toUpperCase(),
                    wasGuessed: false
                }
            })
        })
    },
    getAlphabetChoices() {
        this.letterChoices = generateLetterChoices()
    },
    updateGameLetters(chosenLetter) {
        this.wordToGuess.forEach(word => {
            word.forEach(letter => {
                if (letter.letterToGuess === chosenLetter) {
                    letter.wasGuessed = true
                }
            })
        })

        this.letterChoices.forEach(item => {
            if (item.letterChoice === chosenLetter) {
                item.wasChosen = true
            }
        })
    },
    reduceLife(chosenLetter) {
        if (!this.wordToGuess.flat().find(letter => letter.letterToGuess === chosenLetter)) {
            this.remainingLife--
        }
    },
    quitGame() {
        this.areCategoriesOpen = false
        this.reset()
    },
    playAgain() {
        this.reset()
    },
    newCategory() {
        this.hasGameStarted = false
        this.reset()
    },
    reset() {
        this.remainingLife = LIFE
        this.isGameOver = false
        this.isWinner = false
    }
})

watch(
    () => store.remainingLife,
    (newValue) => {
        if (newValue === 0 && !store.isWinner) {
            store.isGameOver = !store.isGameOver
            store.wordToGuess.forEach(word => {
                word.forEach(item => item.wasGuessed = true)
            })
            store.letterChoices.forEach(item => item.wasChosen = true)
        }
    })

watch(
    () => store.wordToGuess,
    () => {
        if (store.wordToGuess.flat().every(letter => letter.wasGuessed) && store.remainingLife !== 0) {
            store.isGameOver = !store.isGameOver
            store.isWinner = !store.isWinner
            store.letterChoices.forEach(item => item.wasChosen = true)
        }
    },
    { deep: true }
)
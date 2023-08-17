import { EChoices } from '../enums/EChoices'
import { TChoices } from '../types/TContextTypes'

export const getComputerChoice = (): TChoices => {
    let randomNumber = Math.floor(Math.random() * Object.keys(EChoices).length)
    let values = Object.values(EChoices)[randomNumber]

    return EChoices[values]
}

export const isWinner = (choice: TChoices, computerChoice: TChoices): boolean | null => {
    if (choice === computerChoice) {
        return null
    } else if (choice === EChoices.PAPER && computerChoice === EChoices.ROCK) {
        return true
    } else if (choice === EChoices.ROCK && computerChoice === EChoices.SCISSORS) {
        return true
    } else if (choice === EChoices.SCISSORS && computerChoice === EChoices.PAPER) {
        return true
    } else {
        return false
    }
}
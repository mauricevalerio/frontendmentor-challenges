export function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
}

export function generateLetterChoices() {
    const startingCharCode = 65

    return Array(26).fill(null).map((_, index) => ({
        wasChosen: false,
        letterChoice: String.fromCharCode(index + startingCharCode)
    }))
}

export function removePunctuations(word) {
    return word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
}
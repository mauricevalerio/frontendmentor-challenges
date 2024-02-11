const totalBillInput = document.getElementById("total-bill")
const peopleCountInput = document.getElementById("people-count")
const tipCustomInput = document.getElementById("tip-custom")
const resetButton = document.getElementById("reset")
const tipPercentRadio = document.getElementsByClassName("tip-percent-radio")
const errorMessageSpan = document.querySelector("span.error-message")
const peopleCountDiv = document.querySelector(".people-count")

let tipPercentValue = 0

function resetIfError() {
    errorMessageSpan.style.opacity = 1;
    peopleCountDiv.style.border = "1px solid #E17457"
    document.getElementById("tip-amount").innerHTML = ""
    document.getElementById("per-person-tip").innerHTML = ""
    document.getElementById("tip-amount").textContent = "$0.00"
    document.getElementById("per-person-tip").textContent = "$0.00"
}

function resetAll() {
    document.getElementById("tip-amount").innerHTML = ""
    document.getElementById("per-person-tip").innerHTML = ""
    totalBillInput.value = ""
    peopleCountInput.value = ""
    tipCustomInput.value = ""
    for (let radio of tipPercentRadio) {
        radio.checked = false
    }
}

function computeTipAmountPerPerson() {
    if (Number(tipPercentValue) !== 0 && !isNaN(Number(totalBillInput.value))) {
        return ((Number(totalBillInput.value) * Number(tipPercentValue)) / Number(peopleCountInput.value)).toFixed(2)
    } else if (tipCustomInput.value !== "" && !isNaN(Number(totalBillInput.value))) {
        return ((Number(totalBillInput.value) * (Number(tipCustomInput.value)) / 100).toFixed(2) / Number(peopleCountInput.value)).toFixed(2)
    }
}

function computeTotalBillPerPerson() {
    if (Number(tipPercentValue) !== 0 && !isNaN(Number(totalBillInput.value))) {
        return ((Number(totalBillInput.value) + (Number(totalBillInput.value) * Number(tipPercentValue))).toFixed(2) / Number(peopleCountInput.value)).toFixed(2)
    } else if (tipCustomInput.value !== "" && !isNaN(Number(totalBillInput.value))) {
        return ((Number(totalBillInput.value) + (Number(totalBillInput.value) * (Number(tipCustomInput.value)) / 100)).toFixed(2) / Number(peopleCountInput.value)).toFixed(2)
    }
}

function updateTotalAmount() {
    if (parseFloat(peopleCountInput.value) === 0 || peopleCountInput.value === "") {
        resetIfError()
        errorMessageSpan.textContent = "Can't be zero"
    } else if (parseFloat(peopleCountInput.value) < 0) {
        resetIfError()
        errorMessageSpan.textContent = "Can't be less than 0"
    } else if (parseFloat(peopleCountInput.value) - Math.floor(parseFloat(peopleCountInput.value)) !== 0) {
        resetIfError()
        errorMessageSpan.textContent = "Can't be a decimal"
    } else {
        errorMessageSpan.style.opacity = 0;
        peopleCountDiv.style.border = "2px solid transparent"
        document.getElementById("tip-amount").innerHTML = ""
        document.getElementById("per-person-tip").innerHTML = ""
        document.getElementById("tip-amount").textContent = `$${computeTipAmountPerPerson()}`
        document.getElementById("per-person-tip").textContent = `$${computeTotalBillPerPerson()}`
    }
}

totalBillInput.addEventListener("input", () => updateTotalAmount())
peopleCountInput.addEventListener("input", () => updateTotalAmount())
resetButton.addEventListener("click", () => resetAll)

tipCustomInput.addEventListener("input", () => {
    if (tipCustomInput.value !== "") {
        for (let radio of tipPercentRadio) {
            radio.checked = false
        }
        tipPercentValue = 0
        updateTotalAmount()
    }
})

for (let radio of tipPercentRadio) {
    radio.addEventListener("click", () => {
        for (let radio of tipPercentRadio) {
            if (radio.checked && tipCustomInput.value !== "") {
                tipCustomInput.value = ""
            }
            if (radio.checked) {
                tipPercentValue = radio.value
            }
        }
        updateTotalAmount()
    })
}



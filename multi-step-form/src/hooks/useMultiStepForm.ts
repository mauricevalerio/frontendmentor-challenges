import { ReactElement, useState } from 'react'

export function useMultiStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const next = () => setCurrentStepIndex(idx => idx >= steps.length - 1 ? idx : idx + 1)

    const back = () => setCurrentStepIndex(idx => idx <= 0 ? idx : idx - 1)

    const goTo = (idx: number) => setCurrentStepIndex(idx)

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    }
}
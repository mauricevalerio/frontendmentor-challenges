import { NavigationComponentProps } from '@/types'

export function NavigationComponent({ stepLabel, currentStepIndex }: NavigationComponentProps) {
    return (
        <nav>
            <ul>
                {
                    stepLabel.map((stepItem, index) => <li className='step' key={index}>
                        <p className={`step-number ${currentStepIndex === index ? 'active-step' : ''}`}>{index + 1}</p>
                        <div>
                            <h3>Step {index + 1}</h3>
                            <span>{stepItem}</span>
                        </div>
                    </li>)
                }
            </ul>
        </nav>
    )
}
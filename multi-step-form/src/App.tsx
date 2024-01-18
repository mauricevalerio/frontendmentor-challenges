import { useEffect, useState } from 'react'
import validator, { isAlpha } from 'validator'
import { NavigationComponent } from '@/components/Navigation'
import { InfoComponent } from '@/components/Info'
import { PlanComponent } from '@/components/Plan'
import { AddOnsComponent } from '@/components/AddOns'
import { SummaryComponent } from '@/components/Summary'
import { Complete } from '@/components/Complete'
import { DefaultFormState, PlanType, PlanBilling, PlanCost, AddOns, ErrorInfoTypes } from '@/types'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'

export default function App() {
  const stepLabel = [
    'Your info',
    'Select plan',
    'Add-ons',
    'Summary'
  ]

  const [data, setData] = useState<DefaultFormState>({
    info: {
      name: '',
      email: '',
      number: ''
    },
    plan: {
      type: PlanType.ARCADE,
      billing: PlanBilling.MONTHLY,
      cost: PlanCost.ARCADE_MONTHLY
    },
    addOns: []
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // const [planData, setPlanData] = useState({
  //   arcade: {
  //     monthlyCost: 9,
  //     yearlyCost: 90
  //   },
  //   advanced: {
  //     monthlyCost: 12,
  //     yearlyCost: 120
  //   },
  //   pro: {
  //     monthlyCost: 15,
  //     yearlyCost: 150
  //   }
  // })

  const [addOnsData, setAddOnsData] = useState<AddOns[]>([{
    id: 1,
    isSelected: false,
    service: "Online service",
    description: "Access to multiplayer games",
    monthly_cost: 1,
    yearly_cost: 10
  },
  {
    id: 2,
    isSelected: false,
    service: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthly_cost: 2,
    yearly_cost: 20
  },
  {
    id: 3,
    isSelected: false,
    service: "Customizable Profile",
    description: "Custom theme on your profile",
    monthly_cost: 2,
    yearly_cost: 20
  }])

  const [error, setError] = useState<ErrorInfoTypes>({
    name: null,
    email: null,
    number: null
  })

  function updateData(fields: DefaultFormState) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      addOns: addOnsData.filter(addon => addon.isSelected)
    }))
  }, [JSON.stringify(addOnsData)])

  useEffect(() => {
    const { name, email, number } = data.info
    if (name.length !== 0) {
      setError(prevObj => ({
        ...prevObj,
        name: null
      }))
    }

    if (email.length !== 0) {
      setError(prevObj => ({
        ...prevObj,
        email: null
      }))
    }

    if (number.length !== 0) {
      setError(prevObj => ({
        ...prevObj,
        number: null
      }))
    }
  }, [data.info.name, data.info.email, data.info.number])

  function updateAddOnsData(id: number) {
    setAddOnsData(prevData => prevData.map(addon => {
      return addon.id === id ? { ...addon, isSelected: !addon.isSelected } : addon
    }))
  }



  const { steps, currentStepIndex, step, isFirstStep, isLastStep, goTo, back, next } =
    useMultiStepForm([
      <InfoComponent data={data} updateData={updateData} error={error} />,
      <PlanComponent data={data} updateData={updateData} />,
      <AddOnsComponent data={data} addOnsData={addOnsData} updateAddOnsData={updateAddOnsData} />,
      <SummaryComponent data={data} goToStep={goToStep} />
    ])

  function goToStep(idx: number) {
    goTo(idx)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { name, email, number } = data.info
    if (name.length === 0 || email.length === 0 || number.length === 0) {
      if (name.length === 0) {
        setError(prevObj => ({
          ...prevObj,
          name: "This field is required."
        }))
      }

      if (email.length === 0) {
        setError(prevObj => ({
          ...prevObj,
          email: "This field is required."
        }))
      }

      if (number.length === 0) {
        setError(prevObj => ({
          ...prevObj,
          number: "This field is required."
        }))
      }

    } else {
      if (isLastStep) {
        setIsFormSubmitted(prevState => !prevState)
      } else {
        next()
      }
    }
  }

  return (
    <main>
      <section>
        <NavigationComponent stepLabel={stepLabel} currentStepIndex={currentStepIndex} />

        {isFormSubmitted ?
          <Complete />
          :
          <form onSubmit={onSubmit}>
            {step}
            <div className='navigation-buttons'>
              {!isFirstStep &&
                <button
                  type="button"
                  onClick={back}
                  className="navigation-buttons-back"
                >
                  Go Back
                </button>
              }
              <button
                type="submit"
                className={`${isLastStep ? "navigation-buttons-confirm" : "navigation-buttons-next"}`}
              >
                {isLastStep ? "Confirm" : "Next Step"}</button>
            </div>
          </form>
        }

      </section>
    </main>
  )
}
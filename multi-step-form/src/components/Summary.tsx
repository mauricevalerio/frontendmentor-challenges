import { DefaultFormState, PlanBilling } from '@/types'
import { FormWrapper } from './FormWrapper'

type SummaryComponentProps = {
    data: DefaultFormState
    goToStep: (idx: number) => void
}

export function SummaryComponent({ data, goToStep }: SummaryComponentProps) {
    const { plan, addOns } = data

    function computeTotalAddons() {
        let total = 0

        addOns.forEach(addon => {
            if (plan.billing === PlanBilling.MONTHLY) {
                total += addon.monthly_cost
            } else {
                total += addon.yearly_cost
            }
        })

        return total
    }

    return (
        <FormWrapper
            title="Finishing up"
            instructions="Double-check everything looks OK before confirming.">

            <div className='summary'>
                <div className='summary-plan'>
                    <div className='summary-plan-type'>
                        <p>{`${plan.type[0]}${plan.type.slice(1).toLowerCase()}`} ({`${plan.billing[0]}${plan.billing.slice(1).toLowerCase()}`})</p>
                        <button type="button" onClick={() => goToStep(1)}>Change</button>
                    </div>
                    <p className='summary-plan-cost'>${plan.cost}/{plan.billing === PlanBilling.MONTHLY ? "mo" : "yr"}</p>
                </div>
                {
                    addOns.length > 0 ?
                        <div className='summary-addons'>
                            {addOns.filter(addon => addon.isSelected).map(addon => <div className='summary-addons-item'>
                                <p className='addon-service'>{addon.service}</p>
                                <p className='addon-cost'>+${plan.billing === PlanBilling.MONTHLY ? addon.monthly_cost : addon.yearly_cost}/{plan.billing === PlanBilling.MONTHLY ? "mo" : "yr"}</p>
                            </div>
                            )}
                        </div>
                        :
                        null
                }

                <div className='summary-total'>
                    <span>Total (per {`${plan.billing === PlanBilling.MONTHLY ? "month" : "year"}`})</span>
                    <span>${plan.cost + computeTotalAddons()}/{plan.billing === PlanBilling.MONTHLY ? "mo" : "yr"}</span>
                </div>
            </div>
        </FormWrapper>
    )
}
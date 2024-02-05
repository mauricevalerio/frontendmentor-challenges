import { FormWrapper } from "@/components/FormWrapper"
import { FormComponentProps, PlanCost, PlanType, PlanBilling } from '@/types'
import IconArcade from "@/assets/icon-arcade.svg"
import IconAdvanced from "@/assets/icon-advanced.svg"
import IconPro from "@/assets/icon-pro.svg"

export function PlanComponent({ data, updateData }: FormComponentProps) {
    const { plan } = data

    function updatePlan(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked, type, value } = e.target

        const planCost = type === "radio" ?
            `${value}_${plan.billing}` :
            `${plan.type}_${checked ? PlanBilling.YEARLY : PlanBilling.MONTHLY}`

        updateData({
            ...data,
            plan: {
                ...plan,
                cost: PlanCost[planCost as keyof typeof PlanCost],
                [name]: type === "checkbox" ?
                    checked ? PlanBilling.YEARLY : PlanBilling.MONTHLY
                    : value
            }
        })
    }

    return (
        <FormWrapper
            title="Select your plan"
            instructions="You have the option of monthly or yearly billing.">

            <div className='plan-type'>

                <label htmlFor="arcade" className='plan-type-radio'>
                    <img src={IconArcade} alt="Icon Arcade" />
                    <input type="radio"
                        name="type"
                        id="arcade"
                        value={PlanType.ARCADE}
                        checked={plan.type === PlanType.ARCADE}
                        onChange={updatePlan}
                        className='plan-type-input-radio'
                    />
                    <div>
                        <p className='plan-type-text'>{`${PlanType.ARCADE[0].toUpperCase()}${PlanType.ARCADE.slice(1).toLowerCase()}`}</p>
                        <p className='plan-type-price'>{plan.billing === PlanBilling.MONTHLY ? `$${PlanCost.ARCADE_MONTHLY}/mo` : `$${PlanCost.ARCADE_YEARLY}/yr`}</p>
                        <p className={`plan-type-freebies ${plan.billing !== PlanBilling.MONTHLY ? 'show' : ''}`}>2 months free</p>
                    </div>
                </label>

                <label htmlFor="advanced" className='plan-type-radio'>
                    <img src={IconAdvanced} alt="Icon Advanced" />
                    <input type="radio"
                        name="type"
                        id="advanced"
                        value={PlanType.ADVANCED}
                        checked={plan.type === PlanType.ADVANCED}
                        onChange={updatePlan}
                        className='plan-type-input-radio'
                    />
                    <div>
                        <p className='plan-type-text'>{`${PlanType.ADVANCED[0].toUpperCase()}${PlanType.ADVANCED.slice(1).toLowerCase()}`}</p>
                        <p className='plan-type-price'>{plan.billing === PlanBilling.MONTHLY ? `$${PlanCost.ADVANCED_MONTHLY}/mo` : `$${PlanCost.ADVANCED_YEARLY}/yr`}</p>
                        <p className={`plan-type-freebies ${plan.billing !== PlanBilling.MONTHLY ? 'show' : ''}`}>2 months free</p>
                    </div>
                </label>

                <label htmlFor="pro" className='plan-type-radio'>
                    <img src={IconPro} alt="Icon Pro" />
                    <input type="radio"
                        name="type"
                        id="pro"
                        value={PlanType.PRO}
                        checked={plan.type === PlanType.PRO}
                        onChange={updatePlan}
                        className='plan-type-input-radio'
                    />
                    <div>
                        <p className='plan-type-text'>{`${PlanType.PRO[0].toUpperCase()}${PlanType.PRO.slice(1).toLowerCase()}`}</p>
                        <p className='plan-type-price'>{plan.billing === PlanBilling.MONTHLY ? `$${PlanCost.PRO_MONTHLY}/mo` : `$${PlanCost.PRO_YEARLY}/yr`}</p>
                        <p className={`plan-type-freebies ${plan.billing !== PlanBilling.MONTHLY ? 'show' : ''}`}>2 months free</p>
                    </div>
                </label>
            </div>


            <div className='plan-billing'>
                <label htmlFor="billing" className={`${plan.billing === PlanBilling.MONTHLY ? 'active' : ''}`}>Monthly</label>
                <label htmlFor="billing" className="billing-toggler">
                    <input
                        type="checkbox"
                        id="billing"
                        name="billing"
                        checked={plan.billing === PlanBilling.MONTHLY ? false : true}
                        onChange={updatePlan} />
                    <span className="slider round"></span>
                </label>
                <label htmlFor="billing" className={`${plan.billing !== PlanBilling.MONTHLY ? 'active' : ''}`}>Yearly</label>
            </div>
        </FormWrapper >
    )
}
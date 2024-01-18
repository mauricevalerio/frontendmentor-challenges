import { FormWrapper } from "@/components/FormWrapper"
import { AddOnComponentProps, PlanBilling } from '@/types'

export function AddOnsComponent({ data, addOnsData, updateAddOnsData }: AddOnComponentProps) {
    const { plan } = data

    return (
        <FormWrapper
            title="Pick add-ons"
            instructions="Add-ons help enhance your gaming experience.">
            <div className='addons'>
                {
                    addOnsData.map(addon => <label className='addons-item' key={addon.id}>
                        <input type="checkbox" name="addons" id="addons" onChange={() => updateAddOnsData(addon.id)} checked={addon.isSelected} />
                        <div>
                            <p className='addons-service'>{addon.service}</p>
                            <p className='addons-description'>{addon.description}</p>
                        </div>
                        <p className='addons-cost'>+${plan.billing === PlanBilling.MONTHLY ? addon.monthly_cost : addon.yearly_cost}/{plan.billing === PlanBilling.MONTHLY ? "mo" : "yr"}</p>
                    </label>
                    )
                }
            </div>
        </FormWrapper>
    )
}
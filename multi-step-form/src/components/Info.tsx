import { FormWrapper } from "@/components/FormWrapper"
import { InfoComponentProps } from '@/types'

export function InfoComponent({ data, updateData, error }: InfoComponentProps) {
  const { info } = data

  function updateInfo(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    updateData({
      ...data,
      info: { ...info, [name]: value }
    })
  }

  return (
    <FormWrapper
      title="Personal Info"
      instructions='Please provide your name, email address, and phone number.'>

      <div className='info'>
        <div className='info-error'>
          <label htmlFor="name" className="info-label">Name</label>
          {error.name && <span className='info-error-message'>{error.name}</span>}
          <input
            autoFocus
            type="text"
            id="name"
            name="name"
            value={info.name}
            onChange={updateInfo}
            placeholder="e.g. Stephen King"
            className="info-input" />
        </div>

        <div className='info-error'>
          <label htmlFor="email" className="info-label">Email Address</label>
          {error.email && <span className='info-error-message'>{error.email}</span>}
          <input type="email"
            id="email"
            name="email"
            value={info.email}
            onChange={updateInfo}
            placeholder="e.g. stephenking@lorem.com"
            className="info-input"
          />
        </div>


        <div className='info-error'>
          <label htmlFor="number" className="info-label">Phone Number</label>
          {error.number && <span className='info-error-message'>{error.number}</span>}
          <input type="tel"
            id="number"
            name="number"
            value={info.number}
            onChange={updateInfo}
            placeholder="e.g. +1 234 567 890"
            className="info-input"
          />
        </div>
      </div>

    </FormWrapper>
  )
}
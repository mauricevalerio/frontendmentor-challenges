import { useState } from 'react'
import type { formDataTypes } from "@/types/index.ts";
import { validateInput } from '@/utils/index.ts';

export default function ContactFormValidation() {
  const [formData, setFormData] = useState<formDataTypes>({
    fullName: {
      text: "",
      validators: { required: true },
      errorMessage: ""
    },
    email: {
      text: "",
      validators: { required: true, pattern: true },
      errorMessage: ""
    },
    companyName: {
      text: "",
      validators: { required: false },
      errorMessage: ""
    },
    messageTitle: {
      text: "",
      validators: { required: false },
      errorMessage: ""
    },
    messageContent: {
      text: "",
      validators: { required: true },
      errorMessage: ""
    }
  })

  const validateFormData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: {
          ...prevFormData[name as keyof formDataTypes],
          text: value,
          errorMessage: validateInput(name, value, prevFormData[name as keyof formDataTypes].validators)
        }
      }
    })
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName.text}
          onChange={validateFormData}
          onBlur={validateFormData}
          placeholder="Name"
          className={`w-full cursor-pointer pl-4 pb-4 outline-none border-b-[1px] border-b-${formData.fullName.errorMessage === "" ? "sec-lightsanjuan-blue" : "form-error"}`}
        />
        <span className='block h-2 mt-2 mb-4 text-xs text-form-error'>{formData.fullName.errorMessage}</span>
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email.text}
          onChange={validateFormData}
          onBlur={validateFormData}
          placeholder="Email Address"
          className={`w-full cursor-pointer pl-4 pb-4 outline-none border-b-[1px] border-b-${formData.email.errorMessage === "" ? "sec-lightsanjuan-blue" : "form-error"}`}
        />
        <span className='block h-2 mt-2 mb-4 text-xs text-form-error'>{formData.email.errorMessage}</span>
      </div>

      <div>
        <input
          type="text"
          name="companyName"
          value={formData.companyName.text}
          onChange={validateFormData}
          onBlur={validateFormData}
          placeholder="Company Name"
          className={`w-full cursor-pointer pl-4 pb-4 outline-none border-b-[1px] border-b-${formData.companyName.errorMessage === "" ? "sec-lightsanjuan-blue" : "form-error"}`}
        />
        <span className='block h-2 mt-2 mb-4 text-xs text-form-error'>{formData.companyName.errorMessage}</span>
      </div>

      <div>
        <input
          type="text"
          name="messageTitle"
          value={formData.messageTitle.text}
          onChange={validateFormData}
          onBlur={validateFormData}
          placeholder="Title"
          className={`w-full cursor-pointer pl-4 pb-4 outline-none border-b-[1px] border-b-${formData.messageTitle.errorMessage === "" ? "sec-lightsanjuan-blue" : "form-error"}`}
        />
        <span className='block h-2 mt-2 mb-4 text-xs text-form-error'>{formData.messageTitle.errorMessage}</span>
      </div>

      <div>
        <textarea
          name="messageContent"
          value={formData.messageContent.text}
          onChange={validateFormData}
          onBlur={validateFormData}
          placeholder="Message"
          className={`resize-none w-full cursor-pointer pl-4 pb-4 border-b-[1px] border-b-${formData.messageContent.errorMessage === "" ? "sec-lightsanjuan-blue" : "form-error"} outline-none`}
        />
        <span className='block h-2 mt-2 mb-4 text-xs text-form-error'>{formData.messageContent.errorMessage}</span>
      </div>
    </>
  )
}



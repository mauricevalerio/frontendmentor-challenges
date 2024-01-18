import { FormWrapperProps } from '@/types'

export function FormWrapper({ title, instructions, children }: FormWrapperProps) {
    return (
        <>
            <h2 className='form-step-header'>{title}</h2>
            <p className='instructions'>{instructions}</p>
            <div className='form-item'>
                {children}
            </div>
        </>
    )
}
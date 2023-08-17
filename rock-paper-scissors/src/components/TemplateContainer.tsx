import { TemplateContainerProp } from '../types/TTemplateTypes'

const TemplateContainer: React.FC<TemplateContainerProp> = ({ children }) => {
    return (
        <div className='d-flex gap-5'>
            {children}
        </div>
    )
}

export default TemplateContainer
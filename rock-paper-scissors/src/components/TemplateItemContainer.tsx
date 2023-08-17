import { TemplateContainerProp } from '../types/TTemplateTypes'

const TemplateItemContainer: React.FC<TemplateContainerProp> = ({ children, choice, computerChoice }) => {
    return (
        <div className='container text-center'>
            <div className="row">
                <div className="col position-relative">
                    {typeof choice !== 'undefined' && <span className='text-uppercase'>You</span>}
                    {typeof computerChoice !== 'undefined' && <span className='text-uppercase'>Opponent</span>}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {children}
                </div>
            </div>
            <div className="row">
                <div className="col position-relative">
                    {typeof choice !== 'undefined' && <span className='text-uppercase'>{''}picked {choice}</span>}
                    {typeof computerChoice !== 'undefined' && <span className='text-uppercase'>{''}picked {computerChoice}</span>}
                </div>
            </div>
        </div>
    )
}

export default TemplateItemContainer
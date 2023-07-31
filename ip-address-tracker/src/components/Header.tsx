import IconArrow from '../assets/icon-arrow.svg'
import { HeaderProps } from '../interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({ inputIp, setInputIp, fetch, error }) => {
    return (
        <>
            <h1 className='has-text-centered has-text-white mb-4 is-size-3-mobile is-size-4-tablet'>IP Address Tracker</h1>

            <div className='mb-5 input-container field has-addons'>

                <div className='control is-expanded is-relative'>
                    <input
                        className={`input is-medium ${error?.code ? "is-danger" : ""}`}
                        type='text'
                        name='inputIp'
                        value={inputIp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputIp(e.target.value)}
                        placeholder='Search for any IP address or domain' />
                    {error?.messages && <p className='help is-danger absolute'>{error.messages}</p>}
                </div>


                <div className='control'>
                    <button
                        className='button is-black is-medium'
                        onClick={fetch}>
                        <img src={IconArrow} alt='Greater than symbol button' className='is-fullwidth' />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Header
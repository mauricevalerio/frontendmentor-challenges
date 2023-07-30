import IconArrow from '../assets/icon-arrow.svg'
import { HeaderProps } from '../interfaces/HeaderProps'

const Header: React.FC<HeaderProps> = ({ inputIp, setInputIp, fetch }) => {
    return (
        <>
            <h1 className='has-text-centered has-text-white mb-4 is-size-3-mobile is-size-6-tablet'>IP Address Tracker</h1>
            <div className='mb-5 input-container'>
                <input
                    type='text'
                    name='inputIp'
                    value={inputIp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputIp(e.target.value)}
                    placeholder='Search for any IP address or domain' />
                <button onClick={fetch}>
                    <img src={IconArrow} alt='Greater than symbol button' className='is-fullwidth' />
                </button>
            </div>
        </>
    )
}

export default Header
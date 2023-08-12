import SearchIconGray from '../assets/search-icon-gray.svg'
import SearchIconWhite from '../assets/search-icon-white.svg'
import { ThemeContext } from '../context/Context'
import { useContext } from 'react'
import { FormSearchProps } from '../interfaces/IFormProps'

const FormSearch: React.FC<FormSearchProps> = ({ searchCountry, searchCountryInputChange }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <form className={`form__input--box ${theme}__theme ${theme}__theme--input`}
            autoComplete='off'>
            <img
                src={theme === 'light' ? SearchIconGray : SearchIconWhite}
                alt="Magnifying Glass for Search"
                className='form__input--search--icon' />
            <input
                type='text'
                placeholder='Search for a country...'
                className='form__input--search'
                name='searchCountry'
                value={searchCountry}
                onChange={searchCountryInputChange} />
        </form>
    )
}

export default FormSearch
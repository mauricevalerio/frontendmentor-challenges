import MoonRegular from '../assets/moon-regular.svg'
import MoonSolid from '../assets/moon-solid.svg'
import { ThemeContext } from '../context/Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const moonSvg: string = theme === 'dark' ? MoonSolid : MoonRegular
    const themeText: string = theme === 'dark' ? 'Dark' : 'Light'

    return (
        <header className={`header ${theme}__theme`}>
            <Link to='/' className={`${theme}__theme`}><h1 className='header__title'>Where in the world?</h1></Link>
            <div className='header__theme--switcher--box ' onClick={toggleTheme}>
                <img src={moonSvg} alt={`Crescent Moon without fill`} />
                <span>{themeText} Mode</span>
            </div>
        </header>
    )
}

export default Header


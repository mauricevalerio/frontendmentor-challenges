import { IconLightTheme, IconDarkTheme } from '../icons'
import { globalThemeContext } from '@/context/ThemeContext'

const ThemeToggler: React.FC = () => {
    const { theme, toggleTheme } = globalThemeContext()

    return (
        <div className={`${theme === 'dark' ? 'bg-very-dark-bg' : 'bg-light-bg'}  mx-4 flex p-4 rounded-lg justify-center items-center gap-4`}>
            <IconLightTheme />
            <button
                onClick={toggleTheme}
                className='bg-primary rounded-full h-full w-12'>
                <div className={`rounded-full bg-white w-4 h-4 m-1 ${theme === 'dark' ? 'ms-auto' : ''}`}>
                </div>
            </button>
            <IconDarkTheme />
        </div>
    )
}

export default ThemeToggler
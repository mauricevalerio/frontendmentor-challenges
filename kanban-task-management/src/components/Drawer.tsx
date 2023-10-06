import { globalThemeContext } from '@/context/ThemeContext'
import Dropdown from './Dropdown'

const Drawer = () => {
    const { theme } = globalThemeContext()
    return (
        <div className={`hidden z-10 md:inline-block md:min-w-[300px] md:min-h-full md:sticky md:left-0 md:top-0 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'
            }`}>
            <Dropdown />
        </div>
    )
}

export default Drawer
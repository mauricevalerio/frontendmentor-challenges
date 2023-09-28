import { createContext, useContext, useState } from 'react'
import { ContextProviderProp, ThemeContextValue } from '@/types/types'

//used by Column Component and Header Component
const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => { },
    themeValueBg: '',
    themeValueText: 'text-secondary-light',
    themeValueTextInput: '',
    themeValueBtnBg: 'bg-[rgba(99,95,199,0.10)]'
})

const ThemeContextProvider: React.FC<ContextProviderProp> = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const themeValueBg = theme === 'dark' ? 'bg-dark-bg' : ''
    const themeValueText = theme === 'dark' ? 'text-white' : 'text-secondary-light'
    const themeValueTextInput = theme === 'dark' ? 'text-white' : ''
    const themeValueBtnBg = theme === 'dark' ? 'bg-white' : 'bg-[rgba(99,95,199,0.10)]'

    const toggleTheme = (): void => { setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light') }
    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            themeValueBg,
            themeValueText,
            themeValueTextInput,
            themeValueBtnBg
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const globalThemeContext = () => useContext(ThemeContext)

export default ThemeContextProvider
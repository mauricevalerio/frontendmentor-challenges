import { createContext, useContext, useEffect, useState } from 'react'
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

const loadTheme = (): string => {
    try {
        const serialTheme = localStorage.getItem('theme')
        if (serialTheme === null) {
            return 'light'
        }
        return JSON.parse(serialTheme)
    } catch (err) {
        return 'light'
    }
}

const ThemeContextProvider: React.FC<ContextProviderProp> = ({ children }) => {
    const [theme, setTheme] = useState<string>(loadTheme() || 'light')

    const themeValueBg = theme === 'dark' ? 'bg-dark-bg' : ''
    const themeValueText = theme === 'dark' ? 'text-white' : 'text-secondary-light'
    const themeValueTextInput = theme === 'dark' ? 'text-white' : ''
    const themeValueBtnBg = theme === 'dark' ? 'bg-white' : 'bg-[rgba(99,95,199,0.10)]'

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

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
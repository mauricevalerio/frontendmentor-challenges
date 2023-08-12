import { useState, useRef, createContext } from 'react'
import { CreateContextType, ContextProviderProps } from '../interfaces/IContext'

const defaultTheme = {
    theme: 'dark'
}

export const ThemeContext = createContext<CreateContextType>(defaultTheme)

const ThemeContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<string>(defaultTheme.theme)
    const { current } = useRef(document.documentElement)

    const toggleTheme = (): void => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
        current?.classList.toggle('html__light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
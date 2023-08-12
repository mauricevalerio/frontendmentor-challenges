export interface CreateContextType {
    theme: string,
    toggleTheme?: () => void
}

export interface ContextProviderProps {
    children: React.ReactNode
}
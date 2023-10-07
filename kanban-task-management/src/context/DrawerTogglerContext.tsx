import { createContext, useContext, useState } from 'react'
import { ContextProviderProp, DrawerTogglerContextValue } from '@/types/types'

const DrawerTogglerContext = createContext<DrawerTogglerContextValue>({
    isDrawerOpen: true,
    toggleDrawer: () => { }
})

const DrawerTogglerContextProvider: React.FC<ContextProviderProp> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)

    const toggleDrawer = () => { setIsDrawerOpen(prevStatus => !prevStatus) }

    return (
        <DrawerTogglerContext.Provider value={{
            isDrawerOpen,
            toggleDrawer
        }}>
            {children}
        </DrawerTogglerContext.Provider>
    )
}

export const globalDrawerTogglerContext = () => useContext(DrawerTogglerContext)

export default DrawerTogglerContextProvider
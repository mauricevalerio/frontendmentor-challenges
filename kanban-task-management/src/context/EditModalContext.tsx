import { createContext, useContext, useState } from 'react'
import { ContextProviderProp, EditModalContextValue } from '@/types/types'

//used by Column Component and Header Component
const EditModalContext = createContext<EditModalContextValue>({
    isEditBoardModalOpen: false,
    toggleEditBoardModal: () => { }
})

const EditModalContextProvider: React.FC<ContextProviderProp> = ({ children }) => {
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false)

    const toggleEditBoardModal = (): void => { setIsEditBoardModalOpen(prevStatus => !prevStatus) }
    return (
        <EditModalContext.Provider value={{
            isEditBoardModalOpen,
            toggleEditBoardModal
        }}>
            {children}
        </EditModalContext.Provider>
    )
}

export const globalEditModalContext = () => useContext(EditModalContext)

export default EditModalContextProvider
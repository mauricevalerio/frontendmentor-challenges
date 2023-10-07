import { globalThemeContext } from '@/context/ThemeContext'
import Dropdown from './Dropdown'
import { IconHideSidebar, IconShowSidebar } from '../icons'
import { globalDrawerTogglerContext } from '@/context/DrawerTogglerContext'

const Drawer = () => {
    const { theme } = globalThemeContext()
    const { isDrawerOpen, toggleDrawer } = globalDrawerTogglerContext()

    return (
        <>
            {isDrawerOpen ?
                <div className={`hidden z-10 transition-transform origin-left ${isDrawerOpen ? 'md:scale-100' : 'md:scale-0'} md:inline-block md:min-w-[300px] md:min-h-full md:sticky md:left-0 md:top-0 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'
                    }`}>
                    <Dropdown />
                    <div className='cursor-pointer hidden md:mt-2 md:p-4 md:inline-flex md:items-center md:gap-2'
                        onClick={toggleDrawer}>
                        <IconHideSidebar />
                        <span className='text-secondary-light font-bold'>Hide Sidebar</span>
                    </div>
                </div>
                :
                <div
                    onClick={toggleDrawer}
                    className='hidden md:z-10 md:rounded-r-2xl md:cursor-pointer md:p-4 md:inline-block md:fixed md:bottom-[10%] md:bg-primary'>
                    <IconShowSidebar />
                </div>
            }

        </>
    )
}

export default Drawer
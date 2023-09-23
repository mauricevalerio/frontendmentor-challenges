import { IconLightTheme, IconDarkTheme } from '../icons'

const ThemeToggler: React.FC = () => {
    return (
        <div className='bg-light-bg mx-4 flex p-4 rounded-lg justify-center items-center gap-4'>
            <IconLightTheme />
            <button className='bg-primary rounded-full h-full w-12'>
                <div className='rounded-full bg-white w-4 h-4 m-1'>
                </div>
            </button>
            <IconDarkTheme />
        </div>
    )
}

export default ThemeToggler
import BackgroundMobile from '../assets/bg-header-mobile.svg'
import BackgroundDesktop from '../assets/bg-header-desktop.svg'
import { useState, useEffect } from 'react'

const Header: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const listenWidth = () => {
            setWidth(window.innerWidth)
        }
        document.addEventListener('resize', listenWidth)

        return () => {
            document.removeEventListener('resize', listenWidth)
        }
    }, [width])

    return (
        <header>
            <img
                src={width < 640 ? BackgroundMobile : BackgroundDesktop}
                alt='Header Background'
                className='header-background'
            />
        </header>

    )
}

export default Header
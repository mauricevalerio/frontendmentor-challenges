const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className='header__box'>
                <div className='header__title--box'>
                    <h3 className='header__title--text'>ROCK</h3>
                    <h3 className='header__title--text'>PAPER</h3>
                    <h3 className='header__title--text'>SCISSORS</h3>
                </div>
                <div className='header__score--box'>
                    <span className='header__score--label'>SCORE</span>
                    <h1 className='header__score--data'>12</h1>
                </div>
            </div>
        </header>
    )
}

export default Header
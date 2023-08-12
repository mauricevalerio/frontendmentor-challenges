import { AllCountry } from '../interfaces/ICountry'
import { ThemeContext } from '../context/Context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const CountryCard: React.FC<AllCountry> = ({ flags, name, population, region, capital }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <Link to={`${name.common}`}>
            <div className={`country__card ${theme}__theme`}>
                <img
                    src={flags.png}
                    alt={flags.alt ? flags.alt : ''}
                    className='country__card--flag' />
                <div className='country__card--details'>
                    <h2 className='country__card--name'>{name.common}</h2>
                    <p>
                        <span className='country__card--text--label'>Population:</span>
                        {' '}{population.toLocaleString()}
                    </p>
                    <p>
                        <span className='country__card--text--label'>Region:</span>
                        {' '}{region}
                    </p>
                    <p>
                        <span className='country__card--text--label'>Capital:</span>
                        {' '}{capital}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default CountryCard
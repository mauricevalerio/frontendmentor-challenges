import { Country } from '../interfaces/ICountry'
import { transformCountryData } from '../utils/fetch'
import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/Context'
import { useContext } from 'react'
import { motion } from 'framer-motion'

export const loader = async (countryName: string): Promise<Country> => {
    return transformCountryData(countryName)
}

const CountryDetails: React.FC = () => {
    const data = useLoaderData() as Country
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()

    const nativeNameElements = Object.keys(data.name.nativeName).map((key, index, array) => <span key={key}>
        {' '}{data.name.nativeName[key].common}{array.length - 1 === index ? '' : ','}
    </span>)

    const currencyElements = Object.keys(data.currencies).map((key, index, array) => <span key={key}>
        {' '}{data.currencies[key].name}{array.length - 1 === index ? '' : ','}
    </span>)

    const languageElements = Object.keys(data.languages).map((key, index, array) => <span key={key}>
        {' '}{data.languages[key]}{array.length - 1 === index ? '' : ','}
    </span>)

    const borderElements = data.borders ? data.borders.map(border => (<Link key={border} to={`/${border}`} className={`border__country--item ${theme}__theme`}>
        {border}</Link>)) : <span>None</span>

    return (
        <>
            {/* <Link to='..' relative='path' >&#8592; &nbsp; Back</Link> */}
            <button className={`back__link ${theme}__theme`} onClick={() => navigate(-1)}>&#8592; &nbsp; Back</button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}>
                <div className={`country__card--details--box ${theme}__theme`}>
                    <img
                        src={data.flags.png}
                        alt={data.flags.alt ? data.flags.alt : ''}
                        className='country__card--flag' />
                    <div className='country__card--details'>
                        <h2 className='country__card--name'>{data.name.common}</h2>
                        <div>
                            <p>
                                <span className='country__card--text--label'>Native Names:</span>
                                {' '}{nativeNameElements}
                            </p>

                            <p>
                                <span className='country__card--text--label'>Population:</span>
                                {' '}{data.population.toLocaleString()}
                            </p>
                            <p>
                                <span className='country__card--text--label'>Region:</span>
                                {' '}{data.region}
                            </p>
                            <p>
                                <span className='country__card--text--label'>Sub Region:</span>
                                {' '}{data.subregion}
                            </p>
                            <p>
                                <span className='country__card--text--label'>Capital:</span>
                                {' '}{data.capital}
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className='country__card--text--label'>Top Level Domain:</span>
                                <span>{' '}{data.tld}</span>
                            </p>
                            <p>
                                <span className='country__card--text--label'>Currencies:</span>
                                {' '}{currencyElements}
                            </p>
                            <p>
                                <span className='country__card--text--label'>Languages:</span>
                                {' '}{languageElements}
                            </p>
                        </div>

                        <div className='border__country--box'>
                            <p className='country__card--text--label'>Border Countries: </p>
                            <div className='border__country--box--inner'>
                                {borderElements}
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CountryDetails
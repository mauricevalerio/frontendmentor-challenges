import FormSearch from '../components/FormSearch'
import FormDropdown from '../components/FormDropdown'
import CountryCard from '../components/CountryCard'
import { extractSummaryData } from '../utils/fetch'
import { filterChecker } from '../utils/filterChecker'
import { useLoaderData, defer, Await } from 'react-router-dom'
import { Suspense, useContext, useState } from 'react'
import { AllCountry } from '../interfaces/ICountry'
import { UseLoaderDataType } from '../interfaces/IUseLoaderData'
import { motion } from "framer-motion"
import { ThemeContext } from '../context/Context'

export const loader = async () => {
    const countries = await extractSummaryData()
    return defer({ countries })
}

const Home: React.FC = () => {
    const data = useLoaderData() as UseLoaderDataType
    const { theme } = useContext(ThemeContext)

    const [searchCountry, setSearchCountry] = useState<string>('')
    const [filterRegion, setFilterRegion] = useState<string>('')

    const searchCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchCountry(e.target.value)
    }

    const filterRegionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setFilterRegion(e.target.value)
    }

    const filteredElements = data.countries.filter((country: AllCountry) => {
        if (searchCountry.length > 0 && filterRegion.length > 0) {
            return filterChecker(country.name.common, searchCountry) && filterChecker(country.region, filterRegion)
        } else if (filterRegion.length > 0) {
            return filterChecker(country.region, filterRegion)
        } else if (searchCountry.length > 0) {
            return filterChecker(country.name.common, searchCountry)
        }
    })

    return (
        <>
            <div className='form__components--box'>
                <FormSearch
                    searchCountry={searchCountry}
                    searchCountryInputChange={searchCountryInputChange} />
                <FormDropdown
                    filterRegion={filterRegion}
                    filterRegionChange={filterRegionChange}
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}>
                <div className='countries__box'>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <Await resolve={data}>
                            {data => {
                                return searchCountry.length > 0 || filterRegion.length > 0 ?
                                    filteredElements.length === 0 ?
                                        <h3 className={`country__not--found ${theme}__theme`}>No country found based on search filters.</h3>
                                        :
                                        filteredElements.map((country: AllCountry, index: number) => <CountryCard key={index} {...country} />)
                                    :
                                    data.countries.map((country: AllCountry, index: number) => <CountryCard key={index} {...country} />)
                            }}
                        </Await>
                    </Suspense>
                </div>
            </motion.div>
        </>
    )
}

export default Home
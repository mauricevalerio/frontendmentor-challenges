import { Country, AllCountry } from '../interfaces/ICountry'

const baseUrl = 'https://restcountries.com/'
const version = 'v3.1/'
const endPoint = 'all'

const fetchAllCountries = async (): Promise<AllCountry[]> => {
    const response = await fetch(`${baseUrl}${version}${endPoint}`)
    const data = await response.json()

    if (!response.ok)
        console.error("Error")

    return data
}

export const transformAllCountriesData = async (): Promise<AllCountry[]> => {
    const data = await fetchAllCountries()

    return data.map((country: AllCountry) => ({
        flags: {
            png: country.flags.png,
            alt: country.flags.alt
        },
        name: {
            common: country.name.common
        },
        population: country.population,
        region: country.region,
        capital: country.capital
    }
    ))
}

const fetchCountry = async (countryName: string): Promise<Country> => {
    const response = await fetch(`${baseUrl}${version}name/${countryName}?fullText=true`)
    const data = await response.json()

    console.log(data)

    if (!response.ok)
        console.error("Error")

    return data[0]
}

export const transformCountryData = async (countryName: string): Promise<Country> => {
    const data = await fetchCountry(countryName)
    console.log(data)

    return {
        flags: {
            png: data.flags.png,
            alt: data.flags.alt
        },
        name: {
            common: data.name.common,
            nativeName: data.name.nativeName
        },
        population: data.population,
        region: data.region,
        subregion: data.subregion,
        capital: data.capital,
        tld: data.tld,
        currencies: data.currencies,
        languages: data.languages,
        borders: data.borders ? await Promise.all(data.borders.map(async (border) => {
            const name = await fetchCountryName(border)
            return name
        })) : undefined
    }
}

export const fetchCountryName = async (countryCode: string): Promise<string> => {
    const response = await fetch(`${baseUrl}${version}alpha/${countryCode}`)
    const data = await response.json()

    if (!response.ok)
        console.error("Error")

    return data[0].name.common
}
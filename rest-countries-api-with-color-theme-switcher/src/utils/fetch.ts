import { Country, AllCountry } from '../interfaces/ICountry'
import { BASE_URL, API_VERSION, ENDPOINT } from '../constants/index'

const fetchAllData = async (): Promise<AllCountry[]> => {
    const response = await fetch(`${BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data = await response.json()

    if (!response.ok)
        console.error("Error")

    return data
}

export const extractSummaryData = async (): Promise<AllCountry[]> => {
    const data = await fetchAllData()

    return data.map((country: AllCountry) => {
        const { flags: { png, alt }, name: { common }, population, region, capital } = country
        return {
            flags: { png, alt },
            name: { common },
            population,
            region,
            capital
        }
    })
}

const fetchItemData = async (countryName: string): Promise<Country> => {
    const response = await fetch(`${BASE_URL}${API_VERSION}name/${countryName}?fullText=true`)
    const data = await response.json()

    if (!response.ok)
        console.error("Error")

    return data[0]
}

export const extractItemData = async (countryName: string): Promise<Country> => {
    const data = await fetchItemData(countryName)
    console.log(data)
    const { flags: { png, alt }, name: { common, nativeName }, population, region, subregion, capital, tld, currencies, languages, borders, } = data

    return {
        flags: { png, alt },
        name: { common, nativeName },
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        languages,
        borders: borders ? await Promise.all(borders.map(async (border) => {
            const name = await fetchName(border)
            return name
        })) : undefined
    }
}

export const fetchName = async (countryCode: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}${API_VERSION}alpha/${countryCode}`)
    const data = await response.json()
    console.log(data)

    if (!response.ok)
        console.error("Error")

    return data[0].name.common
}
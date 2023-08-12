export interface FormSearchProps {
    searchCountry: string,
    searchCountryInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FormDropDownProps {
    filterRegion: string,
    filterRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
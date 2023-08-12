interface Flag {
    png: string,
    alt: string
}

export interface NativeName {
    [key: string]: {
        official: string,
        common: string
    }
}

export interface Currency {
    [key: string]: {
        name: string,
        symbol: string
    }
}

export interface Language {
    [key: string]: string
}

export interface AllCountry {
    flags: Flag,
    name: {
        common: string
    },
    population: number,
    region: string,
    capital: string[]
}

export interface Country {
    flags: Flag,
    name: {
        common: string,
        nativeName: NativeName
    },
    population: number,
    region: string,
    subregion: string,
    capital: string[],
    tld: string[],
    currencies: Currency,
    languages: Language
    borders?: string[]
}
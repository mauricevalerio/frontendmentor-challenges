export interface IpAddress {
    ip: string,
    location: {
        country: string,
        region: string,
        city: string,
        lat: number,
        lng: number,
        postalCode: number | string,
        timezone: string,
        geonameId: number | string
    },
    as: {
        asn: number | string,
        name: string,
        route: string,
        domain: string,
        type: string
    },
    isp: string
}

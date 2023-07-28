import { IpAddress } from "../interfaces/IpAddress"
import { isIP } from 'is-ip'

const isInputIp = (inputIp: string): boolean => isIP(inputIp) ? true : false

export const fetchIpData = async (inputIp: string = ""): Promise<IpAddress> => {
    let queryString: string = inputIp.length > 0 ? isInputIp(inputIp) ? `ipAddress=${inputIp}` : `domain=${inputIp}` : ""
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8avWcUYt9CBPpwwbYLrODrUhYjePL&${queryString}`)
        const data = await response.json()
        return data
    } catch (e) {
        throw e
    }
}
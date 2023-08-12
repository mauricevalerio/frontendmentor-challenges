export const filterChecker = (data: string, filterCriteria: string): boolean => {
    return data.toLowerCase().includes(`${filterCriteria.toLowerCase()}`)
}
import { ErrorResponse } from "./ErrorResponse"

export interface HeaderProps {
    inputIp: string,
    setInputIp: React.Dispatch<React.SetStateAction<string>>
    fetch: () => Promise<void>
    error: ErrorResponse | undefined
}
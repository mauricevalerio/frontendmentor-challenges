export interface HeaderProps {
    inputIp: string,
    setInputIp: React.Dispatch<React.SetStateAction<string>>
    fetch: () => Promise<void>
}
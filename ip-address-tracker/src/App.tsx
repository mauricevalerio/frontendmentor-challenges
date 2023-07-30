import { useEffect, useState } from 'react'
import { IpAddress } from './interfaces/IpAddress'
import { fetchIpData } from './utils/utils'
// import { ErrorResponse } from './interfaces/ErrorResponse'
import Header from './components/Header'
import Map from './components/Map'
import Results from './components/Results'

const App: React.FC = () => {

  const [width, setWidth] = useState<number>(window.innerWidth)
  const [inputIp, setInputIp] = useState<string>('')
  const [ipData, setIpData] = useState<IpAddress>(
    { "ip": "8.8.8.8", "location": { "country": "US", "region": "California", "city": "Mountain View", "lat": 37.38605, "lng": -122.08385, "postalCode": "94035", "timezone": "-07:00", "geonameId": 5375480 }, "domains": ["21vek-15801.21vek-dev.by", "825391.com", "alarm-jetfamilyday.ru", "anapaulatoledo.com.br", "api.21vek-15801.21vek-dev.by"], "as": { "asn": 15169, "name": "GOOGLE", "route": "8.8.8.0\/24", "domain": "https:\/\/about.google\/intl\/en\/", "type": "Content" }, "isp": "Google LLC" })
  // or ErrorResponse

  const fetch = async (): Promise<void> => {
    const data = await fetchIpData(inputIp)
    setIpData(data)
    setInputIp('')
  }

  // useEffect((): void => { fetch() }, [])

  useEffect(() => {
    const changeWidth = (): void => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", changeWidth)

    return (): void => {
      window.removeEventListener("resize", changeWidth)
    }
  }, [width])

  return (
    <>

      <header
        style={{
          background: `no-repeat center/cover url(${width <= 768 ? "pattern-bg-mobile.png" : "pattern-bg-desktop.png"})`
        }}
        className='p-4 is-relative'>
        <Header
          inputIp={inputIp}
          setInputIp={setInputIp}
          fetch={fetch}
        />
        {ipData && <Results {...ipData} />}
      </header>

      {ipData?.location.lat && ipData?.location.lng &&
        <Map
          lat={ipData.location.lat}
          lng={ipData.location.lng}
        />
      }

    </>
  )
}

export default App
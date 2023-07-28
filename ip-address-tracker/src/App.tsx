import { useState, useEffect } from 'react'
// import { IpAddress } from './interfaces/IpAddress'
// import { fetchIpData } from './utils/utils'
import IconArrow from './assets/icon-arrow.svg'

export default function App(): JSX.Element {
  const [inputIp, setInputIp] = useState<string>('')
  // const [ipData, setIpData] = useState<IpAddress>()

  // How to determine if an IP Address or Domain is passed?

  // const fetch = async (): Promise<void> => {
  //   const data = await fetchIpData(inputIp)
  //   setIpData(data)
  //   setInputIp("")
  // }

  useEffect((): void => {
    // fetch()
  }, [])

  // fetchIpData("google.com").then(data => console.log(data)).catch(e => console.log(e))
  // fetchIpData("62.64.64.12").then(data => console.log(data)).catch(e => console.log(e))
  // fetchIpData("asdasdasd").then(data => console.log(data)).catch(e => console.log(e)) //{code: 422, messages: 'Input correct domain.'}
  // fetchIpData("192.212.174.101").then(data => console.log(data)).catch(e => console.log(e)) //{ip: '192.212.174.101', location: {…}, as: {…}, isp: 'Southern California Edison'}
  return (
    <>
      <header className='p-4 is-relative'>
        <h1 className='has-text-centered has-text-white title is-3 is-spaced'>IP Address Tracker</h1>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <input
              className='input is-medium is-rounded'
              type='text'
              name='inputIp'
              value={inputIp}
              onChange={(e) => setInputIp(e.target.value)}
              placeholder='Search for any IP address or domain' />
          </div>
          <div className='control'>
            <button
              // onClick={fetch}
              className='button is-black is-medium is-rounded'>
              <img src={IconArrow} alt='Greater than symbol button' />
            </button>
          </div>
        </div>

        <div className='p-4 is-rounded'>
          <div className='box content has-text-weight-bold has-text-centered'>

            <p className='is-size-7 is-uppercase dark-gray-txt'>IP Address</p>
            {/* <p className='is-size-5'>{ipData?.ip}</p> */}

            <p className='is-size-7 is-uppercase dark-gray-txt'>Location</p>
            {/* <p className='is-size-5'>{ipData?.location.city}, {ipData?.location.region} {ipData?.location.postalCode}</p> */}

            <p className='is-size-7 is-uppercase dark-gray-txt'>Timezone</p>
            {/* <p className='is-size-5'>UTC {ipData?.location.timezone}</p> */}

            <p className='is-size-7 is-uppercase dark-gray-txt'>ISP</p>
            {/* <p className='is-size-5'>{ipData?.isp}</p> */}
          </div>
        </div>
      </header>


    </>
  )
}
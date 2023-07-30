import { IpAddress } from "../interfaces/IpAddress"

const Results: React.FC<IpAddress> = (ipData) => {
    return (
        <div className='container box has-text-weight-bold has-text-centered-mobile has-text-left-tablet columns is-variable mx-auto'>
            <div className="column item">
                <p className='is-size-7-mobile is-size-7-tablet is-uppercase dark-gray-txt'>IP Address</p>
                <p className='is-size-5-mobile is-size-6-tablet'>{ipData?.ip}</p>
            </div>

            <div className="column item">
                <p className='is-size-7-mobile is-size-7-tablet is-uppercase dark-gray-txt'>Location</p>
                <p className='is-size-5-mobile is-size-6-tablet'>{ipData?.location.city}, {ipData?.location.region} {ipData?.location.postalCode}</p>
            </div>


            <div className="column item">
                <p className='is-size-7-mobile is-size-7-tablet is-uppercase dark-gray-txt'>Timezone</p>
                <p className='is-size-5-mobile is-size-6-tablet'>UTC {ipData?.location.timezone}</p>
            </div>


            <div className="column item">
                <p className='is-size-7-mobile is-size-7-tablet is-uppercase mb-2 dark-gray-txt'>ISP</p>
                <p className='is-size-5-mobile is-size-6-tablet'>{ipData?.isp}</p>
            </div>

        </div>
    )
}

export default Results
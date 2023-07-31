import { IpAddress } from "../interfaces/IpAddress"

const Results: React.FC<IpAddress> = (ipData) => {
    return (
        <div className='is-relative results-relative mx-auto container box has-text-weight-bold has-text-centered-mobile has-text-left-tablet columns'>
            <div className="column item">
                <p className='is-size-7 is-uppercase has-text-grey-light'>IP Address</p>
                <p className='is-size-5'>{ipData?.ip}</p>
            </div>

            <div className="column item">
                <p className='is-size-7 is-uppercase has-text-grey-light'>Location</p>
                <p className='is-size-5'>{ipData?.location.city}, {ipData?.location.region} {ipData?.location.postalCode}</p>
            </div>

            <div className="column item">
                <p className='is-size-7 is-uppercase has-text-grey-light'>Timezone</p>
                <p className='is-size-5'>UTC {ipData?.location.timezone}</p>
            </div>

            <div className="column item">
                <p className='is-size-7 is-uppercase has-text-grey-light'>ISP</p>
                <p className='is-size-5'>{ipData?.isp}</p>
            </div>

        </div>
    )
}

export default Results
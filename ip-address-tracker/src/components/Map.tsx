import { newIcon } from '../utils/icon'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet'
import { MapProps } from '../interfaces/Map'
import { ChangeView } from './ChangeView'

const Map: React.FC<MapProps> = ({ lat, lng }) => {
    return (
        <>
            <MapContainer
                style={{ height: "65%" }}
                center={{ lat, lng }} zoom={13} scrollWheelZoom={true}>

                {/* So that Map will re-render */}
                <ChangeView center={{ lat, lng }} zoom={13} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position='bottomright' />
                <Marker icon={newIcon} position={{ lat, lng }}>
                </Marker>
            </MapContainer>
        </>
    )
}

export default Map
import { useMap } from "react-leaflet"
import { ChangeViewProps } from "../interfaces/ChangeViewProps"

export const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap()
  map.setView(center, zoom)
  return null
}
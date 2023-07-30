import Leaflet from 'leaflet'
// Code to generate custom market on the map
export const newIcon = new Leaflet.Icon({
    iconUrl: ("icon-location.svg"),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 55],
})
import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import { renderMatches } from 'react-router-dom'
import "@reach/combobox/styles.css"
import mapStyles from "../components/mapStyles.js"
import { useState } from 'react'

const options ={
    styles: mapStyles,
    disableDefaultUI:true,
    zoomControl: true,
}

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const center = {
    lat:34.068920,
    lng:-118.445183,
}


const libraries = ["places"]
export default function Maps() {
    const [markers, setMarkers] = useState([])
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if(loadError)
        return "Error loading Maps"
    if(!isLoaded)
        return "Loading Maps"
    return(
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom = {16}
                center = {center}
                options = {options}
                onClick={(event) => {
                    setMarkers(current => [...current, {
                        lat:event.latLng.lat(),
                        lng: event.latLng.lng(),
                        time: new Date()
                        }
                    ])
                }}>
                {markers.map(marker => <Marker key = {marker.time.toISOString()}
                                               position = {{lat: marker.lat, lng: marker.lng}}/>)}
            </GoogleMap>
        </div>
    )

}
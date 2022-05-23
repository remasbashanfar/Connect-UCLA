import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import { renderMatches } from 'react-router-dom'
import "@reach/combobox/styles.css"

const libraries = ["places"]
export default function Maps() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if(loadError)
        return "Error loading Maps"
    if(!isLoaded)
        return "Loading Maps"
    return(
        <div>Hi</div>
    )

}
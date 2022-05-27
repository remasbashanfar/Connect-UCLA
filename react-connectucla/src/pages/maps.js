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
import { useState, useEffect } from 'react'
import Geocode from "react-geocode";
import PostAPI from '../services/post.js'

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

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)


  /*navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });*/
  

const libraries = ["places"]
export default function Maps() {


    const [markers, setMarkers] = useState([])
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    useEffect(() => {
        locationToMarker();
    }, []);

    const locationToMarker = () => {
        PostAPI.getAll()
            .then(response =>{
                let locations = [];
                let Transform = response.data.map(d => [d._id, d.title, d.content, d.imgurl,d.tags,d.location]);


                const length = Transform[0].length-1
                for(let i = 0; i < Transform.length; i++ )
                {
                    locations.push(Transform[i][length])
                }

                for(let j = 0; j < locations.length; j++)
                {
                    if (locations[j] == null)
                        continue;
                    Geocode.fromAddress(locations[j]).then(
                        async (response) => {
                          const { lat, lng } = await response.results[0].geometry.location;

                          setMarkers(current => [...current, {
                            lat:lat,
                            lng: lng,
                            time: new Date()
                            }])})
                }
                
    })}
    
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
                {markers.map(marker => <Marker key = {marker.time.toISOString() + marker.lat}
                                               position = {{lat: marker.lat, lng: marker.lng}}
                                        />
                            )
                }
            </GoogleMap>
        </div>
    )

}
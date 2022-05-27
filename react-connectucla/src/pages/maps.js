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
    const [selected, setSelected] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    useEffect(() => {
        locationToMarker();
    }, []);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    },[])

    const locationToMarker = () => {
        PostAPI.getAll()
            .then(response =>{
                let locations = [];
                let Posts = response.data.map(d => [d._id, d.title, d.location, d.startTime, d.date, 
                                                        d.RSVP_counter, d.tags, d.author, d.content, d.endTime, d.location]);

                const locationIndex = Posts[0].length-1
                for(let i = 0; i < Posts.length; i++ )
                {
                    locations.push(Posts[i][locationIndex])
                }

                for(let j = 0; j < locations.length; j++)
                {
                    if (locations[j] == null)
                        continue;
                    Geocode.fromAddress(locations[j]).then(
                        async (response) => {
                          const { lat, lng } = await response.results[0].geometry.location;

                        //I shouldn't hard code these indices but it is ok for time being
                          setMarkers(current => [...current, {
                            lat:lat,
                            lng: lng,
                            time: new Date(),
                            startTime: Posts[j][3] == null ? "n/a" : Posts[j][3],
                            endTime: Posts[j][9]  == null ? "n/a" : Posts[j][9],
                            date: Posts[j][4] == null ? "n/a" : Posts[j][9],
                            location: Posts[j][10],
                            }])})
                }
                
    })}
    
    if(loadError)
        return "Error loading Maps"
    if(!isLoaded)
        return "Loading Maps"
    return(
        <div>
            <button>
            </button>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom = {16}
                center = {center}
                options = {options}
                onLoad = {onMapLoad}
            >
                {markers.map(marker => <Marker key = {marker.time.toISOString() + marker.lat}
                                               position = {{lat: marker.lat, lng: marker.lng}}
                                               onClick = {()=>{setSelected(marker)}}
                                        />
                            )
                }
                {selected ? (
                    <InfoWindow position = {{lat:selected.lat, lng:selected.lng}} 
                                onCloseClick = { () =>{
                                    setSelected(null)}
                                }
                    >
                        <div>
                            <p>Location: {selected.location}</p>
                            <p>Date: {selected.date}</p>
                            <p>Start Time: {selected.startTime}</p>
                            <p>End Time: {selected.endTime}</p>
                        </div>
                    </InfoWindow>) : null
                }
            </GoogleMap>
        </div>
    )

}
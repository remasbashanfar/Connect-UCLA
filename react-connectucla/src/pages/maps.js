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
import MapFilter from '../components/mapFilter.js'
import NavBar from '../components/navbar.js'
import {Combobox,
        ComboboxInput,
        ComboboxPopover,
        ComboboxList,
        ComboboxOption} from "@reach/combobox"
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import DatePicker from "../components/datePicker.js"

const options ={
    styles: mapStyles,
    disableDefaultUI:true,
    zoomControl: true,
}

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const uclaLAT = 34.068920
const uclaLNG = -118.445183

let allowedLAT;
let allowedLNG;


let allowedPosition = false;
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)


  

const libraries = ["places"]
export default function Maps() {

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null);
    const [locationFilterStatus, setLocationFilterStatus] = useState(false)
    const [locationFilter, setLocationFilter] = useState("")
    const [dateFilterStatus, setDateFilterStatus] = useState(false)
    const [dateFilter, setDateFilter] = useState("")

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    useEffect(() => {
        locationToMarker();
    }, [locationFilter, dateFilter]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(async (map) => {
        mapRef.current = await map;
    },[])
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        allowedPosition = true;
        allowedLAT = await position.coords.latitude
        allowedLNG = await position.coords.longitude

        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    
      
    let center = {
        lat: allowedPosition ? allowedLAT : uclaLAT,
        lng: allowedPosition ? allowedLNG : uclaLNG,
    }

    const locationToMarker = () => {
        PostAPI.getAll()
            .then(response =>{
                let locations = [];
                
                let Posts = response.data
                
                for(let i = 0; i < Posts.length; i++ )
                {
                    locations.push(Posts[i].location)
                   
                    
                }
                
                setMarkers([])
                for(let j = 0; j < locations.length; j++)
                {
                    if(!locationFilterStatus)
                    {
                        if(dateFilterStatus)
                        {
                            let tmpArray;
                            let tmpString = Posts[j].startTime.split('T')[0]
                            tmpString = tmpString.replace(/-/g, "/")
                            tmpArray=tmpString.split("/")
                            const index0  = tmpArray[0]
                            const index1 = tmpArray[2]
                            tmpArray[0] = tmpArray[1]
                            tmpArray[1] = index1
                            tmpArray[2] = index0
                            tmpString = tmpArray.join('/')
                            if(Posts[j].startTime.split('T')[0] !== dateFilter)
                            {

                            }
                            else
                            {
                                Geocode.fromAddress(locations[j]).then(
                                    async (response) => {
                                      const { lat, lng } = await response.results[0].geometry.location;
            
                                      
                                      setMarkers(current => [...current, {
                                        lat:lat,
                                        lng: lng,
                                        time: new Date(),
                                        startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                        endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                        location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                        }])})
                            }
                        }else{
                            Geocode.fromAddress(locations[j]).then(
                                async (response) => {
                                  const { lat, lng } = await response.results[0].geometry.location;
                                    
                                  
                                  setMarkers(current => [...current, {
                                    lat:lat,
                                    lng: lng,
                                    time: new Date(),
                                    startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                    endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                    location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                    }])})
                        }
                    }
                    else
                    {
                        if(locations[j] !== locationFilter)
                        {
                            
                        }
                        else if(dateFilterStatus)
                        {
                            if(Posts[j].startTime.split('T')[0] !== dateFilter)
                            {

                            }
                            else
                            {
                                Geocode.fromAddress(locations[j]).then(
                                    async (response) => {
                                      const { lat, lng } = await response.results[0].geometry.location;
            
                                      
                                      setMarkers(current => [...current, {
                                        lat:lat,
                                        lng: lng,
                                        time: new Date(),
                                        startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                        endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                        location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                        }])})
                            }
                        }
                        else
                        {
                            Geocode.fromAddress(locations[j]).then(
                                async (response) => {
                                  const { lat, lng } = await response.results[0].geometry.location;
        
                                  
                                  setMarkers(current => [...current, {
                                    lat:lat,
                                    lng: lng,
                                    time: new Date(),
                                    startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                    endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                    location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                    }])})
                        }
                    }
                }
                if(!dateFilterStatus)
                {

                }
                else{
                    
                    let tmpMarkers = markers.filter(marker => marker.startTime.split('T')[0] === dateFilter)
                    
                    setMarkers([])
                }
                
    })}
    
    if(loadError)
        return "Error loading Maps"
    if(!isLoaded)
        return "Loading Maps"
    return(
        <div>
            <NavBar/>
            <MapFilter 
                       locationFilterStatus = {locationFilterStatus} 
                       setLocationFilterStatus = {setLocationFilterStatus}
                       locationFilter = {locationFilter}
                       setLocationFilter = {setLocationFilter}
                       dateFilterStatus = {dateFilterStatus}
                       setDateFilterStatus = {setDateFilterStatus}
                       dateFilter = {dateFilter}
                       setDateFilter = {setDateFilter}
            />
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom = {16}
                center = {center}
                options = {options}
                onLoad = {onMapLoad}
            >
                {markers.map(marker => <Marker key = {marker.time.toISOString() + marker.location + marker.startTime}
                                               position = {{lat: marker.lat, lng: marker.lng}}
                                               onClick = {()=>{setSelected(marker)}}
                                        />
                            )
                }
                {selected ? (
                    <InfoWindow position = {{lat:selected.lat, lng:selected.lng}} 
                                onCloseClick = { () =>{
                                    center.lat = selected.lat
                                    center.lng = selected.lng
                                    setSelected(null)
                                    }
                                }
                    >
                        <div>
                            <p>Location: {selected.location}</p>
                            <p>Date: {selected.date}</p>
                            <p>Start Time: {selected.startTime.split('T')[0]} at {selected.startTime.split('T')[1]}</p>
                            <p>End Time: {selected.endTime.split('T')[0]} at {selected.endTime.split('T')[1]}</p>
                        </div>
                    </InfoWindow>) : null
                }
            </GoogleMap>
        </div>
    )

}

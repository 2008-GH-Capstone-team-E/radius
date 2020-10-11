import React, { useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from './mapStyle'
import { useDispatch, useSelector } from "react-redux";
import {fetchProperties} from '../store/allProperties';
import Nearby from './Nearby'
import {Link} from 'react-router-dom'
// import {fetchGooglePlaces} from '../store/allGooglePlaces';


const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};


export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const properties = useSelector(state => state.allProperties);
  const dispatch = useDispatch();
  console.log("properties", properties)

  const googlePlaces = useSelector(state => state.allGooglePlaces);
  console.log("googlePlaces", googlePlaces)

  useEffect(() => {
    dispatch(fetchProperties())
    // dispatch(fetchGooglePlaces(40.712776, -74.005974))
    return () => {
    };
  }, [])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
  <div id='map'>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options}>
      {properties.map((property) =>{
        return(
          <Link to={`/properties/${property.property_id}`}>
            <Marker key={property.property_id}
            position={{lat: property.address.lat, lng: property.address.lon }}>
              </Marker>
          </Link>
        )})}
      </GoogleMap>
  </div>
  )

}


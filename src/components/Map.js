import React, { useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from '../css/mapStyles'
import { useDispatch, useSelector } from "react-redux";
import {fetchProperties} from '../store/allProperties'

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

  useEffect(() => {
    dispatch(fetchProperties())
    return () => {
    };
  }, [])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
  <div>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options}>
      {properties.map((property) => <Marker key={property.property_id} position={{lat: property.address.lat, lng: property.address.lon }}/>)}

    </GoogleMap>

  </div>
  )

}

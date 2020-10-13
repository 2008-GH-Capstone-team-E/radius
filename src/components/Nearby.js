import React, { Component } from 'react';
import mapStyle from './mapStyle'
import Map from './Map'
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"
import { fetchGooglePlaces } from '../store/allGooglePlaces';

const API_KEY =`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;


let map;
let infowindow;
let service;

class Nearby extends Component {
  constructor(props){
    super(props)
      this.state = {
        placesDetails: [],
        sortedPlacesDetails: [],
        //lat lng will change when user select a property
        lat: 40.748817,
        lng: -73.985428,
        zoom: 14,
        selectedProperty:null,
        subwayNearby: [{name: "CENTER STATION", position: {lat: 42.040910, lon: -87.776360}}]
    }
    this.createMarker = this.createMarker.bind(this)
    // this.createPlacesMarker = this.createPlacesMarker.bind(this)
  }


  async componentDidMount() {
    await this.renderMap();
    await this.props.getAllPropertiesInReact();
    // await this.props.getAllPlacesInReact();
    console.log("THIS>PROPS", this.props)

  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {

    // Default Location
    var location = {
      lat: this.state.lat,
      lng: this.state.lng
    };

    // Initialize Map
    map = new window.google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 14,
        styles: mapStyle
    });

    infowindow = new window.google.maps.InfoWindow();
    // service = new window.google.maps.places.PlacesService(map);
    // service.nearbySearch(request, this.callback);
  }


  // createPlacesMarker = (places, map) => {
    // const bounds = new google.maps.LatLngBounds();
    // const placesList = document.getElementById("places");

    // for (let i = 0, place; (place = places[i]); i++) {
    //   const image = {
    //     url: place.icon,
    //     size: new window.google.maps.Size(71, 71),
    //     origin: new window.google.maps.Point(0, 0),
    //     anchor: new window.google.maps.Point(17, 34),
    //     scaledSize: new window.google.maps.Size(25, 25),
    //   };
    //   new window.google.maps.Marker({
    //     map,
    //     icon: image,
    //     title: place.name,
    //     position: place.geometry.location,
    //   });
      // const li = document.createElement("li");
      // li.textContent = place.name;
      // placesList.appendChild(li);
      // bounds.extend(place.geometry.location);
    // }
    // map.fitBounds(bounds);
  // }

  createMarker = (property) => {
    // console.log("in createMarker func",property)
    var marker = new window.google.maps.Marker({
        map: map,
        title: property.address.line,
        position: {
          lat:property.address.lat,
          lng:property.address.lon
        }
    });

    const testArray = this.state.subwayNearby
    const createPlaceMarker = (station) => {

      console.log("station", station)
      // console.log("in createMarker func",property)
      var marker = new window.google.maps.Marker({
          map: map,
          title: station.name,
          position: {
            lat: station.position.lat,
            lng: station.position.lon
          }
      });
    }

    marker.addListener('click', function() {

      map.setZoom(16);
      map.setCenter({
        lat:property.address.lat,
        lng:property.address.lon
      });

      let content = `
        <h2>${property.address.line}</h2>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);

      testArray.map(station => createPlaceMarker(station))


      // this.props.getAllPlacesInReact(property.address.lat,property.address.lon);
      // console.log("THIS", this.props)

      // const request = {
      //   // query: "restaurant",
      //   type: ['subway_station'],
      //   // radius: '10000',
      //   // fields: ["name", "geometry"],
      //   location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
      //   radius: 1000,
      //   // keyword: 'restaurant'
      // };

      // service = new window.google.maps.places.PlacesService(map);

      // service.nearbySearch(request, (results, status) => {
      //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //     for (let i = 0; i < results.length; i++) {
      //       console.log("results[i]",results[i])
      //       this.createPlacesMarker(results[i]);
      //     }
      //     // map.setCenter(results[0].geometry.location);
      //   }
      // });

    })


  }

  render() {
// console.log("this is props", this.props)

const properties = this.props.propertiesInReact
// console.log("properties?",properties)
// console.log("property in Nearby", properties)
    return (
      <div
        id="map"
        style={{width: "80%", height: "80vh"}} >
        {properties&&properties.length>0&&properties.map(property=>this.createMarker(property))}
      </div>
    );
  }
}

function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

const mapState = state =>{
  return {
    propertiesInReact:state.allProperties
  }
}

const mapDispatch = dispatch => {
  return {
    getAllPropertiesInReact : ()=>{
      dispatch(fetchProperties())
    },
    getAllPlacesInReact: (lat, lon)=> {
      console.log("getAllPlacesInReact");
      dispatch(fetchGooglePlaces(lat, lon))
    }
  }
}

export default connect(mapState,mapDispatch)(Nearby)
// export default Nearby;
//

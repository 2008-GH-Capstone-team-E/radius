import React, { Component } from 'react';
import mapStyle from './mapStyle'
import Map from './Map'
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"
import { fetchGooglePlaces } from '../store/allGooglePlaces';
import subwayPic from "../css/subwayLogo.png"
import restaurantPic from "../css/restaurantLogo.png"

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
        subwayNearby: []
    }
    this.createMarker = this.createMarker.bind(this)
    // this.createPlacesMarker = this.createPlacesMarker.bind(this)
  }


  async componentDidMount() {
    await this.renderMap();

    await this.props.getAllPropertiesInReact();
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
        zoom: 12,
        styles: mapStyle
    });

    infowindow = new window.google.maps.InfoWindow();
    // service = new window.google.maps.places.PlacesService(map);
    // service.nearbySearch(request, this.callback);
  }



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



    
    const createPlaceMarker = (station) => {
      console.log("station", station)
      // console.log("in createMarker func",property)
      var marker = new window.google.maps.Marker({
          map: map,
          icon:{
            url:subwayPic,
            scaledSize:new window.google.maps.Size(20, 20)
          },
          title: station.name,
          position: {
            lat: station.geometry.viewport.Ya.i,
            lng: station.geometry.viewport.Sa.i
          },
          
      });


      marker.addListener('mouseover',function(){
        let content = `
        <h2>${station.name}</h2>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      })

    
    }

    const createRestaurantMarker = (restaurant) => {
      console.log("restaurant", restaurant)
      // console.log("in createMarker func",property)
      var marker = new window.google.maps.Marker({
          map: map,
          icon:{
            url:restaurantPic,
            scaledSize:new window.google.maps.Size(20, 20)
          },
          title: restaurant.name,
          position: {
            lat: restaurant.geometry.viewport.Ya.i,
            lng: restaurant.geometry.viewport.Sa.i
          },
          
      });


      marker.addListener('mouseover',function(){
        let content = `
        <h2>${restaurant.name}</h2>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      })

    
    }

  

    marker.addListener('click', function() {

      map.setZoom(15);
      map.setCenter({
        lat:property.address.lat,
        lng:property.address.lon
      });

      let content = `
        <h2>${property.address.line}</h2>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);



      const subwayRequest = {
        // query: "restaurant",
        type: ['subway_station'],
        // radius: '10000',
        // fields: ["name", "geometry"],
        location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
        radius: 1000,
        // keyword: 'restaurant'
      };

      service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(subwayRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            // console.log("results[i]",results[i])
            createPlaceMarker(results[i])
           
          }
        }
      });



      const restaurantRequest = {
        // query: "restaurant",
        type: ['restaurant'],
        // radius: '10000',
        // fields: ["name", "geometry"],
        location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
        radius: 1000,
        // keyword: 'restaurant'
      };

      service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(restaurantRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            // console.log("results[i]",results[i])
            createRestaurantMarker(results[i])
           
          }
        }
      });


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

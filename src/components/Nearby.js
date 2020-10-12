import React, { Component } from 'react';
import mapStyle from './mapStyle'
import Map from './Map'
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"

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
        selectedProperty:null
    }
    this.createMarker = this.createMarker.bind(this)
  }


  async componentDidMount() {
    await this.renderMap();
    await this.props.getAllPropertiesInReact();
    

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

    //Current Location Marker
    // var marker = new window.google.maps.Marker({
    //     position: location,
    //     map: map,
    //     title: "You're Here!"
    // });

    // Request Info: It will be used for Google Places API `PlacesServices` to get certain places that match our criteria
    var request = {
        location: location,
        radius: 1000,
        type: ['subway_station']
    }

    infowindow = new window.google.maps.InfoWindow();
    // service = new window.google.maps.places.PlacesService(map);
    // service.nearbySearch(request, this.callback);
  }

  // callback = (results, status) => {
  //   let that = this;
  //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {

  //     let placesInfo = [];
  //     let fields = ['name', 'formatted_address', 'photo', 'place_id', 'geometry'];

  //     // Get Places Details
  //     results.map(place => {
  //       service.getDetails({placeId: place.place_id, fields}, function(placeInfo, status) {
  //         if (status === window.google.maps.places.PlacesServiceStatus.OK) {

  //           // Add New Place
  //           placesInfo.push(placeInfo);

  //           // Update All Places & Add Markers
  //           that.setState({
  //             placesDetails: placesInfo,
  //             sortedPlacesDetails: placesInfo
  //           }, that.addMarkers(placesInfo))
  //         }
  //       })
  //     })
  //   }
  // }

  // addMarkers = (placesInfo) => {
  //   placesInfo.forEach(this.createMarker);
  // }
  // addMarkers = (properties) => {
  //   properties.forEach(this.createMarker);
  // }

  // createMarker = (place) => {
  //   var marker = new window.google.maps.Marker({
  //       map: map,
  //       title: place.name,
  //       position: place.geometry.location
  //   });

  //   marker.addListener('click', function() {

  //     var request = {
  //         reference: place.reference
  //     }

  //     let placePicture = place.photos ? place.photos[0].getUrl({maxWidth: 250, maxHeight: 250}) : 'https://via.placeholder.com/300';

  //     let content = `
  //       <h2>${place.name}</h2>
  //       <img src=${placePicture}>
  //       <ul>
  //         <li>${place.formatted_address}</li>
  //       </ul>
  //     `;
  //     infowindow.setContent(content);
  //     infowindow.open(map, marker);

  //   })
  // }

  createMarker = (property) => {
    console.log("in createMarker func",property)
    var marker = new window.google.maps.Marker({
        map: map,
        title: property.address.line,
        position: {
          lat:property.address.lat,
          lng:property.address.lon
        }
    });

    marker.addListener('click', function() {

      map.setZoom(16);
      map.setCenter({
        lat:property.address.lat,
        lng:property.address.lon
      });

      // var request = {
      //     reference: place.reference
      // }

      // let placePicture = place.photos ? place.photos[0].getUrl({maxWidth: 250, maxHeight: 250}) : 'https://via.placeholder.com/300';

      let content = `
        <h2>${property.address.line}</h2>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);

    })


  }

  render() {
// console.log("this is props", this.props)
const properties = this.props.propertiesInReact
console.log("properties?",properties)
console.log("property in Nearby", properties)
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
    }
  }
}

export default connect(mapState,mapDispatch)(Nearby)
// export default Nearby;
// 
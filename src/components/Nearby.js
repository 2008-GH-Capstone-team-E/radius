import React, { Component } from 'react';
import mapStyle from './mapStyle'
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
        property_Id:null,
        markers:[]
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
        zoom: 12,
        styles: mapStyle
    });

    infowindow = new window.google.maps.InfoWindow({
      maxWidth:300,
      maxHeight:225
    });
  }



  createMarker = (property) => {
    var marker = new window.google.maps.Marker({
        map: map,
        title: property.address.line,
        position: {
          lat:property.address.lat,
          lng:property.address.lon
        }
    });


    const createPlaceMarker = (station) => {
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
      this.setState({
        markers:[...this.state.markers,marker]
      })




      marker.addListener('click',function(){
        let pic = station.photos[0].getUrl({"maxWidth": 400, "maxHeight": 256})
        let content = `
        <h1>Subway</h1>
        <h2>${station.name}</h2>
        <img src="${pic}" alt="subway image" />
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      })


    }


    const createRestaurantMarker = (restaurant) => {
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

      this.setState({
        markers:[...this.state.markers,marker]
      })

      marker.addListener('click',function(){
        let pic = restaurant.photos[0].getUrl({"maxWidth": 400, "maxHeight": 256})
        let content = `
        <h3>Restaurant</h3>
        <h4>${restaurant.name}</h4>
        <img src="${pic}" alt="restaurant image" />
        <h5>Address: ${restaurant.vicinity}</h5>
        <h6>Rating: ${restaurant.rating}/5 from ${restaurant.user_ratings_total} customers</h6>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      })


    }


    //property marker
    marker.addListener('click', ()=>{
      this.setState({
        property_Id:property.property_id
      })

      console.log(this.state.markers)
      if(this.state.markers.length){
        this.state.markers.forEach(marker=>marker.setMap(null));
        //only push subway & restaurant marker to this array
        this.setState({
          markers:[]
        })
      }




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



      const subwayRequest = {
        type: ['subway_station'],
        location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
        radius: 500,
      };

      service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(subwayRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createPlaceMarker(results[i])
          }
        }
      });


      //maybe filter to grab more accurate result, from query?
      //since google limit 20 each call
      const restaurantRequest = {
        type: ['restaurant'],
        location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
        radius: 500,

      };

      service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(restaurantRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createRestaurantMarker(results[i])
          }
        }
      });
    })

  }

  render() {


  const properties = this.props.propertiesInReact
    return (
      <div>
      <div
        id="map"
        style={{width: "80%", height: "80vh"}} >
        {properties&&properties.length>0&&properties.map(property=>this.createMarker(property))}
      </div>
      <div>for single property info box, property id can be accessed from this.state.property_Id</div>
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
      dispatch(fetchGooglePlaces(lat, lon))
    }
  }
}

export default connect(mapState,mapDispatch)(Nearby);

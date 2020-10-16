import React, { Component } from 'react';
import mapStyle from './mapStyle'
import SinglePropertyBox from './SinglePropertyBox'
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"
import { fetchGooglePlaces } from '../store/allGooglePlaces';
import { fetchProperty } from '../store/singleProperty'
import subwayPic from "../css/subwayLogo.png"
import restaurantPic from "../css/restaurantLogo.png"
import { Button, Container, Row, Col } from "react-bootstrap";

import PropertyFilter from "./PropertyFilter"

// const API_KEY =`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const API_KEY = "AIzaSyAodlqJbUbT6KFaJMNK7pY3NyW8Ki-9sGc"

let map;
let infowindow;
let service;

class Nearby extends Component {
  constructor(props){
    super(props)
      this.state = {
        placesDetails: [],
        sortedPlacesDetails: [],
        // lat lng will change when user select a property
        lat: 40.748817,
        lng: -73.985428,
        zoom: 14,
        selectedProperty:null,
        property_Id:null,
        restaurantMarkers:[],
        subwayMarkers: [],
        restaurantCheckbox: false,
        // shoppingMallCheckbox: false

        //property_id:null,


    }
    this.createMarker = this.createMarker.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  async componentDidMount() {
    await this.renderMap();
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


  onChange = (e) => {
    this.setState({[e.target.name] : e.target.checked});

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
        restaurantMarkers:[...this.state.restaurantMarkers,marker]
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


    const restaurantRequest = {
      type: ['restaurant'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(restaurantRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.restaurantCheckbox) {
            createRestaurantMarker(results[i])
          } else {
          this.state.restaurantMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            restaurantMarkers: []
            })
          }
        }
      }
    });


    // const createShoppingMallMarker = (shoppingMall) => {
    //   var marker = new window.google.maps.Marker({
    //       map: map,
    //       icon:{
    //         url:subwayPic,
    //         scaledSize:new window.google.maps.Size(20, 20)
    //       },
    //       title: shoppingMall.name,
    //       position: {
    //         lat: shoppingMall.geometry.viewport.Ya.i,
    //         lng: shoppingMall.geometry.viewport.Sa.i
    //       },
    //   });

    //   this.setState({
    //     markers:[...this.state.markers,marker]
    //   })

    //   marker.addListener('click',function(){
    //     let pic = shoppingMall.photos[0].getUrl({"maxWidth": 400, "maxHeight": 256})
    //     let content = `
    //     <h3>Shopping Mall</h3>
    //     <h4>${shoppingMall.name}</h4>
    //     <img src="${pic}" alt="shoppingMall image" />
    //     <h5>Address: ${shoppingMall.vicinity}</h5>
    //     <h6>Rating: ${shoppingMall.rating}/5 from ${shoppingMall.user_ratings_total} customers</h6>
    //   `;
    //   infowindow.setContent(content);
    //   infowindow.open(map, marker);
    //   })
    // }


    // const shoppingMallRequest = {
    //   type: ['shopping_mall'],
    //   location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
    //   radius: 500,
    // };

    // service = new window.google.maps.places.PlacesService(map);

    // service.nearbySearch(shoppingMallRequest, (results, status) => {
    //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //     for (let i = 0; i < results.length; i++) {
    //       if(this.state.shoppingMallCheckbox) {
    //         createShoppingMallMarker(results[i])
    //       } else {
    //       this.state.markers.forEach(marker=>marker.setMap(null));
    //       this.setState({
    //         markers: []
    //         })
    //       }
    //     }
    //   }
    // });

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


    const createSubwayMarker = (station) => {
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
        subwayMarkers:[...this.state.subwayMarkers,marker]
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

    // const createRestaurantMarker = (restaurant) => {
    //   var marker = new window.google.maps.Marker({
    //       map: map,
    //       icon:{
    //         url:restaurantPic,
    //         scaledSize:new window.google.maps.Size(20, 20)
    //       },
    //       title: restaurant.name,
    //       position: {
    //         lat: restaurant.geometry.viewport.Ya.i,
    //         lng: restaurant.geometry.viewport.Sa.i
    //       },
    //   });

    //   this.setState({
    //     markers:[...this.state.markers,marker]
    //   })

    //   marker.addListener('click',function(){
    //     let pic = restaurant.photos[0].getUrl({"maxWidth": 400, "maxHeight": 256})
    //     let content = `
    //     <h3>Restaurant</h3>
    //     <h4>${restaurant.name}</h4>
    //     <img src="${pic}" alt="restaurant image" />
    //     <h5>Address: ${restaurant.vicinity}</h5>
    //     <h6>Rating: ${restaurant.rating}/5 from ${restaurant.user_ratings_total} customers</h6>
    //   `;
    //   infowindow.setContent(content);
    //   infowindow.open(map, marker);
    //   })
    // }

    //property marker
    // marker.addListener('click', ()=>{
    //   this.setState({

    //     property_Id:property.property_id,
        
    //     //property_Id or property_id?
        
    //   })

    // }

         //// ** property marker ** ////
    marker.addListener('click', ()=>{
      // console.log(property.photos[0].href)
      this.setState({
        property_Id:property.property_id,
        selectedProperty: property,
        //property_id:property.property_id
      })
      // if(this.state.markers.length){
      //   this.state.markers.forEach(marker=>marker.setMap(null));
      // }

      // console.log("this.state.selectedProperty",this.state.selectedProperty)

      this.props.getSingleProperty(property.property_id)
      //console.log(this.state.markers)
      if(this.state.restaurantMarkers.length){
        this.state.restaurantMarkers.forEach(marker=>marker.setMap(null));
        //only push subway & restaurant marker to this array
        this.setState({
          restaurantMarkers:[]
        })
      }

      if(this.state.subwayMarkers.length){
        this.state.subwayMarkers.forEach(marker=>marker.setMap(null));
        //only push subway & restaurant marker to this array
        this.setState({
          subwayMarkers:[]
        })
      }




      // console.log(this.state.markers)
      // if(this.state.markers.length){
      //   this.state.markers.forEach(marker=>marker.setMap(null));
      //   //only push subway & restaurant marker to this array
      //   this.setState({
      //     markers:[]
      //   })
      // }

      map.setZoom(16);
      map.setCenter({
        lat:property.address.lat,
        lng:property.address.lon
      });

      let content = `
        <h2>${property.address.line}</h2>
        <img src=${property.photos[0].href} alt="property image" />
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
            createSubwayMarker(results[i])

          }
        }
      });

      //maybe filter to grab more accurate result, from query?
      //since google limit 20 each call
      // const restaurantRequest = {
      //   type: ['restaurant'],
      //   location: new window.google.maps.LatLng(property.address.lat,property.address.lon),
      //   radius: 500,
      // };

      // service = new window.google.maps.places.PlacesService(map);

      // service.nearbySearch(restaurantRequest, (results, status) => {
      //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //     for (let i = 0; i < results.length; i++) {
      //       if(this.state.restaurantCheckbox) {
      //         createRestaurantMarker(results[i])
      //       }
      //     }
      //   }
      // });
    })

  }

  render() {


  const properties = this.props.propertiesInReact
    return (
      <div>
        <PropertyFilter />

        <div>
          {this.state.selectedProperty ? <form>
            {/* <label>Shopping Mall:
              <input type='checkbox'
                     checked={this.state.shoppingMallCheckbox}
                     name='shoppingMallCheckbox'
                     value={this.state.shoppingMallCheckbox}
                     onChange={this.onChange} />
            </label> */}

            <label>Restaurants:
              <input type='checkbox'
                     checked={this.state.restaurantCheckbox}
                     name='restaurantCheckbox'
                     value={this.state.restaurantCheckbox}
                     onChange={this.onChange} />
            </label>

          </form> : ""}
        </div>
        <div
          id="map"
          style={{width: "80%", height: "80vh"}} >
          {properties&&properties.length>0&&properties.map(property=>this.createMarker(property))}
        </div>
        <Container fluid>
          <Row className='mapContainer'>
            <Col md={8}>
              <div
                id="map"
                style={{width: "100%", height: "80vh", alignSelf: "center"}} >
                {properties&&properties.length>0&&properties.map(property=>this.createMarker(property))}
              </div>
            </Col>
            <Col>
            <div>
              {this.state.property_Id && <SinglePropertyBox/>}
            </div>
            </Col>

          </Row>
        </Container>
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
    getAllPropertiesInReact : (minBeds=0,maxPrice=10000,zipCode=10019)=>{
      dispatch(fetchProperties(minBeds,maxPrice,zipCode))
    },
    getAllPlacesInReact: (lat, lon)=> {
      dispatch(fetchGooglePlaces(lat, lon))
    },
    getSingleProperty: id => dispatch(fetchProperty(id))
  }
}

export default connect(mapState,mapDispatch)(Nearby);

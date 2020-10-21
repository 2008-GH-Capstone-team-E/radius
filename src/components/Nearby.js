import React, { Component } from 'react';
import mapStyle from './mapStyle'
import SinglePropertyBox from './SinglePropertyBox'
import {connect} from "react-redux"
import {fetchProperties} from "../store/allProperties"
import { fetchProperty } from '../store/singleProperty'
import subwayPic from "../css/subwayLogo.png"
import schoolPic from "../css/school.png";
import parkPic from "../css/park.png"
import groceryPic from "../css/groceries.png"
import restaurantPic from "../css/restaurantLogo.png"
import gasStationPic from "../css/gas-station.png"
import gymPic from "../css/weightlift.png"
import { Container, Row, Col } from "react-bootstrap";
import defaultPic from "../css/Property_Image_PlaceHolder.png"
import PropertyFilter from "./PropertyFilter"

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
        zoom: 14,
        selectedProperty:null,
        property_Id:null,
        restaurantMarkers:[],
        schoolMarkers:[],
        supermarketMarkers:[],
        subwayMarkers: [],
        parkMarkers: [],
        gasStationMarkers: [],
        gymMarkers: [],
        restaurantCheckbox: false,
        schoolCheckbox: false,
        supermarketCheckbox: false,
        parkCheckbox: false,
        gasStationCheckbox: false,
        gymCheckbox: false,
        travelRouteArr:[],
    }
    this.createMarker = this.createMarker.bind(this);
    this.onChange = this.onChange.bind(this);
    this.directionOnMap=this.directionOnMap.bind(this)
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
      lat: 40.748817,
      lng: -73.985428
    };

    // Initialize Map
    map = new window.google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12,
        styles: mapStyle
    });

    infowindow = new window.google.maps.InfoWindow({
      maxWidth:250,
      maxHeight:150
    });
  }

  directionOnMap=(origin,destination)=>{
    let directionsService = new window.google.maps.DirectionsService();
    let directionsRenderer = new window.google.maps.DirectionsRenderer();

    if(this.state.travelRouteArr.length>0){
      this.state.travelRouteArr.forEach(direction=>{
        direction.setMap(null);
      });
      this.setState({
        travelRouteArr:[]
      })
  }
 
  var distanceRequest = {
    origin: origin,
    destination: destination,
    travelMode: window.google.maps.TravelMode.WALKING
  };


  directionsService.route(distanceRequest, (response, status)=> {
      if (status === "OK") {
        directionsRenderer.setMap(map)
        directionsRenderer.setDirections(response)
        this.setState({
          travelRouteArr:[...this.state.travelRouteArr,directionsRenderer]
        })
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.checked});

    const createPlaceMarker = (place, placePic) => {
      var marker = new window.google.maps.Marker({
          map: map,
          icon:{
            url:placePic,
            scaledSize:new window.google.maps.Size(20, 20)
          },
          title: place.name,
          position: {
            lat: place.geometry.viewport.Ya.i,
            lng: place.geometry.viewport.Sa.i
          },
      });

      if(place.types.includes('restaurant')) {
        this.setState({
          restaurantMarkers:[...this.state.restaurantMarkers,marker]
        })
      } else if (place.types.includes('school')) {
        this.setState({
          schoolMarkers:[...this.state.schoolMarkers,marker]
        })
      } else if(place.types.includes('supermarket')) {
        this.setState({
          supermarketMarkers:[...this.state.supermarketMarkers,marker]
        })
      } else if(place.types.includes('gym')) {
        this.setState({
          gymMarkers:[...this.state.gymMarkers,marker]
        })
      } else if(place.types.includes('park')) {
        this.setState({
          parkMarkers:[...this.state.parkMarkers,marker]
        })
      } else if(place.types.includes('gas_station')) {
        this.setState({
          gasStationMarkers:[...this.state.gasStationMarkers,marker]
        })
      }


      //filtered place marker
      marker.addListener('click',()=>{
        const selectedProperty = this.state.selectedProperty
        let origin = new window.google.maps.LatLng(selectedProperty.address.lat,selectedProperty.address.lon)
        let destination = new window.google.maps.LatLng(place.geometry.viewport.Ya.i,place.geometry.viewport.Sa.i)
        let travelService = new window.google.maps.DistanceMatrixService()

        //draw route on map
        this.directionOnMap(origin,destination)
        
        //calculate the travel time
        travelService.getDistanceMatrix({
          origins:[origin],
          destinations:[destination],
          travelMode:'WALKING'
        },(response,status)=>{
          if(status==="OK"){
            let origins = response.originAddresses;
            let destinations = response.destinationAddresses;

            for (let i = 0; i < origins.length; i++) {
              let results = response.rows[i].elements;
              for (let j = 0; j < results.length; j++) {
                let element = results[j];
                let distance=element.distance.text
                let travelTime=element.duration.text



                let pic = defaultPic
                if(place.photos){
                  pic = place.photos[0].getUrl({"maxWidth": 300, "maxHeight": 192})
                }
                let content = `
                <h6>${place.name}</h6>
                <p>Distance: ${distance}</p>
                <p>Walking time: ${travelTime}</p>
                <img src="${pic}" alt="${place} image" />
                <p>Address: ${place.vicinity}</p>
                <p>Rating: ${place.rating}/5 from ${place.user_ratings_total} customers</p>
                
              `;
              infowindow.setContent(content);
              infowindow.open(map, marker);
              }
            }
          }else{
            console.log("status:",status)
          }
        })
      })
    }

    service = new window.google.maps.places.PlacesService(map);

    const restaurantRequest = {
      type: ['restaurant'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(restaurantRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.restaurantCheckbox) {
            createPlaceMarker(results[i], restaurantPic)
          } else {
          this.state.restaurantMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            restaurantMarkers: []
            })
          }
        }
      }
    });

    const supermarketRequest = {
      type: ['supermarket'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(supermarketRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.supermarketCheckbox) {
            createPlaceMarker(results[i], groceryPic)
          } else {
          this.state.supermarketMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            supermarketMarkers: []
            })
          }
        }
      }
    });

    const schoolRequest = {
      type: ['school'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(schoolRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.schoolCheckbox) {
            createPlaceMarker(results[i], schoolPic)
          } else {
          this.state.schoolMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            schoolMarkers: []
            })
          }
        }
      }
    });


    const parkRequest = {
      type: ['park'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(parkRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.parkCheckbox) {
            createPlaceMarker(results[i], parkPic)
          } else {
          this.state.parkMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            parkMarkers: []
            })
          }
        }
      }
    });


    const gasStationRequest = {
      type: ['gas_station'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(gasStationRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.gasStationCheckbox) {
            createPlaceMarker(results[i], gasStationPic)
          } else {
          this.state.gasStationMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            gasStationMarkers: []
            })
          }
        }
      }
    });

    const gymRequest = {
      type: ['gym'],
      location: new window.google.maps.LatLng(this.state.selectedProperty.address.lat,this.state.selectedProperty.address.lon),
      radius: 500,
    };

    service.nearbySearch(gymRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if(this.state.gymCheckbox) {
            createPlaceMarker(results[i], gymPic)
          } else {
          this.state.gymMarkers.forEach(marker=>marker.setMap(null));
          this.setState({
            gymMarkers: []
            })
          }
        }
      }
    });

  }

  //for propeties marker
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
 
      //subway icon onClick
      marker.addListener('click',()=>{

        const selectedProperty = this.state.selectedProperty;
        let origin = new window.google.maps.LatLng(selectedProperty.address.lat,selectedProperty.address.lon)
        let destination = new window.google.maps.LatLng(station.geometry.viewport.Ya.i,station.geometry.viewport.Sa.i)
        let travelService = new window.google.maps.DistanceMatrixService()

        //draw route on the map
        this.directionOnMap(origin,destination)

        travelService.getDistanceMatrix({
          origins:[origin],
          destinations:[destination],
          travelMode:'WALKING'
        },(response,status)=>{
          if(status==="OK"){
            let origins = response.originAddresses;
            let destinations = response.destinationAddresses;

            for (let i = 0; i < origins.length; i++) {
              let results = response.rows[i].elements;
              for (let j = 0; j < results.length; j++) {
                let element = results[j];
                let distance=element.distance.text
                let travelTime=element.duration.text

                let pic = defaultPic
                if(station.photos){
                  pic = station.photos[0].getUrl({"maxWidth": 300, "maxHeight": 192})
                }
                let content = `
                <h6>${station.name}</h6>
                <p>Distance: ${distance}</p>
                <p>Walking time: ${travelTime}</p>
                <img src="${pic}" alt="${station} image" />
                <p>Address: ${station.vicinity}</p>
                <p>Rating: ${station.rating}/5 from ${station.user_ratings_total} customers</p>
                
              `;
              infowindow.setContent(content);
              infowindow.open(map, marker);
              }
            }
          }else{
            console.log("status:",status)
          }
        })
      })
    }

    //// ** property marker listener** ////
    marker.addListener('click', ()=>{
      this.setState({
        property_Id:property.property_id,
        selectedProperty: property,
        restaurantCheckbox: false,
        schoolCheckbox: false,
        supermarketCheckbox: false,
        gymCheckbox: false,
        parkCheckbox: false,
        gasStationCheckbox: false
      })

      this.props.getSingleProperty(property.property_id)

      if(this.state.restaurantMarkers.length){
        this.state.restaurantMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          restaurantMarkers:[]
        })
      }

      if(this.state.supermarketMarkers.length){
        this.state.supermarketMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          supermarketMarkers:[]
        })
      }

      if(this.state.schoolMarkers.length){
        this.state.schoolMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          schoolMarkers:[]
        })
      }

      if(this.state.subwayMarkers.length){
        this.state.subwayMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          subwayMarkers:[]
        })
      }

      if(this.state.parkMarkers.length){
        this.state.parkMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          parkMarkers:[]
        })
      }

      if(this.state.gymMarkers.length){
        this.state.gymMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          gymMarkers:[]
        })
      }

      if(this.state.gasStationMarkers.length){
        this.state.gasStationMarkers.forEach(marker=>marker.setMap(null));
        this.setState({
          gasStationMarkers:[]
        })
      }


      map.setZoom(16);
      map.setCenter({
        lat:property.address.lat,
        lng:property.address.lon
      });


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

    })

  }

  render() {
  const properties = this.props.propertiesInReact
    return (
      <div>
        <PropertyFilter />
        <div>
          {this.state.selectedProperty ? <form>
            <label>Schools:
              <input type='checkbox'
                     checked={this.state.schoolCheckbox}
                     name='schoolCheckbox'
                     value={this.state.schoolCheckbox}
                     onChange={this.onChange} />
            </label>
            {" "}
            <label>Restaurants:
              <input type='checkbox'
                     checked={this.state.restaurantCheckbox}
                     name='restaurantCheckbox'
                     value={this.state.restaurantCheckbox}
                     onChange={this.onChange} />
            </label>
            {" "}
            <label>Supermarket:
              <input type='checkbox'
                     checked={this.state.supermarketCheckbox}
                     name='supermarketCheckbox'
                     value={this.state.supermarketCheckbox}
                     onChange={this.onChange} />
            </label>
            {" "}
            <label>Park:
              <input type='checkbox'
                     checked={this.state.parkCheckbox}
                     name='parkCheckbox'
                     value={this.state.parkCheckbox}
                     onChange={this.onChange} />
            </label>
            {" "}
            <label>Gas Station:
              <input type='checkbox'
                     checked={this.state.gasStationCheckbox}
                     name='gasStationCheckbox'
                     value={this.state.gasStationCheckbox}
                     onChange={this.onChange} />
            </label>
            {" "}
            <label>Gym:
              <input type='checkbox'
                     checked={this.state.gymCheckbox}
                     name='gymCheckbox'
                     value={this.state.gymCheckbox}
                     onChange={this.onChange} />
            </label>

          </form> : ""}
        </div>
        <div>
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
    getSingleProperty: id => dispatch(fetchProperty(id))
  }
}

export default connect(mapState,mapDispatch)(Nearby);

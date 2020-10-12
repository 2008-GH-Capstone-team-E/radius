import React, { useEffect, useState, Component } from "react";
import {
  GoogleMap,
  useLoadScript,
 

} from "@react-google-maps/api";
import mapStyle from './mapStyle'
import { connect, useDispatch, useSelector } from "react-redux";
import propertiesReducer, {fetchProperties} from '../store/allProperties';
import Nearby from './Nearby'
import {Link} from 'react-router-dom'
import { render } from "@testing-library/react";
import {Map,GoogleApiWrapper,InfoWindow, Marker} from "google-maps-react"

// import {fetchGooglePlaces} from '../store/allGooglePlaces';


const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};


class FrontPageMap extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedPlace: null,
      activeMarker: null,
      showingInfoWindow: false,
      
    }
    this.onClose =this.onClose.bind(this)
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        allProperties:[]
      });
    }
  };

  componentDidMount(){
    this.props.getAllPropertiesInReact()
  }

  
 
  render(){
    const properties = this.props.propertiesInReact;
    console.log(this.state.selectedPlace)
    return (
      <div id='map'>
        <Map
          google={this.props.google}
          zoom={14}
          style={options}
          initialCenter={
            {
              lat: 40.712776,
              lng: -74.005974
            }
          }

        >
          {properties&&properties.length>0&&properties.map(property=>{
            return (
              <Marker
                key={property.property_id}
                onClick={(props, marker, e) => 
                    this.setState({
                      selectedPlace: {
                        address:property.address.line,
                        pic:property.photos[0].href
                      },
                      activeMarker: marker,
                      showingInfoWindow: true
    })}
                position={{lat:property.address.lat,lng:property.address.lon}}
              />
          )
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              {this.state.selectedPlace&&(
                <div>
                <h1>address: {this.state.selectedPlace.address}</h1>
                <img src={this.state.selectedPlace.pic} alt="property"/>
                </div>
              )}
              
            </div>
        </InfoWindow>
        </Map>
      </div>
      )
  }
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



export default connect(mapState,mapDispatch)(GoogleApiWrapper({apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)})(FrontPageMap))

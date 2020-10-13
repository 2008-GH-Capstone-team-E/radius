import axios from 'axios'

//----------- action types ------------//
export const GET_GOOGLE_PLACES = 'GET_GOOGLE_PLACES'


//----------- action creators -----------//
export const setGooglePlaces = places => {
  return {
    type: GET_GOOGLE_PLACES,
    places: places
  }
}


//---------- thunk creators ----------//
export const fetchGooglePlaces = (lat,lon) => dispatch => {
  try {
    const url = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAodlqJbUbT6KFaJMNK7pY3NyW8Ki-9sGc&libraries=places&callback=initMap`

    const request = {
      // query: "restaurant",
      type: ['subway_station'],
      // radius: '10000',
      // fields: ["name", "geometry"],
      location: new window.google.maps.LatLng(lat,lon),
      radius: 1000,
      // keyword: 'restaurant'
    };

    let service = new window.google.maps.places.PlacesService();

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // for (let i = 0; i < results.length; i++) {
          // console.log("results[i]",results[i])
          // this.createPlacesMarker(results[i]);
          console.log("results", results)
          // dispatch(setGooglePlaces(results))
        // }
        // map.setCenter(results[0].geometry.location);
      }
    });


    // dispatch(setGooglePlaces(places))
  } catch (err) {
    console.log(err)
  }
}

//----------- initial state ----------//
const places = []

//---------- reducer ----------//
export default function googlePlacesReducer(state = places, action) {
  switch (action.type) {
    case GET_GOOGLE_PLACES:
      return [...action.places]
    default:
      return state
  }
}


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
export const fetchGooglePlaces = (lat, lng) => /*async*/ dispatch => {
  // try {
    //need to work on seting up Google Places API
    // const output =
    // const parameters =
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyAodlqJbUbT6KFaJMNK7pY3NyW8Ki-9sGc`
    // axios.get(url)
    // .then(response => {
    //   console.log("response", response.results)
    //   dispatch(setGooglePlaces(response.results))
    // })
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyAodlqJbUbT6KFaJMNK7pY3NyW8Ki-9sGc`;
    // fetch(url)
    // .then(res => {
    //   console.log("res.json()", res.json())
    //   return res.json();

    // })
    // .then(res => {
    //   for(let googlePlace of res.results) {
    //     const place ={};
    //     const myLat = googlePlace.geometry.location.lat;
    //     const myLong = googlePlace.geometry.location.lng;
    //     const coordinate = {latitude: myLat, longitude: myLong};
    //     place['placeTyes'] = googlePlace.types;
    //     place['coordinate'] = coordinate;
    //     place['placeId'] = googlePlace.place_id;
    //     place['placeName'] = googlePlace.name;
    //     places.push(place);
    //   }
    //   console.log('The place arount NewYork' + places.map(nearbyPlaces => nearbyPlaces.placeName))
    // })
    // .catch(error => {
    //   console.log(error)
    // })


    // const res = await axios.get(url);

    // console.log("response", res)

    // fetch(url)
    // .then(res => {
    //   console.log("url", url)
    //   return res.json()
    // })
    // const res = await axios.get('GOOGLE PLACES API')
    // const places = res.data

    // var pyrmont = new google.maps.LatLng(lat,lng);
    // const map = new google.maps.Map(document.getElementById('map'), {
    //   center: pyrmont,
    //   zoom: 15
    // });

    // var request = {
    //   location: pyrmont,
    //   radius: '500',
    //   query: 'restaurant',
    //   types: ['restaurant']
    // };

    // const service = new google.maps.places.PlacesService(map);

    // service.nearbySearch(request, function(a,b) {
      // dispatch(setGooglePlaces(res.data))
    // })

    // dispatch(setGooglePlaces(url))
  // } catch (err) {
  //   console.log(err)
  // }
}

//----------- initial state ----------//
const places = []

//---------- reducer ----------//
export default function googlePlacesReducer(state = places, action) {
  switch (action.type) {
    case GET_GOOGLE_PLACES:
      return action.places
    default:
      return state
  }
}


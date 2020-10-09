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
export const fetchGooglePlaces = () => async dispatch => {
  try {
    //need to work on seting up Google Places API
    const res = await axios.get('GOOGLE PLACES API')
    const places = res.data
    dispatch(setGooglePlaces(places))
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
      //need to work on filtering
      return []
    default:
      return state
  }
}


import axios from 'axios'

//----------- action types ------------//
export const GET_SINGLE_PLACE = 'GET_SINGLE_PLACE'


//----------- action creators -----------//
export const setGooglePlace = place => {
  return {
    type: GET_SINGLE_PLACE,
    place: place
  }
}

//---------- thunk creators ----------//
export const fetchGooglePlace = () => async dispatch => {
  try {
    //need to work on seting up Google Places API
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/details/jsonplace_id=${thisSubway.placesID}')
    const singlePlace = res.data
    dispatch(setGooglePlace(singlePlace))
  } catch (err) {
    console.log(err)
  }
}








//----------- initial state ----------//
const singlePlace = {"restaurant": "blablabla"}

//---------- reducer ----------//
export default function singleGooglePlaceReducer(state = singlePlace, action) {
  switch (action.type) {
    case GET_SINGLE_PLACE:
      //need to work on filtering
      return action.singlePlace
    default:
      return state
  }
}


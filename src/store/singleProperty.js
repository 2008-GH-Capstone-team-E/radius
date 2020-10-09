import axios from 'axios'

//----------- action types ------------//
export const GET_PROPERTY = 'GET_PROPERTY'

//----------- action creators -----------//
export const getPropery = property => {
  return {
    type: GET_PROPERTY,
    property: property
  }
}

//---------- thunk creators ----------//
export const fetchProperty = propertyId => {
  return async dispatch => {
    try {
      //need to get this info from real estate API
      const res = await axios.get(`REAL ESTATE API`)
      dispatch(getProperty(propertyId))
    } catch (err) {
      console.log(err)
    }
  }
}

//----------- initial state ----------//
const property = {}

//---------- reducer ----------//

export default function singlePropertyReducer(state = property, action) {
  switch (action.type) {
    case GET_PROPERTY:
      return action.property
    default:
      return state
  }
}

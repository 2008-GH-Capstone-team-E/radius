import axios from 'axios'

//----------- action types ------------//
export const GET_PROPERTIES = 'GET_PROPERTIES'


//----------- action creators -----------//
export const getProperties = properties => {
  return {
    type: GET_PROPERTIES,
    properties: properties
  }
}


//---------- thunk creators ----------//
export const fetchProperties = () => async dispatch => {
  try {
    //need to get resposne from Real Estate API
    const res = await axios.get('REAL ESTATE API')
    const properties = res.data
    dispatch(getProperties(properties))
  } catch (err) {
    console.log(err)
  }
}

//----------- initial state ----------//
const properties = []

//---------- reducer ----------//
export default function propertiesReducer(state = properties, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return [...action.properties]
    default:
      return state
  }
}

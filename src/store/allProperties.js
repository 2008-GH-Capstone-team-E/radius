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
    const res = await axios({
      "method":"GET",
      "url":"https://realtor.p.rapidapi.com/properties/v2/list-for-rent",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"realtor.p.rapidapi.com",
      "x-rapidapi-key":process.env.REACT_APP_REALTOR_API_KEY,
      "useQueryString":true
      },"params":{
      "sort":"relevance",
      "city":"New York City",
      "state_code":"NY",
      "limit":"20",
      "offset":"0"
      }
      })
      // console.log(res.data)
    const properties = res.data.properties
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

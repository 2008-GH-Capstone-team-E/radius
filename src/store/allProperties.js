import axios from 'axios'

//----------- action types ------------//
export const GET_PROPERTIES = 'GET_PROPERTIES'


//----------- action creators -----------//
export const getProperties = properties => {
  // console.log("from action creator",properties)
  return {
    type: GET_PROPERTIES,
    properties: properties
  }
}


//---------- thunk creators ----------//
export const fetchProperties = (minBeds=1,maxPrice=2500) => async dispatch => {

  try {
    //need to get resposne from Real Estate API
    const options = {
      method: 'GET',
      url: 'https://rapidapi.p.rapidapi.com/properties/v2/list-for-rent',
      params: {
        city: 'New York City',
        state_code: 'NY',
        limit: '5',
        offset: '0',
        beds_min: `${minBeds}`,
        price_max: `${maxPrice}`,
        sort: 'relevance',
        prop_type: 'condo,townhome,single_family,coop'
      },
      headers: {
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_REALTOR_API_KEY
      }
    };


    const properties = await axios.request(options)
    // console.log("properties",properties.data.properties)
    dispatch(getProperties(properties.data.properties))
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

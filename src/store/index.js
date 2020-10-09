import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allProperties from './allProperties'
import singleProperty from './singleProperty'
import allGooglePlaces from './allGooglePlaces'
import singleGooglePlace from './singleGooglePlace'

const reducer = combineReducers({
  allProperties,
  singleProperty,
  allGooglePlaces,
  singleGooglePlace
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './allProperties'
export * from './singleProperty'
export * from './allGooglePlaces'
export * from './singleGooglePlace'

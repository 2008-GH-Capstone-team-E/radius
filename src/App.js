
import React from 'react';
import Routes from './routes'
import './css/style.css';
import SingleProperty from './components/SingleProperty';
import { Provider } from "react-redux";
import store from "./store"
import AllProperties from "./components/AllProperties"

const App = () => {
  return (
      <Provider store={store}>
        <SingleProperty/>
        <AllProperties />
    </Provider>
  )
}

export default App


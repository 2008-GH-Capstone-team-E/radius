import React from 'react';
import './css/style.css';
import { Provider } from "react-redux";
import store from "./store"
import AllProperties from "./components/AllProperties"
import Nearby from './components/Nearby'

function App() {
  return (
     <Provider store={store}>
        <Nearby />
        {/* <AllProperties /> */}
    </Provider>
  );
}



export default App;

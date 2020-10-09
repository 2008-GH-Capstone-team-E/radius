import React from 'react';
import './css/style.css';
import { Provider } from "react-redux";
import store from "./store"
import AllProperties from "./components/AllProperties"

function App() {
  return (
     <Provider store={store}>
      <div className="App">
        <header className="App-header">
        
        <AllProperties />
      </header>
    </div>
    </Provider>
  );
}



export default App;

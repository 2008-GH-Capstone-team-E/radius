import React from 'react';
import './css/style.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store"
import Routes from './routes'
import NearBy from "./components/Nearby"
import { Header } from './components/NavBar'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <NearBy />
      </Provider>
    </BrowserRouter>
  );
}
export default App;

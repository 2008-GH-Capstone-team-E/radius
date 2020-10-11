import React from 'react';
import './css/style.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store"
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}
export default App;

import React from 'react';
import './css/style.css';
///import 'bootstrap/dist/css/bootstrap.min.css'; // < not clear yet if/when needed. 
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store"
import Routes from './routes'
import NearBy from "./components/Nearby"
import  SignUp from './components/SignUp'
import { Header } from './components/NavBar'
import  SinglePropertyBox  from './components/SinglePropertyBox'
import  SinglePropertyPage  from './components/SinglePropertyPage'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        {/* <SignUp/> */}
        {/* <NearBy/>  */}
        <SinglePropertyBox/> 
        <SinglePropertyPage/>
      </Provider>
    </BrowserRouter>
  );
}
export default App;

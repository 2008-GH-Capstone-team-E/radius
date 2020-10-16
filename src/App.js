
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import { createBrowserHistory } from 'history'
import store from "./store"
import Routes from './routes'
import { Header } from './components/NavBar'
import Footer from './components/Footer';

const history = createBrowserHistory()

function App() {
  return (
    <BrowserRouter history={history}>
      <Provider store={store}>
        <Header/>
        <Routes/>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}
export default App;

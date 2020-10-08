import React from "react";
import "./css/style.css";
import axios from "axios";
import PropertySearch from "./components/PropertySearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PropertySearch />
      </header>
    </div>
  );
}

export default App;

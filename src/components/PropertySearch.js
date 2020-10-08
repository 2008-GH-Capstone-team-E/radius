import React, { Component } from "react";
import axios from "axios";

class PropertySearch extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
    };
    this.getData = this.getData.bind(this);
  }

  getData = () => {
    axios({
      method: "GET",
      url: "https://realtor.p.rapidapi.com/properties/v2/list-for-rent",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        useQueryString: true,
      },
      params: {
        sort: "relevance",
        postal_code: "10021",
        city: "New York City",
        state_code: "NY",
        limit: "20",
        offset: "0",
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.properties);
        this.setState({
          properties: response.data.properties,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let properties = this.state.properties;
    return (
      <div>
        <div>
          <button onClick={() => this.getData()}>get data</button>
        </div>
        {properties.length &&
          properties.map((property) => {
            return (
              <div key={property.property_id}>
                <p>
                  <img src={property.photos[0].href} alt="property pic" />
                  Address {property.address.line},{property.address.county},NY
                  {property.address.postal_code}
                </p>
                <p>Neighborhoods: {property.address.neighborhood_name}</p>
                <hr />
              </div>
            );
          })}
      </div>
    );
  }
}

export default PropertySearch;

import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchProperty } from '../store/singleProperty'

class SingleProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    let id = 'O3599084026'
    console.log(id)
    this.props.getSingleProperty(id)
  }

  render() {
    let property = this.props.singleProperty || {}
    return (
      <div>
        { Object.keys(property).length ? 
        <div>
          <h1>Property details</h1>
          <div>
            <p>
              <img src={property.photos[0].href} alt="property pic" />
             
            </p>
            <div className='propertyDetailContainer'> 
            <h6>Neighborhood: {property.address.neighborhood_name}</h6>
            <h6>Address {property.address.line},{property.address.county},NY
              {property.address.postal_code}</h6>
            <h6>Year Built: {property.year_built} </h6>
            <h6>Beds: {property.beds} </h6>
            </div>
            <hr />
          </div>
        </div>
        : 
        <h4> just a moment, getting those details for you...</h4>
        }
      </div>
    );
  }
}
  

const mapState = state => {
  return {
    singleProperty: state.singleProperty
  }
}

const mapDispatch = dispatch => ({
  getSingleProperty: id => dispatch(fetchProperty(id))
})

export default connect(mapState, mapDispatch)(SingleProperty)


// FOR investigating the API https://rapidapi.com/apidojo/api/realtor/endpoints
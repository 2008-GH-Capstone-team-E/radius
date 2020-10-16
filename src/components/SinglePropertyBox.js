
import React, { Component } from "react";
import { connect } from 'react-redux'

import { fetchProperty } from '../store/singleProperty'
import { Button, Container, Row, Col } from "react-bootstrap";

var get = require('lodash.get');

const formatTelNum = (num) => {
  return `(${num.slice(0,3)}) ${num.slice(3,6)} - ${num.slice(6)}`
}

class SinglePropertyBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // let id = 'O3599084026'
    //console.log("FIRED @ SinglePropBox CompDidMount, this.props.property_id: ", this.props.property_id)
    //await this.props.getSingleProperty(this.props.property_id)
  }

  render() {
    let property = this.props.singleProperty || {}
    let price = get(property, 'price', 2050)
      // if (price.toString().length === 4 || 6) {
      //   price = Math.floor(price/12)
      // }
      // if (price.toString().length === 5 || 7 ) {
      //   price = Math.floor(price/100)
      // }
    console.log(`|${property.price}|`)
    return (
      <div>
        { Object.keys(property).length ? 
        <Container>
          <Row><h4>The Basics</h4></Row>
          
            <Row className='imageContainerPropertyInfoBox'>
              <img src={property.photos[0].href} alt="property pic" className='imageInInfoBox'/>
            </Row>
            <div> 
            
             <Row><b>Address:</b> {property.address.line}, {property.address.county}, NY  
              {property.address.postal_code}</Row> 
            <Row><b>Monthly: </b>$ {price}</Row>
            {/* <Row> <b>Contact:</b> {property.broker.name}</Row>
            <Row>{formatTelNum(property.broker.phone1.number)}</Row> */}
            <Row>
              <Col> 
                <Button className='buttonSizer' variant="outline-info" size="sm">
                See All Info
                </Button>
              </Col>
              <Col></Col>
              <Col>
                <Button className='buttonSizer' variant="outline-info" size="sm">
                Add To Favs
                </Button>
             </Col>
            </Row>
           
          </div>
        </Container>
        : 
        <h4> loading property details...</h4>
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
  //getSingleProperty: id => dispatch(fetchProperty(id))
})

export default connect(mapState, mapDispatch)(SinglePropertyBox)


// FOR investigating the API https://rapidapi.com/apidojo/api/realtor/endpoints


import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchProperty } from '../store/singleProperty'
import { Button, Row, Col, Container, Carousel } from "react-bootstrap";

var get = require('lodash.get');

const formatTelNum = (num) => {
  return `(${num.slice(0,3)}) ${num.slice(3,6)} - ${num.slice(6)}`
}
const formatPropType = (prop_type) => {
  return `${prop_type.split('_').join(' ')}`
}

class SinglePropertyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    //console.log(typeof this.props.singleProperty.property_id, typeof this.props.match.params.id )
      if (this.props.singleProperty.property_id !== this.props.match.params.id) {
      this.props.getSingleProperty(this.props.match.params.id)
      }
  }

  render() {
    let property = this.props.singleProperty || {}
    let price = get(property, 'price', 2050)
    return (
      <div>
        { Object.keys(property).length ? 
        <Container fluid className='propertyPageContainer marginTop'>
          <Row><h4>Property Details</h4></Row>
            <Row>
              <Carousel>
                {property.photos.map(photo => {
                  return (
                  <Carousel.Item>
                    <div className='imageInCarouselContainer'>
                      <img
                        className="d-block w-100 carouselImage"
                        src={photo.href}
                        alt=''
                      />
                    </div>
                  </Carousel.Item> )
                })}
              </Carousel>
            </Row>
              <Row className='alignContentLeft'>
                <Col md={5}>
                  <Row className='alignContentLeft'><b>Address: </b> {property.address.line}, {property.address.county}, NY 
                  {property.address.postal_code}</Row>
                  <Row className='alignContentLeft'><b>Monthly: </b>$ {price}</Row>
                  <Row className='alignContentLeft'><b>Rental Type: </b>{property.prop_type}</Row>
                  <Row className='alignContentLeft'><b>Bedrooms:</b>{property.beds}</Row>
                  <Row className='alignContentLeft'><b>Bathrooms:</b>{property.baths}</Row>
                  <Row className='alignContentLeft'><b>Year Built:  </b>{property.year_built}</Row>
                  
                  {/* <Row> <b>Contact:</b> {property.broker.name}</Row>
                  <Row>{formatTelNum(property.broker.phone1.number)}</Row> */}
                </Col>
                <Col></Col>
              </Row>
              
              <Row className='alignContentLeft marginBottomMed'>
                <Col></Col>
                <Col>
                  <Button variant="outline-info" size="sm">
                  back to search
                  </Button>
                </Col>    
              </Row>            
            
        </Container>
        : 
        <div className='holdPageOpen'> loading property details...</div>
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

export default connect(mapState, mapDispatch)(SinglePropertyPage)


// FOR investigating the API https://rapidapi.com/apidojo/api/realtor/endpoints
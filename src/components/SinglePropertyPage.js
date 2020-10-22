import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchProperty } from '../store/singleProperty'
import { refreshProperties } from '../store/allProperties'
import { Button, Row, Col, Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

var get = require('lodash.get');

const altPropertyImage = "https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/Property_Image_PlaceHolder.png?raw=true"

const formatTelNum = (num) => {
  return `(${num.slice(0,3)}) ${num.slice(3,6)} - ${num.slice(6)}`
}

// const formatPropType = (prop_type) => {
//   return `${prop_type.split('_').join(' ')}`
// }

class SinglePropertyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleReturnToSearch = this.handleReturnToSearch.bind(this)
  }

  async componentDidMount() {
    if (this.props.singleProperty.property_id !== this.props.match.params.id) {
    this.props.getSingleProperty(this.props.match.params.id)
    }
  }

  handleReturnToSearch(e) {
    e.preventDefault()
  
    // this.props.refreshSameProperties(this.props.propertiesInReact)
    // console.log('@SinglePropPage, Fired this handler')
    this.props.history.push('/search')
  }

  render() {
    let property = this.props.singleProperty || {}
    const price = get(property, 'price', 'unavailable')
    const brokerName = get(property, 'broker.name', 'unavailable')
    const brokerTel = get(property, 'broker.phone1.number', 'unavailable')
    const address = get(property, 'address.line', 'unavailable')
    const county = get(property, 'address.county', 'unavailable')
    const zip = get(property, 'address.postal_code', 'unavailable')
    const prop_type = get(property, 'prop_type')
    const yearBuilt = get(property, 'year_built', 'unavailable')
    const beds = get(property, 'beds', 'unavailable')
    const baths = get(property, 'baths', 'unavailable')

    return (
      <div>
        { Object.keys(property).length ? 
        <Container fluid className='propertyPageContainer marginTop'>
          <Col>
            <Row><h4>Property Details</h4></Row>
              <Row>
                <Carousel>
                  {property.photos.map((photo, i) => {
                    return (
                    <Carousel.Item key={`photo${i}`} >
                      <div className='imageInCarouselContainer'>
                        <img
                          className="d-block w-100 carouselImage"
                          src={photo.href}
                          alt='property photo'
                        />
                      </div>
                    </Carousel.Item> )
                  })}
                </Carousel>
              </Row>
              <Row className='alignContentLeft'>
                <Col md={5}>
                  
                  <Row className='alignContentLeft'><b>Address:</b> &nbsp; {address}, {county}, NY,  
                  {zip}</Row>
                  <Row className='alignContentLeft'><b>Monthly: </b> &nbsp; ${price}</Row>
                  <Row className='alignContentLeft'><b>Rental Type:</b> &nbsp; {prop_type}</Row>
                  <Row className='alignContentLeft'><b>Bedrooms:</b> &nbsp; {beds}</Row>
                  <Row className='alignContentLeft'><b>Bathrooms:</b> &nbsp;{baths}</Row>
                  <Row className='alignContentLeft'><b>Year Built:</b>&nbsp; {yearBuilt}</Row>
                  <Row className='alignContentLeft'> <b>Broker:</b> &nbsp;{brokerName}</Row>
                  <Row className='alignContentLeft'><b>Contact:</b>&nbsp;{brokerTel}</Row> 
                </Col>
                <Col></Col>
              </Row>
              
              <Row className='alignContentLeft marginBottomMed'>
                <Col></Col>
                <Col>
                {/* <Link to='/search'> */}
                  <Button variant="outline-info" size="sm"
                  onClick={this.handleReturnToSearch}
                  >
                  back to search
                  </Button>
                {/* </Link> */}
                </Col>    
              </Row>            
          </Col> 
        </Container>
        : 
        <Row className='holdPageOpen marginTopMed propertyPageContainer'> loading property details...</Row>
        }
      </div>
    );
  }
}
  
  

const mapState = state => {
  return {
    singleProperty: state.singleProperty,
    propertiesInReact: state.allProperties
  }
}

const mapDispatch = dispatch => ({
  getSingleProperty: id => dispatch(fetchProperty(id)),
  refreshSameProperties: (sameProperties) => {
    dispatch(refreshProperties(sameProperties))
  }
})

export default connect(mapState, mapDispatch)(SinglePropertyPage)

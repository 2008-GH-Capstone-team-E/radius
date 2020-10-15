import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchProperty } from '../store/singleProperty'
import { Button, Row, Col, Container, Carousel } from "react-bootstrap";

let dummyProperyDetailObj = {

}

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
    let id = 'O3599084026'
    console.log(id)
    // this.props.getSingleProperty(id)
  }

  render() {
    let property = this.props.singleProperty || {}
    return (
      <div>
        { Object.keys(property).length ? 
        <Container>
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
            <div> 
            
            <Row><b>Address:</b> {property.address.line},{property.address.county}, NY
              {property.address.postal_code}</Row>
            <Row><b>Monthly: </b>$ {property.price/100}</Row>
            <Row> <b>Contact:</b> {property.broker.name}</Row>
            <Row>{formatTelNum(property.broker.phone1.number)}</Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <Button variant="outline-info" size="sm">
                back to search
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
  getSingleProperty: id => dispatch(fetchProperty(id))
})

export default connect(mapState, mapDispatch)(SinglePropertyPage)


// FOR investigating the API https://rapidapi.com/apidojo/api/realtor/endpoints
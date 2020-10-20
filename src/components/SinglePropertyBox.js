import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import firebase, { auth, db } from "./firebase";

var get = require('lodash.get');

//const altPropertyImage = "https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/Property_Image_PlaceHolder.png?raw=true"

class SinglePropertyBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleOnClick = this.handleOnClick.bind(this)
    this.addToFavs = this.addToFavs.bind(this)
  }
  componentDidMount() {}

  handleOnClick(property_id) {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid
    this.addToFavs(uid, property_id);
  }

  async addToFavs(uid, property_id) {
    try {
      const addedToFavs = await db.collection("favorites").doc(uid);
      addedToFavs.update({
        propertyIds: firebase.firestore.FieldValue.arrayUnion(property_id)
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let property = this.props.singleProperty || {}
    const price = get(property, 'price', 'unavailable')
    const address = get(property, 'address.line', 'unavailable')
    const county = get(property, 'address.county', 'unavailable')
    const zip = get(property, 'address.postal_code', 'unavailable')

    return (
      <div>
        { Object.keys(property).length ?
        <Container>
          <Row><h4>The Basics</h4></Row>

            <Row className='imageContainerPropertyInfoBox'>
              <img src={property.photos[0].href} alt="property photo" className='imageInInfoBox'/>
            </Row>     
             <Row className='alignContentLeft'><b>Address:</b> {address}, {county}, NY,   
              {zip}</Row> 
              <Row className='alignContentLeft'><b>Monthly: </b>$ {price}</Row>
            <Row className='marginTop'>
              <Col>
                <Link to={`/properties/${property.property_id}`}>
                  <Button className='buttonSizer' variant="outline-info" size="sm">
                  See All Info
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button className='buttonSizer' variant="outline-info" size="sm"
                onClick={() => {this.handleOnClick(property.property_id)}}>
                Add To Favs
                </Button>
             </Col>
            </Row>

          </div>
        </Container>
        : 
        <div className='centerSelf marginTopMed'> loading property details...</div>
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

export default connect(mapState)(SinglePropertyBox)


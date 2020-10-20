import React, { Component } from "react";
import firebase, { auth, db } from "./firebase";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from 'axios'

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfoOnProperties: []
    };
    this.handleRemove = this.handleRemove.bind(this)
    this.removeFromFavs = this.removeFromFavs.bind(this)
  }

  componentDidMount() {
    try {
        firebase.auth().onAuthStateChanged(async () => {
        const uid = firebase.auth().currentUser.uid;
        let docRef = db.collection("favorites").doc(uid);
        const document = await docRef.get()
        const arrFromFireStore = document.data().propertyIds

        let newArray = await Promise.all(
          arrFromFireStore.map(async (elem) => {
            let singlePropertyRes = await axios({
              method: "GET",
              url: `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${elem}`,
              headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_REALTOR_API_KEY,
                useQueryString: true,
              }})
             return singlePropertyRes.data.properties[0];
          })
        )
        this.setState({
          moreInfoOnProperties: newArray
        })
    });
    } catch (error) {
      console.log(error);
    }
  }

  handleRemove(property_id) {
    const currentUser = auth().currentUser;
    const uid = currentUser.uid
    this.removeFromFavs(uid, property_id);
  }

  async removeFromFavs(uid, property_id) {
    try {
      const removedFromFavs = await db.collection("favorites").doc(uid);
      removedFromFavs.update({
        propertyIds: firebase.firestore.FieldValue.arrayRemove(property_id)
      });
      const newArray = this.state.moreInfoOnProperties.filter(elem => elem.property_id !== property_id)
      this.setState({
        moreInfoOnProperties: newArray
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const properties = this.state.moreInfoOnProperties
    return(
      <div>
         {properties.length
         ?  properties.map(property => {
          return (
             <Container key={property.property_id}>
               <Row className='imageContainerPropertyInfoBox'>
                 <img src={property.photos[0].href}
                 alt="property photo"
                 className='imageInInfoBox'
                 style={{width: 250, height: 300}}
                 />
               </Row>
               <Row className='alignContentLeft'><b>Address:</b> {property.address.line}, {property.address.county}, NY,
               {property.address.postal_code}
              </Row>
                 <Row className='alignContentLeft'><b>Monthly: </b>$ {property.community.price_max}</Row>
               <Row className='marginTop'>
                 <Col>
                   <Link to={`/properties/${property.property_id}`}>
                     <Button className='buttonSizer' variant="outline-info" size="sm">
                     See More Info
                     </Button>
                   </Link>
                 </Col>
                 <Col>
                <Button className='buttonSizer' variant="outline-info" size="sm"
                onClick={() => {this.handleRemove(property.property_id)}}>
                Remove From Favs
                </Button>
             </Col>
               </Row>
           </Container>
            )}
          )
         : <div className="holdPageOpen marginTopMed">
           Getting your favorite properties ...
           </div>
         }
      </div>
    )
  }
}
export default UserFavorites

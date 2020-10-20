import React, { Component } from "react";
import firebase, { auth, db } from "./firebase";
import axios from 'axios'

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfoOnProperties: []
    };
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



  render() {
    const properties = this.state.moreInfoOnProperties
    console.log("this.state.moreInfoOnProperties", this.state.moreInfoOnProperties)
    return(
      <div>
          {properties.map(property => {
              return (
                <div key={property.property_id}>
                    <h1>{property.address.city}</h1>
                 </div>
                )}
              )
        }
      </div>
    )
  }
}
export default UserFavorites

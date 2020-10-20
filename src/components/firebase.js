// import firebase from 'firebase';
// import "firebase/auth";
// import "firebase/firestore";

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "radius-db5d1.firebaseapp.com",
  databaseURL: "https://radius-db5d1.firebaseio.com",
  projectId: "radius-db5d1",
  storageBucket: "radius-db5d1.appspot.com",
  messagingSenderId: "1088685100871",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-58C436RVDN"
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore()
export default firebase;



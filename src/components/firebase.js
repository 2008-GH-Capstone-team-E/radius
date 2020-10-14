import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "" ,
  authDomain: "radius-db5d1.firebaseapp.com",
  databaseURL: "https://radius-db5d1.firebaseio.com",
  projectId: "radius-db5d1",
  storageBucket: "radius-db5d1.appspot.com",
  messagingSenderId: "1088685100871",
  appId: "",
  measurementId: "G-58C436RVDN"
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore()





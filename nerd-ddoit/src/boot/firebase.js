import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDsco_MP0DtpcrY2MEcLt97pQEpyeObfnc",
  authDomain: "nerdfriends-313504.firebaseapp.com",
  databaseURL: "https://nerdfriends-313504-default-rtdb.firebaseio.com",
  projectId: "nerdfriends-313504",
  storageBucket: "nerdfriends-313504.appspot.com",
  messagingSenderId: "295074957282",
  appId: "1:295074957282:web:8ced638164ae513fa01bbb",
  measurementId: "G-73SEEPC1Z9",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };

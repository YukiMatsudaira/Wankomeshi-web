import firebase from "firebase";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export const db = config.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
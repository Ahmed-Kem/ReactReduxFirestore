import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeWNYvCyzgFNPaKlJWwemj2zuQOBcRFSg",
  authDomain: "reactzustandfirestore.firebaseapp.com",
  projectId: "reactzustandfirestore",
  storageBucket: "reactzustandfirestore.appspot.com",
  messagingSenderId: "947827066264",
  appId: "1:947827066264:web:4d9f7632a5e5130457d7ed",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Initialize Cloud Firestore and get a reference to the service
const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();
const Auth = firebase.auth;

export { firestore, auth, Auth };

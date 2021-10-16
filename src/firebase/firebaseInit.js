import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAuQXYSTdyhlbAY8Q81paWpx44G0uWok-Y",
  authDomain: "fireblogs-1149c.firebaseapp.com",
  projectId: "fireblogs-1149c",
  storageBucket: "fireblogs-1149c.appspot.com",
  messagingSenderId: "638797991279",
  appId: "1:638797991279:web:3fe8294badbb4499616c9a",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfigwall = {
    apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
    authDomain: "thewall-10a4a.firebaseapp.com",
    databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
    projectId: "thewall-10a4a",
    storageBucket: "thewall-10a4a.appspot.com",
    messagingSenderId: "221023885061",
    appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
    measurementId: "G-7V80059NF7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfigwall);
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// Enable experimentalForceLongPolling for Firestore randomstring
const firestoreConfig = {
  experimentalForceLongPolling: true,
};
const firestore = firebase.firestore(firebase.app());
firestore.settings(firestoreConfig);

export { firebase, db };
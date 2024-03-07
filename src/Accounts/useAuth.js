import { useState, useEffect } from 'react';
import 'firebase/auth';

import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {firebaseConfig019, firebaseConfig9901} from './FirebaseAuth';



export function useAuth() {

const firebaseConfig2 = firebaseConfig9901; 

  firebase.initializeApp(firebaseConfig2, 'app055');
  const app055 = firebase.app('app055');
const apps = app055;
const app05 = app055;
  const [users, setUser] = useState(null);



const user =   typeof window !== 'undefined' ? localStorage.getItem('userID') : [];



  const [loading, setLoading] = useState(false);
  const [useruid, setUseruid] = useState(null);
const [userNotFound, setUserNotFound] = useState(false)

  useEffect(() => {
    const unsubscribe = app055.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        //setLoading(true);  // Set loading to true before fetching user information randomstring
        localStorage.setItem("userID", firebaseUser.uid)

        setUser(firebaseUser);
        setUseruid(firebaseUser.uid);

        setLoading(false); // Set loading to false after setting user information
      } else {
        setUser(null);
        setUseruid(null);
        setLoading(true);
        setUserNotFound(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  function signInWithEmailAndPassword(email, password) {
    return app055.auth().signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    setUser("");
    setLoading(false);
  alert("Signing Out")
    try {
      await app055.auth().signOut();
      //window.location.reload(); app05
    } catch (error) {

      console.error("Error signing out:", error);
    }
  }
  
  

  return { apps,useruid, users, user,setUser,  loading,userNotFound, signInWithEmailAndPassword, signOut,app05 };
}

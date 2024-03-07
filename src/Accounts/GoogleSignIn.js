import React, { useEffect, useState } from 'react'
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import Profile from '../pages/ProfilePage/ProfileSettup';
import {firebaseConfig019,firebaseConfig9901 } from './FirebaseAuth';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useAuth } from '../Accounts/useAuth';

import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import ForgotPassword from './ForgotPassword';

const firebaseConfig2 = {
  apiKey: "AIzaSyAM5p7O6YuAvCxfDCbR48Duz019qkoVp0Y",
  authDomain: "itsmynodezena.firebaseapp.com",
  databaseURL: "https://itsmynodezena-default-rtdb.firebaseio.com",
  projectId: "itsmynodezena",
  storageBucket: "itsmynodezena.appspot.com",
  messagingSenderId: "299392955521",
  appId: "1:299392955521:web:ef5671ad2702d441304980"
}


export default function GoogleSignIn() {
 /* firebase.initializeApp(firebaseConfig2, 'app1');  randomstring
const app1 = firebase.app('app1'); */


const firebaseConfig2 = firebaseConfig019;

  const { users, setUser } = useAuth();
  const [appInitialized, setAppInitialized] = useState(false);
  const [app, setApp] = useState();

  useEffect(() => {
    if (!appInitialized) {
      firebase.initializeApp(firebaseConfig9901, 'app06');
      setApp(firebase.app('app06'));
      setAppInitialized(true);
    }
  }, [appInitialized]);

  function GoogleS() {

        
          const provider = new firebase.auth.GoogleAuthProvider();
          app.auth().signInWithRedirect(provider)
            .then(result => {
              setUser(null);
              setUser(result.user);
        })
            .catch(error => {
              setUser(null);
            });
    
 
    
  }

return(
<>    


           {/* app05 <button  id="google-bt" className={log.firstGmail} onClick={GoogleSignIn}><FaGoogle id="btt"/>Continue with Google</button> */}
         
        
   
</>
)
  }
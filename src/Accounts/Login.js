import React, { useEffect, useState } from 'react'
/* import Signin from './Signin';
import SignUp from './';*/


import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import Profile from '../pages/ProfilePage/ProfileSettup';
//import { GoogleAuthProvider } from 'firebase/auth';
//import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import GoogleSignIn from './GoogleSignIn';
import Effects from './Effects';

import * as   log  from '../styles/signup.module.css';


const firebaseConfig19 = {

  apiKey: "AIzaSyAxMN4OQLOisY94cVCgR96o3-HoY0l6ZQk",

  authDomain: "zenanewstoday.firebaseapp.com",

  projectId: "zenanewstoday",

  storageBucket: "zenanewstoday.appspot.com",

  messagingSenderId: "1042837214412",

  appId: "1:1042837214412:web:ac14f71cb3f41e21719e69",

  measurementId: "G-V8VEEWMFR9"


};

export default function Login() {
  const [isOpen, setIsOpen] = useState(false)
const [showed, setShowed] = useState(false)
 

  firebase.initializeApp(firebaseConfig19, 'app1900');
  const app19 = firebase.app('app1900');
  
  const [Logindata,setLoginData] = useState({
    user: '',
    pass: ''
  });

  function Logins({event}){

    const logs = event.target.value;
    setLoginData(pre => {
      return{
        ...pre,
        user: logs.user,
        pass: logs.pass
      }
    })
  }




console.log(Logindata)
const [error, setError] = useState('');





 


  return (
    <div  className={log.ContainerLogB}>
    {/* app05  <button onClick={() => setIsOpen(false)} className='timed'>&times;</button>  randomstring */}
       <div  id={log.ContainerFor} className={log.ContainerForm}>
   
     { !isOpen &&  !isOpen && !showed && <div className={log.Entered}>
 
 <h1>Zena</h1>
 
 <GoogleSignIn />
 <div className={log.Enteredbtn}>
       <button  onClick={() => setIsOpen(true)} className={log.firstlogin}>Login</button>
       <button onClick={() => setShowed(true)} className={log.firstsignup}>Signup</button>
       </div>
 
 
 </div>
 }
   {
  isOpen ? <Signin Effects={Effects} isOpen = {isOpen} setIsOpen={setIsOpen} /> : showed ? <SignUp showed={showed}  setShowed={setShowed} /> : <div> </div> 
 }

   </div>
       </div>
  )
}
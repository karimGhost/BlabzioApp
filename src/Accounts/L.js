import React, { useEffect, useState } from 'react'
import ZenaAccSignUp from './ZenaAccSignUp';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import Profile from '../pages/ProfilePage/ProfileSettup';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import ForgotPassword from './ForgotPassword';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from './useAuth';
import Effects from './Effects';
import * as   log  from '../styles/signup.module.css';

const firebaseConfig2 = {
  apiKey: "AIzaSyAxMN4OQLOisY94cVCgR96o3-HoY0l6ZQk",
  
  authDomain: "zenanewstoday.firebaseapp.com",

  projectId: "zenanewstoday",

  storageBucket: "zenanewstoday.appspot.com",

  messagingSenderId: "1042837214412",

  appId: "1:1042837214412:web:ac14f71cb3f41e21719e69",

  measurementId: "G-V8VEEWMFR9"

};
export default function L(props) {

  firebase.initializeApp(firebaseConfig2, 'app1');
  const app1 = firebase.app('app1');


  const [sta, setsta] = useState(false);
  const [showed, setShowed] = useState(false);

  const [use, setUse] = useState(true)


  const [Logindata,setLoginData] = useState({
    user2: '',
    pass3: ''
  });

  const {user} = useAuth()
 
  
 
  

  const [user2, setUser2] = useState('');
   
  useEffect(() =>{
    let userData = localStorage.getItem('user');
    if(userData){
      let js = userData;
    const jj = js.slice(0, 5)
    console.log(jj)
      // Use the parsed data here randomstring
    
}
    }, [])
  


  function Logins({event}){

    const logs = event.target.value;
    setLoginData(pre => {
      return{
        ...pre,
        user2: logs.user2,
        pass3: logs.pass3
      }
    })
  }


console.log(Logindata)
const [error, setError] = useState('');
function handleSubmit(event){
  event.preventDefault();
  const form = event.target;
  const user2 = form.elements.user2.value;
  const pass3 = form.elements.pass3.value;

  if (!user2 || !pass3) {
    if (!user2) {
      setError('User field is required');
    }
    if (!pass3) {
      setError('Password field is required');
    }
  
    return;
  }
  setError('');

  app1.auth().signInWithEmailAndPassword(user2, pass3)
  .then((result) => {
    console.log('Successfully logged in!');
   setError("sucess")

   JSON.stringify(localStorage.setItem('user', user2 ));

  
   
   
    // Redirect or show a message
  })
  .catch((error) => {
    console.error(error);
 

    if(error.code === 'auth/wrong-password'){
      setError('Password is incorrect')
    } else if (error.code === 'auth/user-not-found'){
      setError('Email is incorrect')
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user2)) {
      setError('Please enter a valid email')
    }
  });
  
}
/*!showed app05 && <button  id={log.ti} className='times'>&times;</button> */ 





  return (
    <div className={log.ContainerLogA}>
     <div className={log.ContainerForm}>
      <Effects/>
      {!showed &&  use &&
<div  id={log.form} className={log.form}>

<div>
           <h3 className={log.head}>Login To Zena Account</h3>
           {error && (
        <p className="error-message">{error}</p>
      )}
              <form onSubmit={handleSubmit} >

           <div id={log.Big} className={log.Big}>

        <div className={log.formInputs}>
          <label id="b1" className='bob' htmlFor="user2">Email</label>
          <input type="text" value={Logindata.user}
onChange={event => setLoginData(event.target.value)} className="bb1"  id="user2" autoComplete='off'/> 
          </div>
<div className={log.formInputs}> 
          <label id="b2" className='bob' htmlFor ="pass3">password</label>
          <input type="password" value={Logindata.pass3} 
          onChange={event => setLoginData(event.target.value)}  id="pass3" autoComplete='off'/> 
        
          </div>
</div>

<div className={log.sigco}>
<button onClick={() => setUse(false)} className={log.forgot}>Forgot password?</button>

<button className={log.sign}>SignIn</button>
</div>
</form>
</div>
       
        <div>
<div className={log.start}></div>
    <p className={log.U}>OR</p>
<div className={log.end}></div>
</div>

        <div className={log.Signupsg}>
<button id="email-btn"  onClick={() => setShowed(true)}  ><FaEnvelope  id="bg"/>Signup with email</button>

<GoogleSignIn />

</div>

</div>}
{ !use && <ForgotPassword setUse = {setUse} />}
        </div>
{showed && <ZenaAccSignUp setShowed = {setShowed} /> }

{/*<Profile />
 */}







      </div>
  )
}

import React, { useEffect, useState } from 'react'

import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuth } from './useAuth';
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



export default function J(props) {


  // Initialize Firebase  randomstring app05
  firebase.initializeApp(firebaseConfig2, 'app1');
  const app1 = firebase.app('app1');



  
   
  useEffect(() => {

    document.querySelector('#bu').classList.add('ups');
    document.querySelector('#ba').classList.add('ups');
    document.querySelector('#be').classList.add('ups');


    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => { 
      input.addEventListener('focusin', (e) => {
        document.querySelector(`label[for="${e.target.id}"]`).classList.add('ups');
      });
      input.addEventListener('focusout', (e) => {
        if (e.target.value.length === 0) {
          document.querySelector(`label[for="${e.target.id}"]`).classList.remove('ups');
        }
      });
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focusin', () => { document.querySelector(`label[for="${input.target.id}"]`).classList.remove('ups');
      });
        input.removeEventListener('focusout', () => {          document.querySelector(`label[for="${input.target.id}"]`).classList.remove('ups');
      });
      });
    };
  }, []);
      const [Logindata,setLoginData] = useState({
        acc: '',
        pass1: '',
        pass2: ''

      });
    
      function Logins({event}){
    
        const logs = event.target.value;
        setLoginData(pre => {
          return{
            ...pre,
            acc: logs.acc,
            pass1: logs.pass1,
            pass2: logs.pass2

          }
        })
      }
    console.log(Logindata)
    const [error, setError] = useState('');

    async function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const acc = form.elements.acc.value;
      const pass1 = form.elements.pass1.value;
      const pass2 = form.elements.pass2.value;
    
      if (!acc || !pass1 || !pass2) {
        if (!acc) {
          setError('User field is required');
          return;
        }

        if (!pass1) {
          setError('Password field is required');
          return;
        }
        if (!pass2) {
          setError('Password field is required');
          return;
        }
        if (pass1 !== pass2) {
          setError('Fill all password fields ');
          return;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(acc)) {
          setError('Please enter a valid email address');
          return;
        }
        if (pass1.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        if (!/[A-Z]/.test(pass1) || !/[a-z]/.test(pass1) || !/[0-9]/.test(pass1)) {
          setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
          return;
        }
        return;
      }
   
      
      setError('');
    
      try {
        await app1.auth().createUserWithEmailAndPassword(acc, pass1);
       
        props.setShowed(false)
        alert("Your account has been activated successfully. You can now login")
        // navigate to success page
      } catch (error) {
        props.setShowed(true)
        switch (error.code) {
          case 'auth/email-already-in-use':
              setError('This email is already in use');
              break;
          case 'auth/invalid-email':
              setError('Invalid email address');
              break;
          case 'auth/weak-password':
              setError('Password is too weak');
              break;
          default:
              setError('An error occurred');
      }
       
      

      }
    }

  return (
    <div className='BigS'>
     <div className={log.formed}>

<button onClick={() => props.setShowed(false) } className={log.Ex}>&times;</button>
           <h3 className={log.Z}> Zena Signup </h3>

           <form id="signup-form" onSubmit={handleSubmit} className={log.fform}>

           <div className={log.Big}>
           {error && (
        <p className="error-messag">{error}</p>
      )}   

 
        <div className={log.formInputs}>
          <label id='bu' className='bob' htmlFor="acc" >Email</label>

          <input type="text" name="acc" value={Logindata.acc} onChange={(event) => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
    setLoginData({...Logindata, acc: event.target.value});
  }}  autoComplete='off' id="acc"/> 
            </div>
<div className={log.formInputs}> 
          <label id="ba" className='bob' htmlFor ="pass1">password</label>
          <input type="text" name='pass1' value={Logindata.pass1} 
          onChange={(event) => {
            // Validate password
            if (event.target.value.length < 6) {
              setError('Password must be at least 6 characters long');
            } else if (!/[A-Z]/.test(event.target.value) || !/[a-z]/.test(event.target.value) || !/[0-9]/.test(event.target.value)) {
              setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            } else {
              setError('');
             
            }
            setLoginData(event.target.value);
          }} id="pass1" autoComplete='off'/> 
       
          </div>

          <div className={log.formInputs}> 
          <label id="be" className='bob' htmlFor ="pass2">repeat_password</label>

          <input type="text" name='pass2' value={Logindata.pass2} 
          onChange={(event) => {
          
            // Validate password
            if (event.target.value.length < 6) {

              setError('Password must be at least 6 characters long');
            } else if (!/[A-Z]/.test(event.target.value) || !/[a-z]/.test(event.target.value) || !/[0-9]/.test(event.target.value)) {
              setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            } else {
              setError('');
              
              
            }
            setLoginData({ ...Logindata, pass2: event.target.value });
          }}  onBlur={(event) => {
            if(event.target.value !== Logindata.pass1){
              setError('Passwords do not match');
          
            }else{
              setError('');
            } }}  id="pass2" autoComplete='off'/> 
          </div>
</div>

<div className={log.signuped}>
<input onClick={() => {
    document.getElementById('signup-form').reset(); }} type ='reset' className={log.forg}  value="reset" />

<button className={log.sigup}>Signup</button>
</div>
</form>




</div>

    </div>
  )
}

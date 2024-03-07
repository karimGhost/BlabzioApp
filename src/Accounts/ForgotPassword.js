import React, { useEffect, useState } from 'react'
import * as   log  from '../styles/signup.module.css';
import ZenaAccSignUp from './ZenaAccSignUp';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'gatsby';
//import Profile from '../pages/ProfilePage/ProfileSettup'; app05
import {firebaseConfig019, firebaseConfig9901} from './FirebaseAuth';

const firebaseConfigq = {

  apiKey: "AIzaSyAxMN4OQLOisY94cVCgR96o3-HoY0l6ZQk",

  authDomain: "zenanewstoday.firebaseapp.com",

  projectId: "zenanewstoday",

  storageBucket: "zenanewstoday.appspot.com",

  messagingSenderId: "1042837214412",

  appId: "1:1042837214412:web:ac14f71cb3f41e21719e69",

  measurementId: "G-V8VEEWMFR9"


};
 export default function ForgotPassword(props) {
 
  firebase.initializeApp(firebaseConfigq, 'appq');
  const appq = firebase.app('appq');

 
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const [captchaValue,setCaptchaValue] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!captchaValue) {
      setError("Please verify that you're human");
      return
    }
    try {
      setLoading(true);
      const actionCodeSettings = {
        url: 'https://zenanewstoday.web.app',
        handleCodeInApp: true
      };

      await appq.auth().sendPasswordResetEmail(email, actionCodeSettings);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('This email address is not associated with any account.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        default:
          setError('An error occurred, please try again later.');
      }
    }
  };

  return (
    <form className='fom' onSubmit={handleSubmit}>
      <h1 className='heads1'>Zena Reset Password</h1>
      {success && !error && <p  id="block" style={{color: 'black', fontWeight: 'bold'}} className='reds'>{alert('A password reset email has been sent to your email address')}A password reset email has been sent to your email address.</p>}

      <input className='ipu'
        type="email"
        placeholder="Email"
        value={email}
        id="rese"
        onChange={(e) => setEmail(e.target.value)}
      />
      <ReCAPTCHA id="reseted"
        sitekey="6LcrTAwkAAAAAE4cE3PhorjOdxsc0QfEEwIwMsXv"
        onChange={value => setCaptchaValue(value)}
        size={window.innerWidth > 334 ? 'normal' : 'compact'}
      />
      <button className='btu' type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...': 'Send Password Reset Email'}
      </button>
      {error && <p  className='reds'>{error}</p>}
      <p>
        Already have an account? <button style={{cursor: "pointer", background:"none", fontWeight: "bold", color: "black"}}  onClick={() => props.setUse(true)} > Log in</button>
      </p>
    </form>
  );
}




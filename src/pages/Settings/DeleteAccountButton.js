import React, { useState } from 'react';
import firebase from 'firebase/compat/app';

import { useAuth } from '../../Accounts/useAuth';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { navigate } from 'gatsby';
//import { ButtonToolbar } from 'react-bootstrap';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';



const firebaseConfig922 = {

  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"

};

function DeleteAccountButton({toastRef}) {
  const firebaseConfig2 = firebaseConfig019;

 const one = firebase.initializeApp(firebaseConfig2, 'app0155');
const two = firebase.initializeApp(firebaseConfig922, 'app01922');



  const {users, user,setUser,signOut } = useAuth();

  const app4 = firebase.app('app0155');
const app44 = firebase.app('app01922');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);


  const handleDeleteAccount = async () => {
    if (user) {
      setLoading(true);

      try {
        const userId = user; // Get the user ID before deleting the account
        await user.delete();
        await signOut();
        navigate('/');

        toastRef.current.show({
          severity: 'success',
          summary: 'Account deleted',
          detail: 'Your account has been successfully deleted.'
        });

        await handleUserDeletion(userId); // Pass the user ID to the function
       await handleUserDeleteData(userId)
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          await signOut();

          toastRef.current.show({
            severity: 'warn',
            summary: 'Session expired',
            detail: 'You need to sign in again to delete your account.'
          });
        } else {
          toastRef.current.show({
            severity: 'error',
            summary: 'Error deleting account',
            detail: error.message
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUserDeletion = async (userId) => {
    try {
      // Reference the comments path in the Realtime Database
      const commentsRef = app44.database().ref('comments/cards');

      // Query the comments where userId matches the user ID
      const snapshot = await commentsRef
        .orderByChild('userId')
        .equalTo(userId)
        .once('value');

      // Create an object to store the updates
      const updates = {};

      // Iterate through each comment
      snapshot.forEach((childSnapshot) => {
        updates[childSnapshot.key] = null;
      });

      // Update the comments with null values to delete them
      await commentsRef.update(updates);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  const handleUserDeleteData = async (userId) => {
    try {
      // Reference the profile path in the Realtime Database
      const profileRef = app4.database().ref('profile');

      // Query the profile data once
      const snapshot = await profileRef.once('value');

      // Create an object to store the updates
      const updates = {};

      // Iterate through each profile entry
      snapshot.forEach((childSnapshot) => {
        // Check if the key (ID) matches the user ID
        if (childSnapshot.key === userId) {
          updates[childSnapshot.key] = null;
        }
      });

      // Update the profile data with null values to delete the entry
      await profileRef.update(updates);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  return (
    <>
      <Button style={{backgroundColor: 'red', outline:"red"}} severity="danger"  label="I understand, delete my account" onClick={handleDeleteAccount} disabled={loading} />

    </>
  );
}

export default DeleteAccountButton;

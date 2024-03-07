import React, { useEffect } from 'react'
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuth } from '../Accounts/useAuth';
import {firebaseConfig019} from '../Accounts/FirebaseAuth';


 
export default function Recive(props){
  const firebaseConfig2 = firebaseConfig019;

  const { user, loading,signOut } = useAuth();



  return(


<div>
</div>




  )



}

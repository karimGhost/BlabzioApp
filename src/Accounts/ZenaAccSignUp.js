import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "../styles/PasswordD.css"
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { useAuth } from './useAuth';
import { FaDragon } from 'react-icons/fa';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';

import {Container} from 'react-bootstrap';
import  Card  from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Row } from 'primereact/row';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import img from '../images/1558314.gif'
import {firebaseConfig019} from './FirebaseAuth';

import   * as op from '../styles/iput.module.css';

const firebaseConfig0444 = {

  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"

};





export default function ZenaAccSignUp(props) {
  const firebaseConfig2 = firebaseConfig019;

 const f1 = firebase.initializeApp(firebaseConfig2, 'app04');

const f2 =  firebase.initializeApp(firebaseConfig0444, 'app0444');

  const app04 = firebase.app('app04');
  const app0444 = firebase.app('app0444')
  const msgs = useRef(null);

  const [Logindata,setLoginData] = useState({
    acc: '',
    pass1: '',
    pass2: '',
    username: ''
  });

  const [value3, setValue3] = useState('');

  const [value4, setValue4] = useState('');

  
console.log(Logindata)
const [error, setError] = useState('');

async function handleSubmit(event) {
  event.preventDefault();
 
  const form = event.target;
  const acc = form.elements.form1.value;
  const pass1 = Logindata.pass1;
  const pass2 = Logindata.pass2;
const username = form.elements.form4.value;
  if (!acc || !pass1 || !pass2) {
    if (!acc) {
      msgs.current.show({severity: 'warn', summary: 'Email Comon!', detail: 'Email field is required', life:3000});  
        
      return;
    }

    if (!pass1) {
      msgs.current.show({severity: 'warn', summary: 'did you Fill 1 Password ', detail: 'First Password field is required', life:3000});  

      return;
    }
    if (!pass2) {
     
      msgs.current.show({severity: 'warn', summary: 'did you miss the second One :(', detail: 'Second Password field is required', life:3000});  

      return;
    }
    if (pass1 !== pass2) {
     
      msgs.current.show({severity: 'warn', summary: 'Fill all Man!', detail: 'Fill all password fields', life:3000});  

      return;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(acc)) {
   
      msgs.current.show({severity: 'warn', summary: ' invalid Email', detail: 'Please enter a valid email address', life:3000});  

      return;
    }
    if (pass1.length < 6) {
  
      msgs.current.show({severity: 'warn', summary: 'please check', detail: 'Password must be at least 6 characters long', life:3000});  

      return;
    }
    if (!/[A-Z]/.test(pass1) || !/[a-z]/.test(pass1) || !/[0-9]/.test(pass1)) {
   
      msgs.current.show({severity: 'warn', summary: 'please Be sure', detail: 'Password must contain at least one uppercase letter, one lowercase letter, and one number', life:3000});  

      return;
    }

   
    return;
  }

  
  setError('');


  const normalizedUsername = username.trim().toLowerCase();
 
  const normalizedEmail = acc.trim().toLowerCase();


  try {
    // Check if a user with that username already exists in the database
    const snapshot1 = await app04.database().ref('profile').orderByChild('username').equalTo(normalizedUsername).once('value');
  
    if (snapshot1.exists()) {
      // A user with that username already exists
      // Prompt the user to choose a different username
    
      msgs.current.show({severity: 'error', summary: 'Error', detail: 'username already exists. Please choose another one.', life:3000});  

      const snapshot2 = await app0444.database().ref('comments/cards').orderByChild('user').equalTo(normalizedUsername).once('value');
if(snapshot2.exists()){

  msgs.current.show({severity: 'error', summary: 'Error', detail: 'username already exists. Please choose another one.', life:3000});  

}


    } else if(pass1 !== pass2){
      msgs.current.show({severity: 'warn', summary: 'Please check', detail: 'passwords do not match!!', life:3000});  
return;
    }else{
 

      // The username is available
    //  setError('username is available :)');


    
      // Create a new user account with the normalized username
      const userCredential = await app04.auth().createUserWithEmailAndPassword(acc, pass1);
      const user = userCredential.user;
  
      // Update the user's display name
      await user.updateProfile({
        displayName: username
      });
  
      // Store the normalized username in the database
      await app04.database().ref('profile/' + user.uid).set({
        username: normalizedUsername,
        email: normalizedEmail,
        text: "<div>Hello World!</div>",
        status: "write Something here....",
        followers: "1",
        following: "1",
        side: 'to bottom',
        colors: ["ghostwhite"],
      });
  

      // User data saved to the database
   
      msgs.current.show({severity: 'success', summary: 'Success', detail: 'You have Successfully Created your Account.'});      // Navigate to the success page
   
      props.setReady(true)
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        msgs.current.show({severity: 'error', summary: 'Error', detail: 'This email is already in use.', life:3000});  

     
        break;
      case 'auth/invalid-email':

        msgs.current.show({severity: 'error', summary: 'Error', detail: 'Invalid email address.', life:3000});  

        break;
      case 'auth/weak-password':
       
        msgs.current.show({severity: 'error', summary: 'Error', detail: 'Password is too weak.', life:3000});  

        break;
      default:
       
        msgs.current.show({severity: 'error', summary: 'Error', detail: 'An error occurred.', life:3000});  

        console.error(error);
    }
  }
}

const footer = (
  <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
          <li>At least one lowercase</li>
          <li>At least one uppercase</li>
          <li>At least one numeric</li>
          <li>Minimum 8 characters</li>
      </ul>
  </React.Fragment>
);


const [user2, setUser2] = useState('');

  return (
    <div className=' Signup' style={{position:"fixed", top:"0", left:"0"}} >
<Toast ref = {msgs} />


      <div className="pt-2 bg-image" style={{backgroundImage: `${img}`}}></div>

      <Card className='mx-5 mb-5 p-5 shadow-5 ' id="cardSign" style={{marginTop: '', backgroundImage: `${img}`, backdropFilter: 'blur(30px)'}}>
     
       
        <Card.Body className='p-4 textC psmall'>
        
        <div  style={{height:"45px", width:"fit-content",position :"relative"}}>
           
             
          <div className='d-flex animated-log flex-row ps-3 pl-1 pt-1   fixedit LogoLogin'  id='logow' style={{background:"#f7f7f7",  position:"absolute", left:"50px",height:"45px", top:"0",width:"fit-content", margin:"auto"}}>
                      <FaDragon className='dragon' icon=" fa-3x me-3 " style={{fontSize:"1rem", color:"orange", divor: '#709085' }}/>
                   
                    
          
          
                      <span className="blabzio h1 fw-bold mb-0 " style={{color:"whitesmoke",fontSize:"1.4rem", textShadow:"1px 1px 2px #000000"}}  > <b style={{color:"orange", textShadow:"1px 1px 4px #000000ad"}} className='letter-b'>B</b>lab<b style={{color: "orange", fontFamily:"sans-serif"}}>Z</b>io </span>
                  
                    </div>
          
                  </div>
                  

               <h2 className="fw-bold mb-5">Sign up </h2>
          {error && (
        <p className="error-messag">{error}</p>
      )}   
      <form onSubmit={handleSubmit} style={{width:"fit-content"}} className=' pl-5 justify mx-auto  ml5 FormSignup'>

              
            <InputGroup className="mb-3  mlpx" style={{width:"60%", margin:"auto"}}>
       


       <Form.Control
                 placeholder="Choose  username"
                 aria-label="Choose username"
                 className=' ml-5 mls5 bg-dark'
                 style={{borderRadius:"5px", color:"white"}}
                 aria-describedby="basic-addon1"  wrapperClass='mb-4  p-0 w-100'
                  value={Logindata.username}
                   label='Choose desired username'
                    id='form4'
                     type='text'
                      onChange={(event) =>
                         setLoginData({...Logindata,  username:  event.target.value}) }
                      />

             </InputGroup>
              
        

           

        

          <InputGroup className="mb-3 mlpx" style={{width:"60%", margin:"auto"}}>
       


       <Form.Control
                 placeholder="Email"
                 aria-label="Email"
                 style={{borderRadius:"5px"}}

                 aria-describedby="basic-addon1" 
                  className='em w-100 ml-5 bg-dark text-light mls5'
                  wrapperClass='mb-4  center mx-auto'
                   label='Email'
                    id='form1'
                     type='email'
                       value={Logindata.acc}
                        onChange={(event) => {
                  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
                    setError('Please enter a valid email address');
                  } else {
                    setError('');
                  }
                  setLoginData(pre => {return{...pre, acc:  event.target.value}})
              
              
                }}  autoComplete='off'/>
                    

             </InputGroup>

         

         {/* <InputText wrapperClass='mb-4 w-50 center mx-auto' label='Password' id='form2' type='password' value={Logindata.pass1}  onChange={(event) => {
            // Validate password
            if (event.target.value.length < 6) {
              setError('Password must be at least 6 characters long');
            } else if (!/[A-Z]/.test(event.target.value) || !/[a-z]/.test(event.target.value) || !/[0-9]/.test(event.target.value)) {
              setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            } else {
              setError('');
             
            }
            setLoginData(event.target.value);
          }}  autoComplete='off'/> */}

<Password  placeholder='password' style={{ width:"100%"}} className=' passs Sig mb-4 pr-1 center  pl-5 pls5 mlpx' id='form2' value={Logindata.pass1}  onChange={(event) => setLoginData(pre => {return{ ...pre, pass1: event.target.value }} ) } toggleMask />

       {/*   <MDBInput wrapperClass='mb-4 w-50 center mx-auto' label='repeat_password' id='form3' type='password'  value={Logindata.pass2} 
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
            } }}  autoComplete='off' /> */}

<Password className='passs mb-4 pl-5 pls5 Sig mlpx' placeholder='repeat-password '  style={{ width:"100%"}} id='form3' value={Logindata.pass2}  onChange={(event) => setLoginData({...Logindata, pass2: event.target.value}) } toggleMask   footer={footer}/>


        
         

          <Button  type="submit" style={{background: "rgb(20,21,21)", width: "90%"}} className='w-50 bgL mb-4 ' size='md'>sign up</Button>

       
</form>
<div className="text-center">

<p>Already have An Account ? <button className='bgdark  mb-5' style={{cursor: "pointer", background: "none", border: "none", color: "black"}}  onClick={() => props.setReady(true)}>Login</button></p>

<div  style={{height:"45px", width:"fit-content",position :"relative", float:"right"}}>
           
             
           <div className='d-flex animated-log flex-row ps-3 pl-1 pt-1   fixedit LogoLogin'  id='logow' style={{background:"#f7f7f7",  position:"absolute", left:"50px",height:"45px", top:"0",width:"fit-content", margin:"auto"}}>
                       <FaDragon className='dragon' icon=" fa-3x me-3 " style={{fontSize:"1rem", color:"orange", divor: '#709085' }}/>
                    
                     
           
           
                       <span className="blabzio h1 fw-bold mb-0 " style={{color:"whitesmoke",fontSize:"1.4rem", textShadow:"1px 1px 2px #000000"}}  > <b style={{color:"orange", textShadow:"1px 1px 4px #000000ad"}} className='letter-b'>B</b>lab<b style={{color: "orange", fontFamily:"sans-serif"}}>Z</b>io </span>
                   
                     </div>
           
                   </div>
                    
</div>
        </Card.Body>
      </Card>



    </div>
  );
}


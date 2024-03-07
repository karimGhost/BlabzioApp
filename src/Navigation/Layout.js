import React, { useEffect } from 'react'
import Navbar from './Navbar'
//import NavbarDrawer from './NavbarDrawer'
//import {  withTranslation } from "react-i18next";
//import  i18n from './i18n';
import { useState } from 'react';
//import Language from '../pages/Language';
//import Profiles from '../pages/profileComponents/Profiles'
//import { useTranslation , Trans} from 'react-i18next';
import Lang from './Lang';
//import { off } from 'process';
import Login from '../Accounts/ZenaAcc';
import FullLogin from '../Accounts/L'
import ZenaAccSignUp from '../Accounts/ZenaAccSignUp';
import { useAuth } from '../Accounts/useAuth';
//import Welcome from '../pages/articles/Welcome';
//import Loadings from './Loadings';
import { Link } from 'gatsby';
//import Celeb from '../pages/news/Politics';
import Footer from './Footer';
import ZenaAcc from '../Accounts/ZenaAcc';
//import im from '../images/proxy.jpeg';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Recive from "./Recive";

import { useLocation } from '@reach/router';
//import Notifications from '../pages/profileComponents/Notifications';
//import Post from '../pages/news/Posted/Post'; 
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import 'primeicons/primeicons.css'; 
//core
import "primereact/resources/primereact.min.css";  
import SidebarSide from '../pages/Components/SidebarSide';
import { Modal } from 'react-bootstrap';
import { Button } from 'primereact/button';

const firebaseConfig16 ={
apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"
};


export default function Layout({setuseLeft, setLig, theLight, dark,setDark,setdark, setTheLight, userId, isBloged, onHide, setProfile, setUser,  navbars, setLoads, light, setLight, lag, off, children,trendings, language,handleLanguageChange}) {

  const {users,useruid, user, loading,signOut } = useAuth();


firebase.initializeApp(firebaseConfig16, 'app16');
const app16 = firebase.app('app16');
//users is a chain

// users.isAnonymous    = bolean

//users.emailVerified = bolean

//users.photoURL

//users.displayName


// useruid is user.uid

  const [usernames, setUsernames] = useState({
    useris : null,
  
  });

 const [userProfile, setUserProfile] = useState('')

  const username = usernames.useris;

  const [topRightModal, setTopRightModal] = useState(false);
  


  

    const [SlideDisable, setSlideDisable] = useState(false)
    const [ localLike, setLocalLike] = useState(null)
    const [Watchlist, setWatchlist] = useState(null)
    const [visible, setVisible] = useState(false);
    const [vid, setVid] = useState([])
    const [Switch, setSwitch] = useState(null)
    const  [SwitchVids,setSwitchVids] = useState(null)
    const [showSaved, SetshowSaved] = useState(null)
    const loadV = () => {
      console.log("")
    }
    

 


const getCameraPermission = async () => {

}










  const location = useLocation();
  let isBlogActive;
  
  if (location.pathname.startsWith('/profileComponents/Myprofile')) {
    isBlogActive = true;
  } else {
    isBlogActive = false;
  }


    const toggleShow = () => { setTopRightModal(!topRightModal) };
  
 
      



  useEffect(() => {  
    
    if (users && users.email) {
      app16
        .database()
        .ref('prof')
        .orderByChild('email')
        .equalTo(users.email)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val());
            const snapshotval = snapshot.val()[userId];
            if (snapshotval && snapshotval.username  ) {
              setTopRightModal(false)

              setUsernames(pre => {
                return{
                  ...pre,
                  useris: snapshotval.username,
                 
  
                }
  
              
              });


            }

            if(!snapshotval && !snapshotval.username ){
              setTimeout(() => setTopRightModal(true), 6000);
            
          }
          }
        });
    } else {
      // handle the case where user is not defined or does not have an email property
   
         
           
      
     
    }
     }, [usernames])





  const [Ready, setReady] = useState(true)
//const handleLanguageChange = props.handleLanguageChange;

const [isOpen, setIsOpen] = useState(false);
 //const [lan,SetLang] = useState(true); 
 
 const [isTrue, setIsTrue] = useState(true);
 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 904 ) {
      setIsTrue(false);
    }else{
      setIsTrue(true)
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [isTrue]);

const [val, setVal] = useState(true);

const [names,setnames] = useState('')

const [its, setits] = useState(true)

useEffect(() =>{
  let userData = localStorage.getItem('user');
  if(userData){
    let js = userData;
  const jj = js.slice(0, 5)
  setnames(jj)
  
    // Use the parsed data here
  setVal(false)
}






let gg = JSON.parse(sessionStorage.getItem('true'))
if(gg){
  setits(false)
}
  }, [names])


 

  const [loaded, setLoaded] = useState()

  useEffect(() => {
  /*  if (!loading && user) {
      // Redirect to a different page or show a different component
setLoaded(true)
    }
*/
    if(loading  && !useruid){
      setLoaded(false)
    }else{
      setLoaded(true)
    }
  }, [useruid, loading]);



  const [offed,setoffed] = useState(true)
  function Timed(){

    setoffed(false)       

    JSON.stringify(sessionStorage.setItem('true', true))
  }
useEffect(() => { 

  setTimeout(Timed, 7000)

}, [])



useEffect(() =>{
 if(setuseLeft){
     setuseLeft(visible) 
 }
}, [visible])

    const [hideit, setHideit] = useState(false)


const [bu, setBu]= useState(true)
const [greeting, setGreeting] = useState('');
      useEffect(() => {
        const currentHour = new Date().getHours();
        switch (currentHour) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:   
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          setGreeting('Good morning');
          break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        setGreeting('Good afternoon' );
          break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
          setGreeting(`Good Evening`);
          break;  
      }
      



      }, []);

     
 /* if (!user) {
    return <Loadings />;
  }

setLength

<Modal
  animationDirection='right'
  show={topRightModal}
  tabIndex='-1'
  setShow={setTopRightModal}
>
  <Modal.Header position='top-right' side>
    <Modal.Title>
      <Modal.Header className='bg-dark text-white'>
        <Modal.Title>Finish setting Account</Modal.Title>
        <Button
          color='none'
          className='btn-close btn-close-white'
          onClick={toggleShow}
        ></Button>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-3 text-center'>
            <i className='fas fa-shopping-cart fa-4x text-info'></i>
          </div>

          <div className='col-12'>
            <p style={{fontSize: "1rem", textAlign:"center"}} className="bold">Please Finish setting Up your Account!</p>
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button color='dark' onClick={() =>  navigate('/ProfilePage/Profile') }>yea sure!</Button>
        <Button outline color='danger' onClick={toggleShow}>
          Close
        </Button>
      </Modal.Footer>

    </Modal.Title>
</Modal.Header>
</Modal>
 */




  //document.querySelector(".footerrBod")
  
/*
  console.log(`$the object is as ${lag}`)
*/
  {/*   its && offed &&  

*/}

console.log("the user loogged as ths", useruid);

    return (
   <>

{ useruid ? its && offed &&  <div>Lol</div> : Ready ? <ZenaAcc setReady={setReady} setVal ={setVal} /> :  <ZenaAccSignUp setReady={setReady}  setVal ={setVal}/>   }

{useruid && <Navbar setdark={setdark} setDark ={setDark} setLig={setLig}  userId ={userId} navbars={navbars} setLoads={setLoads} hideit ={ hideit} setHideit ={setHideit} setReady={setReady} light ={light} setLight = {setLight} /> }

{lag ?  <Lang language={language} handleLanguageChange={handleLanguageChange} /> :  " "  }     

{useruid && <SidebarSide 
 SlideDisable= {SlideDisable}
 setSlideDisable = { setSlideDisable}
  setLocalLike={setLocalLike} 
  localLike={localLike}
   Watchlist={Watchlist} 
    setWatchlist={setWatchlist}
      visible={SlideDisable ? true : visible} 
      setVisible={setVisible}
       vid={vid}
         setVid={setVid}
           Switch={Switch}
            SwitchVids={SwitchVids}
             setSwitchVids={setSwitchVids} 
             setSwitch={setSwitch}
             SetshowSaved={SetshowSaved} 
            showSaved={showSaved}
            loadVideos={loadV}
            Create={getCameraPermission}
            signOut={signOut}
            />
  
            

}

 {useruid ?  
   children :""

   
}  
   {useruid && isBloged && <Footer /> }

   </>
  )
}

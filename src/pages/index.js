import React from 'react'

import Layout from '../Navigation/Layout'

import {useState, useEffect, useRef} from 'react'
//import { Link } from 'gatsby'
//import requests from "../../requests";
//import axio from '../../axios';
                                   //import PagesData from '../../../components/PagesData'

//import axios from 'axios'
//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';



import { Editor } from 'primereact/editor';
import {  useLocation } from '@reach/router';

//core

//import {  Trans} from 'react-i18next';
//import i18n from "../../../components/i18n";

import { useAuth } from '../Accounts/useAuth';
import im from '../images/proxy.jpeg'
//import ReactHtmlParser from 'html-react-parser';
//import Recive from '../../../components/Recive'
//icons

//import { Button } from 'primereact/button';
//import { InputText } from 'primereact/inputtext';
//import { Checkbox } from 'primereact/checkbox';

import Posts from '../pages/Posted/Posts';
//import { URLSearchParams } from 'url';
//import { navigate } from 'gatsby';
import{
 
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingAnim from '../Accounts/LoadingAnim';
import { getFirestore, collection, query, orderBy,where, limit,enableTimestampsInSnapshots, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {firebaseConfig019} from '../Accounts/FirebaseAuth';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import 'primeicons/primeicons.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "primereact/resources/primereact.min.css";  


export default function Postit({location, ...props} ) {
  const firebaseConfig9 = firebaseConfig019;

 const refresh = () => {

 }
    const locatio = useLocation();

    const queryString = locatio.search;
    const params = {};
    
    if (queryString) {
      queryString
        .substring(1)
        .split('&')
        .forEach((param) => {
          const [key, value] = param.split('=');
          params[key] = decodeURIComponent(value);
        });
    }
    
    const ids = params.id || null;
    


    
console.log("this is locatiiii", locatio)
console.log("this is locat", location)





  firebase.initializeApp(firebaseConfig9, 'app10');
  const app4 = firebase.app('app10');


  const [onHide, setonHide] = useState(true);

 const { user, loading,signOut } = useAuth();

 const [profileImg, setProfileImg] = useState(im);

const [usernames, setUsernames] = useState({
  useris : null,
  userData : null,
  
});



useEffect(() => {
  // Only run the effect if the user object is defined
  if (user) {
    app4.database().ref(`profile/${user.uid}/profileImg`).on('value', snapshot => {
      console.log(JSON.stringify(snapshot.val()))
      if (!snapshot.val()) {
   
        console.log("Snapshot value is null or undefined");
        return;
      }
   

      // check if snapshot.val() is an object
      if(typeof snapshot.val() === 'object'){
        const val = snapshot.val();
       setProfileImg(val.profileImg)
      } else {
       setProfileImg(snapshot.val())



      }
    });
 
  }



},[user]);





 
  useEffect(() => {  
    
      if (user && user.email) {
        app4
          .database()
          .ref('profile')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userId = Object.keys(snapshot.val());
              const snapshotval = snapshot.val()[userId];
              if (snapshotval && snapshotval.username  ) {
               if(!snapshotval.username ){alert("please finish setting up you account settings /profile")}
                setUsernames(pre => {
                  return{
                    ...pre,
                    useris: snapshotval.username,
                   
    
                  }
    
        
                });
              
              }
            }
          });
      } else {
        // handle the case where user is not defined or does not have an email property

      }
       }, [user])
       

       useEffect(() => {  
        if(props.userId){
                  const db = app4.database().ref('profile');
        const userRef = db.child(props.userId);
        userRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
            const userData = snapshot.val();

            setUsernames(pre => {
              return{
                ...pre,
                userData: userData.username && userData.username
               

              }

    
            });
          } else {
            alert("user was deleted")
      } 
    });

  return () => {
          userRef.off();
  };
}                             
      }, [props.userId]);
    


 
   useEffect(() => {
     AOS.init();
   }, [user])
   

  

  

  




  const [off, setoff] =  useState(false);
 






const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );
}

const header = renderHeader();
 


 
function sets(i){
  setProfileImg(i)
}





const [zoom, setzoom] = useState(false)




const [fullSizeImage,setFullSizeImage ] = useState(null)



useEffect(() => {
  const images = document.querySelectorAll(".resized-imaged");
  images.forEach(image => {
    image.addEventListener("click", handleImageClick);
    return () => {
      image.removeEventListener("click", handleImageClick);
    };
  });
}, [handleImageClick]);

function handleImageClick(event) {
  const clickedEl = event.target;

  if (clickedEl.tagName === "IMG") {
    // Do something with the clicked image
    setFullSizeImage(clickedEl.src)
}
}


const [zoomLevel, setZoomLevel] = useState(1);


      const zoomIn = () => {
        setZoomLevel(zoomLevel + 0.1);
      };
    
      const zoomOut = () => {
       if(zoomLevel > 1 ) {
        setZoomLevel(zoomLevel - 0.1);
       }
      };
    
const ifZomed ={
  position : zoom && "absolute",
  top: zoom && "0",
  left: zoom && "0",
  right:  zoom &&"0",

  bottom: zoom && "0",
zIndex: zoom && "20",
backgroundColor:  zoom && "rgba(0,0,0,0.11)"
}

const [light,setLight ] = useState(false)

const [navbars, setnavbars] = useState(false)
let isBlogActive = true;
let isprof = true

/*

if (locatio.pathname.startsWith('/profileComponents/Myprofile') ) {
  isBlogActive = true;
} else if (locatio.pathname.startsWith(`/profileComponents/${props.userId}`) ) {
  isBlogActive = true;
}else{


  isBlogActive = false;
}

let isprof;

if (locatio.pathname.startsWith('/profileComponents/Profiles') ) {
  isprof = true;
} else {
  isprof = false;
}
 isBloged ={isBlogActive}
*/

const [dark, setdark ] = useState(light)
if(!user){
 < LoadingAnim  refresh = {refresh} />
}
  
  
  return (

<Layout dark={dark} setdark={setdark} setDark={props.setdark} setLig = {props.setLight} setLight={setLight}  userId= {props.userId} users={props.users} style={{  overflow:  !onHide  && "hidden"} } onHide={onHide} light={light}  off={off} >

            
{fullSizeImage &&
<div className="transparentbg" style={{position:"fixed", zIndex:"45", top:"0",left:"0",bottom:"0",right:"0"}}> 
<div id="myModal" className={`"moda" ${dark && "darken" }`} >
      <span onClick={() => setFullSizeImage(null)} className="close">&times;</span>
     
      <div className="autoforcezoom" style={{marginBottom: "100px", width: "100%",height: "100%", margin:"auto", alignItems: "center", display:"flex", flexDirection:"column",position:"fixed", zIndex: "50" }}>
    <div style={{display:"inline-block", float:"right"}}>
    <span  onClick={zoomIn} style={{cursor:"pointer" }} className='m-3  text-light '>
      <FontAwesomeIcon className='hover-text-light' icon={faMagnifyingGlassPlus}/>
      </span> 

      <span  onClick={zoomOut}  style={{cursor:"pointer", color:zoomLevel > 1 && "white"}} className='m-3 hover-text-light ' >
        <FontAwesomeIcon className='' icon={faMagnifyingGlassMinus}/>
        </span>
    </div>
      
      <img style={{ width: `${50 * zoomLevel}%`, textAlign: "center" , justifySelf:"center", marginLeft:"auto", marginRight:"auto"}} zoomSrc={fullSizeImage} src={fullSizeImage} alt="Full-size Image" preview />
     
      </div>
    </div>  </div>}


{/*
<PagesData off={off}  />
*/

}




  <main id="mai mt-6 " className={` mainPost ${ dark && "darken bgdar"} ${isprof && "proff" }`} style={{  marginTop: !onHide && "0", overflow: !onHide && "hidden", position: !onHide && "fixed", top: "0", bottom:"0",zIndex: "10", background: dark ? "#121212": "rgba(250, 250, 250, 250)"    , margin: isBlogActive  &&  " 0px", padding: isBlogActive &&"0px"  }}  >
    <section className={ `${dark && "darken"} single-post-content mt-6 `}>
      <div className={` ${ onHide &&"container"}`}>
        <div className="row ">
          <div style={{ width: isBlogActive && "100%"}} className= {` ${onHide && 'col-md-9 post-content  ' }   ${isBlogActive && "w-100 col-md-12 p-0 m-0"}   ${isprof && "col-md-12  prr" } ${!dark && "prs"} `} >
          <Posts  userId={props.userId} id={ids} fullSizeImage ={fullSizeImage}
setFullSizeImage ={setFullSizeImage}  dark ={dark} setLe={props.setLen} setLength={props.setLength} fits={props.fits} users = {props.users} Bio={props.Bio} isBlog={isBlogActive} onHide={onHide} setonHide={setonHide} app4={app4} profileImg ={profileImg} username={usernames.useris} userData={usernames.userData}/>
            {/*<!-- setLength  ======= Single Post Content ======= --> */}

         

</div>

      </div>

      </div>
    </section>
  </main>
  
  
   
   
   </Layout>

  )
}

export const Head = () => <title> Blabzio</title>

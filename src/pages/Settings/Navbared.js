import React, { useEffect, useState } from 'react';
import { FaDragon } from 'react-icons/fa';

import Layout from "../../Navigation/Layout"
import firebase from 'firebase/compat/app';

import { useAuth } from '../../Accounts/useAuth';
import im from '../../images/proxy.jpeg';
import { initializeApp } from "firebase/app";
//import Language from '../Language';
//import { useTranslation , Trans} from 'react-i18next';
import { Link } from 'gatsby';
import { navigate } from 'gatsby';
import  {Button} from 'primereact/button';
import Navbar from '../../Navigation/Navbar';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';




export default function Navbared(props) {
  const firebaseConfig2 = firebaseConfig019

  firebase.initializeApp(firebaseConfig2, 'app019');

  const app4 = firebase.app('app019');
  const {users, user,setUser, loading,signOut } = useAuth();
  const auth = app4.auth();
  const database = app4.database();

  const [language, setLanguage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [profileImg, setProfileImg] = useState(im);
  const setDarks = props.setDarks; 

const actives = props.actives;
/*
  useEffect(() => {
    app4.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        database.ref(`users/${currentUser.uid}`).on('value', snap => {
        
       if(snap.val()){
          setProfileImg(snap.val().profileImg);
          setLanguage(snap.val().language);
  setFavorites(snap.val().favorites);
       }      
});
      
      }
    });
 
  }, []);

*/
const [dark , setdark] = useState(false)


  useEffect(() => {  

    if (users && users.email) {
      app4
        .database()
        .ref('profile')
        .orderByChild('email')
        .equalTo(users.email)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val());
            const snapshotval = snapshot.val()[userId];
            if (snapshotval && snapshotval.username  ) {
              snapshotval.darkmode &&   setDarks(snapshotval.darkmode)
              snapshotval.darkmode && setdark(snapshotval.darkmode)

            }
          }
        });
    } else {
      // handle the case where user is not defined or does not have an email property

    }




  }, [user && users])



  useEffect(() => {
    // Only run the effect if the user object is defined
    if (user) {
      app4.database().ref(`profiles/${user}`).on('value', snapshot => {
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



  }, [user ]);





  console.log(`ìtsb ${profileImg}`)
/*
  useEffect(() => {

    let vf = document.getElementById('#va');
    user &&
    vf.addEventListener('mouseover', () => {
      alert('h')
      document.querySelector('.profileimg').classNameNameList.add('propo')
    }) 
  }, [])


  */
  const handleLogout = async () => {
    try {
      signOut();
      setUser(null);
      sessionStorage.clear();
    } catch (error) {
      console.error(error);
    }




  };

  const handleProfileImgChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      app4.database().ref(`users/${user}`).set({ profileImg:reader.result })

    };
    reader.readAsDataURL(file);


  };


/*
  useEffect(() => {
    if (!user || !actives) return;
    const v8 = document.querySelector(".v8");
    const vh = document.querySelector('#dp');
    vh.addEventListener('mouseover', () => {

      v8.classNameNameList.add("vjj");
    });
  
      vh.addEventListener('mouseout', () => {
        v8.classNameNameList.remove("vjj");
      })
    if(actives){
    }
  }, [actives]);
  /*
  */
  const bu = props.bu;
  const setBu =  props.setBu;

function active(){
  props.setactive(true)
  setBu(false)

}

function setActive(){
  props.setactive(false)
  setBu(true)
}

 /* margin-top:20px;
background-color:#f2f6fc;
color:#69707a;*/

function isActive({ isCurrent }) {
  return isCurrent ? { className: 'active orang '} : '';
}

  return (

<>

<Layout>


<div
            className="d-flex animated-log flex-row ps-3 pl-1 pt-1   fixedit"
            id="logow"
            style={{
              position: "absolute",
              left: "50px",
              height: "45px",
              top: "0",
              width: "fit-content",
              margin: "auto",
              background:  "transparent",
            }}
          >
          <Link style={{display:"flex", flexDirection:"row", textDecoration:"none"}} to="/">
              <FaDragon
              className="dragon"
              icon=" fa-3x me-3 "
              style={{ fontSize: "1rem", color: "orange", divor: "#709085" }}
            />
            <span
              className="blabzio h1 fw-bold mb-0"
              style={{
                textShadow: " 1px 1px black",
                color: "whitesmoke",
                fontSize: "1.4rem",
              }}
            >
              <b style={{ color: "orange" }} className="letter-b">
                B
              </b>
              lab<b style={{ color: "orange", fontFamily: "sans-serif" }}>Z</b>
              io{" "}
            </span>
            
              </Link>
          
          </div>



<div class="container-xl px-4 mt-4" >
       <nav className="nav nav-borders" style={{position:"fixed",left:"0",right:"0", zIndex:"100", background:"#00000012"}}>

        <Link getProps={isActive}  to ="/Settings/ProfileSettup" className="nav-link  ms-0" >Profile </Link>
        <Link getProps={isActive} to ="/Settings/Billing"  className="nav-link" > Billing</Link>
        <Link getProps={isActive} to ="/Settings/Security"  className="nav-link"  >Security</Link>
        <Link getProps={isActive} to ="/Settings/Notifications"  className="nav-link"  >Notifications</Link>

     { /*  <Link getProps={isActive} to ="/Profile"  className="nav-link"  ><h1>Zena Home</h1></Link>*/}
    </nav> 
    <hr className="mt-0 mb-4" />
    </div>

</Layout>

</>

  
  )
}

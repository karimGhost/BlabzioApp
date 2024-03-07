import { Link } from 'gatsby';
import React, { useEffect, useState, useRef } from 'react'
import * as nav from '../styles/navbar.module.css';
//import  i18n from './i18n';
//import * as en from '../../locales/en.json';
//import Profile from '../pages/ProfilePage/ProfileSettup';
//import { useTranslation , Trans} from 'react-i18next';
import {useAuth} from  '../Accounts/useAuth';
 
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactFlagsSelect from 'react-flags-select';

 //core 
//'../../locales/fr.js'

  

import {  useLocation } from '@reach/router';
//import WeatherComponent from '../pages/WeatherComponent';
import Loadings from './Loadings';
//import { DropdownButton } from 'react-bootstrap' fas;
//import { Us } from "react-flags-select";
import { faSearch, faBars,faShoppningCart,
  faBell,faEnvelope, faShoppingBag,
   faLayerGroup ,faDiamond ,faGift ,
    faFireAlt  ,faGem , faB, faJar, 
    faFlagUnitedKingdom,
    faCheck ,          
    faFlagPoland ,     
    faFlagChina   ,    
    faFlagJapan    ,  
    faFlagGermany   ,  
    faFlagFrance,
    faFlagSpain  ,     
    faFlagRussia  ,    
    faFlagPortugal ,   
    faDownload,   
    faPoland,
    faMoon,
     faSun,
     faPerson,
     faGear,
     faSignOut,
     faMessage,
     faUser,
     faLanguage
  } from '@fortawesome/free-solid-svg-icons';

 // import { Tooltip } from 'primereact/tooltip';
 // import { PrimeIcons } from 'primereact/api';
//import { Menu } from 'primereact/menu'; navigate
import {firebaseConfig019} from '../Accounts/FirebaseAuth';

  //  import Navbared from '../pages/ProfilePage/Navbared'
//import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import { FaBuilding,FaBook, FaBookOpen, FaHotjar, FaViacoin, FaDragon} from 'react-icons/fa';
import SideDrawerNavbar from './SideDrawerNavbar'
import firebase from 'firebase/compat/app';

import im from '../images/proxy.jpeg';
import SearchBar from './SearchBar';
import { Button } from 'primereact/button';
import Dropdown from 'react-bootstrap/Dropdown' 
//import { async } from '@firebase/util';
//import Layout from './Layout';
//import Layout from './Layout';
import { Avatar } from 'primereact/avatar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from 'primereact/badge';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import 'primeicons/primeicons.css';


const firebaseConfig9099 = {

  apiKey: "AIzaSyAlILFCEiJQQJsQB2a0uidx61r9zfEVLWc",

  authDomain: "notifications-a1743.firebaseapp.com",

  databaseURL: "https://notifications-a1743-default-rtdb.firebaseio.com",

  projectId: "notifications-a1743",

  storageBucket: "notifications-a1743.appspot.com",

  messagingSenderId: "624660139679",

  appId: "1:624660139679:web:a73fd504b5ba8e7b005caa",

  measurementId: "G-BCF42GY6H1"

};


const firebaseConfig01555 = {
  // your firebase config fas

  apiKey: "AIzaSyALrSOduM9yvvHS_fR14WeCcgEhH5D8oCA",

  authDomain: "zenaglob.firebaseapp.com",

  databaseURL: "https://zenaglob-default-rtdb.firebaseio.com",

  projectId: "zenaglob",

  storageBucket: "zenaglob.appspot.com",

  messagingSenderId: "62411931925",

  appId: "1:62411931925:web:6581dc5950a7a2137fa91c",

  measurementId: "G-KDMQLLD16X"


};

export default function Navbar(props) {
  const firebaseConfig2 = firebaseConfig019;


  
  const useDropdownMenu = props.useDropdownMenu;
  const {users, user,setUser, loading,signOut , useruid } = useAuth();
  const [unfilstate, setUnfilstate] = useState(0);
  firebase.initializeApp(firebaseConfig2, 'app101');
  const app101 = firebase.app('app101');

  


  const [selectedCountry, setSelectedCountry] = useState('GB');

  const handleCountrySelect = (country) => {
 
      setSelectedCountry(country);
    
  };

  
  const location = useLocation();

  const ueryString = location.search;
  const params = {};
  
  if (ueryString) {
    ueryString
      .substring(1)
      .split('&')
      .forEach((param) => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
      });
  }
  
  const ids = params.id || null;

  const dropdownReff = useRef(false);

  const handleDropdownToggle = () => {
    
    
  };
    
  let isBlogActive;
let ups ;
if (location.pathname.startsWith('/news/Posted/Postit')) {
  isBlogActive = true;
} else if (location.pathname.startsWith('/profileComponents/Myprofile')) {
  isBlogActive = true;
} else  if (location.pathname.startsWith(`/profileComponents/Profiles`)){
  isBlogActive = true;
}else if (location.pathname.startsWith('/profileComponents/Messages')){
  isBlogActive = true;
ups = true;
}else   if (location.pathname.startsWith('/profileComponents/Notifications')) {
  isBlogActive = true;
}else if(location.pathname.startsWith('/ProfilePage/'  || "/ProfilePage/Profile/")){
isBlogActive = true
}else if (location.pathname.startsWith('/news/TheWall')) {
  isBlogActive = true

}else{
isBlogActive = false;
ups = false
}


let ismessage ;
if (location.pathname.startsWith('/profileComponents/Messages')){
ismessage = true;

}else{
  ismessage = false;
}

  /*const [actives, setactive] = useState(false); */
  
 /*
 const actives = props.actives;
 const  setactive = props.setactive;
*/

const [conversations, setConversations] = useState([]);

 const app015 = firebase.initializeApp(firebaseConfig01555, 'app01555');
const app01555 = firebase.app('app01555');

useEffect(() => {
  if (!user) return;

  app01555
    .database()
    .ref(`chats`)
    .on('value', (snapshot) => {
      if (!snapshot) return;

      const filteredChats = [];

      snapshot.forEach((childSnapshot) => {
        const chatValues = childSnapshot.val();
        const chatId = childSnapshot.key;
        const split = chatId.split('-');
        const chat = Object.values(chatValues);

        const otherUser = split.includes(user)

        if (otherUser) {
          filteredChats.push(chat);
        }
      });

      setConversations(filteredChats);

      console.log("this are the filtered chats", filteredChats)
    });
}, [user]);




const [profileImg, setProfileImg] = useState(im);






useEffect(() => {
  // Only run the effect if the user object is defined
  if (user) {
    app101.database().ref(`profile/${user}/profileImg`).on('value', snapshot => {
      console.log(JSON.stringify(snapshot.val()))
    
      if (!snapshot.val()) {
        setProfileImg(im)

        console.log("Snapshot value is null or undefined");
        return;
      }
   

      // check if snapshot.val() is an object
      if(typeof snapshot.val() === 'object'){
        const val = snapshot.val(); 
        
props.setImg(val.profileImg)

       setProfileImg(val.profileImg)
      } else {
setProfileImg(snapshot.val())
props.setImg(snapshot.val())

      }
    });
  }



}, [user]);







function signout(){
  signOut()
  if( typeof window !== 'undefined'){
     localStorage.removeItem('userID')
  }

  props.setReady(true)

}

const setLight = props.setLight;
const light = props.light;
useEffect(() => {
  AOS.init();
}, [])


const [setup, setSetup] = useState(1)
  const [language, setLanguage] = useState('');
  const [favorites, setFavorites] = useState([]);




  const [scroll , setScroll] = useState(0);
useEffect(() => {  
 window.addEventListener('scroll', () => {
   setScroll(window.scrollY)
  });



},[])


const [val, setVal] = useState(false);

function handleSetActive(isActive) {
  if (isActive) {
    setVal(true);
  } else {
    setVal(false);
  }
}

const [hiddenav, setHidenav] = useState(false);

function handleSethiddenav(isActive) {
  if (isActive) {
    setHidenav(true);
  } else {
    setHidenav(false);
  }
}





const Fixed ={
  position:  scroll >= 4 &&  "fixed",
  left: scroll >= 4 &&  "0",
  right:scroll >= 4 &&  "0",
  zIndex: scroll >= 5 && "9",
marginTop: scroll >= 7 ? "50px" :  "70px",
fontSize:  scroll >= 5 && "1em",
height: scroll >= 5 &&  "40px",
top: scroll >= 4 && "20px"
}


const setfixed ={
  position:  "fixed",
  left:   "0",
  right: "0",
  zIndex:  "9",
  background:  "black", 
marginTop:   "70px",
fontSize:  "1em",
height:   "40px",
top:  "20px"
}


const Fixes ={
  position:  scroll >= 280 &&  "fixed",
  left: scroll >= 150 &&  "0",
  right:scroll >= 150 &&  "0",
  zIndex: scroll >= 150 && "9",
marginTop: scroll >= 280 ? "70px" :  "70px",
fontSize:  scroll >= 150 && "1em",
height: scroll >= 150 &&  "40px",
top: scroll >= 150 && "20px"

}


function isActives({ isCurrent }) {
  return isCurrent ? { className: nav.isActived } : null;
}


function handleSet(isActive) {
  return isActive ? { className: nav.isActive } : null;
}


  function isActive({ isCurrent }) {
    return isCurrent ? { className: nav.isActive } : null;
  }

  const MenuItem = ({ children, href }) => (
    <li>
      <a
        href={href}
        className="px-3 py-2 block hover:bg-gray-200"
      >
        {children}
      </a>
    </li>
  );



  const drawer ={
    height:  "100%" ,
 transition:  "0.40s linear"  ,
overflow:  "hidden", 
position: "fixe"

}


const userd = [...Object.keys(conversations)].sort((a, b) => {
  const aTime = conversations[a].slice().reverse()[0].timestamp;
  const bTime = conversations[b].slice().reverse()[0].timestamp;
  return bTime - aTime;
});
const messoLength = userd && userd.map((userId) => (
  conversations[userId]?.slice()
    .reverse()?.[0]?.receiver === user.uid &&
  conversations[userId]?.slice().filter(a => a.receiver === user)
    .filter(a => !a.read)
    .length || 0
));


const totalLength = messoLength.reduce((total, length) => total + (length ? length : 0), 0);      



function isActive({ isCurrent }) {
  return isCurrent ? { className: nav.isActive } : null;
}

const bu = props.bu;
const setBu =  props.setBu;
 const off = props.off;
const sty = {
  zIndex: bu  ? "17" : "2",

  position:  props.isOpen ? "absolute" : "fixed",
}

  const [isOpens, setIsOpens] = useState(false);

  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpens(!isOpens);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpens(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


const tsi = props.isOpen;
if(tsi){
  console.log("ope")
}
const [isOpe, setIsOpe] = useState(false);
/*
function setIsOpen(){
  props.setIsOpen(true)


}

*/

const toggleSearch = (e) => {
  setIsOpe(true);
  e.preventDefault();
  props.setBu(false)
}

const [isToggled, setToggled] = useState();
const setIsOpen = props.setIsOpen;

  useEffect(() => {
    window.onload = function() {
      var element = document.querySelector('Links');
      element.className.List.add('scrollbar-visible');
    }
  }, [])
const Zena = "Zena";

const [actives, setactive] = useState(false);

const [showd,setshowd] = useState(false)
 const [Me, setMe] = useState(false)
 const isOpen = props.isOpen;
 const [docker, setDocker] = useState(false);

 const [defaults, setDefaults] = useState({
  pre: "English",
  sets: "",
  asks: "a",
 })

 const [flags, setFlags] = useState({
  eg: "",
  its: ""
 });





 async function fakeit(event){
  const val = event.target.value;

  setDefaults(pr => {
    return {
      ...pr,
      asks: val,
      sets: pr.pre,
    }
  })

  if (defaults.pre === 'English' || defaults.asks === 'English' || defaults.sets === 'English') {    setFlags(pre => {
      return{
        ...pre,
        eg: "united-kingdom"
      }
    })
  }

  if (val === 'polski'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "poland"
      }
    })
  } else if (val === '中文'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "china"
      }
    })
  } else if (val === '日本語'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "japan"
      }
    })
  } else if (val === 'Deutsch'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "germany"
      }
    })
  } else if (val === 'Français'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "france"
      }
    })
  } else if (val === 'Español'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "spain"
      }
    })
  } else if (val === 'Русский'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "russia"
      }
    })
  } else if (val === 'Arabic'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "saudi-arabia"
      }
    })
  } else if (val === 'Português'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "portugal"
      }
    })
  } else if (val === 'swahili'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "kenya"
      }
    })
  } else if (val === 'Amharic'){
    setFlags(pre => {
      return{
        ...pre,
        its:  "ethiopia"
      }
    })
  }


   

}

useEffect(() =>{
  fake();
}, [flags])


  async function fake() {

    if (users && users.email) {
      try {
        app101
          .database()
          .ref('profile')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userId = Object.keys(snapshot.val());
              const snapshotval = snapshot.val()[userId];
              if (snapshotval) {
                const userRef = app101.database().ref(`profile/${userId}`);
                userRef.update({
          // pre:   defaults.pre,
          sets: defaults.sets,
            asks: defaults.asks,
             eg:   flags.eg,
              its:  flags.its,
               
  
                });
              
              }
            }
          })
          .catch((error) => {
            console.log(error);
           
          });
      } catch (error) {
        console.log(error);
      
      }
    }
  };
  
  
  









   const [thelight, setTheLight] = useState(false);





function Toggle(){
  
 
 // props.setdark(pre => !pre) props.dark username

}

const [loads, setLoads] = useState(false)




useEffect(() => {

  localStorage.setItem("thelight", thelight);

},[thelight])

async function Toggled() {
  if(thelight){
setTheLight(false);
setToggled(thelight);
setLight(thelight)

  }else{
  setTheLight(true);
  setToggled(thelight);
  setLight(thelight);

  }
  
  setLoads(true)
    try {

      const snapshot = await app101.database().ref('profile')
      .orderByChild('email')
      .equalTo(user.email)
        .once("value");
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val());
        const snapshotval = snapshot.val()[userId];
    

        const userRef = app101.database().ref(`profile/${userId}`);
              
        userRef.update({
          darkmode: thelight 
        });
        setLoads(false)
     
      
      } else {
       
      }
    } catch (error) {
      console.log(error);
   
    } 
  
  }





  const [usernames, setUsernames] = useState({
    useris: null,
    firstname: null,
    lastname: null,
    Location: null,
    DOB: null,
   
  });


  

useEffect(() => {
  if (users && users.email) {
    app101
      .database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(users.email)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userId = Object.keys(snapshot.val());
          const snapshotval = snapshot.val()[userId];
        
          if (snapshotval && snapshotval.username) {

          props.setUser &&  props.setUser(snapshotval.username) ;
props.setValue && props.setValue((pre) =>  ({...pre,  userName : snapshotval.username , userid:useruid, profilePhoto: snapshotval.profileImg || im } ))



            
          const usered = snapshotval.username;


            setUsernames((prevState) => ({
              ...prevState,
              useris: snapshotval.username,
              firstname: snapshotval.firstname,
              lastname: snapshotval.lastname,
              Location: snapshotval.Location,
              DOB: snapshotval.dob,
           
            }));
          }
        }
      });

  
    

  } else {
    // handle the case where user is not defined or does not have an email property
 
      props.setUser &&  props.setUser("Anonymous")
  
  }
}, [user && user]);








useEffect(() => {
  let unfilstateCount = 0;


  if (usernames.useris === null || usernames.useris.trim() === '') {
    unfilstateCount++;
  }
  if (usernames.firstname === null || usernames.firstname.trim() === '') {
    unfilstateCount++;
  }
  if (usernames.lastname === null || usernames.lastname.trim() === '') {
    unfilstateCount++;
  }
  if (usernames.Location === null || usernames.Location.trim() === '') {
    unfilstateCount++;
  }
  if (usernames.DOB === null || usernames.DOB.trim() === '') {
    unfilstateCount++;
  }

  setUnfilstate(unfilstateCount);
}, [user  ]);







useEffect(() => {  
  if (users && users.email) {
    const databaseRef = app101
    app101.database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(user.email)
      .once('value', (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const snapshotval = snapshot.val()[userId];
          if (snapshotval && snapshotval.username) {
          


setDefaults(pr => {
  return {
    ...pr,
    pre: snapshotval.pre ? snapshotval.pre : pr.pre,
    asks: snapshotval.asks ? snapshotval.asks : pr.asks,
    sets: snapshotval.sets ?  snapshotval.sets : pr.sets,
   
  }
});




setFlags(pre => {
  return{
...pre,
eg: snapshotval.eg ? snapshotval.eg : pre.eg,
its:  snapshotval.its ? snapshotval.its : pre.its
  }
  
})
              }
        } 
      });

  } else {

  }

}, [user]);




const apps9 = firebase.initializeApp(firebaseConfig9099, 'app099');
const app099 = firebase.app('app099') ;

const [notifications, setNotifications] = useState([]);




useEffect(() => { 
  // Get the notifications for the current user ID
  if(!user){return;}
  const notificationsRef = app099.database().ref(`users/${user}/posts`);

  notificationsRef.on('value', (snapshot) => {

    const notifications = [];
    snapshot.forEach((notifSnapshot) => {

const posts = notifSnapshot.val();
    
notifications.push(posts.cardid);
      

    });

    setNotifications(notifications);
    
  });

  return () => {
    notificationsRef.off('value');
  };
}, [user,app099]);


const counts = {};

notifications.forEach((notificationArra) => {
  if (Array.isArray(notificationArra)) {
    notificationArra.forEach((notification) => {
      const message = notification.message;
      counts[message] = (counts[message] || 0) + 1;
    });
  }
});




const countsArray = Object.entries(counts);



const [HideSearch,setHideSearch ] = useState(true)



useEffect(() => {
  if (loading ) {
    setTimeout(() => {
      if (loading  &&   !window.location.href === "/") {
        window.location.href = "/" 
      }
    }, 3000);
  }
}, [loading]);

const ref = useRef(null)

useEffect(() => {  
  let app  = app101;
  if (users && users.email) {
    const databaseRef = app101
      .database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(users.email)
      .on('value', (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const snapshotval = snapshot.val()[userId];
          if (snapshotval ) {
            setTheLight(snapshotval.darkmode)
            setToggled(snapshotval.darkmode)
         
 setLight && setLight(snapshotval.darkmode)
 props.setDark && props.setDark(snapshotval.darkmode)
 props.setdark && props.setdark(snapshotval.darkmode)
          }



        } 
      });

    ref.current = databaseRef;
  
if(user){
    
  }
  } else {
    setTheLight(false)
  }
}, [user]);






if(!user){
  <Loadings/>
}

  return (

<header style={{backgroundColor: "#141515"}} id="header">
          <div className="container">

 {/* Jumbotron */}
 <div className='bg-dark mb-6 px-4' style={{paddingLeft: "20px", position: "fixed", zIndex: "10",left:  "0",right: "0", top:"0", height:"70px" }}> 
      <div  className="containe row">



        
         {/* Left elements */}
          <div className='logoww' style={{marginTop: "-20px", width: "fitContent"}}  >
           
       
        </div>
{/* 
        <label  className="toggle-container">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={Toggled} 
       
        className="toggle-input"
      />
      <span className="toggle-slider"></span>
      <FontAwesomeIcon style={{color: isToggled ? "grey" : "rgb(252, 229, 112)"}}
        icon={isToggled ? faMoon : faSun}
        className={`toggle-icon ${loads && "bg-danger"}`} 
      />

    </label>*/}
          <div  className='Langue mt2 mt-0 bg-none border-none' style={{cursor:"pointer", color:"silver", background:"none", border:"none", padding:"0"}}
      tooltip="Language"

       tooltipOptions={{ className: 'tooltips',position: 'right'}}>  
          
          <Dropdown className="upuup bg-none text-shadow-none bgsmal ">
      
      <div
        style={{
          height: "30px",
          marginTop: "40px",
          marginLeft: "10px",
          backgroundColor: "black",
          textShadow:"none",
          color:"black",
          boxShadow:'none'
        }}
        className="  dropdow show lagu mt-3"
      >



        <ReactFlagsSelect
     
       
          
             defaultCountry="GB"
                 showSelectedLabel={false}
          selected={selectedCountry}
          onSelect={handleCountrySelect}
          className="hidde bord bg-none text-shadow-none text-light"
          countries={[ "GB", "VN", "FR",'SA',"TZ","IT",'ES','CN','DE','ET']}
          customLabels={{GB:"English", SA:"العربية", VN:'dân_tộc_Việt_nam',
          TZ:"Swahili",IT:"Italian", DE: 'dɔʏtʃ', FR: 'français',ES:"español", CN:"汉语", ET:"አማርኛ" }}
          searchable={true}
          alignOptionsToRight={true}
        />


      </div>
    </Dropdown>

    <Dropdown.Menu className={light && "backframe"}>
      <div
        className="w-90 m-auto"
        style={{
          listStyle: "none",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          justifyItems: "space-evenly",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Dropdown.Item
          className={`ww ${light && "backframe"}`}
          style={{ background: "black", display: "flex", flexDirection: "row", color : " black" }}
        >
          <ReactFlagsSelect
                       defaultCountry="GB"

            selected={selectedCountry}
            onSelect={handleCountrySelect}
            className="center m-auto text-shadow-none"
          
            countries={[ "GB", "VN", "FR",'SA',"TZ","IT",'ES','CN','DE','ET']}
            customLabels={{  GB:"English",SA:"العربية", VN:'dân_tộc_Việt_nam',
            TZ:"Swahili",IT:"Italian", DE: 'dɔʏtʃ', FR: 'français',ES:"español", CN:"汉语", ET:"አማርኛ" }}
            
            searchable={true}
            alignOptionsToRight={true}
          />
          <span
            style={{ background: "black", textShadow:"none" }}
            className={`dropdown-item ${light && "color-dark"}`}
          >
            <input
              className={light && "color-dark"}
              style={{ border: "none", background: "transparent" }}
            
              type="button"
              text-success
              onClick={fakeit}
              value={selectedCountry || defaults.asks}
            />
            <FontAwesomeIcon icon={faCheck} text-success className="ms-2" />
          </span>
        </Dropdown.Item>
        {/* Other dropdown items */}
      </div>
    </Dropdown.Menu>
  </div>

      
         {/* Left elements */}
{ props.hideit ? '' :  <SideDrawerNavbar  HideSearch = {HideSearch} setHideSearch={setHideSearch}  light={light} setLight={setLight}/> }

         {/* Center elements */}
       
       
           
      {/* <SearchBar setLength  className="searchvar"   actives={actives} setBu={props.setBu} />*/}   

         {/* Center elements         <div style={{position: "fixed",zIndex:"5", top:"0",left: "0",right: "0", height: "100px"}}  className=" p-3 p-fixed d-flex row text-cente bg-brown border-bottom ">
 */}
  
         {/* Right elements */}
          <div  style={{ marginTop:"px", position: "absolute", right: "0", height: "fit-content", background:"transparent"}}  className="itsrig">
            <div style={{marginTop:"-10px", float: 'right',  justifyContent: "flex-end",paddingLeft:"",alignItems: "cente",alignContent: "right",justifyItems: "right",  marginBottom: "400px", width: "fit-content" }} className="bg-none d-flex  m-auto justify-right  rights lazim mTop">
             {/* Cart */}
          {/*   <button className="text-reset me-3" >
                <span><FontAwesomeIcon  icon={faShoppingCart}/></span>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
  </a> */} 

     
  {!ups &&
  
  <SearchBar   HideSearch = {HideSearch} setHideSearch={setHideSearch}  hideit ={ props.hideit} setHideit ={props.setHideit}  light={light} />

  }

    
             {/* Notification */}
            
             
{/* import ReactHtmlParser from 'html-react-parser'  "/";

 <Link to ="/profileComponents/Notifications" style={{width: "fit-content",  height: "fit-content", padding:"0", margin: "0", borderRadius:"60%", borderBottomLeftRadius:"50px", borderBottomRightRadius:"50px", borderTopLeftRadius:"50px", borderTopRRadius:"50px"}} className="mt-4" > <i className="pi pi-bell mt-1 "  style={{ backgroundColor:"white", color: "white", display: "flex", justifyContent:"center", alignItems:"center", width: "22px", height: "26px", borderRadius: "50%",'fontSize': '2em'}} ></i>  </Link>         
          <Button id="bbell" onClick={ () => navigate('/profileComponents/Notifications')} outline="none" className={`mt-4 navit ml-3 bellico  `}
*/}  
<Button id= {`${countsArray.length !== 0 ? "bbell" : "bellicoempty"}`} onClick={ () => navigate('/profileComponents/Notifications')} outline="none" className='mt-4 navit ml-3 bellico '
           style={{  border: "none", borderRadius: "50%" , height: "fit-content",  margin:"", padding: "",  background:  "transparent" ,borderColor:"transparent"}}
            icon="pi pi-bell"   aria-label= "Notification"  severity="secondary" tooltip="Notifications" tooltipOptions={{ className: 'tooltips',position: 'bottom'}}>
     {countsArray.length === 0 ?  ""  :   <Badge className='baga' style={{color:"black", background:'white'}} value={countsArray.length }></Badge>}  
</Button>




             {/* Languages */}
             <div>
      
             <Dropdown className="upup bg-none text-shadow-none bgsmall ">
      
      <div
        style={{
          height: "30px",
          marginTop: "40px",
          marginLeft: "10px",
          backgroundColor: "black",
          textShadow:"none",
          color:"black",
          boxShadow:'none'
        }}
        className="dropdow show lagu mt-3"
      >



        <ReactFlagsSelect
           defaultCountry="GB"
          selected={selectedCountry}
          onSelect={handleCountrySelect}
          className="hidde bord bg-none text-shadow-none text-light"
          countries={[ "GB", "VN", "FR",'SA',"TZ","IT",'ES','CN','DE','ET']}
          customLabels={{GB:"English", SA:"العربية", VN:'Việt_nam',
          TZ:"Swahili",IT:"Italian", DE: 'dɔʏtʃ', FR: 'français',ES:"español", CN:"汉语", ET:"አማርኛ" }}
          searchable={true}
          alignOptionsToRight={true}
        />


      </div>
    </Dropdown>

    <Dropdown.Menu className={light && "backframe"}>
      <div
        className="w-90 m-auto"
        style={{
          listStyle: "none",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          justifyItems: "space-evenly",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Dropdown.Item
          className={`ww ${light && "backframe"}`}
          style={{ background: "black", display: "flex", flexDirection: "row", color : " black" }}
        >
          <ReactFlagsSelect
            selected={selectedCountry}
            onSelect={handleCountrySelect}
            className="center m-auto text-shadow-none"
           defaultCountry="GB"
           countries={[ "GB", "VN", "FR",'SA',"TZ","IT",'ES','CN','DE','ET']}
          customLabels={{GB:"English", SA:"العربية", VN:'dân_tộc_Việt_nam',
          TZ:"Swahili",IT:"Italian", DE: 'dɔʏtʃ', FR: 'français',ES:"español", CN:"汉语", ET:"አማርኛ" }}
            searchable={true}
            alignOptionsToRight={true}
          />
          <span
            style={{ background: "black", textShadow:"none" }}
            className={`dropdown-item ${light && "color-dark"}`}
          >
            <input
              className={light && "color-dark"}
              style={{ border: "none", background: "transparent" }}
            
              type="button"
              text-success
              onClick={fakeit}
              value={selectedCountry || defaults.asks}
            />
            <FontAwesomeIcon icon={faCheck} text-success className="ms-2" />
          </span>
        </Dropdown.Item>
        {/* Other dropdown items */}
      </div>
    </Dropdown.Menu>
    </div>

             {/* User */}
              <div className="dropdown show">
               
            {/*<img style={{zIndex: "14"}} onClick={active} id="profbt" src={profileImg} alt={user.displayName} className="profileimg" />
 */}
               

                <Dropdown style={{marginBottom: "-50px", border: "none",  height: "fit-content"}} className='profle mt-10 bg-l '>
                
           <Dropdown.Toggle style={{border: "none"}}    className=" rounded-circle shadow-none bg-transparent b-none text-reset dropdown-toggle d-flex align-items-center hidden-arrow bord"    id="navbarDropdownMenuLink"  role="button" data-toggle="dropdown" aria-expanded="false" >
      
     <Avatar style={{width: "3rem",height:"3.1rem"}} className={`${profileImg ? "bg" : "flex align-items-center justify-content-center mr-2" } " p-overlay-badge"` } image={profileImg ? profileImg : "https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"}  size="large" shape="circle" alt="profile"  >
                           {totalLength === 0 && unfilstate === 0 || unfilstate === 0 && totalLength === 0 ? (
  <span></span>
) : (
  <Badge
    value={
      totalLength > 0 && unfilstate > 0
        ? totalLength === 0
          ? unfilstate
          : totalLength + unfilstate
        : totalLength
    }
    className="p-1 bg-dark p-0 m-0 badgedP"
    severity="danger"
  />
)}
                          </Avatar>
</Dropdown.Toggle> 



{!actives && 
        <Dropdown.Menu  style={{marginTop:"-3px"}}  onClick={ () => setactive(true)} className={` w-fi widt  ${light && "backframe" } `}>
          <Link getProps={isActives} to ="/Profile/P" className="nav-link  ms-0" >  
         
          <Button     getProps={({ isActives }) => ({  onClick: () =>  handleSet(isActives) }) }  style={{background: light ?  "rgb(20,21,21)" : "white" }} type="button" label="MyProfile" icon="pi pi-user" className={`  p-1 border-none text-dark  ${light ? "btn-dark8" :  "btn-change8 "}`} severity='none' badgeClassName="p-badge-danger" />
           </Link>

          <Link  getProps={isActives} to ="/Profile/Messages" className="nav-link  ms-0" >   
          <Button  getProps={({ isActives }) => ({  onClick: () =>  handleSet(isActives) }) }  style={{background: light ?  "rgb(20,21,21)" : "white" }} type="button" label="Messages" icon="pi pi-inbox"
           className={`  p-1 border-none text-dark  ${light ? "btn-dark8" :  "btn-change8 "}`} severity='none'  badge={totalLength} badgeClassName="p-badge-danger" />
          </Link>


          <Link getProps={isActives}    to ="/Profile/MySaved" className="nav-link  ms-0" >  
        <Button  getProps={isActives} style={{background: light ?  "rgb(20,21,21)" : "white" }}  type="button" label="MySaved" icon="pi pi-folder" className={`  p-1 border-none text-dark  ${light ? "btn-dark8" :  "btn-change8 "}`} severity='none'  />
          </Link> 

          <Link getProps={isActives} to ="/Profile/ProfileSettup" className="nav-link  ms-0" >    
          <Button  getProps={isActives} style={{background: light ?  "rgb(20,21,21)" : "white" }} type="button" label="Settings" icon="pi  pi-cog" className={` p-1   border-none text-dark  ${light ? "btn-dark8" :  "btn-change8 "}`} severity='none' badge={unfilstate} badgeClassName="p-badge-danger" />

         </Link> 
{/*
        <Link getProps={isActives} className="nav-link  ms-0" >  
        <Button  getProps={isActives} style={{background: light ?  "rgb(20,21,21)" : "white" }}  onClick={() => signout()}type="button" label="Logout" icon="pi pi-sign-out" className={`  p-1 border-none text-dark  ${light ? "btn-dark8" :  "btn-change8 "}`} severity='none'  />
          </Link>  */}
        </Dropdown.Menu> 
}
      </Dropdown>
                
                
            
              
              </div>
            </div>
          </div>
         {/* Right elements */}
        </div>
      </div> 
  


          </div>

        

        </header>

    
  );
}
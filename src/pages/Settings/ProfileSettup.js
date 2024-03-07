import React, { useEffect, useState, useRef } from 'react';
import * as pro from '../../styles/profile.module.css';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import im from '../../images/proxy.jpeg';
//import { initializeApp } from "firebase/app";
//import Language from '../Language';

//import { useTranslation , Trans} from 'react-i18next';
import { Link } from 'gatsby';
import { event } from 'jquery';
import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { FileUpload} from 'primereact/fileupload';
import {ProgressSpinner} from 'primereact/progressspinner';
import Navbar from './Navbared';
import Layout from '../../Navigation/Layout';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
import { Button } from 'react-bootstrap';

const firebaseConfig222 ={
  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"

}
export default function Profiles(props) {
  const firebaseConfig2 =  firebaseConfig019;

 const app3 = firebase.initializeApp(firebaseConfig2, 'app0133');
 const app334 = firebase.initializeApp(firebaseConfig222, 'app0144');

const toast = useRef(null)

  const app4 = firebase.app('app0133');

 const  app33 = firebase.app('app0144');

  const { user,setUser,users,  loading,signOut } = useAuth();



const [email, setEmail] = useState('')
const [userId, setUserId] = useState('')
const [Editable, setEditable] = useState(false)

const [usernames, setUsernames] = useState({
  useris : null,
  firstname: null,
  lastname: null,
  DOB: null,
  Location: null

});


const [vals, setVals] = useState([''])
const [Db, setDb] = useState()
const [fname, setFname] = useState()
const [lname, setLname] = useState()
const [locate, setLocate] = useState()
const va = vals.length;


const  [clear, setClear] = useState(false)
const [Darks, setDarks] = useState(false)


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
            setUsernames(pre => {
              return{
                ...pre,
                useris: snapshotval.username,
                firstname: snapshotval.firstname,
                lastname: snapshotval.lastname,
                Location : snapshotval.Location,
                DOB: snapshotval.dob

              }


            });

          }
        }
      });
  } else {
    // handle the case where user is not defined or does not have an email property
    setUsernames('anoonymous')
  }




}, [users && users])


console.log("check this",users)

const [unfilstate,setUnfilstate] = useState(0)

useEffect(() => {
  let unfilstateCount = 0;

  const usertimed = usernames.useris && usernames.useris.trim();
  const usertimedfname = usernames.firstname && usernames.firstname.trim();
  const usertimedlname = usernames.lastname && usernames.lastname.trim();
  const usertimedlocation = usernames.Location && usernames.Location.trim();
  const usertimedDob = usernames.DOB && usernames.DOB.trim();

  if (usernames.useris === null || usertimed === '') {
    unfilstateCount++;
  }
  if (usernames.firstname === null || usertimedfname === '') {
    unfilstateCount++;
  }
  if (usernames.lastname === null || usertimedlname === '') {
    unfilstateCount++;
  }
  if (usernames.Location === null || usertimedlocation === '') {
    unfilstateCount++;
  }
  if (usernames.DOB === null || usertimedDob === '') {
    unfilstateCount++;
  }

  setUnfilstate(unfilstateCount);
}, [usernames]); // Make sure to use 'usernames' as the dependency, not 'user'

async function dataset(){
  if (!user) {
    // Handle the case where 'user' is not defined or not authenticated
    console.error('User is not authenticated.');
    return;
  }
  const normalizedUsername = usernames.useris;
  const normalizedFirstname =usernames.firstname;
  const normalizedLastname = usernames.lastname;
  const normalizedLocation = usernames.Location;
  const normalizedDOB = usernames.DOB;

  try {
   // Check if a user with that username already exists in the database
   const snapshot1 = await app4.database().ref('profile').orderByChild('username').equalTo(normalizedUsername).once('value');

   if (snapshot1.exists()) {
     // A user with that username already exists
     // Prompt the user to choose a different username
     toast.current.show({severity: 'error', summary: 'Error', detail: 'username already exists. Please choose another one.', life: 3000 })


  const snapshot2 = await app33.database().ref('comments/cards').orderByChild('user').equalTo(normalizedUsername).once('value');
if(snapshot2.exists()){
  toast.current.show({severity: 'error', summary: 'Error', detail: 'username already exists. Please choose another one.', life: 3000 })

}


   }else{

    const userRef =   app4.database().ref('profile/' + user.uid)

   userRef.update({
         username: normalizedUsername  ,
        firstname : normalizedFirstname  ,
       lastname :  normalizedLastname,
       Location : normalizedLocation,
      dob :    normalizedDOB ,
      email: user.email 

       });

     toast.current.show({severity: 'success', summary: 'Success', detail: 'you succesfully updated your details', life: 3000 })

   }

  } catch (error) {
     console.log(error);
     toast.current.show({severity: 'error', summary: 'Error', detail: 'Please Fill all the inputs', life: 5000 })

  }

 }



/*
if(user && user.email){
  app4.database().ref('prof').orderByChild('email').equalTo( user && user.email).once('value')
  .then((snapshot) => {
    if (snapshot.exists()) {
      const snapshotval = snapshot.val();
      if(snapshotval && snapshotval.username){
        setUsernames(snapshotval.username);
    }
    }
    })
  }
*/

 /*
  useEffect(()  => {
  
 const uname= document.querySelector('.uname').value ;
    const lname = document.querySelector('.lname').value;
    const fname   = document.querySelector('.fname').value;
    const DOB = document.querySelector('.DOB').value;
    const Location = document.querySelector('.Location').value;
  
    if (uname && uname === '' ) {
     setVals(pre =>   [...pre, "i" ] )  
    }  
    if (Db === '') {
      setVals(pre =>   [...pre, "i"] )  
    }  
  
     if (fname === '') {
      setVals(pre =>   [...pre, "i"] )  
    }  
     if (lname === '') {
      setVals(pre =>   [...pre, "i"] )  
    }  
  
     if (locate === '') {
      setVals(pre =>   [...pre, "i"] )  
    }  
     
  }, [])
  
   */

  /*const [actives, setactive] = useState(false); */

 /*
 const actives = props.actives;
 const  setactive = props.setactive;
*/


  const auth = app4.auth();
  const database = app4.database();

  const [language, setLanguage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [profileImg, setProfileImg] = useState(im);






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


  useEffect(() => {
    // Only run the effect if the user object is defined
    if (user) {
      app4.database().ref(`profile/${user}/profileImg`).on('value', snapshot => {
        console.log(JSON.stringify(snapshot.val()))
        if (!snapshot.val()) {

          console.log(" value is null or undefined");
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



  }, [user]);





  console.log(`ìtsb ${profileImg}`)

  useEffect(() => {

    let vf = document.getElementById('#va');
    user &&
    vf && vf.addEventListener('mouseover', () => {
      alert('h')
      document.querySelector('.profileimg').classNameNameList.add('propo')
    }) 
  }, [])


  const handleLogout = async () => {
    try {
      signOut();
      setUser(null);
      sessionStorage.clear();
    } catch (error) {
      console.error(error);
    }




  };



const handleProfileImgChange = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob());
  reader.onloadend =() => {
    setProfileImg(reader.result);
    app4.database().ref('profile/' + user.uid).update({ profileImg:reader.result })

    toast.current.show({severity: 'info', summary: 'Info', detail: 'Dp updated', life: 3000 })

  };
  reader.readAsDataURL(blob);

}


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
  const bu = props.bu;
  const setBu =  props.setBu;
*/
const myUploader = useRef(null)
function active(){
  props.setactive(true)
  props.setBu(false)

}

function setActive(){
  props.setactive(false)
  props.setBu(true)
}

 /* margin-top:20px;
background-color:#f2f6fc;
color:#69707a;*/

const actives = props.actives;
const setBu = props.setBu;
const bu = props.bu 
function isActive({ isCurrent }) {
  return isCurrent ? { className: 'active'} : null;
}



/*     {user && !actives && <Profile  actives={actives} setactive={setactive} bu={props.bu} setBu={props.setBu} setIsOpen={props.setIsOpen} language={props.language} handleLanguageChange={props.handleLanguageChange} />}
                               {user && !actives && <Profile  actives={actives} setactive={setactive} bu={props.bu} setBu={props.setBu} setIsOpen={props.setIsOpen} language={props.language} handleLanguageChange={props.handleLanguageChange} />}
   */
   const  rejectFunc = () => {

toast.current.show({severity: 'warn', summary: 'Rejected', detail: 'you canceled', life: 3000 })

}

const confirm = () => {
  confirmDialog({

    message: 'Do you wish to proceed ?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => dataset(),
    reject: () => rejectFunc()

  });
}


/*
{
if(user){
return(
    <div style={{alignItems:"center", justifyItems: "center", paddingTop: "25%"}} className='card flex justify-content-center align-content-center '>
         <ProgressSpinner className='text-dark'> <h1>zena </h1> </ProgressSpinner> </div>
{/* style={{width: '50px', height: '50px'}}  strokeWidth="8" fill="var(--surface-ground)" animationDuration= ".5s" */ 
   /*
)
}
l
*/

  return (
<>



<div  style={{height:  "100%", overflowY: "scroll"}} className={`{ ${Darks && 'darken'} 'Bgg' }`}>
<div className="container-xl px-4 mt-4"></div>


<Toast ref = {toast} />

  
{!user && !actives &&
  <img src={profileImg} className="round dr mt-2" style={{borderRadius: "50%"}}  height="50" 
  alt="profile"  />
}


<Navbar Darks ={Darks} setDarks={setDarks}/>

  {/* Account page navigation paopl*/}

  <div className="row" style={{zIndex:"8", background: Darks && "#141515"}}>


<div className="col-xl-4" style={{background: Darks && "#141515"}}>
  {/* Profile picture card*/}
    <div className="card mb-4 mb-xl-0"  style={{background: Darks && "#141515"}}>
        <div className="card-header " style={{color:"orange"}}>Profile Picture</div>
        <div className="card-body text-center">
          {/* Profile picture image*/}
            <img style={{width: "30%", height: '50%', borderRadius: "30%"}} className="img-account-profil  mb-2" src={profileImg} alt="" />
          {/* Profile picture help block*/}
            <div className="small font-italic text-muted mb-4 gree" style={{color:"green"}}>JPG or PNG no larger than 5 MB</div>
          {/* Profile picture upload button*/}
          <div>
            <FileUpload maxFileSize={1000000}  ref={myUploader} chooseLabel='change Dp' uploadLabel='upload' cancelLabel='Cancel' mode="basic" name="upload" url="/api/upload" accept='image/*' customUpload uploadHandler={handleProfileImgChange}  />
      {/*<button>Remove Dp </button> */}
          </div>
    </div>
    </div>
</div>
<div className="col-xl-8" style={{background: Darks && "#141515"}}>
  {/* Account details card */}
    <div className="card mb-4" style={{background: Darks && "#141515"}}>
        <div className="card-header papol" >Account Details  fill <span className='text-danger bold'>{unfilstate}</span></div>
        <div className="card-body" style={{background: Darks && "#141515"}}>
            <form >
              {/* Form Group (username)*/}
                <div className="mb-3 row "  style={{background: Darks && "#141515"}}>
                <div className="col-md-6">
                    <label className={`small mb-1   ${usernames.useris ==  null   && 'controlform1 text-danger' }`} for="inputUsername">Username </label>
                    <input className={` uname form-control ${usernames.useris == null    && 'controlform text-danger' }`} id="inputUsername" type="text" placeholder="Enter your username" value={usernames.useris ?   usernames.useris : users?.displayName  ? users.displayName : ""} onChange={ (event) => setUsernames(pre => {  return{  ...pre, useris: event.target.value} }) } />
             </div>
             <div className="col-md-6">
                    <label className={`small mb-1   ${usernames.email   && 'controlform1 text-danger'}`}  for="inputEmailAddress">Email address</label>
                    <input className={` form-control ${usernames.email  && 'controlform text-danger'}`} id="inputEmailAddress" type="email" placeholder="Enter your email address" value={users && users.email} readOnly/>
              </div>
                </div>

              {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name)*/}
                    <div className="col-md-6">
                        <label className={`small mb-1   ${usernames.firstname == null  && 'controlform1 text-danger'}`} for="inputFirstName">First name </label>
                        <input  className={`fname form-control ${usernames.firstname  == null   && 'controlfor text-danger' }`} id="inputFirstName" type="text" placeholder="Enter your first name" value={usernames.firstname} onChange={(event) => setUsernames(pre => {  return{ ...pre, firstname : event.target.value} }) }/>
                    </div>
                  {/* Form Group (last name)*/}
                    <div className="col-md-6">
                        <label className={`small mb-1   ${usernames.lastname ==  null  && 'controlform1 text-danger'}`} for="inputLastName"> Last name </label>
                        <input className={`lname form-control ${usernames.lastname ==  null  && 'controlform text-danger'}`} id="inputLastName" type="text" placeholder="Enter your last name" value={usernames.lastname} onChange={ (event) => setUsernames(pre => {  return{ ...pre, lastname : event.target.value} }) }/>
                    </div>
                </div>
              {/* Form Row        */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (organization name)*/}

                  {/* Form Group (location)*/}
                    <div className="col-md-6">
                        <label className={` small mb-1 ${usernames.Location ==  null  && 'controlform text-danger'}`} for="inputLocation">Location</label>
                        <input className={`Location form-control ${usernames.Location ==  null   && 'controlform text-danger'}`}  id="inputLocation" type="text" placeholder="Enter your location" value={usernames.Location && usernames.Location} onChange={ (event) => setUsernames(pre => {  return{ ...pre, Location : event.target.value} }) } required/>
                    </div>
                    <div className="col-md-6">
                        <label  className={` small mb-1 ${usernames.DOB ==  null  &&  'controlform text-danger'}`} for="inputBirthday">Birthday</label>
                        <input className={`DOB form-control ${usernames.DOB ==  null   && 'controlform text-danger'}`} id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={usernames.DOB && usernames.DOB} onChange={(event) =>  setUsernames(pre => {  return{ ...pre, DOB : event.target.value} }) }/>
                    </div>
                </div>
              {/* Form Group (email address)*/}

              {/* Form Row*/}

              {/* Save changes button*/}
                <button onClick={confirm} icon="pi pi-check" className="btn btn-primary" type="button">Save changes</button>

           <ConfirmDialog />
            </form>
        </div>
    </div>
</div>
</div>
</div>







  </>



);}

export const Head = () => <title>ProfileSetup</title>

{/*
{/*{/*


<div  style={{zIndex: "19"}} classNameName="container  bg-white mt-5 mb-5">
    <div classNameName="row">
        <div classNameName="col-md-3 border-right">
            <div classNameName="d-flex flex-column align-items-center text-center p-3 py-5">{user && <div id={pro.container} classNameNameName="container" >
 <div> <img  src={profileImg}  alt={user.displayName}  classNameNameName="profileimg" /> </div> 
  <p  classNameNameName='v8'>+</p>
  <input   classNameNameName='v'id="dp"  type="file"  onChange={handleProfileImgChange} />  
 alt={user.displayName}

</div>}<span classNameName="font-weight-bold">                <h1 style={{fontWeight: "bold" ,margin: '0 auto', textAlign: "center" }} classNameNameName='PP'>{ user &&  user.email.split("@")[0].replace(/[0-9]/g, "").length > 8 ? user && user.email.slice(0, 8).charAt(0).toUpperCase().concat(user && user.email.slice(1, 10)) : user && user.email.split("@")[0].replace(/[0-9]/g, "").charAt(0).toUpperCase().concat(user && user.email.split("@")[0].replace(/[0-9]/g, ""))  } </h1>
</span><span classNameName="text-black-50">{user && user.email}</span><span> </span></div>
        </div>
        <div classNameName="col-md-5 border-right">
            <div classNameName="p-3 py-5">
                <div classNameName="d-flex justify-content-between align-items-center mb-3">
                    <h4 classNameName="text-right">Profile Settings</h4>
                </div>

                <div classNameName="row mt-2">
                    <div classNameName="col-md-6"> <label htmlFor="" htmlFor='ame' classNameName="labels">Name</label> <input type="text" id="ame" classNameName="form-control" placeholder="first name" value="" /></div>
                    <div classNameName="col-md-6"> <label htmlFor="" htmlFor='Sur' classNameName="labels">Surname</label><input type="text" id="Sur" classNameName="form-control" value="" placeholder="surname"/></div>
                </div>
                <div classNameName="row mt-3">
                    <div classNameName="col-md-12"> <label htmlFor="" htmlFor='Add' classNameName="labels">Address Line 1</label><input type="text" classNameName="form-control" placeholder="enter address line 1" value=""/></div>
                    <div classNameName="col-md-12"> <label htmlFor="" htmlFor='emal' classNameName="labels">Email ID</label><input type="text" id='emal' classNameName="form-control" placeholder="enter email id" value=""/></div>
                </div>
                <div classNameName="row mt-3">
                    <div classNameName="col-md-6"> <label htmlFor="" htmlFor='co' classNameName="labels">Country</label><input id='co' type="text" classNameName="form-control" placeholder="country" value=""/></div>
                    <div classNameName="col-md-6"> <label htmlFor="" htmlFor='st' classNameName="labels">State/Region</label><input id="st" type="text" classNameName="form-control" value="" placeholder="state"/></div>
                </div>
                <div classNameName="mt-5 text-center"><button classNameName="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div classNameName="col-md-4">
            <div classNameName="p-3 py-5">
                <div classNameName="col-md-12"> <label htmlFor="" htmlFor='addi' classNameName="labels">Additional Details</label><input type="text" id="addi" classNameName="form-control" placeholder="additional details" value=""/></div>
            </div>
     
        <div classNameNameName={pro.lague}>
     <Language classNameNameName={pro.lague} language={props.language} handleLanguageChange={props.handleLanguageChange} /> 
     </div>

        <div classNameNameName={pro.favoritescontainer}>
            <h2><Trans>Favorites</Trans>:</h2>
            <ul>

              { /*favorites.map(favorite => (
                
<li key={favorite}>{favorite}</li>
              )) 
</ul>
</div> /</div> } */} 




import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import im from '../../images/proxy.jpeg';
//import { initializeApp } from "firebase/app";
//import Language from '../Language';
//import { useTranslation , Trans} from 'react-i18next';
import { Link } from 'gatsby';
import Navbar from './Navbared';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
import * as pro from '../../styles/profile.module.css';

export default function Profile(props) {

  const firebaseConfig2 =   firebaseConfig019;

  firebase.initializeApp(firebaseConfig2, 'app014');

  /*const [actives, setactive] = useState(false); */

 /*
 const actives = props.actives;
 const  setactive = props.setactive;
*/
  const app4 = firebase.app('app014');
  const { users,user,setUser, loading,signOut } = useAuth();
  const auth = app4.auth();
  const database = app4.database();

  const [language, setLanguage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [profileImg, setProfileImg] = useState(im);

  const [Darks, setDarks] = useState(false)


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



  }, [user]);





  console.log(`ìtsb ${profileImg}`)

  useEffect(() => {

    let vf = document.getElementById('#va');
    user &&
    vf.addEventListener('mouseover', () => {
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

  const handleProfileImgChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      app4.database().ref(`profile/${user.uid}`).set({ profileImg:reader.result })

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
  const bu = props.bu;
  const setBu =  props.setBu;
*/
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




  return (
    <div>



{!user && !actives &&
  <img src={profileImg} className="round dr mt-2" style={{borderRadius: "50%"}}  height="50" 
  alt="profile" loading="lazy" />
}


<div style={{height: "100%", overflowY: "scroll"}} className={`{${Darks && "darken"} 'Bgg' }`}>
<div class="container-xl px-4 mt-4">

<Navbar setDarks={setDarks} />

  {/* Account page navigation*/}

  <div className="row">


<div className="col-xl-4">
  {/* Profile picture card*/}
    <div className="card mb-4 mb-xl-0">
        <div className="card-header">Profile Picture</div>
        <div className="card-body text-center">
          {/* Profile picture image*/}
            <img className="img-account-profile rounded-circle mb-2" src={profileImg} alt="" />
          {/* Profile picture help block*/}
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
          {/* Profile picture upload button*/}
            <button className="btn btn-primary" type="button">Upload new image</button>
    </div>
    </div>
</div>
<div className="col-xl-8">
  {/* Account details card */}
    <div className="card mb-4">
        <div className="card-header">Account Details</div>
        <div className="card-body">
            <form>
              {/* Form Group (username)*/}
                <div className="mb-3">
                    <label className="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username"/>
                </div>
              {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputFirstName">First name</label>
                        <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie"/>
                    </div>
                  {/* Form Group (last name)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputLastName">Last name</label>
                        <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                    </div>
                </div>
              {/* Form Row        */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (organization name)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputOrgName">Organization name</label>
                        <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap"/>
                    </div>
                  {/* Form Group (location)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputLocation">Location</label>
                        <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA"/>
                    </div>
                </div>
              {/* Form Group (email address)*/}
                <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">Email address</label>
                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com"/>
                </div>
              {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (phone number)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputPhone">Phone number</label>
                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567"/>
                    </div>
                  {/* Form Group (birthday)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" for="inputBirthday">Birthday</label>
                        <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988"/>
                    </div>
                </div>
              {/* Save changes button*/}
                <button className="btn btn-primary" type="button">Save changes</button>
            </form>
        </div>
    </div>
</div>
</div>
</div>

</div>
</div>






);}

export const Head = () => <title>Profile</title>

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

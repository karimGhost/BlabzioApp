import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import im from '../../images/proxy.jpeg';
//import { initializeApp } from "firebase/app";
//import Language from '../Language';
//import { useTranslation , Trans} from 'react-i18next';
import { Link } from 'gatsby';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
import {RadioButton} from "primereact/radiobutton";
import {Checkbox} from "primereact/checkbox";
import Navbar from './Navbared';

import {InputNumber} from "primereact/inputnumber";
import { event } from 'jquery';
import {ProgressSpinner} from 'primereact/progressspinner';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
import * as pro from '../../styles/profile.module.css';




export default function Notifications() {
  const firebaseConfig2 = firebaseConfig019;

    const toast = useRef(null)

    function isActive({ isCurrent }) {
        return isCurrent ? { classNameName: 'active'} : null;
      }


      firebase.initializeApp(firebaseConfig2, 'app012');

      const app4 = firebase.app('app012');
      const {users, user,setUser, loading,signOut } = useAuth();
      const auth = app4.auth();
      const database = app4.database();

const [disable, setdisabled] = useState(true)
const [emaildisable, setEmaildisable] = useState(true)

      const [notifications, setNotifications] = useState({

        ChangesMadeToAcc: false,
        ChangesMadeToGroup: false,
       SecurityAlert: false,

  somoneComments :false,
  somoneshares:false,
Userfollows: false,
newPostMadeinGroup:false,
ReciveMessage: false,

AutoSubscribeGroupnotif: false,
AutoSubscribetonews: false,
setSms: 12
})



const handleNotificationsChange = (event) => {
    const { name, value, checked } = event.target;
    setNotifications((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));


  };
 async function dataIsSet() {
            if(user && user){
            const userRef = app4.database().ref('profile/' + user);

            try {
              await userRef.update({
                ChangesMadeToAcc: notifications.ChangesMadeToAcc,
                ChangesMadeToGroup: notifications.ChangesMadeToGroup,
               SecurityAlert: notifications.SecurityAlert,

          somoneComments :notifications.somoneComments,
          somoneshares:notifications.somoneshares,
        Userfollows: notifications.Userfollows,
        newPostMadeinGroup:notifications.newPostMadeinGroup,
        ReciveMessage: notifications.ReciveMessage,

        AutoSubscribeGroupnotif:notifications.AutoSubscribeGroupnotif,
        AutoSubscribetonews: notifications.AutoSubscribetonews,
              });

            } catch (error) {
              console.log(error);
              toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error is as: ' + error.message,
                life: 9000,
              });
            }
        }
        }





    console.log(notifications.Userfollows)











useEffect(() => {
    dataIsSet()

}, [notifications])

const  [clear, setClear] = useState(false)
const [Darks, setDarks] = useState(false)


useEffect(() => {
    if (users && users.email) {
        app4
        .database()
        .ref('prof')
        .orderByChild('email')
        .equalTo(users.email)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val());
          const snapshotval = snapshot.val()[userId];
setClear(true);
snapshotval.darkmode && setDarks(snapshotval.darkmode)
          setNotifications((prevState) => ({
            ...prevState,
            ChangesMadeToAcc: snapshotval?.ChangesMadeToAcc || false,
            ChangesMadeToGroup: snapshotval?.ChangesMadeToGroup || false,
            SecurityAlert: snapshotval?.SecurityAlert || false,
            somoneComments: snapshotval?.somoneComments || false,
            somoneshares: snapshotval?.somoneshares || false,
            Userfollows: snapshotval?.Userfollows || false,
            newPostMadeinGroup: snapshotval?.newPostMadeinGroup || false,
            ReciveMessage: snapshotval?.ReciveMessage || false,
            AutoSubscribeGroupnotif: snapshotval?.AutoSubscribeGroupnotif || false,
            AutoSubscribetonews: snapshotval?.AutoSubscribetonews || false,
            setSms: snapshotval.sms,
          }));



            // setSms(snapshotvals.sms); // make sure this function is defined
          }

        })
        .catch((error) => {
          console.log(error);
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Error: ' + error.message,
            life: 3000,
          });
        });
    } else {
      // handle the case where user is not defined or does not have a uid property
    //  toast.current.show({
      //  severity: 'info',
        //summary: 'info',
        //detail: 'Auto confirm',
        //life: 6000,
      //});
    }
  }, [user]);



  useEffect(() => {
    notifications.somoneshares === true  ? setdisabled(false) : 

    notifications.somoneComments === true ? setdisabled(false) :
    notifications.Userfollows === true ? setdisabled(false) :
      notifications.newPostMadeinGroup === true  ? setdisabled(false) :
       notifications.ReciveMessage === true  ? setdisabled(false) : setdisabled(true) 



       notifications.ChangesMadeToAcc === true  ? setButton(false) : 
       notifications.ChangesMadeToGroup === true ? setButton(false) :
     notifications.SecurityAlert  === true ? setButton(false) :

  notifications.somoneComments === true ? setButton(false) :
  notifications.somoneshares === true ? setButton(false) :
   notifications.Userfollows === true ? setButton(false) :
  notifications.newPostMadeinGroup === true ? setButton(false) :
  notifications.ReciveMessage === true ? setButton(false) :

  notifications.AutoSubscribeGroupnotif === true ? setButton(false) :
   notifications.AutoSubscribetonews === true ? setButton(false) :  setButton(true)



  }, [notifications])

const [Button, setButton] = useState(false)
const Unsub = () => {


    setNotifications((prevState) => ({
        ...prevState,
        ChangesMadeToAcc: false,
        ChangesMadeToGroup:  false,
        SecurityAlert:  false,
        somoneComments: false,
        somoneshares:  false,
        Userfollows: false,
        newPostMadeinGroup: false,
        ReciveMessage: false,
        AutoSubscribeGroupnotif:  false,
        AutoSubscribetonews:  false,

      }));
      toast.current.show({
        severity: 'Success',
        summary: 'Success',
        detail: 'You have been successfuly unsubscribed',
        life: 6000,
      });



}



if(clear){
return(
    <div style={{alignItems:"center", justifyItems: "center", paddingTop: "25%"}} className='card flex justify-content-center align-content-center '>
      { /*  <ProgressSpinner className='text-dark'> <h1>zena </h1> </ProgressSpinner>* /}
{/* style={{width: '50px', height: '50px'}}  strokeWidth="8" fill="var(--surface-ground)" animationDuration= ".5s" */}
    </div>
)
}

  return (

<div style={{background: Darks && "#141515"}}>
<Toast ref = {toast} />

  <div className={`container-xl px-4 mt-4 ${Darks && 'darken'}`}>
    <Navbar setDarks={setDarks}/>
    <div className={`${Darks && 'darken'}row`}>
        <div className="col-lg-8">
            {/* Email notifications preferences card */}
            <div className="card card-header-actions mb-4">
                <div className="card-header"  style={{background: Darks && "#141515"}}>


                    <div className="form-check form-switch"   style={{background: Darks && "#141515",marginBottom:"15px" }}>


<label htmlFor="emailNotifications"     style={{color: "orange", marginTop:"-10px",fontSize:"-20px", fontWeight:"bold"   }}>Email notifications</label>

                    </div>
                </div>
                <div className="card-body"  style={{background: Darks && "#141515"}}>
                    <>
                        {/* Form Group (default email) */}
                        <div className="mb-3"  style={{background: Darks && "#141515"}}>

                            <label className="small mb-1" htmlFor="inputNotificationEmail">Default notification email</label>
                            <input className="form-control" id="inputNotificationEmail" type="email" value={users && users.email}  onChange={handleNotificationsChange} disabled={true}/>
                        </div>
                        {/* Form Group (email updates checkboxes) */}
                        <div className="mb-0">
                            <div className=' mb-3 pb-3'>
                            <label className="small papol" style={{color: "purple"}}>Choose which types of email updates you receive</label>
                          </div>
                           <div className="form-check mb-6 mt-6" style={{marginBottom:"15px"}}>
                           <Checkbox  inputId='ChangesMadeToAcc'  name='ChangesMadeToAcc'  value={true} className="mr-1  p-success P-button-success p-checkbox-success" id="flexSwitchCheckChecked"   onChange={handleNotificationsChange }   checked = {notifications.ChangesMadeToAcc === true}/>
                                <label className="form-check-label" style={{color: Darks && "silver"}} htmlFor="ChangesMadeToAcc">Changes made to your account</label>
                            </div>
                            <div className="form-check mb-4" style={{marginBottom:"15px"}}>
                            <Checkbox inputId='ChangesMadeToGroup'  name='ChangesMadeToGroup'    value={true} className="mr-1 " id="flexSwitchCheckChecked"   onChange={handleNotificationsChange} checked = {notifications.ChangesMadeToGroup === true}/>
                                <label className="form-check-label"  style={{color: Darks && "silver"}} htmlFor="ChangesMadeToGroup">Changes are made to groups you're part of</label>
                            </div>



                            <div className="form-check" style={{marginBottom:"15px"}}>
                            <Checkbox name='SecurityAlert' inputId='checkSecurity'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  onChange={handleNotificationsChange}   checked = {notifications.SecurityAlert === true}/>
                                <label  style={{color: Darks && "silver"}} className="form-check-label" htmlFor="checkSecurity">Security alerts</label>
                            </div>
                        </div>
                    </>
                </div>
            </div>
            {/* SMS push notifications card */}
            <div className="card card-header-actions mb-4">
                <div className="card-header"  style={{background: Darks && "#141515"}}>

                    <div className="form-check form-switch"  style={{background: Darks && "#141515", marginBottom:"15px"}}>
                        <label  style={{color: "orange", marginTop:"-10px",fontSize:"-20px", fontWeight:"bold"   }} className="form-check-label ml-4" htmlFor="smsToggleSwitch"> Push Notifications</label>
                    </div>
                </div>
                <div className="card-body"  style={{background: Darks && "#141515"}}>
                    <form>
                        {/* Form Group (default SMS number) */}
                        <div className="mb-2">
                            <label  style={{color: Darks && "silver"}} className="small mb-1" htmlFor="inputNotificationSms">Default SMS number</label>
                            <InputNumber label='default-sms-Number' disabled={true}   id="number-input" value={notifications.setSms} onValueChange={handleNotificationsChange} />
                        </div>
                        {/* Form Group (SMS updates checkboxes) */}
                        <div className="mb-0">
                            <div className='mb-5 pb-2'>
         <label className="small mb-2 pupol"  style={{color: Darks && "silver"}}>Choose which types of push notifications you receive</label>

                                       </div>
                            <div className="form-check mb-3"  style={{background: Darks && "#141515", marginBottom:"15px"}}>
                            <Checkbox  inputId='somoneComments'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="somoneComments"  onChange={handleNotificationsChange}  checked = {notifications.somoneComments === true}/>
                                <label className="form-check-label"  style={{color: Darks && "silver"}} htmlFor="somoneComments">Someone comments on your post</label>
                            </div>
                            <div className="form-check mb-3" style={{marginBottom:"15px"}}>
                            <Checkbox  inputId='somoneshares'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="somoneshares"  onChange={handleNotificationsChange }  checked = {notifications.somoneshares === true}/>
                                <label  style={{color: Darks && "silver"}} className="form-check-label" htmlFor="somoneshares">Someone shares your post</label>
                            </div>
                            <div className="form-check mb-3" style={{marginBottom:"15px"}}>
                            <Checkbox  inputId="userfollow"   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="Userfollows"  onChange={handleNotificationsChange}  checked = {notifications.Userfollows === true}/>
                                <label  style={{color: Darks && "silver"}} className="form-check-label" htmlFor="userfollow">A user follows your account</label>
                            </div>
                            <div className="form-check mb-3" style={{marginBottom:"15px"}}>
                            <Checkbox  inputId='newPostMadeinGroup'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="newPostMadeinGroup" onChange={handleNotificationsChange}   checked = {notifications.newPostMadeinGroup === true}/>
                                <label  style={{color: Darks && "silver"}} className="form-check-label" htmlFor="newPostMadeinGroup">New posts are made in groups you're part of</label>
                            </div>
                            <div className="form-check" style={{marginBottom:"15px"}}>
                            <Checkbox  inputId='ReciveMessage'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="ReciveMessage" onChange={handleNotificationsChange}  checked = {notifications.ReciveMessage === true}/>
                                <label  style={{color: Darks && "silver"}} className="form-check-label" htmlFor="ReciveMessage">You receive a  message</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-lg-4">
            {/* Notifications preferences card */}
            <div className="card"  style={{background: Darks && "#141515"}}>
                <div style={{color: "orange", fontSize:"-20px", fontWeight:"bold"   }} className="card-header">Notification Preferences</div>
                <div className="card-body">
                    <>
                        {/* Form Group (notification preference checkboxes) */}
                        <div className="form-chec mb-7 "  style={{background: Darks && "#141515", marginBottom:"38px"}}>
                        <Checkbox  inputId='AutoSubscribeGroupnotif'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="AutoSubscribeGroupnotif" onChange={handleNotificationsChange}   checked = {notifications.AutoSubscribeGroupnotif === true}/>
                            <label   style={{fontSize:"1rem", color: Darks && "silver"}} className="form-check-label mb-4" htmlFor="AutoSubscribeGroupnotif">Automatically subscribe to group notifications</label>
                        </div>

                        <div className="form-chec mb-6 mt-7"  style={{background: Darks && "#141515", marginBottom:"25px"}}>
                        <Checkbox  inputId='AutoSubscribetonews'   value={true} className="mr-1 " id="flexSwitchCheckChecked"  name="AutoSubscribetonews" onChange={handleNotificationsChange }   checked = {notifications.AutoSubscribetonews === true}/>
                            <label  style={{color: Darks && "silver"}} className="form-check-label mb-4 mt-" htmlFor="AutoSubscribetonews">Automatically subscribe to new notifications</label>
                        </div>
                        {/* Submit button */}
                        <button disabled={Button} onClick={Unsub} style={{textShadow:"none"}} className="btn btn-danger-soft btn-dark text-white mb-4 mt-6">Unsubscribe from all notifications</button>
                    </>
                </div>
            </div>
        </div>
    </div>
</div>
   </div>
  )
}

export const Head = () => <title>Notifications</title>

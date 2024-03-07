import React, { useEffect, useState, useRef } from 'react';
import * as pro from '../../styles/profile.module.css';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import { Link } from 'gatsby';

import 'firebase/compat/auth';
import im from '../../images/proxy.jpeg';
//import { initializeApp } from "firebase/app";
//import Language from '../Language';
//import { useTranslation , Trans} from 'react-i18next' ./Profile;
import Navbar from './Navbared';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
import {RadioButton} from "primereact/radiobutton";
import {InputNumber} from "primereact/inputnumber";
import DeleteAccountButton from './DeleteAccountButton';
import { event } from 'jquery';
import {ProgressSpinner} from 'primereact/progressspinner';
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
  
 export default function Security() {

  const firebaseConfig2 = firebaseConfig019;


    const {users, user,setUser, loading,signOut } = useAuth();

    firebase.initializeApp(firebaseConfig2, 'app011');

    const toast = useRef(null)

    const  [clear, setClear] = useState(false)


    const  rejectFunc = () => {

        toast.current.show({severity: 'warn', summary: 'Rejected', detail: 'you canceled', life: 3000 })

        }




    const app4 = firebase.app('app011');
    const database = app4.database();

    const [language, setLanguage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [profileImg, setProfileImg] = useState(im);


const [currentPassword, setCurrentPassword] = useState('')

    const [newPassword, setnewPassword] = useState('');

    const [newPassword2, setnewPassword2] = useState('');

    const sub = ()  => {

    const auth = app4.auth();

    const credential =  firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    if(newPassword2 === newPassword){
    user.reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated successfully, now change password
        user.updatePassword(newPassword)
          .then(() => {
            // Password updated successfully
            toast.current.show({severity: 'success', summary: 'Success', detail: 'you have succesfully changed your password', life: 4000 })
        })
          .catch((error) => {
            // An error occurred while updating the password
            toast.current.show({severity: 'error', summary: 'incorrect', detail: 'An error occured check current password and try again', life: 4000 })

          });
      })
      .catch((error) => {
        // An error occurred while re-authenticating the user
        toast.current.show({severity: 'error', summary: 'incorrect', detail: 'password change rejected. please check current password', life: 4000 })

      });


    }else{
        toast.current.show({severity: 'warn', summary: 'Warning password missmatch', detail: 'please check  passwords does not match', life: 6000 })

    }
    }






    function isActive({ isCurrent }) {
        return isCurrent ? { classNameName: 'active'} : null;
      }




        const confirm = () => {


          confirmDialog({

            message: 'Do you want to proceed ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => sub(),
            reject: () => rejectFunc()

          });
        }


const [ifPrivate, setIfPrivate] = useState(null)
const [crashreport, setCrashReport] = useState(null)
const [twofactor, settwoFactor] = useState(null)
const [sms, setSms] = useState(551234567)





async function dataset() {
    if(user && user.uid){
    const userRef = app4.database().ref('profile/' + user.uid);

    try {
      await userRef.update({
        isprivate: ifPrivate || false,
       crashreport: crashreport || true,
        twofactors: twofactor || false,
         sms: sms || "+"
      });

    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error: ' + error.message,
        life: 9000,
      });
    }
}
}


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
          snapshotval.darkmode &&  setDarks(snapshotval.darkmode)
            setIfPrivate(snapshotval.isprivate);
            setCrashReport(snapshotval. crashreport);
            settwoFactor(snapshotval.twofactors);
            setSms(snapshotval?.sms  || 0);

            // setSms(snapshotvals.sms); // make sure this function is defined
          }
         
setClear(true)
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
   //   toast.current.show({
     //   severity: 'warn',
       // summary: 'Warning',
      //  detail: 'User UID is not defined',
        //life: 6000,
     // });
    }
  }, [users]);




  useEffect(() => {
    dataset();

  }, [ifPrivate]);

  useEffect(() => {
    dataset();

  }, [crashreport]);

  useEffect(() => {
    dataset();

  }, [twofactor]);

  const boo = () => { 


    toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'succesfully updated',
        life: 6000,
      });

      dataset()
  }

//delete acc 





if(!clear){
return(
    <div style={{alignItems:"center", justifyItems: "center", paddingTop: "25%"}} className={`card flex justify-content-center align-content-center ${Darks && "darken"}`}>
         <ProgressSpinner className='text-dark'> <h1 className="text-danger">Blabzio </h1> </ProgressSpinner>
{/* style={{width: '50px', height: '50px'}}  strokeWidth="8" fill="var(--surface-ground)" animationDuration= ".5s" */}
    </div>
)
}

  return (



<div className={`${ Darks && "darken" }`}>
<Toast ref = {toast} />
                <div className={`${ Darks && "darken" }container-xl px-4 mt-4 `} >
        <Navbar setDarks={setDarks}/>

        <div className="row">
            <div className="col-lg-8">
               {/* Change password card */}
                <div className="card mb-4"                 style={{background: Darks && "#141515"}}>
                    <div className="card-header" style={{ color:"red"}}>Change Password</div>
                    <div className="card-body">
                        <>
                           {/* Form Group (current password) */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="form1"></label>
                                <Password   autocomplete="off" feedback={false} className='pass mb-4  center' id='form1' value={currentPassword}  onChange={(event) => { setCurrentPassword(pre => event.target.value )  }} autoCorrect={false}  placeholder="Enter current password" toggleMask />

                           </div>
                           {/* Form Group (new password) */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="form2"></label>
                                <Password className='pass mb-4  center' id='form2' value={newPassword }  onChange={(event) => { setnewPassword(pre => event.target.value )  }} placeholder='New Password'   toggleMask />
                            </div>
                           {/* Form Group (confirm password) */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="form3"></label>
                                <Password className='pass mb-4  center' id='form3' value={newPassword2}  onChange={(event) => { setnewPassword2(pre => event.target.value )  }} placeholder='Confirm Password'  toggleMask />
                            </div>
                            <button onClick={confirm} className="btn btn-primary" type="button">change password</button>
                            <ConfirmDialog />

                        </>
                    </div>
                </div>
               {/* Security preferences card */}
                <div className="card mb-4"                 style={{background: Darks && "#141515"}}>
                    <div className="card-header" style={{ color: Darks && "silver", fontWeight:"bold"}}>Security Preferences {crashreport}</div>
                    <div className="card-body">
                       {/* Account privacy optinos */}
                        <h5 className="mb-1" style={{  color:"orange", fontWeight:"bold"}}>Account Privacy</h5>
                        <p className="smal text-muted mb-3 papol" >By setting your account to private, your profile information and posts will not be visible to users outside of your user groups.</p>
                        <>
                            <div className="form-check mb-4">
                  <RadioButton  inputId='public'   value={true} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy" onChange={(event) =>  setIfPrivate(event.target.value)} checked={ifPrivate === true  }/>

                                <label htmlFor='radioPrivacy1' style={{ color: Darks && "silver"}} className="form-check-label mb-3">Public (posts are available to all users)</label>
                            </div>
                            <div className="form-check">
                            <RadioButton inputId='public1'    value={false} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy1" onChange={(event) => setIfPrivate(event.target.value)  } checked={ifPrivate === false }/>
                            <label htmlFor='public1' style={{ color: Darks && "silver"}} className="form-check-label mb-4" for="radioPrivacy2">Private (posts are available to only users in your groups)</label>
                            </div>
                        </>
                        <hr className="my-6 mt-3"/>
                       {/* Data sharing options */}
                        <h5 className="mb-1" style={{color:"orange", fontWeight:"bold" }}>Data Sharing</h5>
                        <p className="small text-muted mb-2 papol" style={{color:"purple"}}>Sharing usage data can help us to improve our products and better serve our users as they navigate through our application. When you agree to share usage data with us, crash reports and usage analytics will be automatically sent to our development team for investigation.</p>
                        <>
                            <div className="form-check mb-6">
                            <RadioButton inputId='public1' onClick={dataset}  value={true} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy1" onChange={(event) => setCrashReport(event.target.value)} checked={crashreport === true}/>
                                <label htmlFor="radioUsage1" className="form-check-label" style={{ color: Darks && "silver"}}>Yes, share data and crash reports with app developers</label>
                            </div>
                            <div className="form-check mt-5">
                            <RadioButton inputId='public1' onClick={dataset}   value={false} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy1" onChange={(event) => setCrashReport(event.target.value)} checked={crashreport === false}/>
                                <label htmlFor="radioUsage2" className="form-check-label" style={{ color: Darks && "silver"}}>No, limit my data sharing with app developers</label>
                            </div>
                        </>
                    </div>
                </div>      
            </div>
            <div className="col-lg-4">
               {/* Two factor authentication card */}
                <div className="card mb-4"                 style={{background: Darks && "#141515"}}>
                    <div className="card-header" style={{ color:"orange", fontWeight:"bold"}}>Two-Factor Authentication</div>
                    <div className="card-body">
                        <p style={{ color:"purple"}}>Add another level of security to your account by enabling two-factor authentication. We will send you a text message to verify your login attempts on unrecognized devices and browsers.</p>
                        <>
                            <div className="form-check mb-2">
                            <RadioButton inputId='public1'   value={true} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy1" onChange={(event) => settwoFactor(event.target.value)} checked={twofactor === true}/>
                                <label htmlFor="twoFactorOn" className="form-check-label" >On</label>
                            </div>
                            <div className="form-check mb-2">
                            <RadioButton inputId='public1'   value={false} className="mr-1 " id="radioPrivacy1" type="radio" name="radioPrivacy1" onChange={(event) => settwoFactor(event.target.value)}checked={twofactor === false}/>
                                <label htmlFor="twoFactorOff" className="form-check-label" >Off</label>
                            </div>
                            <div className="mt-4">

                                <label htmlFor="number-input" className="small mb-1" >SMS Number</label>
                               <InputNumber disabled ={!twofactor} id="number-input" value={sms} onValueChange={ (event) => setSms(event.target.value)} />
                            </div>
<button className="btn btn-dark"  style={{marginTop: "10px"}} onClick={boo}>Save changes</button>

                        </>   
                    </div>
                </div>
               {/* Delete account card */}
                <div className="card mb-4"                 style={{background: Darks && "#141515"}}>
                    <div className="card-header" style={{ color:"red"}}>Delete Account</div>
                    <div className="card-body">

                        <p style={{ color: Darks && "silver"}}>Deleting your account is a permanent action and cannot be undone. If you are sure you want to delete your account, select the button below.</p>
                   <DeleteAccountButton toastRef={toast}/>
                    </div>
                </div>
            </div>
      </div>
      </div>


 </div>


  )
}
export const Head = () => <title>Security</title>

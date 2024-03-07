import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../Navigation/Layout'
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {  useLocation } from '@reach/router';
//import { Password } from 'primereact/password';

//import { GoogleAuthProvider } from 'firebase/auth';
//import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../Accounts/useAuth';
import { Divider } from 'primereact/divider';
import im from '../../images/proxy.jpeg';
import { Editor } from 'primereact/editor';
//import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
//import { FileUpload} from 'primereact/fileupload';
//import {ProgressSpinner} from 'primereact/progressspinner';
import ReactHtmlParser from 'html-react-parser';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import Postit from '../Posted/ProfileComments'
import { ListBox } from 'primereact/listbox';
import { TabView, TabPanel } from 'primereact/tabview';

import { Avatar } from 'primereact/avatar';
import { Popover } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import Wall from  '../../images/Video-Wall.png'
import MyWall from '../MyWall';
import ProfileIndex from "../ProfileIndex"
import { Link } from 'gatsby';
  import AllPostsIndex from "../AllPostsIndex";
  import ProfileSaved from './ProfileSaved';
  import ProfileTimeLine from './ProfileTimeLine';
  import { useCallback } from 'react';
  import SavedIndex from "../SavedIndex";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { ColorPicker } from 'primereact/colorpicker'; EventListener
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
 import 'primeicons/primeicons.css';
  import styled from 'styled-components';
import { PopoverBody } from 'react-bootstrap';


function resizeImage(htmlString) {
  const regex = /<img [^>]*>/g;
  const matches = htmlString.match(regex) || [];
  
  for (const match of matches) {
    const widthRegex = /width="(\d+)"/;
    const heightRegex = /height="(\d+)"/;
    
    const widthMatch = match.match(widthRegex);
    const heightMatch = match.match(heightRegex);
    const width = widthMatch ? parseInt(widthMatch[1]) : undefined;
    const height = heightMatch ? parseInt(heightMatch[1]) : undefined;
    const newWidth = width ? Math.floor(width / 2) : undefined;
    const newHeight = height ? Math.floor(height / 2) : undefined;
    const widthAttr = newWidth ? ` width="${newWidth}"` : "";
    const heightAttr = newHeight ? ` height="${newHeight}"` : "";
    const newTag = match.replace(/\/?>/, `${widthAttr}${heightAttr} class="resized-im">`);
    htmlString = htmlString.replace(match, newTag);
  }
  
  
  
  const reg = /<p\b[^>]*>/gi;
    htmlString = htmlString.replace(reg, '<p class="resize-P">');
  
  return htmlString;
  }


  export default function P(){
    const firebaseConfig2 =  firebaseConfig019;

  const op = useRef(null);
  firebase.initializeApp(firebaseConfig2, 'app09999');

  const { AllDataPosts, setAllDataPosts} = useState([])

  const toast = useRef(null)
  
    const app09 = firebase.app('app09999');
  
    const { user,users, useruid} = useAuth();

    const {fits, setfits} = useState();

const {BottomLoading, SetBottomLoading} = useState(false)
//users is a chain

// users.isAnonymous    = bolean

//users.emailVerified = bolean

//users.photoURL

//users.displayName


// useruid is user.uid

const containerRef = useRef(null);
const currentWidth = useRef(null)






const ToggleAllpost = (allpostId) =>{



  const containerWidth = currentWidth.current.clientWidth;


const targetScrollLeft = allpostId  * containerWidth;

containerRef.current.scrollLeft = targetScrollLeft;



document.getElementById( "Allposts").style.color = "orange";
document.getElementById("Allposts").style.borderBottom = "1px solid silver";
document.getElementById("Allposts").style.marginBottom = "-10px";
document.getElementById("Allposts").style.paddingBottom = "10px";

document.getElementById( "MyWall").style.color = "black";
document.getElementById("MyWall").style.borderBottom = "none";
document.getElementById("MyWall").style.marginBottom = "0px";
document.getElementById("MyWall").style.paddingBottom = "0px";

document.getElementById( "Saved").style.color = "black";
document.getElementById("Saved").style.borderBottom ="none"
document.getElementById("Saved").style.marginBottom ="0px";
document.getElementById("Saved").style.paddingBottom ="0px";

document.getElementById("Timeline").style.color = "black";
document.getElementById("Timeline").style.borderBottom = "none" ;
document.getElementById("Timeline").style.marginBottom =  "0px";
document.getElementById("Timeline").style.paddingBottom =  "0px";

document.getElementById( "Posts").style.color = "black";
document.getElementById("Posts").style.borderBottom = "none";
document.getElementById("Posts").style.marginBottom = "0px";
document.getElementById("Posts").style.paddingBottom = "0px";



}

const ToggleAllvids = (Mywallid) =>{
   


    const containerWidth = currentWidth.current.clientWidth;


    
    const targetScrollLeft = Mywallid  * containerWidth;
    const containerScrollLeft = containerRef.current.scrollLeft;


    containerRef.current.scrollLeft = targetScrollLeft;

   

    document.getElementById( "MyWall").style.color = "orange";
    document.getElementById("MyWall").style.borderBottom = "1px solid silver";
    document.getElementById("MyWall").style.marginBottom = "-10px";
    document.getElementById("MyWall").style.paddingBottom = "10px";

    document.getElementById( "Allposts").style.color = "black";
    document.getElementById("Allposts").style.borderBottom = "none";
    document.getElementById("Allposts").style.marginBottom = "0px";
    document.getElementById("Allposts").style.paddingBottom = "0px";
    
    document.getElementById( "Saved").style.color = "black";
    document.getElementById("Saved").style.borderBottom ="none"
    document.getElementById("Saved").style.marginBottom ="0px";
    document.getElementById("Saved").style.paddingBottom ="0px";
    
    document.getElementById("Timeline").style.color = "black";
    document.getElementById("Timeline").style.borderBottom = "none" ;
    document.getElementById("Timeline").style.marginBottom =  "0px";
    document.getElementById("Timeline").style.paddingBottom =  "0px";
    
    document.getElementById( "Posts").style.color = "black";
    document.getElementById("Posts").style.borderBottom = "none";
    document.getElementById("Posts").style.marginBottom = "0px";
    document.getElementById("Posts").style.paddingBottom = "0px";
    
    
}


  const ToggleApost = (Wallid) =>{
 
   

   const containerWidth = currentWidth.current.clientWidth;

   if(containerWidth){

   const containerScrollLeft = containerRef.current.scrollLeft;
   
   const targetScrollLeft = Wallid  * containerWidth;


   
   containerRef.current.scrollLeft = targetScrollLeft;

   }


   document.getElementById( "Posts").style.color = "orange";
   document.getElementById("Posts").style.borderBottom = "1px solid silver";
   document.getElementById("Posts").style.marginBottom = "-10px";
   document.getElementById("Posts").style.paddingBottom = "10px";


   document.getElementById( "MyWall").style.color = "black";
   document.getElementById("MyWall").style.borderBottom = "none";
   document.getElementById("MyWall").style.marginBottom = "0px";
   document.getElementById("MyWall").style.paddingBottom = "0px";
   
   
   document.getElementById( "Allposts").style.color = "black";
   document.getElementById("Allposts").style.borderBottom = "none";
   document.getElementById("Allposts").style.marginBottom = "0px";
   document.getElementById("Allposts").style.paddingBottom = "0px";
   
   document.getElementById( "Saved").style.color = "black";
   document.getElementById("Saved").style.borderBottom ="none"
   document.getElementById("Saved").style.marginBottom ="0px";
   document.getElementById("Saved").style.paddingBottom ="0px";
   
   document.getElementById("Timeline").style.color = "black";
   document.getElementById("Timeline").style.borderBottom = "none" ;
   document.getElementById("Timeline").style.marginBottom =  "0px";
   document.getElementById("Timeline").style.paddingBottom =  "0px";
   

   
 }

 const ToggleSavedit = (Apostid) =>{
 
const containerWidth = currentWidth.current.clientWidth;


const containerScrollLeft = containerRef.current.scrollLeft;

const targetScrollLeft = Apostid  * containerWidth;
containerRef.current.scrollLeft = targetScrollLeft;


document.getElementById( "Saved").style.color = "orange";
document.getElementById("Saved").style.borderBottom ="1px solid silver"
document.getElementById("Saved").style.marginBottom ="-10px";
document.getElementById("Saved").style.paddingBottom ="10px";


document.getElementById( "Allposts").style.color = "black";
document.getElementById("Allposts").style.borderBottom ="none"
document.getElementById("Allposts").style.marginBottom ="0px";
document.getElementById("Allposts").style.paddingBottom ="0px";


document.getElementById("Timeline").style.color = "black";
document.getElementById("Timeline").style.borderBottom = "none" ;
document.getElementById("Timeline").style.marginBottom =  "0px";
document.getElementById("Timeline").style.paddingBottom =  "0px";

document.getElementById( "Posts").style.color = "black";
document.getElementById("Posts").style.borderBottom = "none";
document.getElementById("Posts").style.marginBottom = "0px";
document.getElementById("Posts").style.paddingBottom = "0px";


document.getElementById( "MyWall").style.color = "black";
document.getElementById("MyWall").style.borderBottom = "none";
document.getElementById("MyWall").style.marginBottom = "0px";
document.getElementById("MyWall").style.paddingBottom = "0px";


}




const ToggleTimeLine = (TimeLineid) => {
  const containerRe = currentWidth.current;

  if (containerRe) {
    const containerWidth = containerRe.clientWidth;
    const maxScrollLeft = containerRef.current.scrollWidth - containerWidth;
    const targetScrollLeft = TimeLineid * containerWidth;

    containerRef.current.scrollLeft = Math.min(targetScrollLeft, maxScrollLeft);
  }


     document.getElementById("Timeline").style.color = "orange";
     document.getElementById("Timeline").style.borderBottom = "1px solid silver";

     document.getElementById("Timeline").style.marginBottom = "-10px";
     document.getElementById("Timeline").style.paddingBottom = "10px";

     document.getElementById( "Saved").style.color = "black";
document.getElementById("Saved").style.borderBottom = "none";
     document.getElementById("Saved").style.marginBottom = "0px";
     document.getElementById("Saved").style.paddingBottom = "0px";


     document.getElementById( "Allposts").style.color = "black";
     document.getElementById("Allposts").style.borderBottom ="none"
     document.getElementById("Allposts").style.marginBottom ="0px";
     document.getElementById("Allposts").style.paddingBottom ="0px";
     

     document.getElementById( "Posts").style.color = "black";
document.getElementById("Posts").style.borderBottom = "none";
     document.getElementById("Posts").style.marginBottom = "0px";
     document.getElementById("Posts").style.paddingBottom = "0px";


     document.getElementById( "MyWall").style.color = "black";
document.getElementById("MyWall").style.borderBottom = "none";
     document.getElementById("MyWall").style.marginBottom = "0px";
     document.getElementById("MyWall").style.paddingBottom = "0px";

};





const [profileImg , setProfileImg] = useState()

    const [dark,setdark] = useState();
    
   


    useEffect(() => {
   const use =  user ?  user : useruid;

     const videoUrl = `/Profile/Pr?iBla6=${use}`;
      

     window.history.replaceState({}, '', videoUrl);
    
    }, [useruid]);

   
    if(users){
      console.log("users is as", users )
    }

    
/*
    const queryString = location.search;
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
    
    const userId = params.id || null;
   

    if(userId === user){

    }

    */


    
    //const [userId, setUserId] = useState('')
    //const [Editable, setEditable] = useState(false)
    const [usernames, setUsernames] = useState({
      useris : null,
      firstname: null,
      lastname: null,
      DOB: null,
      Location: null
    
    });

    const [onHide, setonHide] = useState(true);
    const [vals] = useState([''])
   // const [Db, setDb] = useState()
   // const [fname, setFname] = useState()
    //const [lname, setLname] = useState()
    //const [locate, setLocate] = useState();


    //const va = vals.length;
    
    
   // const  [clear, setClear] = useState(false)
    
    


   
    const ref = useRef(null);
useEffect(() => {  
  if (users && users.email) {
   
    app09.database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(users.email)
      .once('value', (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const snapshotval = snapshot.val()[useruid];
          if (snapshotval && snapshotval.username) {
            setUsernames(pre => ({
                ...pre,
              useris: snapshotval.username || '',
              DOB: snapshotval.dob || '',
            }));
              }
        } 
      });

  } else {
    setUsernames({ useris: null });
  }

}, [useruid,app09]);



    async function dataset(){
    
      const normalizedUsername = usernames.useris;
      const normalizedFirstname =usernames.firstname;
      const normalizedLastname = usernames.lastname;
      const normalizedLocation = usernames.Location;
      const normalizedDOB = usernames.DOB;
     
      try {
       // Check if a user with that username already exists in the database
       const snapshot = await app09.database().ref('profile').orderByChild('username').equalTo(normalizedUsername).once('value');
     
       if (snapshot.exists()) {
         // A user with that username already exists
         // Prompt the user to choose a different username
         toast.current.show({severity: 'error', summary: 'Error', detail: 'username already exists. Please choose another one.', life: 3000 })
      
       }else{
     
        const userRef =   app09.database().ref('profile/' + useruid)
       
       userRef.update({
             username: normalizedUsername,
            firstname : normalizedFirstname,
           lastname :  normalizedLastname,
           Location : normalizedLocation,
          dob :    normalizedDOB,
          email: user.email
     
           });
         
         toast.current.show({severity: 'success', summary: 'Success', detail: 'you succesfully updated your Bio', life: 3000 })
     
       }
     
      } catch (error) {
         console.log(error);
         toast.show({severity: 'error', summary: 'Error', detail: 'error try again', life: 3000 })
      }
       
     }
     
    
     const menu = useRef(null);




  useEffect(() => {
    // Only run the effect if the user object is defined
    if (useruid) {
      app09.database().ref(`profile/${useruid}/profileImg`).on('value', snapshot => {
        console.log(JSON.stringify(snapshot.val()))
        if (!snapshot.val()) {
     
          console.log("Snapshot value is null or undefined");
          return;
        }
     

        // check if snapshot.val() is an object
        if(typeof snapshot.val() === 'object'){
          const val = snapshot.val();
       ////  setProfileImg(val.profileImg)
        } else {
//setProfileImg(snapshot.val())
        }
      });
    }



  }, [users, app09, useruid]);


/*
  const handleProfileImgChange = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());
    reader.onloadend =() => {
      setProfileImg(reader.result);
      app09.database().ref('profile/' + user.uid).update({ profileImg:reader.result })
      
      toast.current.show({severity: 'info', summary: 'Info', detail: 'Dp updated', life: 3000 })
  
    };
    reader.readAsDataURL(blob);
  
  }
  */
  
const [loading, setLoading] = useState(false);


const [Edits, setEdits] = useState(true)

  /// Editor ///
      const [text, setText] = useState('<div>Hello World!</div>');

 


      



   




    

    //const [text2, setText2] = useState('');

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }

    //const header = renderHeader();


    const [htmlString, setHtmlString] = useState("");

  /*  useEffect(() => {
      if (text) {
        const resizedHtmlString = resizeImage(text);
        setHtmlString(resizedHtmlString);
      }
    }, [text]); */

const [textopen,  setTextOpen] = useState(false);
const [editable, setEdit] = useState(false);

const [Bio, setBio] = useState({
  text: "<div>Hello World!</div>",
  status: "write Something here....",
  followers: "1",
  following: "1",
  side: 'to bottom',
  colors: ["ghostwhite"],
  usernamed:""
        });


     
const [userisopen, setuserisopen] = useState(false)
const [newColor, setNewColor] = useState('');
const [displayPicker, setDisplayPicker] = useState(false);
const [colorPickerTarget, setColorPickerTarget] = useState(null);





function handleColorChange(e) {
  const selectedColor = e.target.value;

  if (Bio.colors &&  !Bio.colors.includes(selectedColor)) {
    // Add the color to the state
 
    setBio(prevState => {
      return {
        ...prevState,
        colors: [...prevState.colors, selectedColor]
      }
    });
 
  }
  // Hide the color picker after a color is selected
  setDisplayPicker(false);
}

console.log(Bio.colors)
function handleNewColorInputChange(e) {
  setNewColor(e.target.value);
}

function handleAddColor() {
  if (newColor !== '' &&  Bio.colors && !Bio.colors.includes(newColor)) {
    // Add the new color to the state



    setBio(prevState => {
      return {
        ...prevState,
        colors: [...prevState.colors, newColor]
      }
    });


    // Clear the input field
    setNewColor('');
  }
}

function handleRemoveColor(colorToRemove) {


  setBio(prevState => {
    return {
      ...prevState,
      colors: [...prevState.colors.filter(color => color !== colorToRemove)]
    }
  });

}


const items = [
  {
      label: 'to-left',
      icon: 'pi pi-arrow-left',
       
      command: () => {
        setBio( pre => {
          return{
...pre,
side: "to left"

          }
        } )
      }
  },

  {
      label: 'to-right',
      icon: 'pi pi-arrow-right',
      command: () => {
        setBio( pre => {
          return{
...pre,
side: "to left"

          }
        } )   
      
  }
  },
  {
      label: 'to-down',
      icon: 'pi pi-arrow-down',
      command: () => {
        


        setBio( pre => {
          return{
...pre,
side: "to bottom"

          }
        } )

      }
  },
  {
      label: 'to-up',
      icon: 'pi pi-arrow-up',
      command: () => {
    
        setBio( pre => {
          return{
...pre,
side: "to top"

          }
        } )
      }
  },
  {
    label: 'to-down-right',
    icon: 'pi pi-arrow-down-right',
    command: () => 
      setBio( pre => {
        return{
...pre,
side: "to bottom right"

        }
      })

    
},

{
  label: 'to-down-left',
  icon: 'pi pi-arrow-down-left',
  command: () => {

    setBio( pre => {
      return{
...pre,
side: "to bottom left"

      }
    } )
  }
},
{
  label: 'to-up-right',
  icon: 'pi pi-arrow-up-right',
  command: () => {

    setBio( pre => {
      return{
...pre,
side: "to top right"

      }
    } )
  }
},
{
  label: 'to-up-left',
  icon: 'pi pi-arrow-up-left',
  command: () => {
  

    setBio( pre => {
      return{
...pre,
side: "to top left"

      }
    } )
  }
}
];






const updatebio = () => {
  setLoading(true);
  if (users && users) {
    try {
      app09
        .database()
        .ref('profile')
        .orderByChild('email')
        .equalTo(useruid)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val());
            const snapshotval = snapshot.val()[useruid];
            if (snapshotval) {
              const userRef = app09.database().ref(`profile/${useruid}`);
              userRef.update({
                text: Bio.text,
                status:Bio.status,
                followers: Bio.followers,
                following: Bio.following,
                side: Bio.side,
                colors: Bio.colors,
                username: Bio.usernamed ? Bio.usernamed : usernames.useris
              });
              toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'You have successfully updated your details',
                life: 3000
              });
              setEdits(true);
              setLoading(false);
              setuserisopen(false)
            }
          }
        })
        .catch((error) => {
          console.log(error);
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Error occurred. Please try again.',
            life: 3000
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error occurred. Please try again.',
        life: 3000
      });
      setLoading(false);
    }
  }
};


function saveValues(){
  
 setEdit(pre => !pre)

 if(editable){
  updatebio()
  setTextOpen(false)
 }
}


useEffect(() => {  
  let app  = app09;
  if (users && users) {
  app
      .database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(useruid)
      .on('value', (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const snapshotval = snapshot.val()[useruid];
          if (snapshotval ) {
            setBio(pre => {
              return{
                ...pre,
                text: snapshotval.text ? snapshotval.text  : '',
                colors: snapshotval.colors ?  snapshotval.colors.map((c) => c) : ["ghostwhite"],
                status: snapshotval.status ? snapshotval.status : 'welcome to my profile :)',
                followers: snapshotval.followers ?  snapshotval.followers : '',
                following: snapshotval.following ? snapshotval.following : '',
                side:  snapshotval.side ?  snapshotval.side : 'to bottom'
              }
            });
          }
        } 
      });

    ref.current = app;
  
if(user){
    
  }
  } else {
    setText('<div>Hello World!</div>');
  }
}, [user, users, app09]);



const [hideColors, sethideColors] =useState(false)


const gradient = Bio.colors && `linear-gradient( ${Bio.side && Bio.side}, ${ Bio.colors.join(', ')})`;
//const webgradient = Bio.colors && `-webkit-linear-gradient(${Bio.colors.join(', ')})`;

if(Bio.colors){
console.log(" the value was read as",Bio.colors.join(', '))
}



function setuser(){
  setuserisopen(false)
  if (users && users) {
    try {
      app09
        .database()
        .ref('profile')
        .orderByChild('email')
        .equalTo(useruid)
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userId = Object.keys(snapshot.val());
            const snapshotval = snapshot.val()[users];
            if (snapshotval && snapshotval.username) {
              const userRef = app09.database().ref(`profile/${useruid}`);
              userRef.update({
                username: Bio.usernamed ? Bio.usernamed : usernames.useris
              });
              toast.current.show({
                severity: 'success',
                summary: 'username changed',
                detail: 'You have changed your username',
                life: 3000
              });
              setEdits(true);
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Error occurred. Please try again.',
            life: 3000
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error occurred. Please try again.',
        life: 3000
      });
      setLoading(false);
    }
  }
}

const  [Length, setLength] = useState(null);
const [setLen] = useState()
//const [light, setLigh] = useState(false)
const setLight = useRef(null)
useEffect(() => {
  if (Bio && Bio.text) {
    const resizedHtmlString = resizeImage(Bio.text);
    setHtmlString(resizedHtmlString);
  }
}, [Bio && Bio.text]);




const [followers, setFollowers] = useState([]);
        
useEffect(() => {
  if(users){
  const getFollowers = async () => {
    // Get the follower IDs from the user's "followers" node
    const snapshot = await app09.database().ref(`profile/${useruid}/followers`).once('value');
    const followerIds = snapshot.val();

    if (!followerIds) {
      return;
    }

    // Get the follower data for each follower ID
    const followerPromises = Object.keys(followerIds).map(async (followerId) => {
      const snapshot = await app09.database().ref(`profile/${followerId}`).once('value');
      return { id: followerId, ...snapshot.val() };
    });

    const followerData = await Promise.all(followerPromises);
    setFollowers(followerData);
  };

  getFollowers();
}





}, [users]);

const editRef = useRef(null);
const [useref, setuseRef] = useState(true);

useEffect(() => {
  const editHeight = editRef.current?.getBoundingClientRect()?.height;
if(editRef.current){
  if (editHeight >= 12.5) {
    editRef.current.style.height = "12.5em";

  } else if (editHeight >= 31.25) {
    editRef.current.style.height = "100vh";
  } else if (editHeight >= 37.5) {
    editRef.current.style.height = "36em";
} else if(editHeight >= 5 ){
  editRef.current.style.height = "5em";

}else if(editHeight >= 9 ){
  editRef.current.style.height = "9em";

}else if(editHeight >= 7 ){
  editRef.current.style.height = "7em";

}else{
    editRef.current.style.height = "100vh";
  }



 if(editHeight <= 50 ){
    editRef.current.style.height = "100%"
    }
}
}, [useruid,app09])


function edited(){

  if(editRef.current){
     editRef.current.style.height = '100%';
     setuseRef(false)
  }
  }





//  const FollowersList = ({ userId }) => {  }



/*

<h2>Followers</h2>
<ul>
{followers.map((follower) => (
<li key={follower.id}>{follower.name}</li>
))}
</ul>
*/

const profs = followers.filter((follow) => follow.email);
const Flength =profs.length



const [following, setFollowing] = useState([]);


useEffect(() => {
  if(useruid){
const getFollowing = async () => {
// Get the follow IDs from the user's "following" node
const snapshot = await app09.database().ref(`profile/${useruid}/following`).once('value');
const followIds = snapshot.val(); 

if (!followIds) {
  return;
}

// Get the follower data for each follower ID
const followPromises = Object.keys(followIds).map(async (followId) => {
  const snapshot = await app09.database().ref(`profile/${followId}`).once('value');
  return { id: followId, ...snapshot.val() };
});

const followData = await Promise.all(followPromises);
setFollowing(followData);
};

getFollowing();
  }
}, [useruid, app09]);

const Follow = following.filter((follow) => follow.email);
const Follows =Follow.length;

const [blocked, setBlockList] = useState([]);

   
useEffect(() => {
if(useruid){
  const getBlock = async () => {
    // Get the follow IDs from the user's "following" node
   
    const ref =  app09.database().ref(`profile/${useruid}/blockList`);
ref.on('value', (snapshot) => {
  const followerIds = snapshot.val();

  if (!followerIds) {
    return;
  }

  // Get the follower data for each follower ID
  const followerPromises = Object.keys(followerIds).map((followerId) => {
    return app09.database().ref(`profile/${followerId}`).once('value');
  });

 Promise.all(followerPromises).then((followSnapshots) => {
  const followData = followSnapshots.map((snapshot) => {
    return { id: snapshot.key, ...snapshot.val() };
  });
  setBlockList(followData);
})

});
};

getBlock();

return () => {
app09.database().ref(`profile/${useruid}/blockList`).off('value');
};

}
}, [ useruid, app09]);
 
  
const Blocked = blocked.filter((follow) => follow.email);
//const Block = Blocked.length;




const [visibleFollowers,setVisibleFollowers] = useState(false)

const [SelectedFollower, setSelectedFollower] = useState(null);
  const followersupdate = (option) => {
        return (
          <> {option &&  <div className="flex align-items-center justify-space-between">
          {option.profileImg &&  <img style={{width:"20px"}} src={option.image && option.profileImg } alt='prof'/>
   } { option.username &&
 <Link to={`/Profile/Pr/?iBla6=${option.id}`}> <li key={option.id}>{option.username}</li> </Link>
 }
          </div>} </>  


        );
    };



    const [visibleFollow,setVisibleFollow] = useState(false)

    const [SelectedFollow, setSelectedFollow] = useState(null);
        const followi = (option) => {
            return (
                <div className="flex align-items-center">
                  <img style={{width:"20px"}} src={option.image ? option.profileImg : im} alt='prof'/>
     <Link to={`/Profile/Pr/?iBla6=${option.id}`}> <li key={option.id}>{option.username}</li> </Link>
    
                </div>
    
    
            );
        };


        const visibility = useRef(null);
  
        useEffect(() => {
          const handleClick = (event) => {
            if (visibility.current && !visibility.current.contains(event.target)) {
            
              setVisibleFollowers(false)
              setVisibleFollow(false)
            }
          };
        
          document.addEventListener("mousedown", handleClick);
        
          return () => {
            document.removeEventListener("mousedown", handleClick);
          };
        }, [visibility]);
        
const [ID, setId] = useState(-1)


const [observer, setObserver] = useState(null);

const handleViewChange = useCallback((entries) => {
  for (let entry of entries) {
    if (entry.intersectionRatio > 0.5) {

     } }
  },[])
  
  
        useEffect(() => {
          const observer = new IntersectionObserver(handleViewChange, {
              root: null,
              rootMargin: "0px",
              threshold: 0.5
          });
          setObserver(observer);
      
          if (containerRef.current) {
              observer.observe(containerRef.current);

if(currentWidth.current.id === "001"){
  setId(-1)
}else{
                setId(currentWidth.current.id)

}
          }
console.log("id", ID)
      
          return () => {
              if (observer) {
                  observer.disconnect();
                  setId(-1)
              }
          };
      }, [handleViewChange]);
      
      
        const  [useLeft, setuseLeft] = useState(false)
        const [view, setView] = useState(false);

        const [activeItem, setActiveItem] = useState(0);
      
        const handleScroll = () => {
          // Calculate the active item based on the scroll position
          const scrollPosition = containerRef.current.scrollLeft;
          const itemWidth = currentWidth.current.width;
          const activeItemIndex = Math.floor(scrollPosition / itemWidth);
      
          setActiveItem(activeItemIndex);
        };
      
        useEffect(() => {
          // Attach the scroll event listener when the component mounts
          useruid &&
          containerRef?.current.addEventListener('scroll', handleScroll);
      
          // Clean up the event listener when the component unmounts
          return () => {
            containerRef?.current.removeEventListener('scroll', handleScroll);
          };
}, [])

console.log("isactive", activeItem)

useEffect(() => {

if(!Bio && !Bio.colors ){
  return  <div>Loading....</div>
}

}, [useruid && Bio && dark, Bio.colors])






//users is a chain
// useruid is user.uid


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









useEffect(() => {
  // Only run the effect if the user object is defined
  if (useruid) {
    app09.database().ref(`profile/${useruid}/profileImg`).on('value', snapshot => {
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



},[useruid]);





 
  useEffect(() => {  
    
      if (users && users.email) {
        app09
          .database()
          .ref('profile')
          .orderByChild('email')
          .equalTo(users.email)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userId = Object.keys(snapshot.val());
              const snapshotval = snapshot.val()[useruid];
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
       }, [useruid, users])
       

       useEffect(() => {
        // Only run the effect if the user object is defined
        if (useruid) {
          app09.database().ref(`profile/${useruid}/profileImg`).on('value', snapshot => {
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
      
      
      
      },[useruid]);
      
      
      
      
      
       
        useEffect(() => {  
          
            if (users && users.email) {
              app09
                .database()
                .ref('profile')
                .orderByChild('email')
                .equalTo(users.email)
                .once('value')
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const userId = Object.keys(snapshot.val());
                    const snapshotval = snapshot.val()[useruid];
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
             }, [useruid, users])
             
      
           
  

  




  const [off, setoff] =  useState(false);
 




  useEffect(() => {  
    if(useruid){
              const db = app09.database().ref('profile');
    const userRef = db.child(useruid);
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
}, [useruid, app09]);





 
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
 isBloged ={isBlogActive} firebaseconfig9
*/


const [dnone, setDnone] = useState()

const [AllData, setAllData] = useState([])

const [allvid, setAllVid] = useState(false);
const [PostsAll, setPostsAll] = useState(false);

useEffect(() =>{
  console.log("HAsdat", AllData)

}, [AllData])


{  !hideColors && 
    <div className="ms-4 mt-5 d-flex flex-column bggp" style={{width: "150px"}}>
 
  

    </div>}

return(
<Layout setuseLeft={setuseLeft}>

<div className="container containerpro">
<div className="profile-page tx-13" style={{height:"200px"}}>
<div className="row">
    <div className="col-12 grid-margin gridcol">
        <div className={`profile-header profoli ${useLeft && "profo"}`}  style={{display:"flex", flexDirection:"column", justifyContent:"center",  marginLeft: useLeft ?  "25%" :  "10%"  , marginTop:"70px", width: useLeft ? "50%":"60%"}} >
        
            <div className="cover" style={{height:"200px"}}>
                <div className="gray-shade" style={{backdropFilter:"blur(15px)",  backgroundImage:  `url(${profileImg})`,  objectFit:"cover",background: gradient ,  backgroundSize: "contain"}}>
</div>

<div style={{position:"relative", zIndex:"9"}}>
                <p className='webs '
style={{fontWeight:"bold" , fontSize: "1.5rem", textShadow: "1px 1px orange", color : "white", textAlign:"top", margin: "0", zIndex:"0", position: "absolute",fontFamily:"cursive" ,   background: `-webkit-linear-gradient( blue, red, gray, yellow, purple, pink, green, indigo, crimson,aqua,orange,white,silver)` ,webkitBackgroundClip: "text",  webkitTextFillColor: "transparent", paddingLeft: "5px"}} >
Aesthetic Colors</p>


{editable &&  <div style={{background:"rgba(0,0,0,0.11)"}}> <button  onClick={() => sethideColors(pre => !pre)} style={{ background: hideColors ? 
"white" : "black", cursor:"pointer", zIndex:"5",  boxShadow:  hideColors ?
"0 2px 4px rgba(0, 0, 0, 0.2)"  : "0 2px 4px rgba(255, 255, 255, 0.5)", position: "absolute", right: "0", top:"5px", width: "fit-content",color: "white",fontWeight:"bold",  textShadow:"1px 1px black"}}>
 {hideColors ?  
"saveColors" :  "choose Colors"} <i style={{color: hideColors ?  "orange" : "white" }} className={hideColors ?   "pi pi-minus" : "pi pi-plus" }></i></button>

{hideColors && <div>

<div style={{position: "absolute", right: "0", top: "150px"}} className="card flex justify-content-center">

<SplitButton className='bg-danger pi pi-arrow-left z-index-4 rdd h-1 ' buttonClassName=" bg-transparent b-transparent transparent w-1 p-0 m-0" severity="warning" outlined style={{ backgroundColor:"yellow" ,zIndex:"10", color: "red", fontSize: "5px", padding:"1px" , marginTop:"-50px"}} size="small"   model={items} />
</div>

<div 
style={{position:"absolute", right:"0", backdropFilter: "blur(15px) ", top:"30px"  ,   background: "#f7d18c12",
backdropFilter: "blur(25px)",

opacity: "0.99"}}>
<div className="d-flex justify-content-center">
<Button className='bg-light my-1' style={{color: "black", boxShadow:"1px 1px 3px rgba(0,0,0,0.11)"}} onClick={(event) => {
setColorPickerTarget(event.target);
setDisplayPicker(true);
}}>select colors</Button>
{displayPicker && colorPickerTarget && (
<Popover
placement="bottom"
popover
clickable
domElement
isOpen={displayPicker}
toggle={() => setDisplayPicker(false)}
target={colorPickerTarget}
ref={op}
style={{width: "10px"}}
>

<PopoverBody     style={{width: "60px", height:"50px"}}>

<input className='sized'  style={{ width: "100%", height: "100%" }}  type="color" onChange={handleColorChange} />

</PopoverBody>
</Popover>
)}
</div>

<Divider  style={{color:"black"}} align='center'>
or
</Divider>
<div className='my-1'>

<label style={{color: "white", textShadow:"1px 1px black"}} htmlFor="new-color-input">write color here</label>
<InputText
id="new-color-input"
type="text"
value={newColor}
onChange={handleNewColorInputChange}
/>
{ newColor.length > 0 && <Button className='my-1' style={{background:"white", color: "black"}} onClick={handleAddColor}>Add color</Button> }
</div>
<div className='inline-flex align-items-left'>
<b className='bg-dark'>select direction -</b>

</div>
<Divider  style={{background: "white" , marginBottom:"-5px"}} align='center'>
<p className='text-dark' > Selected colors:</p>
</Divider>

<ul style={{backdropFilter:"blur(25px)", background: "rgba(0,0,0,0.11)", border:"1px solid black", overflow:"scroll"}}>
{Bio.colors && Bio.colors.map(color => (
<li style={{listStyle:"none", border:"1px solid black"}} key={color}>
  <p className='mt-1' style={{ marginBottom:"-5px", width: "50px", height: "50px", background:color, border:"1px solid black"}}></p>
<Button  onClick={() => handleRemoveColor(color)}>Remove</Button>
</li>
))}
</ul>
</div>
</div>}
</div> }
</div>
                <figure>



                    <img style={{height:"200px"}} src={Wall} className="img-fluid" alt="profile cover"/>
                </figure>
                <div className="cover-body d-flex justify-content-between align-items-center">
                    <div className='CoverB CoverRowed' style={{display:"flex", flexDirection:"row"}}>



                        <img  style={{marginBottom:"22px"}} className="profile-pic" src={profileImg ?  profileImg  : users?.photoURL} alt="profile"/> 
                        
     {/*Profile Names*/}
     <div className='Bioabt' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"baseline"}}>
                        <span style={{textShadow:"1px 1px 0.10px black"}} className="profile-name text-muted useruser">{ usernames?.useris  ? usernames?.useris : users?.isAnonymous ? "Anonymous" :  users?.displayName   } </span>
                        {textopen && <div style={{display:"flex"}}> <InputText style={{height: "fit-content"}} value={Bio.status} maxLength="18" placeholder=" status max 27 char"  onChange={(event) => setBio(pre => {return { ...pre, status: event.target.value}}) }> </InputText>
            {editable &&  <i onClick={() => setTextOpen(false)} className="pecil text-light p-2 pi pi-pencil" style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer", marginRight:"0"}} ></i> }
             </div>
             }
            {!textopen &&  <p style={{color: "white", paddingLeft:"5px",textShadow: "1.2px 1.2px 0.10px black"}}> {Bio.status}  {editable &&  <i onClick={() => setTextOpen(true)} className="pecil text-light p-2 pi pi-pencil"  style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer"}} ></i>}</p>}
</div>

                        <ul style={{display:"flex" ,
/*paddingLeft: "110px",*/
marginTop: "31px",
/*paddingBottom: "20px" */}} className='FlexPRofile FollowersCon'>
                        
                        
                        
                      <li className="header-link-item ml-3 pl-3  d-flex align-items-center mtopheader" >
                      
                        <b className="pt-1px  d-md-block"  style={{color:"white", textShadow:"1px 1px black"}} >Followers <span style={{color:"white", textShadow:"1px 1px black"}} className="text-muted tx-12 pt-1">{Flength}</span></b>
                    </li>

                    <li className="header-link-item ml-3 pl-3  d-flex align-items-center mtopheader" >
                     
                        <b className="pt-1px  d-md-block" style={{color:"white", textShadow:"1px 1px black"}} >Following <span    style={{color:"white", textShadow:"1px 1px black"}} className="text-muted tx-12 pt-1">{Flength}</span></b>
                    </li>  </ul> 
                    </div>
                    <div className=" d-md-block">
                      
                        <button onClick={saveValues} type="button" className="btn btn-primary btn-icon-text btn-edit-profile btn-change5 btn editablebt btn-outline-dark" data-mdb-ripple-color="dark"
    style={{zIndex: "1", textShadow: dark && "none", color: dark &&"silver", width:"100px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{textShadow: "1px 1px black" }}className="feather feather-edit btn-icon-prepend">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>   {editable ? "Save" : "Edit"  }
                           
 
  </button>

                       
                    </div>
                </div>
            </div>
            <div className="header-links" style={{borderBottom: "1px solid gainsboro",

margin: "auto"}}>
           
           <ul className="links d-flex align-items-center mt-3 mt-md-0">
                 




                 <li  id="Allposts" onClick={() => ToggleAllpost(0)} style={{color:"orange"}}  className="hov1 header-link-item ml-3 pl-3 border-left d-flex align-items-center ">
                                  
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user mr-1 icon-md">
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                             <circle cx="12" cy="7" r="4"></circle>
                                         </svg>
                 
                 
                                         <b           style={{ color: activeItem === 0 ? 'orange' : 'black' }}
 className="pt-1px d-none d-md-block  ">Allposts</b>
                                     </li>
                 
                                     <li id="Posts"  onClick={() =>ToggleApost(1)} className=" hov2 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video mr-1 icon-md">
                                             <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                             <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                         </svg>
                                         <b           style={{ color: activeItem === 1 ? 'orange' : 'black' }}
 className="pt-1px d-none d-md-block" >Posts</b>
                                     </li>
                 
                                     
                                   <li  id="MyWall"  onClick={() => ToggleAllvids(2)} className="hov3 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video mr-1 icon-md">
                                             <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                             <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                         </svg>
                                         <b           style={{ color: activeItem === 2 ? 'orange' : 'black' }}
 className="pt-1px d-none d-md-block" >MyWall</b>
                                     </li>
                 
                 
                 
                                     <li id="Saved"  onClick={() => ToggleSavedit(3)}  className=" hov4 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user mr-1 icon-md">
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                             <circle cx="12" cy="7" r="4"></circle>
                                         </svg>
                 
                 
                                         <b           style={{ color: activeItem === 3 ? 'orange' : 'black' }}
 className={`pt-1px d-none d-md-block    `}>Saved</b>
                                     </li>
                 
                                   
                                     <li id="Timeline"  onClick={(e) => { e.stopPropagation(); ToggleTimeLine(4); }}
 className=" hov5 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-columns mr-1 icon-md">
                                             <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                                         </svg>
                                        <b       
                 style={{ color: activeItem === 4 ? 'orange' : 'black' }}
 className="pt-1px d-none d-md-block" >Timeline</b>
                 
                                     </li>
                                    
                                 </ul>

                               {/*  <div style={{width:"45%",height:"1px", position:"absolute", background:"silver",   zIndex: "299",    marginTop: "30px"}}>
                                
   
  
  


                                  <div id="scrolled" style={{background: "orange",  height: "1.3px",width:"100px",position:"absolute", height:"10px", color:"black", marginLeft:containerRef?.current?.scrollLeft}}></div>
                               

  
 
  
    
                               
                                 </div>
                 */}
            </div>
        </div>
    </div>
</div>

<div className="row profile-body m-auto ">



  

    {/* middle wrapper start    */}

              

    <div className={` middle-wrapper ${useLeft && "mdwraperr"}`} style={{ width: useLeft ? "50%" : "60%" , marginLeft: useLeft ?  "25%" :  "11%"  }}>
          <List ref={containerRef}>
          
                    
          

<Item  id="001"  ref={currentWidth}>


<AllPostsIndex 
   Bio={Bio}
   setonHide={setonHide}
   AllData={AllData}
   username={usernames.useris} 
   userData={usernames.userData}
   setAllData={setAllData}
timeL={useruid} 
Saved={useruid}
view ={view}
dnone={dnone} 
 userId={useruid}
  id={ids}
   fullSizeImage ={fullSizeImage} 
   user={useruid}
setFullSizeImage ={setFullSizeImage}
  dark ={dark} 
  setLe={setLen} 
  setLength={setLength}
   fits={fits}
    users = {users}
 
      isBlog={isBlogActive} 
      onHide={onHide}
      
        app09={app09}
         profileImg ={profileImg}

setView={setView} 
AllPosts={useruid} 


/>

</Item>
        



<Item id="002" ref={currentWidth} >
  <div>
 <ProfileIndex   useid={useruid} userId={useruid}
setLe={setLen} setLength={setLength}  users = {users} Bio={Bio}
username={useruid}  setonHide={setonHide}
AllData={AllData}

 setPostsAll = {setPostsAll}


setAllData={setAllData}

/>
    
  </div>

</Item>



<Item id="003" ref={currentWidth}>
<div>
  <MyWall    view ={view}

AllData={AllData}

 setAllData={setAllData}
setView={setView}  userid={useruid} 
 setAllVid = {setAllVid}
/>
</div>

</Item>













<Item  id="004" ref={currentWidth} >
{

  <>
  


  <ProfileSaved 
  BottomLoading={BottomLoading}
  SetBottomLoading = {SetBottomLoading}
  Bio={Bio}
  setonHide={setonHide}
  AllData={AllDataPosts}
  username={usernames.useris} 
  userData={usernames.userData}
  setAllData={setAllDataPosts}
timeL={useruid} 
Saved={useruid}
view ={view}
dnone={dnone} 
userId={useruid}
 id={ids}
  fullSizeImage ={fullSizeImage} 
  user={useruid}
setFullSizeImage ={setFullSizeImage}
 dark ={dark} 
 setLe={setLen} 
 setLength={setLength}
  fits={fits}
   users = {users}

     isBlog={isBlogActive} 
     onHide={onHide}
     
       app09={app09}
        profileImg ={profileImg}

setView={setView} 
AllPosts={useruid} 


  />
  </>
  

}    
</Item>



<Item id="005" ref={currentWidth} >
{
  
   
<ProfileTimeLine  mediaItems={['i','i','i',]}
  timeL={useruid} 
  view ={view}
  setView={setView}  userid={useruid}
  />



}    
</Item>
        </List>
 

 </div>
                   
          
      
   
</div>
</div>
</div>


</Layout>
)


}

const List = styled.div`
max-width: 100vw;
overflow-X: scroll;
background: #fff;
display: flex;
scroll-snap-type: X mandatory;
scroll-behavior:smooth;
height:fit-content;
flex-direction: row;

gap: 20px;
scrollbar-height: none;
scrollbar: none;
&::-webkit-scrollbar {
  display: none !important; /* for Chrome, Safari, and Opera */
}


`;





const Ite = styled.div`
margin: 10px 0;
border-bottom: 2px solid #00000014;


scroll-snap-align: start;


background: #eee;
@media (max-width: 1433px) {
min-width: 100%;
}
`;




const Item = styled.div`
margin: 10px 0;
border-bottom: 2px solid #00000014;
padding: 0px ;
text-align: center;


align-content: center;
scroll-snap-align: start;
min-width: 46vw;
margin-bottom: 20px;
background: #eee;
@media (max-width: 1433px) {
min-width: 100%;
}
`;


import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../Navigation/Layout'
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { GoogleAuthProvider } from 'firebase/auth';
//import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../Accounts/useAuth';
//import { Password } from 'primereact/password';
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

import { PopoverBody } from 'react-bootstrap';
import { Avatar } from 'primereact/avatar';
import { Popover } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import Wall from  '../../images/Video-Wall.png'
import 'primeicons/primeicons.css';
import MyWall from '../MyWall';
import ProfileIndex from "../ProfileIndex"
import { Link } from 'gatsby';
  import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { ColorPicker } from 'primereact/colorpicker'; EventListener


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

export default function P() {
  const firebaseConfig2 =  firebaseConfig019;

  const op = useRef(null);
  firebase.initializeApp(firebaseConfig2, 'app09999');

  const toast = useRef(null)
  
    const app09 = firebase.app('app09999');
  
    const { user,users, useruid} = useAuth();

//users is a chain

// users.isAnonymous    = bolean

//users.emailVerified = bolean

//users.photoURL

//users.displayName


// useruid is user.uid

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

    const {onHide,setonHide} = useState()
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
    const databaseRef = app09
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



  }, [users]);


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
}, [user]);



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
        
        
        


useEffect(() => {

if(!Bio && !Bio.colors ){
  return  <div>Loading....</div>
}

}, [useruid && Bio && dark, Bio.colors])

const tab2 = (options) => {
  return (
      <div className="flex align-items-center px-3 " style={{ cursor: 'pointer', marginTop:"18px", height:"fit-content"}} onClick={options.onClick}>
        
        <div style={{display:"flex", flexDirection:"row", height:"fit-content"}}>


  <Avatar image={Wall} style={{width:"20px", height:"18px", }} shape="" className="mx-2" /> 
                 <span style={{}}>MyWall  
          </span> 
          </div>
               

      </div>
  )
};


  return (

<Layout setdark={setdark} username ={Bio.usernamed} profileImg={profileImg} >

<section className={ ` ${dark && "darken"}  bg-light h-100 gradient-custom-2 mt-8 bgsm`}>

  <Toast ref={toast} />
  <div className="container  py-5 h-100">
    <div className="row  d-flex justify-content-center align-items-center h-100">
      <div className="profcontainered">
        <div className="car ">

          <div className="tops rounded-top text-white d-flex  flex-row bg-light" style={{backdropFilter:"blur(15px)", position: "relative",height: "100px",  backgroundImage:  `url(${profileImg})`, height:"200px",  objectFit:"cover",background: gradient ,  backgroundSize: "contain", marginTop: "90px", marginLeft:"100px", width:"70%"}}>
         
           <p className='webs '
            style={{fontWeight:"bold" , fontSize: "1.5rem", textShadow: "1px 1px orange", color : "white", textAlign:"top", margin: "0", zIndex:"1", position: "absolute",fontFamily:"cursive" ,   background: `-webkit-linear-gradient( blue, red, gray, yellow, purple, pink, green, indigo, crimson,aqua,orange,white,silver)` ,webkitBackgroundClip: "text",  webkitTextFillColor: "transparent", paddingLeft: "5px"}} >
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
           style={{position:"absolute", right:"0", backdropFilter: "blur(15px) ", top:"30px"}}>
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


 {  !hideColors && 
            <div className="ms-4 mt-5 d-flex flex-column bggp" style={{width: "150px"}}>
         <img src={profileImg ?  profileImg  : users?.photoURL}
                alt="primg " className="img-fluid img-thumbnail mt-4 mb-2 mx-1 "
                style={{width: '150px', zIndex: '1', height:"160px"}} /> 
            
              <button onClick={saveValues} type="button" className="btn-change5 btn editablebt btn-outline-dark" data-mdb-ripple-color="dark"
                style={{zIndex: "1", textShadow: dark && "none", color: dark &&"silver"}}>
               {editable ? "Save" : "Edit profile"  }
              </button>

            </div>}

            <div className="ms-3 ml-3" style={{marginTop:" 130px" }}>

              {userisopen && <div style={{display:"flex"}}> <InputText style={{height: "fit-content"}} value={Bio.usernamed} onChange={(event) => setBio(pre => {return { ...pre, usernamed: event.target.value}}) }> </InputText>
            {editable &&  <i onClick={setuser} className="pecil text-light p-2 pi pi-pencil" style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer", marginRight:"0"}} ></i> }
             </div>
             }
            { !userisopen &&    <h5 style ={{color: "white", textShadow:"1px 1px 0.24px black", fontWeight:"bold"}}> { usernames?.useris  ? usernames?.useris : users?.isAnonymous ? "Anonymous" :  users?.displayName  }  {editable &&  <i onClick={() => setuserisopen(true)} className="pecil text-light p-2 pi pi-pencil"  style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer"}} ></i>}</h5>}

            






             {textopen && <div style={{display:"flex"}}> <InputText style={{height: "fit-content"}} value={Bio.status} maxLength="18" placeholder=" status max 27 char"  onChange={(event) => setBio(pre => {return { ...pre, status: event.target.value}}) }> </InputText>
            {editable &&  <i onClick={() => setTextOpen(false)} className="pecil text-light p-2 pi pi-pencil" style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer", marginRight:"0"}} ></i> }
             </div>
             }
            {!textopen &&  <p style={{color: "white",textShadow: "1.2px 1.2px 0.10px black"}}> {Bio.status}  {editable &&  <i onClick={() => setTextOpen(true)} className="pecil text-light p-2 pi pi-pencil"  style={{color:  "white", backgroundColor : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer"}} ></i>}</p>}
            </div>
            </div>
         
          

          <div className="p-4 text-black  fivetop" style={{ backgroundColor: dark ?  "#141515" : "#f8f9fa"} }>


            <div className="FollowContainer d-flex justify-content-end text-center py-1">
           {/*   <div>
                <p className="mb-1 h5" style={{color: dark && "silver"}}>{Length === 0 ? "0" : Length}</p>
                <p className="small text-muted mb-0" >Posts </p>
              </div>
            */  }
              <div className="px-3">   

                <p className="mb-1 h5" style={{color: dark && "silver"}}>{Flength}</p>
                <button disabled={!Flength} style={{background:"transparent", border: "none"}} onClick={()  => setVisibleFollowers(true)}> 
                  <p className="small text-muted mb-0">Followers</p> </button>
          

      <ul>
                
                { visibleFollowers &&
                <div  style={{ width: "fit-content", padding: "8px"}} ref={visibility} className="card flex justify-content-center">
                <ListBox ref={menu}  breakpoint="767px" value={SelectedFollower} onChange={(e) => setSelectedFollower(e.value)} options={followers} optionLabel="name" 
                    itemTemplate={followi} style={{width: "fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
                </div>
                }
                      </ul>


              </div>
              <div>
                <p className="mb-1 h5" style={{color: dark && "silver"}}>{Follows}</p>
                <button  disabled={ !following } style={{background:"transparent",  border:"none"}} onClick={()  =>  setVisibleFollow(true)}>  <p className="small text-muted mb-0">Following</p> </button>
        
      <ul style={{zIndex: "2",position: "absolute"}}>
                { visibleFollow &&
<div  style={{ width: "fit-content", padding: "8px"}}  ref={visibility}  className="card flex justify-content-center ">´
<ListBox ref={menu}  breakpoint="767px" value={SelectedFollow} onChange={(e) => setSelectedFollower(e.value)} options={following} optionLabel="name" 
    itemTemplate={followersupdate} style={{width:"fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
</div>
}
    
      </ul>
              </div>
            </div>
           {/*
          <div className="card-body p-4 " style={{ color: dark ? "silver" : "black", backgroundColor: dark &&  "#141515"}}>
            <div className="mb-5">
              <p className="lead fw-normal mb-1">Profile Bio  <i className="pecil text-light p-2 pi pi-pencil" onClick={ () => setEdits(false)} style={{color:  "white", backgroundColor :  dark ?  "#141515" : "rgba(0,0,0,0.40)" , borderRadius: "20px", cursor: "pointer"}} ></i></p>
              <div className="p-4" style={{backgroundColor: "#f8f9fa;"}}>
           
    

{ Edits ?  
<>
<div ref={editRef} onClick={edited}  className='mb-0  ' id="Edits" style={{height:"100%",  cursor:"pointer", overflow:"hidden",  boxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)", webkitBoxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)",
moZboxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)"
}}>

<div   className="mb-0 " >{ReactHtmlParser(htmlString)}</div> 

</div>



{ useref &&  <button  onClick={edited} style={{ display:  Length === 0 && "none", background:"rgba(1,1,1,0.11)", border:"none "}}>show more...</button> }

</>
:


<div> <Editor value={Bio.text} onTextChange={(e) => setBio(pre => { return {...pre, text: e.htmlValue }} )} style={{ height: '320px' }} />
 <Button style={{background: "black", height:"fit-content", padding: "3px", paddingRight: "10px"}} label="save" icon="pi pi-check" loading={loading} onClick={updatebio}> </Button>
 
 </div>


  } 


</div>
         
           
            </div>  


       */}
       
       
    
           
            {/* Pots   Items*/}
<div>
<div style={{display:hideColors ? "none" : "block"  }} className="card" >
            <TabView  style={{display:hideColors ? "none" : "block"  }}  scrollable>
                <TabPanel  header="Posts" leftIcon="pi pi-book mr-2">
                 
                <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0">My posts</p>
              <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
            </div>


            <ProfileIndex   userId={useruid}  useid={useruid} 
 setLe={setLen} setLength={setLength}  users = {users} Bio={Bio}
  username={useruid}  setonHide={setonHide}/>


 


           
           
     


                </TabPanel>

                  <TabPanel headerTemplate={tab2} headerClassName="flex align-items-center">
                
                   <MyWall  userid={useruid}/>
                </TabPanel>
                <TabPanel header="Saved" leftIcon="pi pi-save mr-2">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>

</div>
</div>
        </div>
      </div>
    </div>
  </div>
 
</section>
    </Layout>
  )
}


export const Head = () => <title>{""}</title>
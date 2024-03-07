import React, {  useEffect, useState, useRef} from 'react';
import { Link} from 'gatsby';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
//import Layout from '../../components/Layout'
import { Menu } from 'primereact/menu';
import { useAuth } from '../../Accounts/useAuth';
//import { Password } from 'primereact/password';
//import { Divider } from 'primereact/divider';
import im from '../../images/proxy.jpeg';
//import { Editor } from 'primereact/editor';
//import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog';
//import { Toast } from 'primereact/toast';
//import { FileUpload} from 'primereact/fileupload';
//import {ProgressSpinner} from 'primereact/progressspinner';
import ReactHtmlParser from 'html-react-parser';
import { Button } from 'primereact/button';
//import { SplitButton } from 'primereact/splitbutton' alert();
import Postit from '../Posted/ProfileComments';
//import Message from './Message';
import { navigate } from 'gatsby';
import ProfileIndex from "../ProfileIndex";
import { TabView, TabPanel } from 'primereact/tabview';
import Layout from '../../Navigation/Layout';
import { Avatar } from 'primereact/avatar';
import { ListBox } from 'primereact/listbox';
import Navbar from '../../Navigation/Navbar';
import MyWall from '../MyWall';
import Wall from  '../../images/Video-Wall.png'
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
import styled from 'styled-components';



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


export default function UserPorfolio({location}) {
  const firebaseConfig010 = firebaseConfig019;

const menu = useRef(null);


const { user, useruid, users} = useAuth();
const use =  user ?  user : useruid.uid;

const List = styled.div`
max-width: 100vw;
overflow-X: scroll;
background: #fff;
display: flex;
scroll-snap-type: X mandatory;
scroll-behavior:smooth;
height:fit-content;
flex-direction: row;

gap: 10px;
scrollbar-height: none;
scrollbar: none;
&::-webkit-scrollbar {
  display: none !important; /* for Chrome, Safari, and Opera */
}


`;


const Item = styled.div`
margin: 10px 0;

border-bottom: 2px solid #00000014;
padding: 0px 1px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
align-content: center;
scroll-snap-align: start;
min-width: 46vw;
margin-bottom: 20px;
background: #eee;
@media (max-width: 1433px) {
min-width: 100%;
}
`;

const currentWidth = useRef(null)
const containerRef = useRef(null);


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





const userId = params.iBla6 || null;



const {onHide,setonHide} = useState()


useEffect(() => {


  if(userId){
if(userId ===  use ){

navigate("/Profile/P")

}
  }
}, [])


const [setLen] = useState()
// Query the profile data for the specific userconsole.log("here is the id para", userId)

  const [htmlString, setHtmlString] = useState("");

  const [profileImg, setProfileImg] = useState(im);
  firebase.initializeApp(firebaseConfig010, 'app1010');
  const app1010 = firebase.app('app1010');




//const [userData, setUserData] = useState(null);



 //const { username, email } = data.profile ? data.profile : {};

const [profile, setProfile] = useState(null);


const [Bio, setBio] = useState({
  text: "<div>Hello World!</div>",
  status: "welcome to my profile :)",
  side: 'to bottom',
  colors: [],
  usernamed:"",
  email: '',
        });

        const followUser = async () => {

          await app1010.database().ref(`profile/${use}/following/${userId}`).set(true);
          await app1010.database().ref(`profile/${userId}/followers/${use}`).set(true);

        }

    




     
        const [followers, setFollowers] = useState([]);

        useEffect(() => {
          const getFollowers = async () => {
            // Get the follower IDs from the user's "followers" node
            const ref = app1010.database().ref(`profile/${userId}/followers`);
            ref.on('value', (snapshot) => {
              const followerIds = snapshot.val();
        
              if (!followerIds) {
                return;
              }
        
              // Get the follower data for each follower ID
              const followerPromises = Object.keys(followerIds).map((followerId) => {
                return app1010.database().ref(`profile/${followerId}`).once('value');
              });
        
              Promise.all(followerPromises).then((followSnapshots) => {
                const followerData = followSnapshots.map((snapshot) => {
                  return { id: snapshot.key, ...snapshot.val() };
                });
                setFollowers(followerData);
              });
            });
          };
        
          getFollowers();
        
          return () => {
            app1010.database().ref(`profile/${userId}/followers`).off('value');
          };
        }, [userId,app1010]);
        
        
      
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
    const legth =profs.length



    const [following, setFollowing] = useState([]);

  
    useEffect(() => {
      const getFollowing = async () => {
        // Get the follow IDs from the user's "following" node
        const ref = app1010.database().ref(`profile/${userId}/following`);
    ref.on('value', (snapshot) => {
      const followerIds = snapshot.val();

      if (!followerIds) {
        return;
      }

      // Get the follower data for each follower ID
      const followerPromises = Object.keys(followerIds).map((followerId) => {
        return app1010.database().ref(`profile/${followerId}`).once('value');
      });

     Promise.all(followerPromises).then((followSnapshots) => {
      const followData = followSnapshots.map((snapshot) => {
        return { id: snapshot.key, ...snapshot.val() };
      });
       setFollowing(followData);
    })
     
    });
  };

  getFollowing();

  return () => {
    app1010.database().ref(`profile/${userId}/following`).off('value');
  };
}, [userId, app1010]);


    const Follow = following.filter((follow) => follow.email);
    const Follows =Follow.length;



    const unfollowUser = async () => {
          
      // Remove the user ID from the "following" node of the current user
     // await app1010.database().ref(`profile/${user.uid}/followig/${userId}`).remove();

     const updatedFollowers = followers.filter((follower) => follower.id !== use);

     // Update the state with the modified followers array
     setFollowers(updatedFollowers);
      // Remove the current user's ID from the "followers" node of the user being unfollowed
     await app1010.database().ref(`profile/${userId}/followers/${use}`).remove();
    };




    const BlockUser = async () => {
          
      // Remove the user ID from the "following" node of the current user
if(user){

     const updatedFollowers = followers.filter((follower) => follower.id !== use);

     // Update the state with the modified followers array
     setFollowers(updatedFollowers);

     await  app1010.database().ref(`profile/${use}/following/${userId}`).remove();
     await app1010.database().ref(`profile/${userId}/following/${use}`).remove();

      // Remove the current user's ID from the "followers" node of the user being unfollowed
     await app1010.database().ref(`profile/${userId}/followers/${use}`).remove();

     await app1010.database().ref(`profile/${use}/followers/${userId}`).remove();

     await app1010.database().ref(`profile/${userId}/blockedMe/${use}`).set(true);
    // await app1010.database().ref(`profile/${user.uid}/blockList/${userId}`).set(true);

}
    };



    const [blocked, setBlockList] = useState([]);
 
   


   

    
   
    useEffect(() => {
    if(user){
      const getBlock = async () => {
        // Get the follow IDs from the user's "following" node
       
        const ref =  app1010.database().ref(`profile/${use}/blockedMe`);
    ref.on('value', (snapshot) => {
      const followerIds = snapshot.val();

      if (!followerIds) {
        return;
      }

      // Get the follower data for each follower ID
      const followerPromises = Object.keys(followerIds).map((followerId) => {
        return app1010.database().ref(`profile/${followerId}`).once('value');
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
    app1010.database().ref(`profile/${use}/blockedMe`).off('value');
  };

}
}, [user,app1010]);


const [message,setMessage ] = useState(false)
    const Blocked = blocked.filter((follow) => follow.email);
    const Block = Blocked.length;



    const [blockedme, setBlockListMe] = useState([]);

  const [mutedme, setMutedme] = useState([])
    const UnBlockUser = async () => {

   
      await app1010.database().ref(`profile/${userId}/blockedMe/${use}`).remove();
    // await app1010.database().ref(`profile/${user.uid}/blockList/${userId}`).remove();

     // const uBlock = blocked.filter((follower) => follower.id !== user.uid);

      const uBlockme = blockedme.filter((follower) => follower.id !== use);
      const uBlock = blocked.filter((follower) => follower.id !== userId);

      // Update the state with the modified followers array
     // setBlockList(uBlock);
      setBlockListMe(uBlockme)
setBlockList(uBlock)
    }

const [deleted, setDeleted] = useState({
  isdeleted : null,
deletedname: null
})

    useEffect(() => {
      if(user){
        const getBlock = async () => {
          // Get the follow IDs from the user's "following" node
         
          const ref =  app1010.database().ref(`profile/${userId}/blockedMe`);
      ref.on('value', (snapshot) => {
        const followerIds = snapshot.val();
  
        if (!followerIds) {
          return;
        }
        // Get the follower data for each follower ID
        const followerPromises = Object.keys(followerIds).map((followerId) => {
          return app1010.database().ref(`profile/${followerId}`).once('value');
        });
  
       Promise.all(followerPromises).then((followSnapshots) => {
        const followData = followSnapshots.map((snapshot) => {
          return { id: snapshot.key, ...snapshot.val() };
        });
        setBlockListMe(followData);
      })
      
      });
    };
    getBlock();
  
    return () => {
      app1010.database().ref(`profile/${userId}/blockedMe`).off('value');
    };
  
  }
  }, [user, app1010]);
  
  
    const BlockedMe = blockedme.filter((follow) => follow.email);
    //  const Blocks = BlockedMe.length;



      useEffect(() => {  

        if(!userId){
          return;
        }
        const db = app1010.database().ref('profile');
        const userRef = db.child(userId);
        
        userRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
            const userData = snapshot.val();
setProfile(userData)
            setBio(pre => {
              return{
                ...pre,
                text: userData.text ?  userData.text : '',
                colors: userData.colors ? userData.colors.map((c) => c) : ["ghostwhite"],
                status: userData.status ? userData.status : 'Welcome to my Profile :)'  ,
                followers: userData.followers ? userData.followers : '',
                following: userData.following  ?  userData.following : '',
                side : userData.side ? userData.side : 'to bottom',
                usernamed: userData.username ? userData.username :  '',
                email: userData.email ? userData.email : ''

                            }
            });

          } else {
            alert("user was deleted");
setDeleted( pre => {
  return {
    ...pre,
    deletedname: "Anonymous",
    isdeleted: true
  }
})

      } 
    });


  return () => {
          userRef.off();
  };
      }, [userId,app1010]);
    


        const item =[
          {
            label: blockedme && blockedme.some((blocked) =>  blocked.id  ===  use) ? "unBlock" : 'Block',
            icon: 'pi pi-ban', 
           
            command: () => {
              blockedme && blockedme.some((blocked) =>  blocked.id  ===  use) ? UnBlockUser()  :  BlockUser() 
            }
           },
           {
            label:    blocked && blocked.some((blocked) =>   blocked.id  ===  userId)
            ? "Ask To unBlock" : '',
            icon: 'pi pi-beg',
            command: () => {

            }
           },

        ]
     let items;
  if( blockedme && blockedme.some((blocked) =>   blocked.id  ===  use) ){
  items = [
    {
      label:   blockedme && blockedme.some((blocked) =>   blocked.id  === use ) ?"unBlock" : 'Block',
      icon: 'pi pi-ban',
      command: () => {
       blockedme && blockedme.some((blocked) =>   blocked.id  === use ) ? UnBlockUser() :   BlockUser() 
      }
     }
  ]

}else{

  items = [


    blocked && blocked.some((blocked) =>   blocked.id  ===  userId) ? "" :
  {
   
   label:    'Message',
   icon: 'pi pi-envelope',
   command: () => {
 
    setMessage(true)
   }
  
  },
  blocked && blocked.some((blocked) =>   blocked.id  ===  userId)
  
  ?  "": 
  
  {
   label:  'mute',
   icon:  mutedme && mutedme.some((mute) =>   mute.id  === use ) ?  'pi pi-volume-on' : 'pi pi-volume-off' ,
   command: () => {
    mutedme && mutedme.some((mute) =>   mute.id  === use ) ? unMuteUser() :   MuteUser() 

   }
  },
  {
   label:   blockedme && blockedme.some((blocked) =>   blocked.id  === use) ? "unBlock" : 'Block',
   icon: 'pi pi-ban',
   command: () => {
    blockedme && blockedme.some((blocked) =>   blocked.id  === use ) ? UnBlockUser() :   BlockUser() 
   }
  },
  
  blocked && blocked.some((blocked) =>   blocked.id  ===  use)
  
  ? "" : 
    {
   label:  'report',
   icon: 'pi pi-exclamation-circle',
   command: () => {
  
   }
  }
  
  
  
  ]
 
}



const MuteUser = async () => {
          
  // Remove the user ID from the "following" node of the current user
if(user){


 // Update the state with the modified followers array

 

 await app1010.database().ref(`profile/${userId.value}/Muted/${use}`).set(true);
 //    await app019.database().ref(`profile/${user.uid}/blockList/${userId.value}`).set(true);

}
};



const unMuteUser = async () => {
          
  // Remove the user ID from the "following" node of the current user
if(user){


 // Update the state with the modified followers array

 

 await app1010.database().ref(`profile/${userId.value}/Muted/${use}`).remove(true);
 //    await app019.database().ref(`profile/${user.uid}/blockList/${userId.value}`).set(true);

}
};






//const [editable, setEdit] = useState(false);

    const [Le, setLe] = useState(null);

        const [userisopen, setuserisopen] = useState(false)
    //    const [newColor, setNewColor] = useState('');
      //  const [displayPicker, setDisplayPicker] = useState(false);
        //const [colorPickerTarget, setColorPickerTarget] = useState(null);
const [dark, setdark] = useState(false);

useEffect(() => {
if(!Bio){return;}
  if ( Bio.text) {
    const resizedHtmlString = resizeImage(Bio.text);
    setHtmlString(resizedHtmlString);
  }
}, [Bio && Bio.text]);

const pickerRef = useRef(null);
  

useEffect(() => {
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setMessage(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [pickerRef]);





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


const [visibleFollowers,setVisibleFollowers] = useState(false)

const [SelectedFollower, setSelectedFollower] = useState(null);
    const followersupdate = (option) => {
        return (
            <div className="flex align-items-center justify-space-between">
            <img style={{width:"20px"}} src={option.image ? option.profileImg : im} alt='prof'/>

 <Link to={`/profileComponents/${option.id}`}> <li key={option.id}>{option.username}</li> </Link>

            </div>


        );
    };
console.log("if you see the", followers)

    const [visibleFollow,setVisibleFollow] = useState(false)

    const [SelectedFollow, setSelectedFollow] = useState(null);
        const followi = (option) => {
            return (
                <div className="flex align-items-center">
                  <img style={{width:"20px"}} src={option.image ? option.profileImg: im} alt='prof'/>
     <Link to={`/profileComponents/${option.id}`}> <li key={option.id}>{option.username}</li> </Link>
    
                </div>
    
    
            );
        };
    
     

const gradient = Bio.colors && `linear-gradient( ${Bio.side && Bio.side}, ${ Bio.colors.join(', ')})`;

const  [Length, setLength] = useState(0);
const [light,setLight ] = useState(false);
const [dnone, setDnone] = useState(true)

const  [useLeft, setuseLeft] = useState(false)
const [view, setView] = useState(false);

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




</div>
             
             
             
                <figure>





                    <img style={{height:"200px"}} src={Wall} className="img-fluid" alt="profile cover"/>
                </figure>




                <div className="cover-body d-flex justify-content-between align-items-center">
                    <div className='CoverB'>



                        
     {/*Profile Names*/}
    
                  
                </div>
            </div>

<div style={{display:"flex", flexDirection:"row" , zIndex:"99", position:"absolute", top:"80px"}}>
<div>
              <Avatar style={{height:"90px", width:"90px", margin:"5px", marginTop:"-30px"}} shape="circle" size="xlarge" className="profile-pic" image={profileImg } alt="profile"/> 

</div>
  



 <div style={{marginTop:"-15px"}}>


            <div className='fitstatus m-1 ' >

<span style={{textShadow:"1px 1px 0.10px black", fontSize:"1.3rem"}} className="profile-name text-muted useruser">{!userisopen &&   Bio.usernamed ?  Bio.usernamed : deleted.isdeleted && deleted.deletedname }  </span>

<p style={{color: "white",textShadow: "1.2px 1.2px 0.10px black"}}>{!deleted.isdeleted && Bio.status ?  Bio.status : "It's only Memories " }</p>

</div>

<div style={{display:"flex", flexDirection:"column" , marginTop:"-20px"}}>


<div>
{ !deleted.isdeleted &&
                <div className=' smalldisplay ml-9  mt-4 mx-auto'>
                {blocked && blocked.some((blocked) => blocked.id === userId) ? (
      <Button
        className='bg-danger h-fit-content'
        label={`${Bio && Bio.usernamed} "Blocked You"`}
        disabled
      />
    ) : (
      <Button
        disabled={
          (blocked &&
            blocked.some((blocked) => blocked.id === userId)) ||
          (blockedme &&
            blockedme.some((blocked) => blocked.id === user.uid))
        }
        label={
          followers.some(
            (follow) => user && user.uid && follow.id === user.uid
          )
            ? "unFollow"
            : following.some(
                (follow) => user && user.uid && follow.id === user.uid
              )
            ? "followBack"
            : blockedme &&
              blockedme.some((blocked) => blocked.id === user.uid)
            ? "Blocked"
            : "follow"
        }
        onClick={
          followers.some((follow) => user && user.uid && follow.id === user.uid)
            ? unfollowUser
            : followUser
        }
        severity="secondary"
        outlined="true"
        icon="pi pi-user-plus"
        className={`changefrom mx-1 ${
          followers.some((follow) => user && user.uid && follow.id === user.uid)
            ? "bgdar"
            : blockedme &&
              blockedme.some((blocked) => blocked.id === user.uid)
            ? "bgred"
            : "whited"
        }`}
        style={{
          backgroundColor:
            followers.some((follow) => user && user.uid && follow.id === user.uid) &&
            "black",
          padding: "5px",
          color: "white",
        }}
      />
    )}
    
    {blocked &&
      blocked.some(
        (blocked) => blocked.id === userId || (blockedme && blockedme.some((blocked) => blocked.id === user.uid))
      ) ? (
        <></>
      ) : (
        <Button
          label='notify_me'
          severity="secondary"
          outlined="true"
          icon="pi pi-bell"
          className='changefrom mx-1 useracc'
          style={{ padding: "5px", color: "white" }}
        />
      )}
    
    <Menu model={blockedme && blockedme.some((blocked) =>    blocked.id  ===  user.uid)  ?  items : blocked && blocked.some((blocked) =>    blocked.id  ===  userId)?  item : items } className={`${dark && "bg-dark"}`}  popup ref={menu} />
    <Button   icon="pi pi-ellipsis-h" className='trans p-0 text-dark outline-none useracc' outlined={false}  style={{ border:"none",backgroundColor:"transparent"}} onClick={(e) => menu.current.toggle(e)} />
    
    </div> }



</div>


<div>


    {   !deleted.isdeleted &&     <ul style={{display:"flex" ,

paddingBottom: "20px",marginTop:"10px", marginLeft:"-35px"}} className='FlexPRofile'>
                        
                        
                        
                      <li className="header-link-item ml-3 pl-2  d-flex align-items-center mtopheader" >
                   <div className='px-3 'style={{display:"flex"}}>

                      <button disabled={!legth} style={{background:"transparent", border: "none", color:"white", textShadow:"1px 1px black"}} onClick={() => setVisibleFollowers(true)}
                       className="pt-1px  d-md-block" >
                     <span style={{color:"white", textShadow:"1px 1px black"}} className="text-muted tx-12 pt-1">  <b> {legth}</b> Followers</span>
                     
                        </button>

                        <ul>
                    
                    { visibleFollowers &&
                    <div  style={{position:"absolute", zIndex:"100", width: "fit-content", padding: "8px"}} ref={visibility} className="card flex justify-content-center">
                    <ListBox ref={menu}  breakpoint="767px" value={SelectedFollower} onChange={(e) => setSelectedFollower(e.value)} options={followers} optionLabel="name" 
                        itemTemplate={followi} style={{width: "fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
                    </div>
                    }
                          </ul>
                                  </div>

                    </li>



                    <li className="header-link-item ml-3 pl-2  d-flex align-items-center mtopheader" >
                       <div style={{display:"flex"}}> 
                  

                  <button disabled={!Follows}style={{background:"transparent", border: "none", color:"white", textShadow:"1px 1px black"}}  onClick={() => setVisibleFollow(true)}>
                    
                    <span style={{color:"white", textShadow:"1px 1px black"}} className="text-muted tx-12 pt-1">  <b>{Follows} </b> Following</span>

                     </button> 
                 
                    
                     
                      
                 
                    <ul>
                    { visibleFollow &&
    <div ref={visibility} style={{position:"absolute", zIndex:"100"}} className="card flex justify-content-center ">´
    <ListBox ref={menu}  breakpoint="767px" value={SelectedFollow} onChange={(e) => setSelectedFollower(e.value)} options={following} optionLabel="name" 
        itemTemplate={followersupdate} style={{width:"fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
    </div>
    }
        
          </ul>
                  </div>
    
                    </li>  
                    </ul> }
                  





</div>
</div>

 </div>
  </div>
    
            
            </div>
            <div className="header-links" style={{borderBottom: "1px solid gainsboro",

margin: "auto"}}>
           
           <ul className="links d-flex align-items-center mt-3 mt-md-0">
                 




                 <li  id="Allposts" onClick={() => ToggleAllpost(0)} className="hov1 header-link-item ml-3 pl-3 border-left d-flex align-items-center ">
                                  
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user mr-1 icon-md">
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                             <circle cx="12" cy="7" r="4"></circle>
                                         </svg>
                 
                 
                                         <b className="pt-1px d-none d-md-block ">Allposts</b>
                                     </li>
                 
                                     <li id="Posts"  onClick={() =>ToggleApost(1)} className=" hov2 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video mr-1 icon-md">
                                             <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                             <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                         </svg>
                                         <b className="pt-1px d-none d-md-block" >Posts</b>
                                     </li>
                 
                                     
                                   <li  id="MyWall"  onClick={() => ToggleAllvids(2)} className="hov3 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video mr-1 icon-md">
                                             <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                             <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                         </svg>
                                         <b className="pt-1px d-none d-md-block" >MyWall</b>
                                     </li>
                 
                 
                 
                                     <li id="Saved"  onClick={() => ToggleSavedit(3)} className=" hov4 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user mr-1 icon-md">
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                             <circle cx="12" cy="7" r="4"></circle>
                                         </svg>
                 
                 
                                         <b className="pt-1px d-none d-md-block">Saved</b>
                                     </li>
                 
                                   
                                     <li id="Timeline"  onClick={(e) => { e.stopPropagation(); ToggleTimeLine(4); }}
 className=" hov5 header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-columns mr-1 icon-md">
                                             <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                                         </svg>
                                        <b className="pt-1px d-none d-md-block" >Timeline</b>
                 
                                     </li>
                                    
                                 </ul>
                 
            </div>
        </div>
    </div>
</div>

<div className="row profile-body m-auto ">



  

    {/* middle wrapper start */}

    <div className={` middle-wrapper ${useLeft && "mdwraperr"}`} style={{display:"flex",flexDirection:"column",justifyContent:"center", width: useLeft ? "50%" : "60%" ,paddingRight:"15px",paddingLeft:"6px" , marginLeft: useLeft ?  "25%" :  "11%"  }}>
          <List ref={containerRef}>
          
                    
          

<Item   ref={currentWidth}>

<ProfileIndex   userId={useruid}  useid={useruid} 
setLe={setLen} setLength={setLength}  users = {users} Bio={Bio}
username={useruid}  setonHide={setonHide}/>
</Item>
        



<Item ref={currentWidth} >
<ProfileIndex   userId={useruid}  useid={useruid} 
setLe={setLen} setLength={setLength}  users = {users} Bio={Bio}
username={useruid}  setonHide={setonHide}/>
  
</Item>


<Item ref={currentWidth}>

<MyWall  view ={view}
                   setView={setView}  userid={useruid}/>

</Item>

<Item ref={currentWidth} >

Saved
</Item> 


<Item  ref={currentWidth} >
Timeline
  
</Item>
        </List>
 

 </div>
    </div>

 
                       

                
          
      
   

</div>
</div>


</Layout>                          
                                  

)}
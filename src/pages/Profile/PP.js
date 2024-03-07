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

import ProfileIndex from "../ProfileIndex";
import { TabView, TabPanel } from 'primereact/tabview';
import Layout from '../../Navigation/Layout';
import { Avatar } from 'primereact/avatar';
import { ListBox } from 'primereact/listbox';
import Navbar from '../../Navigation/Navbar';
import MyWall from '../MyWall';
import Wall from  '../../images/Video-Wall.png'
import {firebaseConfig019} from '../../Accounts/FirebaseAuth';





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


export default function Pr({location}) {
  const firebaseConfig010 =  firebaseConfig019;

const menu = useRef(null);


const { user, useruid, users} = useAuth();
const use =  user ?  user : useruid.uid;

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



const userId = params.iBla6 || null;



const {onHide,setonHide} = useState()


useEffect(() => {


  if(userId){
if(userId ===  use ){
  window.location.href = "/Profile/P" 



}
  }
}, [])

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


  return (
    
    
    <Layout>




    <section  className={` h-100 gradient-custom-2 mt-8 ${dark && "darken"}`}>
    
    <div style={{marginTop:"100px"}} className={`container mt-7 py-5 h-100 ${blockedme && blockedme.some((blocked) => blocked.id === userId) ? 'blocked' : ''} ${dark ? 'darken' : ''}`}>
        <div   className="row  d-flex justify-content-center align-items-center h-100">
        { message &&(
    <div ref={pickerRef} style={{marginTop:"0", position:"fixed", top: "20%", zIndex: "30", left:"10%"}}>
    {/*<Message onClick={(e) =>  e.stopPropagation()} email={Bio.email} currentUser={user && user} useris={Bio && Bio.usernamed}  userid={userId} /> */}
    
       </div>)}
      
          <div  className="col col-lg-9 col-xl-7">
            <div className="card">
              <div className="iflex rounded-top text-white d-flex  flex-row "
               style={{background: dark ? "#141515": "white", height: "20px", marginTop: "-15px", backdropFilter: "blur(15px) ", position: "relative",height: "100px", backgroundImage:  `url(${profileImg})`, height:"200px",  objectFit:"cover",background: gradient,  backgroundSize: "contain"}}>
              
              <div className='d-flex sizesm  flex-row' style={{ position: "absolute",backdropFilter: "blur(8px)", background: dark ? "rgba(0,0,0,0.20)":"rgba(255,255,255,0.31)"}}> <p className='webs' style={{height:"100%", fontSize: "1.5rem", textShadow: "1px 1px black", color : "white", textAlign:"top", margin: "0", zIndex:"1", fontFamily:"cursive" ,   background: `-webkit-linear-gradient( blue, red, gray, yellow, purple, pink, green, indigo, crimson,aqua,orange,white,silver)` ,webkitBackgroundClip: "text",  webkitTextFillColor: "transparent", paddingLeft: "5px"}} >
                 {Bio.usernamed ? Bio.usernamed : "it's No 1"}´s_aesthetic_color</p>
              </div>
    
    <div className='d-flex '>
                <div className="ms-4 mt-7 " style={{width: "150px", marginTop:"30px"}}>
                  <img src={profileImg}
                    alt="Gep" className="img-fluid img-thumbnail mt-5 mb-2"
                    style={{width: '150px', zIndex: '1'}} />
                
              
                </div>
    
                <div className=" fitcotet  ml-1 " style={{backdropFilter: "blur(8px)", background: dark ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.11)", borderRadius:"10px", marginTop:"90px" , width:"fit-content" }}>
    
    
             <div className='fitstatus '>
                { !userisopen &&    <h5 style ={{color: "white",fontWeight: "bold", fontSize:"1.5rem", textShadow:"1px 1px 0.24px black"}}> {Bio.usernamed ?  Bio.usernamed : deleted.isdeleted && deleted.deletedname } </h5>}
    
    
                 <p style={{color: "white",textShadow: "1.2px 1.2px 0.10px black"}}>{!deleted.isdeleted && Bio.status ?  Bio.status : "It's only Memories " }</p>
    
                 </div>
    
    
                </div>
    
    
                </div>
                </div>
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
    
              <div className="p-4 text-black mt3" style={{backgroundColor: dark ? "#141515" :  "#f8f9fa"}}>
               { !deleted.isdeleted && <div className="d-flex justify-content-end text-center py-1">
              
              
    
                  <div>
                    <p className="mb-1 h5" style={{color : dark && "silver"}}>{Length - 1}</p>
                    <p className="small text-muted mb-0">Posts</p>
                    
                  </div>
    
                  <div className="px-3">
                    <p className="mb-1 h5" style={{color : dark && "silver"}}>{legth}</p>
                  <button disabled={!legth} style={{background:"transparent", border: "none"}} onClick={() => setVisibleFollowers(true)}>
                    <p style={{textShadow:'none'}} className="small text-muted mb-0">Followers</p> </button> 
                  
                    <ul>
                    
    { visibleFollowers &&
    <div  style={{position:"absolute", zIndex:"100", width: "fit-content", padding: "8px"}} ref={visibility} className="card flex justify-content-center">
    <ListBox ref={menu}  breakpoint="767px" value={SelectedFollower} onChange={(e) => setSelectedFollower(e.value)} options={followers} optionLabel="name" 
        itemTemplate={followi} style={{width: "fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
    </div>
    }
          </ul>
                  </div>
    
                  <div> 
                    <p className="mb-1 h5" style={{color : dark && "silver"}}>{Follows}</p>
                  <button disabled={!Follows} style={{background:"transparent",  border:"none"}} onClick={() => setVisibleFollow(true)}><p style={{textShadow:'none'}} className="small text-muted mb-0">Following</p> </button> 
                    <ul>
                    { visibleFollow &&
    <div ref={visibility} style={{position:"absolute", zIndex:"100"}} className="card flex justify-content-center ">´
    <ListBox ref={menu}  breakpoint="767px" value={SelectedFollow} onChange={(e) => setSelectedFollower(e.value)} options={following} optionLabel="name" 
        itemTemplate={followersupdate} style={{width:"fit-content"}} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
    </div>
    }
        
          </ul>
                  </div>
    
                </div>}
    
              </div>
    
              <div className={`card-body p-4 ${dark && "darken"}`} style={{background: dark &&  "" , color : dark ?  "silver" :"black"}}>
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className={`p-4 ${dark && "darken"}`} style={{backgroundColor: dark && "#141515" }}>
               
        <div  className="mb-0">{ReactHtmlParser(htmlString)}</div>
    
    
    </div> 
                
                </div>
    
    
    
               
                {/* Pots   Items*/}
    
              
               
                {/* Pots   Items*/}
    <div>
    <div className="card" >
                <TabView   scrollable>
                    <TabPanel  header="Posts" leftIcon="pi pi-book mr-2">
                     
                    <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0"> posts</p>
                  <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                </div>
    
    
                <ProfileIndex dnone={dnone} userId={useruid}  useid={userId}
     setLe={setLen} setLength={setLength}  users = {users} Bio={Bio} 
      username={useruid}  setonHide={setonHide}/>
    
    
     
    
    
               
    
         
    
    
                    </TabPanel>
    
                      <TabPanel headerTemplate={tab2} headerClassName="flex align-items-center">
                    
                      <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
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



export const Head = () => <title>profile</title>
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import { Editor } from "primereact/editor";
import { nanoid } from 'nanoid';
import im from "../../images/proxy.jpeg"
import 'firebase/auth';
import 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noImg from "../../images/no-image.jpg"
import Layout from '../../Navigation/Layout';
import { Button } from 'primereact/button';
import ReadingModeComponent from "./ReadingModeComponent"
import PagesData from '../../Navigation/PagesData';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import{
 
  faRemove,
  faPaperPlane,
  

 
} from '@fortawesome/free-solid-svg-icons';
import 'firebase/compat/firestore'; // import from compat version
import { isObject } from 'lodash';

  import {firebaseConfig019} from '../../Accounts/FirebaseAuth';
    const firebaseConfig16190 = {
      // Your Firebase configuration here
      apiKey: "AIzaSyDiegssGy9vROHCfVsCDNrPCJrbilonB-U",
    
      authDomain: "compo-57c97.firebaseapp.com",
    
      databaseURL: "https://compo-57c97-default-rtdb.firebaseio.com",
    
      projectId: "compo-57c97",
    
      storageBucket: "compo-57c97.appspot.com",
    
      messagingSenderId: "475037571261",
    
      appId: "1:475037571261:web:9db4f4bdd540a72bbb3fd4"
    
    };
    
    const firebaseConfig14129 = {
    
      apiKey: "AIzaSyBh8ygMi8nTJ7WVcA9amKSwABs_NzJZQk4",
    
      authDomain: "chatszen.firebaseapp.com",
    
      databaseURL: "https://chatszen-default-rtdb.firebaseio.com",
    
      projectId: "chatszen",
    
      storageBucket: "chatszen.appspot.com",
    
      messagingSenderId: "83570132385",
    
      appId: "1:83570132385:web:b9d0772699726c7bb4f7e0",
    
      measurementId: "G-4S4BTTXP48"
    
    };
    
    

const firebaseConfig2000 = {
  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"

};



const firebaseConfig90900 = {

  apiKey: "AIzaSyAlILFCEiJQQJsQB2a0uidx61r9zfEVLWc",

  authDomain: "notifications-a1743.firebaseapp.com",

  databaseURL: "https://notifications-a1743-default-rtdb.firebaseio.com",

  projectId: "notifications-a1743",

  storageBucket: "notifications-a1743.appspot.com",

  messagingSenderId: "624660139679",

  appId: "1:624660139679:web:a73fd504b5ba8e7b005caa",

  measurementId: "G-BCF42GY6H1"

};

 export default function ProfileSavedPosts(props){
  const firebaseConfig01900 = firebaseConfig019; 
  const setAllData = props.setAllData ? props.setAllData : [];
 const nano = nanoid();
 const newss = props.newss;
const {users} = useAuth();
const user = users;
    const [saved, setSaved] = useState([])
const AllData = props.AllData ? props.AllData : [];

firebase.initializeApp(firebaseConfig2000, 'app111');
    const app400 = firebase.app('app111');

  const    onHide =   props.onHide;
 const setonHide = props.setonHide;


    firebase.initializeApp(firebaseConfig14129, 'app1312');
    


    const editing = props.editing;
const  setEditing = props.setEditing;

    const app1212 = firebase.app('app1312')


    const apps2 = firebase.initializeApp(firebaseConfig01900, 'app200');
    const app2 = firebase.app('app200') 
  
   
    const apps9 = firebase.initializeApp(firebaseConfig90900, 'app9');
    const app9 = firebase.app('app9');

    const databaseSavedNews = app1212.database();
    const savedItemsRef = user && databaseSavedNews.ref(`savedNews/${user.uid}`);
    
    
    const app1919 = firebase.initializeApp(firebaseConfig16190, 'app1819');
    const database = app1919.database();
    

   
    


    function saveit(item) {
      const isSaved = false;
      savedItemsRef.child(item).remove();
      
      const index = saved.indexOf(item); // Get the index of the item in the array

  if (index !== -1) {
    saved.splice(index, 1); // Remove the item from the current position isLoading
  }

  saved.push(item); //  onHide handleExits  Add the item at the end of the array

  setSaved([...saved]); // Update the state with the modified array
  setAllData((data) =>  [...data, ...saved])
    }
    
    
    
    useEffect(() => {
    if (!savedItemsRef) {
      return;
    }
    
    const onDataChange = (snapshot) => {
      const savedData = snapshot.val();
      if (savedData) {
        const titles = savedData;
        setSaved(titles);
        setAllData((data) => [...data, titles ])
      } else {
        setSaved({});
      }
    };
    
    savedItemsRef.on('value', onDataChange);
    
    return () => {
      savedItemsRef.off('value', onDataChange);
    };
    } ,[user]);
          


    const [itemsPerPage] = useState(40); // usernames number of items to display per page
    const [currentPage, setCurrentPage] = useState(1); // current page number
    const totalPages = saved ? Math.ceil( isObject(saved) && Object.keys(saved).length / itemsPerPage) : 0;
    console.log(`totalpages ${totalPages}`)
    console.log(`currentPages ${currentPage}`)
    console.log(`itemsperpage ${itemsPerPage}`)

  
  // Method for handling page changes
  const handlePageChange = (page) => {
    if (page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentNews = saved  && Object.values(saved).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage )
  
  const [da, setda] = useState('Ent')
 
  const [off, setoff] =  useState(false);
 
  const [light,setLight ] = useState(false)

  const [saveits,setSavits ] = useState(false)



const [cards, setCards] = useState({});

useEffect(() =>{

},[cards])

const [cardid, setcardid] = useState([]);

const [compl, setCompl] = useState(false)


  

    
             
useEffect(() => {
 
  if(cards.id){

  
  setEditing(cards.id);
  }
}, [cards])
       
  




async function handledata(id) {
  try {
    const snapshot = await app400.database().ref("comments")
      .orderByChild("id")
      .equalTo(id)
      .once("value");
    if ( snapshot && snapshot.exists()) {
       await app400.database().ref(`comments/cards/`).update({
       ...cards
      });
     //console.log(exists) handlePost

     setCompl(true)
   
     // Retrieve the list of followers for the user who posted the new item
 
     compl && setCards({})
 
     compl && setval({})
   
     // Retrieve the list of followers for the user who posted the new item
 
 
    } else {
      const userRef = app400.database().ref(`comments/cards/`);
      userRef.push({
         ...cards
      });
          //console.log(success)
      
      
     compl && setCards({})
     setCompl(true)    

             
    }
  
  } catch (error) {
    console.log(error);
         //console.log(error) Reload
      
  }
  
  const profilesRef = app2.database().ref(`profile/`);

  profilesRef.once('value', (snapshot) => {
    snapshot.forEach((profileSnapshot) => {
      const followers = profileSnapshot.child('followers').val();
      if (followers && Object.keys(followers).includes(user.uid)) {
        const userId = profileSnapshot.key;
        console.log("User with ID ", userId, " has ", user.uid, " in their followers");
        // Do something with the userId here
        
        // Add a new notification for this follower
        const notification = {
          receive: userId,
          usersend: user.uid,
          cardid,
          content: `${user.uid} posted a new message: ${cardid}`,
          viewed: false,
        };
        

  const postsRef = app9.database().ref(`users/${userId}/posts/`);
  
if(postsRef.child("message") === cardid.message || postsRef.child("message/title") === cardid.message.title){
  return
}else{
  const newPostRef = postsRef.push();

  newPostRef.set({
   userId,
   cardid
  }).then(() => {
    console.log("Post added successfully");
    setcardid([]);
  }).catch((error) => {
    console.error("Error adding post:", error);
  });


 

}
    }  })
  
  })

    }        
  

if(cards){
  console.log("wateve", cards)
}

    const [val, setval] = useState({})

    const handleClick = (newss) => {
      if(!newss){return;}
      setCards({
        id: nano,
        message: newss,
        font: "sans-serif",
        showCommentBox: "",
        liked: "0",
        disliked: "1",
        profile: profileImg,
        user: username,
        datePosted: new Date(),
        mail: user.email,
        userId: user.uid,
        news:"itsnews"
      });
     

    setEditing(cards.id);
  setval(newss)
    
      setcardid({
        id: nano,
        message: newss,
        userid: user.uid,
        user: username,
        datePosted: new Date(),
      });
    
    
     setCompl(true)
      
     
        setonHide(false);
        console.log("tis is te loo",cards )
      
    };
    const handleEdit = (id, newMessage) => {
      const newCards = cards.map((card) =>
        card.id === id ? { ...card, message: newMessage } : card
      );
      setCards(newCards);
    
      const newCar = cardid.map((card) =>
      card.id === id ? { ...card, message: newMessage } : card
    );

  setcardid(newCar);
  
};
 



const [profileImg, setProfileImg] = useState(im);

const [usernames, setUsernames] = useState({
  useris : null,
  userData : null,
  
});

const username = usernames.useris 

useEffect(() => {  
    
  if (user && user.email) {
    app2
      .database()
      .ref('profile')
      .orderByChild('email')
      .equalTo(user.email)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userId = Object.keys(snapshot.val());
          const snapshotval = snapshot.val()[userId];
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
   }, [user])

useEffect(() => {
  // Only run the effect if the user object is defined
  if (user) {
    app2.database().ref(`profile/${user.uid}/profileImg`).on('value', snapshot => {
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



},[user]);




const handlexits = (id)  => {

  if(!compl){return;}

 setCards({})
 setEditing(false)
 setval({})
 setcardid([])
}


function locale(){


}


const [showMark , SetshowMark] = useState(false)


const [editorHtml, setEditorHtml] = useState('');

const handlePost = (id) => {
 handledata(id)
  setonHide(true)

setCompl(true)

compl &&  setEditing(false);


};



function Setshow(mark){

    SetshowMark(mark)

}

const handleImagePaste = async (event) => {
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData('Text');

  // Check if the pasted data is an image URL
  if (isImageUrl(pastedData)) {
    // Fetch the image URL and convert it to an HTML image tag
    try {
      const response = await axios.get(pastedData, { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      const imgTag = `<img src="${imageUrl}" alt="Pasted Image" />`;

      // Insert the image tag into the editor
      const newEditorHtml = editorHtml + imgTag;
      setEditorHtml(newEditorHtml);
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  }

  // Check if the pasted data is a YouTube link
  if (isYoutubeLink(pastedData)) {
    // Extract the YouTube video ID from the link
    const videoId = extractYoutubeVideoId(pastedData);

    // Create an HTML iframe tag for embedding the YouTube video
    const iframeTag = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    // Insert the iframe tag into the editor
    const newEditorHtml = editorHtml + iframeTag;
    setEditorHtml(newEditorHtml);
  }
};

// Helper function to check if a string is a valid image URL
const isImageUrl = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
};

// Helper function to check if a string is a valid YouTube link
const isYoutubeLink = (link) => {
  return link.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) !== null;
};

// Helper function to hn the YouTube video ID from a link
const extractYoutubeVideoId = (link) => {
  const videoIdMatch = link.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (videoIdMatch) {
    return videoIdMatch[3];
  }
  return '';
};


const generateQueryString = (newss) => {
  if(!newss){return;}
  const queryParams = new URLSearchParams();
  queryParams.set('title', newss.title);
  queryParams.set('imageSrc', newss.images && newss.images[3] || noImg);
  queryParams.set('paragraphs', JSON.stringify(newss.paragraphs));
  return queryParams.toString();
};

const overflowWrap ={
  overflowWrap:"break-word",
  wordBreak:"break-word"
}
/*{ `<span className="bg-dark bgeditor w-100 h-100"> <h1 style=${ overflowWrap } className="h1Edit bg-dark"> ${val.title}</h1> <img  className="m-auto" src= ${noImg}/>  <br/>   <p style=${ overflowWrap } className="textEdi">${val.paragraphs }</p> </span>`}*/
 
 
 if(!newss){
  return;
 }
 return (
<Layout >
 
<PagesData light={light} setLight= {setLight} off={off} setoff={setoff}  da={da} />

<div className="containe">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className={`card-body ${light && "backframe"}`}>
          <div className="row">
            <div className="col-sm-12">
              <h1 className="font-weight-600 mb-4">SavedNews</h1>
            </div>
          </div>
          AllData


                 <div className="column" >
                 <div className="row">

                { editing ? (
<div className="pp d-flex paddin jusify-center" style={{background:"", width:"95vw", backdropFilter: "blur(25px)",  zIndex: "105", position: "fixed", top: "10px", left: "0", right: "0"}}>
<div className="fineEditor" style={{marginLeft:"19%", position:"relative"}}>
<Editor
 value="" 
  onTextChange={(e) => handleEdit(AllData.id, e.htmlValue)}
  onPaste={handleImagePaste}
placeholder="Add Subject or leave blank"
  className="ql-snow ql-editor-custom customed"
  style={{ height: "320px", overflow: "scroll", width: "100%", marginLeft: "auto", marginRight: "auto" }}
/>

<Button
  label={editing ?   "post" : "Edit"}
  icon="pi pi-upload"
  style={{zIndex: "3",position: "absolute", right: "0"}}
  className=" p-button-dark p-button p-mt-2 p-2 bg-dark"
  onClick={() => handlePost(AllData.id)}
/> 


<Button     
            icon="pi pi-times"
            className="p-button-danger p-button p-mt-2 p-0 m-0 exitbuttons"
            style={{zIndex: "3",position: "absolute", top: "0", right: "0"}}

            onClick={() => handlexits(AllData.id)}
          />
</div>

</div>

) : (
<> </>

)}   


         
                <div  className="col-sm-6 col-lg-4 grid-margin">
                       <div className="col-sm- grid-margin">
                       <Link
    
      
      >
         
       <div   onClick={() => handleClick(newss)}   icon= {showMark === newss && "pi-file-export" }  onMouseEnter={ () => Setshow(newss)  }
        onMouseLeave={() => Setshow(false)}   onMouseOVer={() => Setshow(newss)  }
          onMouseDown={() => Setshow(false)}                   
          className={`${!showMark && "image-container"}  img-fluid image-container`}
> 

<Button  style={{fontSize:"1.5rem", cursor:"pointer",
 position:"absolute", top:"0", left:"0",
 zIndex:"8", color: 'slateblue' , margin:"auto", width:"100%", 
  height:"100%",background:"transparent", border:"none" }} icon="pi pi-file-export" onClick={() => handleClick(newss)}>
     <span style={{}}>Share</span></Button>

      <img style={{position:"relative", zIndex:"7", width:"-webkit-fill-available",maxWidth: "100%"}} src={newss?.images && newss?.images[3] || noImg} 
                             alt="bannerImg"
                            
width={400}
height={200}
                             onClick={() => locale(newss)}
                           />
                         </div>
                         </Link>
                         
                       

                       </div>
                       <div className="col-sm-8 grid-margin">
                       <Link
      to={`/profileComponents/ReadingModeComponent?${generateQueryString(newss)}`}
     
      > <h2 className="font-weight-600 mb-2 " style={{width:"100%"}} onClick={() => locale(newss)}>
                         {newss.title.length > 30 ? newss.title.slice(0, 33) : newss.title }
                         </h2></Link>
                         <p className="fs-13 text-muted mb-0">
                           <span className="mr-2">Photo </span>10 Minutes ago
                         </p>
                         <button 
onClick={() => {
  const matchedKey = Object.keys(saved).find(key => saved[key] === newss);
    saveit(matchedKey);
}}
style={{
         color: saved[newss.title] ? "tomato" : "yellowgreen",
         border: "none",
         width: "fit-content",
         height:"fit-content"
       }}
     ><FontAwesomeIcon icon={faRemove} className="savedit" style={  { color: saved[newss.title] ? "tomato" :  "orange"}} /> remove </button>   
       <Link
      to={`/profileComponents/ReadingModeComponent?${generateQueryString(newss)}`}
      
      >


                         <p className="fs-15" style={{width:"100%"}} onClick={() => locale(newss)}>
{newss.paragraphs[0].slice(0, 200) + "...ReadMore"  }  
                         </p></Link>
                       </div>
                     </div>
              

                  


           
          
         
      
                  
               </div>
               </div>
               </div>
             </div>
           </div>
         </div>
       </div>

 </Layout>


  );
};



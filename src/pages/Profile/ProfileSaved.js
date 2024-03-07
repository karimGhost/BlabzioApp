import React, { useEffect, useState, useRef, isValidElement } from "react";
import { nanoid } from "nanoid";
import VideoPlayer from "../Components/Videoplayer";
import MyWall from "../MyWall";
import { useAuth } from "../../Accounts/useAuth";
import axios from "axios";
import ProfileIndex from "../ProfileIndex";
  
import Comments from "../Posted/Comments";                          
//import NAvbar from "../Navbar";
import Navbar from "../../Navigation/Navbar"
import { propTypes } from "react-bootstrap/esm/Image";
import im from "../../images/proxy.jpeg";
import { Button } from "primereact/button";
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Skeleton } from 'primereact/skeleton';
import { Editor } from "primereact/editor";
import noImg from "../../images/no-image.jpg";

import "firebase/compat/storage";
import { isObject } from "lodash";
import TimeLine from "../Components/TheWall/TimeLine";
import CommentInput from "../Components/CommentInput";
import EditedVideo from "../Components/Editvideo";
import MyVideosContainer from "../Components/TheWall/MyVideosContainer";
import debounce from 'lodash/debounce';
import { getFirestore, collection, query, orderBy,where, limit,enableTimestampsInSnapshots, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { orderByKey, startAt } from "firebase/database";
import { arrayOf, object } from "prop-types";
import LoadingAnim from "../../Accounts/LoadingAnim";
import { initializeApp } from 'firebase/app';
import ScrollContainer from "../Components/ScrollContainer";
import { useLocation } from "@reach/router";
import Gallery from "../Profile/Gallery";
import ProfileTimeLine from "../Profile/ProfileTimeLine";
import blab from "../../images/Blab.jpeg";
import SavedVid from "./SavedVid";
import ProfileSavedPosts from "./ProfileSavedPosts";
import "../../styles/TheWall.css"
import "../../styles/Video.scss"
 import "../../styles/index.css";
 import "primereact/resources/themes/lara-light-indigo/theme.css";     
import styled from "@emotion/styled";

import "primereact/resources/primereact.min.css";  
const firebaseConfigTheWall = {
  apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
  authDomain: "thewall-10a4a.firebaseapp.com",
  databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
  projectId: "thewall-10a4a",
  storageBucket: "thewall-10a4a.appspot.com",
  messagingSenderId: "221023885061",
  appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
  measurementId: "G-7V80059NF7",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS",
};




const firebaseConfigTimeline = {
  apiKey: "AIzaSyAlILFCEiJQQJsQB2a0uidx61r9zfEVLWc",
  authDomain: "notifications-a1743.firebaseapp.com",
  databaseURL: "https://notifications-a1743-default-rtdb.firebaseio.com",
  projectId: "notifications-a1743",
  storageBucket: "notifications-a1743.appspot.com",
  messagingSenderId: "624660139679",
  appId: "1:624660139679:web:a73fd504b5ba8e7b005caa",
  measurementId: "G-BCF42GY6H1"
}


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


const firebaseConfig01900 = {

apiKey: "AIzaSyAM5p7O6YuAvCxfDCbR48Duz019qkoVp0Y",

authDomain: "itsmynodezena.firebaseapp.com",

databaseURL: "https://itsmynodezena-default-rtdb.firebaseio.com",

projectId: "itsmynodezena",

storageBucket: "itsmynodezena.appspot.com",

messagingSenderId: "299392955521",

appId: "1:299392955521:web:ef5671ad2702d441304980"

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




export default function ProfileSaved(props) {

const setAllData = props.setAllData;
const AllData = props.AllData;
const DisplayMode = props.DisplayMode;
const setDisplayMode = props.setDisplayMode;

const BottomLoading = props.BottomLoading;
const [editing, setEditing] = useState(false)
const [onHide, setonHide] = useState(true);





const handlexits = (val)  => {



 setEditing(false)

}


  return(
  
    <>



    {/* <NAvbar vid={vid}/>  /reload */} 

    
  
   
        <div  style={{ display:"flex", justifyContent:"center", background:"#f1efec85", fontSize:"50px", position:"fixed", bottom:"0", left:"0", right:"0", margin:"auto", width:"100vw"}}>
         {BottomLoading ? <i style={{textAlign:"center", fontSize:"2rem"}} className="pi pi-spin pi-spinner"></i> : "" }
  
         </div>
       
     
  
       
       
     
  
  
       
    <div>
    <ProfileContainer horizontal={DisplayMode}>

  
  { AllData?.map((vid) => ( vid &&
    <>
    {vid?.data ? 



<div     onClick={ () => setDisplayMode(true) }>

<SavedVid 
onClick={ () => setDisplayMode(true) }
video={vid.data && vid.data.recordedVideo}
poster={vid.data.poster}

setDisplayMode ={setDisplayMode}

DisplayMode = {DisplayMode}
AllData={AllData}
setAllData={setAllData}
          
/>




</div>


 
   
  :




  
<div className="App w-100" style={{ margin: "auto" }}>
 
<div
        key={vid.id}
        className=""
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        {editing[vid.id] ? ( 
        <>
        </>
        ) : (
          <> </>
        )}
{!onHide && (
          <div
            onClick={() => handlexits(vid.id)}
            style={{
              background: "rgba(250, 247, 247, 0.16)",
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              zIndex: "100",
              backgroundColor: "rgba(100,100,100,0.21)",
              display: "flex",
              justifyContent: "center",
              width: "100vw",
              marginRight: "-10px",
            }}
          ></div>
        )}
      
          <div className="mb-2  w-100">
          {
            <ProfileSavedPosts
            newss ={AllData}
             AllData={AllData}
setAllData={setAllData}
          
           editing = {editing}
           setEditing = {setEditing}  
           onHide ={onHide}
setonHide ={setonHide}
            /> 
          }
        </div>
      </div>
  

  {AllData.length < 0 && (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <i
        className="pi pi-spin pi-spinner"
        style={{ fontSize: "2rem", textAlign: "center" }}
      ></i>
    </div>
  )}
</div>
        
        
    }     
  
</>
))}

  
</ProfileContainer>
  
  </div>

</>
);
}



 

const MediaItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
margin-bottom: 10px;
height:220px;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;



const List = styled.div`
max-height: 100vh;

  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

const Item = styled.div`
  margin: 0;
  padding: 20px 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  scroll-snap-align: start;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
position:relative;
  background: #eee;
 overflow: hidden;
  @media (min-width: 991px) {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Loader = styled.div`
  min-height: 20vh;
  margin-bottom: 30px;
  display: flex;
  background: #444;
  scroll-snap-align: start;
  color: #eee;
  align-content: center;
  align-items: center;
  scroll-snap-align: start;

  justify-content: center;
`;






const ProfileContainer = styled.div`
display: grid ;
  grid-template-columns:${props => (props.horizontal ?  'auto' :'repeat(auto-fill, minmax(200px, 1fr))')};
  gap: 2px;

  @media screen  and (max-width: 424px){

    grid-template-columns: ${props => (props.horizontal ?  'auto' : 'repeat(auto-fill, minmax(100px, 1fr))' )};

  }
`;




{
/*


DataFor Posts  ///
   Create={false}
               fullSizeImage={props.fullSizeImage}
               setFullSizeImage={props.setFullSizeImage}
               useruid={useruid}
               dark={props.dark}
               userId={vid.userId}
               copied={vid.copied}
               shared={vid.shared}
               snoop={() => snoop(vid.id)}
               datePosted={formatDate(vid.datePosted)}
               ids={vid.id}
               profileuser={profileImg}
               user={vid.user ? vid.user : "Anonymous"}
               profileImg={vid.profile}
               username={vid.user}
               liked={vid.liked}
               handleCommen={() => handleCommen(vid.id)}
  //             handlePost={() => handlePost(vid.id)}
               handleDismiss={() => handleDismiss(vid.id)}
               card={vid.font}
               showCommentBox={vid.showCommentBox}
               handlecancel={() => handlecancel(vid.id)}
               handleComment={() => handleComment(vid.id)}
               posted={vid.message}


               //////




  <div
            className="pp d-flex paddin jusify-center"
            style={{
              background: "",
              width: "95vw",
              backdropFilter: "blur(25px)",
              zIndex: "105",
              position: "relative",
              top: "10px",
              left: "0",
              right: "0",
            }}
          >
            <div
              className="autoaddi"
              style={{ margin: "auto", position: "relative" }}
            >
            <Editor
                onPaste={handleImagePaste}
                value={
                  vid.message + typeof hasdata === "object"
                    ? `<br/> <br/> <span className="bg-dark disabled bgeditor w-100 h-100"> <h1 style=${overflowWrap} className="h1Edit bg-dark"> ${
                        hasdata.title && hasdata.title
                      }</h1> <img  className="m-auto" src= ${
                        hasdata.images[3] ? hasdata.images[3] : noImg
                      }/>  <br/>   <p style=${overflowWrap} className="textEdi">${
                        hasdata.paragraphs && hasdata.paragraphs
                      }</p> </span>`
                    : hasdata
                }
                onTextChange={(e) => handleEdit(vid.id, e.htmlValue)}
                className="ql-snow ql-editor-custom customed "
                style={{
                  height: "320px",
                  overflow: "scroll",
                  width: "100%",
                  marginLeft: "auto",
                                   marginRight: "auto",
                }}
              />

              <Button
                label={editing[vid.id] ? "Edit" : "post"}
                icon="pi pi-upload"
                style={{
                  zIndex: "3",
                  background:"black",
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                }}
                className=" p-button-dark p-button p-mt-2 p-2 bg-dark"
                onClick={() => handlePost(vid.id)}
              />

              <Button
                icon="pi pi-times"
                className="p-button-danger p-button p-mt-2 p-0 m-0 exitbuttons"
                style={{
                  zIndex: "3",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                onClick={() => handlexits(vid.id)}
              />
            </div>
          </div>

*/

}
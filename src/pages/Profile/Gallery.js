import React, { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


import { FaPlay, FaPause,FaFileVideo,  FaHeart, FaEye, FaComment, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import { nanoid } from 'nanoid';

import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {FaBookmark} from 'react-icons/fa'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Tooltip } from 'primereact/tooltip';
import icon from  "../../images/icon.png";
import blab from  "../../images/Blab.jpeg";
import ScrollContainer from "../../pages/Components/ScrollContainer";
import styled from 'styled-components';

const firebaseConfigTheWallPlayer = {
  apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
  authDomain: "thewall-10a4a.firebaseapp.com",
  databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
  projectId: "thewall-10a4a",
  storageBucket: "thewall-10a4a.appspot.com",
  messagingSenderId: "221023885061",
  appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
  measurementId: "G-7V80059NF7",
};



const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2px;

  @media screen  and (max-width: 424px){
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  }
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: 8px;
height: 245px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const Gallery = ({
  poster,DisplayMode,setRecordedVideos, video,content,index,CommentReply,
  updateLikes ,setValue , Image, Useris, setRecordedVideo, Openit,
   videos, sameID,  Comment, value, activateComments, comentcontairef, vidref,
    setvideodid,commentAfterReply,toggleLike,Reload,valueReply,setValReply,
  toggleDelete, last,updateSaved,setDisplay,recordedVideos
,setDisplayMode }) => {



 return (
   DisplayMode   ? 

 
<div style={{width:"80%" , margin:"auto"}}>

<ScrollContainer 
   video={recordedVideos}
   
   content = {content}
   index={content.data.id}
   
   CommentReply = {CommentReply}
   updateLikes ={updateLikes}
    setValue ={setValue}
    Image={Image && Image}
                     Useris={Useris ? Useris : "Anonymous"}
                     setRecordedVideo={setRecordedVideos}
                     Openit={Openit}
                     videos={recordedVideos}
                     sameID={sameID}
                     Comment={Comment}
                     value={value.comment}
                     activateComments={activateComments}
                     comentcontairef={comentcontairef}
                     vidref={vidref}
                     setvideodid={setvideodid}
   commentAfterReply ={commentAfterReply}
   toggleLike={toggleLike}
   Reload={Reload}
   valueReply={valueReply.comment}
   setValReply={setValReply}
   toggleDelete={toggleDelete}
   last={last}
   updateSaved={updateSaved}
              
    setRecordedVideos = {setRecordedVideos}
   />


</div>
:

<MediaItem onClick={ () => setDisplayMode(true) } >


  <div  style={{position:"absolute",display:"flex",height :"fit-content" , zIndex:"29", top:"5px", bottom:"0", left:"5px", right :"0"}}>
    <FaFileVideo style={{color:"silver"}}/>

  </div>

  <div onClick={ () => setDisplayMode(true) } style={{position:"absolute",color:"silver",textShadow:"0.99px 0.99px 0.99px gray", justifyContent:"center",display:"flex",alignItems:"center",  zIndex:"29", top:"0", bottom:"0", left:"0", right :"0"}}>

    <span> <FaEye style={{color:"orange"}}/> <span>20</span> <br></br>  </span>

 
  </div>


<div style={{position:"absolute",height :"fit-content" ,display:"flex", justifyContent:"space-between", zIndex:"29", bottom:"5px", left:"0", right :"0"}}>


  <span style={{color:"silver", textShadow:"0.99px 0.99px 0.99px black",marginLeft:"10px", float:"left"}}> <span style={{color:"silver", textShadow:"0.99px 0.99px 0.99px black"}}>20</span>  <FaComment style={{color:"silver" }} /></span>

<span style={{color:"silver", textShadow:"0.99px 0.99px 0.99px black",marginRight:"10px", float:"right"}}> <span>20</span>  <FaHeart style={{color:"orange"}} /> </span>


  </div>



<img src={poster} style={{borderRadius:"2px"}} />
</MediaItem>


  
  

 )


};

export default Gallery;




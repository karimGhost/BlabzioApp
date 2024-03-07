import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaHeart, FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import video from "../../../images/anim.mp4";

import { navigate } from 'gatsby';
import { Avatar } from 'primereact/avatar';
import { InputTextarea } from "primereact/inputtextarea";

import { array } from 'prop-types';
import { useMemo } from 'react';
import heart from "../../../images/heart.webp";
import hearted  from "../../../images/heart+.png";
import share  from "../../../images/share.webp";
import chat  from "../../../images/chat.webp";

import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {FaBookmark} from 'react-icons/fa'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import Nothinghere from "../../../Accounts/Nothinghere";
import { Button } from 'primereact/button';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import * as ideo from "../../../styles/Video.scss";
import 'primeicons/primeicons.css';
import "../../../styles/TheWall.css"
import '../../../styles/Video.scss';

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

  function MyVideos(props) {
// const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2";
//const {user}  = useAuth(); localStorage orange

const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2";


const accept = () => {

  DeleteVid(props.id, props.user, props.video)

  toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Succesfully Deleted Forever!', life: 3000 });
};

const reject = () => {
  toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You Canceled', life: 3000 });
};
//const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2"; localstorage

const confirm2 = (event) => {
  confirmPopup({
      target: event.currentTarget,
      message: 'This Cannot be undone, Proceed?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
      reject
  });
};


    firebase.initializeApp(firebaseConfigTheWallPlayer, "appWallPlayer");

    const appWall = firebase.app("appWallPlayer");

    const type =typeof window !== 'undefined' ? sessionStorage.getItem('LocalLikes') : null
  const [Liked, setLiked] = useState(type)


   const  setImg = props.setImg;
const setUser = props.setUser;

const  videos= props.playvid;

const  localLike = props.localLike;



    const [likesAmount, setLikesAmount] = useState('');
    
    const videoRef = useRef(null);
    const barRef = useRef(null);
    const durationRef = useRef(null);
    const rangeRef = useRef(null);
    const commentsCountRef = useRef(null);
    const commentsCount2Ref = useRef(null);
    const commentsListRef = useRef(null);
    const overlayRef = useRef(null);
    const closeOverlayRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const closeCommentsRef = useRef(null);
    const likesRef = useRef(null);
    const likesIconRef = useRef(null);
const setRecordedVideo = props.setRecordedVideo;
const [showNull, setShowNull] = useState(null);

useEffect(() => {

      if(!videoRef.current && !videoRef.current){
        return;
      }
      if (videoRef.current) {
 
     videoRef.current.addEventListener('timeupdate', updateProgress)
      }
   
    // Clean up the event listener when the component unmounts user.uid
    return () => {
   videoRef.current &&   videoRef.current.removeEventListener('timeupdate', updateProgress);
    };



    }, [videoRef,user]);
  


const Image =props.Image;
const  Useris = props.Useris;

   
    const displayTime = (time) => {
      const mins = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      seconds = seconds <= 9 ? `0${seconds}` : seconds;
      return `${mins}:${seconds}`;
    };  
  


    const updateProgress = () => {
      if (videoRef.current && barRef.current && durationRef.current) {
        barRef.current.style.width = `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%`;
     
        if (durationRef.current && durationRef.current.textContent) {
          durationRef.current.textContent = `${displayTime(videoRef.current.currentTime)} : ${displayTime(videoRef.current.duration)}`;
        }
     
      }
    };
  
    const setProgress = (e) => {
      const time = e.nativeEvent.offsetX / rangeRef.current.offsetWidth;
      videoRef.current.currentTime = time * videoRef.current.duration;
    };
  
    const activateComments = () => {
      commentsContainerRef.current.classList.add("comments-active");
      videoRef.current.pause();
      if (videoRef.current.pause) {
        videoRef.current.style.cursor = "pointer";
      }
    };
  
    const deactivateComments = () => {
      if (videoRef.current.pause) {
        commentsContainerRef.current.classList.remove("comments-active");
        videoRef.current.play();
        videoRef.current.style.cursor = "default";
      }
    };

    const [loadedComments, setLoadedComments] = useState([]);


const updateLikes = props.updateLikes;


    const darkmode = useRef(null)
    
    const [value, setValue] = useState({
      userName: Useris,
      timePosted: "2hrs ago",
      profilePhoto: Image,
      comment: "",
      userid : user ? user : "" ,
      id: nanoid()
    });

function Comment(id){
  setRecordedVideo(prevRecordedVideo => 
    prevRecordedVideo.map(video => {
      if (video.id === id) {
        return {
          ...video,
          comments: [...video.comments, value]
        };
      }
      return video;
    })
  );
console.log("values as is ", props.recordedVideos )
  // After adding the comment, reset the value state to clear the comment field  localstorage
  setValue(prevValue => ({ ...prevValue, comment: '' }));
}

const [showButton, setShowButton] = useState(true);


const togglePlay = (id) => {
  
  props.sameID.current = id;
  if (videoRef.current && videoRef.current.id === id) {
    if (isPlaying) {
    //  videoRef.current.pause();
 
      setShowButton(true);
    } else {
    //  videoRef.current.play();

      setShowButton(false);
    }
  }
  props.setOpen(true)
  props.setSlideDisable(true)

};





const [videoStates, setVideoStates] = useState(
props.recordedVideos && props.recordedVideos.map(video => ({ id: video.id, isVisible: false, isHovered: false }))

);


console.log("visibilitu", showButton)


const toggleVisibility = (id, isVisible) => {
  const updatedVideoStates = videoStates.map(videoState =>
    videoState.id === id ? { ...videoState, isVisible } : videoState



  );
  setVideoStates(updatedVideoStates);
};

const [isPlaying, setIsPlaying] = useState(true);
const [showtip, setShowtip] = useState(false)



let playbackTimeout; 
const startPlayback = (id) => {

  if(!videoRef.current.id === id){
    return;
  }
  if (videoRef.current && !isPlaying) {
  
   videoRef.current.play();

   var playPromise = videoRef.current.play();

   if (playPromise !== undefined) {
     playPromise.then(_ => {
       // Automatic playback started!
       // Show playing UI.
       setIsPlaying(true);
     })
     .catch(error => {
       // Auto-play was prevented
       // Show paused UI.
     });
   }

 

   
    //setShowButton(false);


    setShowtip(true)
   
  }

  
  console.log("id", id)
};

const stopPlayback = (id) => {
  if(!videoRef.current.id === id){
    return;
  }
  if (videoRef.current && isPlaying) {


    var playPromise = videoRef.current.play();
 
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        // We can now safely pause video...
        videoRef.current.pause();
        setIsPlaying(false);
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  
   // setShowButton(true);
   setShowtip(false)
   clearTimeout(playbackTimeout);

  }
};




function DeleteVid(id, user) {
  const videoRef = appWall.database().ref("videos").child(user);

  videoRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();

      if (childData.id === id) {
        // Delete the child node with the matching id
        childSnapshot.ref.remove();

        toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });

      }
    });
  });


}










const [isActive, SetActive] = useState(false)

function Edit(id, user, video, title){

SetActive(true)

const videos = {
  id: id,
  user: user,
  video: video,
  title: title
};

// Convert the object to a JSON string
const videosJSON = JSON.stringify(videos);

// Store the JSON string in localStorage
sessionStorage.setItem("Video", videosJSON);
 props.setoffed(pre => pre + 1)

}








const likesCount = useMemo(() => {
  if (typeof props.likes === 'string' && props.likes.length > 0) {
    return props.likes.split(',').length;
  } else {
    return 0;
  }
}, [props.likes]);

const useridd = props.user;
const toast = useRef(null);

const [Hoveroff, setHoverOff] = useState(false)

{/*   {

        label: 'Add',
        icon: 'pi pi-pencil',
        command: ()  => {

        
          Edit(props.id, props.user, props.playVid, props.title);
         
        }
    },
    */}


function SaveVid(){


}


const items = [


    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {

confirm2()           
        }
    }
   
];

const item2 = [
 

  {
    label: 'share',
    icon: 'pi pi-external-link',
    size: 'sm',

    command: () => {
        props.snoop()
    }
},


{
  label:  'Save',
  icon:  user && props.Saved && props.Saved.includes(user.uid) ? 'pi pi-minus' : 'pi pi-plus',
  command: () =>{
    props.updateSaved(props.id, props.user, props.poster, props.title)
  }
    },
  {

      label: 'Report',
      icon: 'pi pi-exclamation-triangle',
      size: 'sm',
      severity: 'danger',
      command: () =>  {
         // toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        alert("reported")
        }
        },

];



const time = props.time;




const formatDate = (date) => {
  if (!date) {
    return "";
  }
  const timeDiffMs = new Date() - new Date(date);
  const timeDiffMSec = Math.floor(timeDiffMs / 1000);
  if (timeDiffMSec === 0) {
    return `right_now`;
  }
  const timeDiffSec = Math.floor(timeDiffMs / 1000);
  if (timeDiffSec < 60) {
    return `${timeDiffSec} sec `;
  }
  const timeDiffMin = Math.floor(timeDiffSec / 60);
  if (timeDiffMin < 60) {
    return `${timeDiffMin} min `;
  }
  const timeDiffHr = Math.floor(timeDiffMin / 60);
  if (timeDiffHr < 24) {
    return `${timeDiffHr} h `;
  }
  const timeDiffDay = Math.floor(timeDiffHr / 24);
  if (timeDiffDay < 2) {
    return `${timeDiffDay} day `;
  }else if(timeDiffDay < 30){
      return `${timeDiffDay} day's `;
  }
  const timeDiffMo = Math.floor(timeDiffDay / 30);
  if (timeDiffMo < 12) {
    return `${timeDiffMo} mo's `;
  }else  if (timeDiffMo < 2) {
      return `${timeDiffMo} mo `;
  }
  const timeDiffYr = Math.floor(timeDiffMo / 12);
  return `${timeDiffYr} yr's `;
};




if(props.isitDry  && props.recordedVideos.length === 0){
  
  return(
    <div className="mtop mr-2 ">  <Nothinghere/>  </div>   

  )
}



return (

           
  localLike ?
     
     
  user && props.likes && props.likes.includes(user)  ?   ( 
    
    <div key={props.id} className='cont'>

   
   
   
        {/* End video Big Player mdi fas mdi Loading */}
        
              <div style={{ background: darkmode.current   ? "black" : "white"}} className="ConBod " >
                <div  onMouseOver={() => startPlayback(props.id)}
         onMouseLeave={() => stopPlayback(props.id)  }  className="containered mr-2"   
              >
         { showtip  &&   
         <p  onMouseOver={() => startPlayback(props.id)} style={{textShadow:"1px 1px solid white"}}
         onMouseLeave={() => stopPlayback(props.id)  }  onClick={() => togglePlay(props.id)}  className='pHovered'>Keep Hovering To Play</p>
          }
        
         <Button   onMouseOver={() => startPlayback(props.id)}
                   onMouseLeave={() => stopPlayback(props.id)  } style={{background:"transparent", border:"none", fontSize:"2rem", fontWeight:"bold"}}     
         onClick={() => togglePlay(props.id)}  size="large" rounded text severity='help'  icon={showButton && "pi pi-play"} className="text-danger caretpi  over " />
        
             
                  <div className="comments-container" style={{zIndex:"4"}} ref={commentsContainerRef}>
                    <div className="comments-head">
                      <span className="comments-head-label" ref={commentsCountRef}></span>
                      <span onClick={deactivateComments} className="comments-head-close" ref={closeCommentsRef}>
                        &#10005;
                      </span>
                    </div>
        <div className="comments-list"> 
        
       
          <span ref={commentsCountRef}>Comments: {/*props.comments && props.comments.length */}</span>
          <div ref={commentsListRef}>
          
          </div>
        
         </div>
        
                    <div  style={{ position:"relative",height: "fit-content", width:"fit-content"}}>
                    <InputTextarea
                    style={{width:"100%"}}
          value={value.comment}
          onChange={(e) => setValue(prevValue => ({ ...prevValue, comment: e.target.value }))}
          rows={3}
          cols={70}
        />
        
        <button onClick={() => Comment(props.id)} style={{position:"absolute", bottom:"0", right:"0"}}>comment</button>
        </div>
                  </div>
                  <div   onClick={() => togglePlay(props.id)}   onMouseOver={() => startPlayback(props.id)}
                   onMouseLeave={() => stopPlayback(props.id)}>
        
                        <video
                  preload="none"
                   poster={props.poster}
                    className="video vidawall"
                    playsInline
                    loop
                    muted
                   onClick={() => togglePlay(props.id)}
                    ref={videoRef}
                id={props.id}
                  >
        
        
        <source  src={props.playVid} type="video/webm" />
                    </video>
                  </div>
              
                  
                
                    <div className="icons">
                    
                    <div style={{zIndex:"8"}} className="right indexz">
        
                    <div  onClick={() => updateLikes(props.id, props.user)} className="icons-item right-icon">
                      <span className="icon">
                        <img src={ user && props.likes && props.likes.includes(user) ? hearted :  heart} alt="<3" id="likes-icon" ref={likesIconRef} />
                      </span>
                      <span className="icon-label likes right-label text-light" data-likes={props.likes.length} ref={likesRef}>{props.likes.length}</span>
                    </div>
        
                    <div   className="icons-item right-icon">
                      <span onClick={() => togglePlay(props.id)}  className="icon">
                      <img src={chat} alt="cmt" id="comments-icon"/>
                      </span>
                      <span className="icon-label comments text-light right-label">{ props.comments && props.comments.length === 0 ? "" : props.comments && Object.keys(props.comments).length }</span> 
                    </div>
        
                    <div className="icons-item right-icon">
                      <span className="icon">
                        <img src={share} alt="share"/>
                      </span>
                      <span className="icon-label text-light shares right-label">4</span>
                    </div> 
                  </div>
                  <div style={{zIndex:"8"}} className="bottom">
                    <span  className="progress-duration text-dark bold float-right  " style={{fontSize:"1rem", marginBottom: "-20px", marginTop: "10px"}} ref={durationRef}></span>
                    <div className="progress-range" title="seek" ref={rangeRef} onClick={setProgress}>
                      <div  className="progress-bar" ref={barRef}></div>
                    </div>
                    
                 
                    </div>
                  </div>
                </div>
                <div className="bottomTitle"  
style={{display:"flex", flexDirection:"column", marginRight:"auto", marginBottom:"10px"}}>

<Toast ref={toast} />

<div style={{ position: 'relative', width: "100%", marginTop:"-5px", marginLeft:"170px" , background:"red"}}>

<SpeedDial onClick={(e) => e.stopPropagation()} mask model={items} radius={120} type="semi" direction="left" 
style={{}}
className='spedright'          showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times" buttonClassName="p-button-secondary" />
</div>





             <span className="icon" style={{display:"flex", flexDirection:"row"}}>
             <Avatar  onClick={ () => navigate('/profileComponents/Myprofile')} style={{marginTop:"28px"}} image={props.dp} className="flex align-items-center bg-transparent  justify-content-center mr-2" size="large" shape="circle" />
             <div style={{display:"flex", flexDirection: "column"}}>
<div style={{display:"flex"}}>

<h2 style={{ marginLeft: "-55px", fontSize: "1.4rem", width: "fit-content", whiteSpace:"nowrap" }}>
{props.title}
</h2>
 

         </div>
<span style={{marginTop:"-10px"}}>
<span style={{display:"flex",flexDirection:"row"}}>
<h3 style={{color:"gray",  marginTop:"-1px",    marginBottom: "-5px", fontSize:"20px"}}  onClick={ () => navigate('/profileComponents/Myprofile')}>{ props.username }</h3>
<i style={{ fontSize: '0.80rem', color:"rgb(105 66 107)" ,textShadow:"1px 1px black", marginTop: "8px"
 ,marginLeft: "2px"}} className="pi pi-verified"></i>

</span>
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px",  whiteSpace:"nowrap"}}>0 Views </span>   
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px"}}>{formatDate(time)} </span>   

</span>

                            </div>


</span>

</div>

</div>

   </div>
 )
              
          : (<></>)


              :
      
              props.showSaved ?

              user && props.Saved && props.Saved.includes(user) ?   (    <div key={props.id}>

   
   
   
               {/* End video Big Player mdi fas mdi*/}
               
                     <div style={{ background: darkmode.current   ? "black" : "white"}} className="ConBod " >
                       <div  onMouseOver={() => startPlayback(props.id)}
                onMouseLeave={() => stopPlayback(props.id)  }  className="containered mr-2"   
                     >
                { showtip  &&   
                <p  onMouseOver={() => startPlayback(props.id)} style={{textShadow:"1px 1px solid white"}}
                onMouseLeave={() => stopPlayback(props.id)  }  onClick={() => togglePlay(props.id)}  className='pHovered'>Keep Hovering To Play</p>
                 }
               
                <Button   onMouseOver={() => startPlayback(props.id)}
                          onMouseLeave={() => stopPlayback(props.id)  } style={{background:"transparent", border:"none", fontSize:"2rem", fontWeight:"bold"}}     
                onClick={() => togglePlay(props.id)}  size="large" rounded text severity='help'  icon={showButton && "pi pi-play"} className="text-danger caretpi  over " />
               
                    
                         <div className="comments-container" style={{zIndex:"4"}} ref={commentsContainerRef}>
                           <div className="comments-head">
                             <span className="comments-head-label" ref={commentsCountRef}></span>
                             <span onClick={deactivateComments} className="comments-head-close" ref={closeCommentsRef}>
                               &#10005;
                             </span>
                           </div>
               <div className="comments-list"> 
               
              
                 <span ref={commentsCountRef}>Comments: {/*props.comments && props.comments.length */}</span>
                 <div ref={commentsListRef}>
                 
                 </div>
               
                </div>
               
                           <div  style={{ position:"relative",height: "fit-content", width:"fit-content"}}>
                           <InputTextarea
                           style={{width:"100%"}}
                 value={value.comment}
                 onChange={(e) => setValue(prevValue => ({ ...prevValue, comment: e.target.value }))}
                 rows={3}
                 cols={70}
               />
               
               <button onClick={() => Comment(props.id)} style={{position:"absolute", bottom:"0", right:"0"}}>comment</button>
               </div>
                         </div>
                         <div   onClick={() => togglePlay(props.id)}   onMouseOver={() => startPlayback(props.id)}
                          onMouseLeave={() => stopPlayback(props.id)}>
               
                               <video
                         preload="none"
                          poster={props.poster}
                           className="video vidawall"
                           playsInline
                           loop
                           muted
                          onClick={() => togglePlay(props.id)}
                           ref={videoRef}
                       id={props.id}
                         >
               
               
               <source  src={props.playVid} type="video/webm" />
                           </video>
                         </div>
                     
                         
                       
                           <div className="icons">
                           
                           <div style={{zIndex:"8"}} className="right indexz">
               
                           <div  onClick={() => updateLikes(props.id, props.user)} className="icons-item right-icon">
                             <span className="icon">
                               <img src={ user && props.likes && props.likes.includes(user) ? hearted :  heart} alt="<3" id="likes-icon" ref={likesIconRef} />
                             </span>
                             <span className="icon-label likes right-label text-light" data-likes={props.likes.length} ref={likesRef}>{props.likes.length}</span>
                           </div>
               
                           <div   className="icons-item right-icon">
                             <span onClick={() => togglePlay(props.id)}  className="icon">
                             <img src={chat} alt="cmt" id="comments-icon"/>
                             </span>
                             <span className="icon-label comments text-light right-label">{ props.comments && props.comments.length === 0 ? "" : props.comments && Object.keys(props.comments).length }</span> 
                           </div>
               
                           <div className="icons-item right-icon">
                             <span className="icon">
                               <img src={share} alt="share"/>
                             </span>
                             <span className="icon-label text-light shares right-label">4</span>
                           </div> 
                         </div>


                         <div style={{zIndex:"8"}} className="bottom">
                           <span  className="progress-duration text-dark bold float-right  " style={{fontSize:"1rem", marginBottom: "-20px", marginTop: "10px"}} ref={durationRef}></span>
                           <div className="progress-range" title="seek" ref={rangeRef} onClick={setProgress}>
                             <div  className="progress-bar" ref={barRef}></div>
                           </div>
                           
                        
                           </div>
                         </div>
                       </div>
                       <div className="bottomTitle"  
style={{display:"flex", flexDirection:"column", marginRight:"auto", marginBottom:"10px"}}>

<Toast ref={toast} />
{ user &&  props.user ===  user.uid ? 
<div style={{ position: 'relative', width: "100%", marginTop:"-5px", marginLeft:"170px" , background:"red"}}>

<SpeedDial onClick={(e) => e.stopPropagation()} mask model={items} radius={120} type="semi" direction="left" 
style={{}}
className='spedright'          showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times" buttonClassName="p-button-secondary" />
</div>
:

<div style={{ position: 'relative', width: "100%", marginTop:"-5px", marginLeft:"60px" , background:"red"}}>

<SpeedDial onClick={(e) => e.stopPropagation() } mask model={item2} radius={120} type="semi" direction="left" 
style={{ }}
   className='spedleft'            showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times" buttonClassName= "p-button-warning " />  
</div>
}

             <span className="icon" style={{display:"flex", flexDirection:"row"}}>
             <Avatar  onClick={ () => navigate('/profileComponents/Myprofile')} style={{marginTop:"28px"}} image={props.dp} className="flex align-items-center bg-transparent  justify-content-center mr-2" size="large" shape="circle" />
             <div style={{display:"flex", flexDirection: "column"}}>
<div style={{display:"flex"}}>

<h2 style={{ marginLeft: "-55px", fontSize: "1.4rem", width: "fit-content", whiteSpace:"nowrap" }}>
{props.title}
</h2>
 

         </div>
<span style={{marginTop:"-10px"}}>
<span style={{display:"flex",flexDirection:"row"}}>
<h3 style={{color:"gray",  marginTop:"-1px",    marginBottom: "-5px", fontSize:"20px"}}  onClick={ () => navigate('/profileComponents/Myprofile')}>{ props.username }</h3>
<i style={{ fontSize: '0.80rem', color:"rgb(105 66 107)" ,textShadow:"1px 1px black", marginTop: "8px"
 ,marginLeft: "2px"}} className="pi pi-verified"></i>

</span>
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px",  whiteSpace:"nowrap"}}>0 Views </span>   
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px"}}>{formatDate(time)} </span>   

</span>

                            </div>


</span>

</div>

</div>

   </div>
 )
                     
                 : (<></>)
  
  :

              ( user && props.user === user ?    (    <div key={props.id}>
  
  
  
  
               {/* End video Big Player mdi fas mdi*/}
               
                     <div style={{ background: darkmode.current   ? "black" : "white"}} className="ConBod " >
                       <div  onMouseOver={() => startPlayback(props.id)}
                onMouseLeave={() => stopPlayback(props.id)  }  className="containered mr-2"   
                     >
                { showtip  &&   
                <p  onMouseOver={() => startPlayback(props.id)} style={{textShadow:"1px 1px solid white"}}
                onMouseLeave={() => stopPlayback(props.id)  }  onClick={() => togglePlay(props.id)}  className='pHovered'>Keep Hovering To Play</p>
                 }
               
                <Button   onMouseOver={() => startPlayback(props.id)}
                          onMouseLeave={() => stopPlayback(props.id)  } style={{background:"transparent", border:"none", fontSize:"2rem", fontWeight:"bold"}}     
                onClick={() => togglePlay(props.id)}  size="large" rounded text severity='help'  icon={showButton && "pi pi-play"} className="text-danger caretpi  over " />
               
                    
                         <div className="comments-container" style={{zIndex:"4"}} ref={commentsContainerRef}>
                           <div className="comments-head">
                             <span className="comments-head-label" ref={commentsCountRef}></span>
                             <span onClick={deactivateComments} className="comments-head-close" ref={closeCommentsRef}>
                               &#10005;
                             </span>
                           </div>
               <div className="comments-list"> 
               
              
                 <span ref={commentsCountRef}>Comments: {/*props.comments && props.comments.length */}</span>
                 <div ref={commentsListRef}>
                 
                 </div>
               
                </div>
               
                           <div  style={{ position:"relative",height: "fit-content", width:"fit-content"}}>
                           <InputTextarea
                           style={{width:"100%"}}
                 value={value.comment}
                 onChange={(e) => setValue(prevValue => ({ ...prevValue, comment: e.target.value }))}
                 rows={3}
                 cols={70}
               />
               
               <button onClick={() => Comment(props.id)} style={{position:"absolute", bottom:"0", right:"0"}}>comment</button>
               </div>
                         </div>
                         <div   onClick={() => togglePlay(props.id)}   onMouseOver={() => startPlayback(props.id)}
                          onMouseLeave={() => stopPlayback(props.id)}>
               
                               <video
                         preload="none"
                          poster={props.poster}
                           className="video vidawall"
                           playsInline
                           loop
                           muted
                          onClick={() => togglePlay(props.id)}
                           ref={videoRef}
                       id={props.id}
                         >
               
               
               <source  src={props.playVid} type="video/webm" />
                           </video>
                         </div>
                     
                         
                       
                           <div className="icons">
                           
                           <div style={{zIndex:"8"}} className="right indexz">
               
                           <div  onClick={() => updateLikes(props.id, props.user)} className="icons-item right-icon">
                             <span className="icon">
                               <img src={ user && props.likes && props.likes.includes(user.uid) ? hearted :  heart} alt="<3" id="likes-icon" ref={likesIconRef} />
                             </span>
                             <span className="icon-label likes right-label text-light" data-likes={props.likes  && props.likes.length} >{props.likes && props.likes.length}</span>
                           </div>
               
                           <div   className="icons-item right-icon">
                             <span onClick={() => togglePlay(props.id)}  className="icon">
                             <img src={chat} alt="cmt" id="comments-icon"/>
                             </span>
                             <span className="icon-label comments text-light right-label">{ props.comments && props.comments.length === 0 ? "" : props.comments && Object.keys(props.comments).length }</span> 
                           </div>
               
                           <div className="icons-item right-icon">
                           <span className="icon">
              
              <button className='' 
              style={{color: user && props.Saved && props.Saved.includes(user) ?  "#6b490b" : "white", background:"none",border:"none", fontSize:"1.2rem", marginTop:"-5px", padding:"0px"}}
               onClick={ () => props.updateSaved(props.id, props.user, props.poster, props.title)} > <FaBookmark style={{  }} /> </button>
              </span>
              <span className="icon-label text-light shares right-label">{props.Saved.length}</span>
                           </div> 
                         </div>
                         <div style={{zIndex:"8"}} className="bottom">
                           <span  className="progress-duration text-dark bold float-right  " style={{fontSize:"1rem", marginBottom: "-20px", marginTop: "10px", color:"white"}} ref={durationRef}></span>
                           <div className="progress-range" title="seek" ref={rangeRef} onClick={setProgress}>
                             <div  className="progress-bar text-light" ref={barRef}></div>
                           </div>
                           
                        
                           </div>
                         </div>
                       </div>
                       <div className="bottomTitle"  
style={{display:"flex", flexDirection:"column", marginRight:"auto", marginBottom:"10px"}}>

<Toast ref={toast} />

<div style={{ position: 'relative', width: "100%", marginTop:"-5px", marginLeft:"170px" , background:"red"}}>

<SpeedDial onClick={(e) => e.stopPropagation()} mask model={items} radius={120} type="semi" direction="left" 
style={{}}
className='spedright'          showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times" buttonClassName="p-button-secondary" />
</div>



             <span className="icon" style={{display:"flex", flexDirection:"row"}}>
             <Avatar  onClick={ () => navigate('/profileComponents/Myprofile')} style={{marginTop:"28px"}} image={props.dp} className="flex align-items-center bg-transparent  justify-content-center mr-2" size="large" shape="circle" />
             <div style={{display:"flex", flexDirection: "column"}}>
<div style={{display:"flex"}}>

<h2 style={{ marginLeft: "-55px", fontSize: "1.4rem", width: "fit-content", whiteSpace:"nowrap" }}>
{props.title}
</h2>
 

         </div>
<span style={{marginTop:"-10px"}}>
<span style={{display:"flex",flexDirection:"row"}}>
<h3 style={{color:"gray",  marginTop:"-1px",    marginBottom: "-5px", fontSize:"20px"}}  onClick={ () => navigate('/profileComponents/Myprofile')}>{ props.username }</h3>
<i style={{ fontSize: '0.80rem', color:"rgb(105 66 107)" ,textShadow:"1px 1px black", marginTop: "8px"
 ,marginLeft: "2px"}} className="pi pi-verified"></i>

</span>
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px",  whiteSpace:"nowrap"}}>0 Views </span>   
            <span style={{color:"gray",  marginTop:"-15px", fontSize:"13px"}}>{formatDate(time)} </span>   

</span>

                            </div>


</span>

</div>

</div>

   </div>
 ) : (<></>) )
          
 

  
  )


     
  

    }
  
  export default MyVideos;
  
    



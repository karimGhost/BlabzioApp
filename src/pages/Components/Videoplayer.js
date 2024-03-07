import React, { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


import { FaPlay, FaPause, FaHeart, FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import video from "../../images/anim.mp4";

import { navigate,Link } from 'gatsby';
import { Avatar } from 'primereact/avatar';

import { useMemo } from 'react';
import heart from "../../images/heart.webp";
import hearted  from "../../images/heart+.svg";
import share  from "../../images/share.webp";
import chat  from "../../images/chat.webp";
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useAuth } from '../../Accounts/useAuth';
import {FaBookmark} from 'react-icons/fa'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Tooltip } from 'primereact/tooltip';
import BlabzioSeo from '../../Accounts/BlabzioSeo';
import icon from "../../images/icon.png"
import { InputTextarea } from "primereact/inputtextarea";

import '../../styles/Video.scss';
import 'primeicons/primeicons.css';
import "../../styles/TheWall.css"
import { Button } from 'primereact/button';
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

  function VideoPlayer(props) {

    firebase.initializeApp(firebaseConfigTheWallPlayer, "appWallPlayer");

    const appWall = firebase.app("appWallPlayer");
//const {user}  = useAuth()
const {user} = useAuth();
const toast = useRef(null);



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

const ogImageHtml = `
<div style="position: absolute; left: 50px; top: 0; width: fit-content; margin: auto; background: black;" class="d-flex flex-row ps-3 pl-1 pt-1 fixedit">
  <div class="dragon" style="font-size: 1rem; color: orange; background: #709085;">
    {/* Add your icon here */}
  </div>
  <span class="blabzio h1 fw-bold mb-0" style="color: whitesmoke; font-size: 1.4rem;">
    Blab<b style="color: orange; font-family: sans-serif;">Z</b>io
  </span>
</div>
`;

const [visible, setVisible] = useState(-1);

const copyLink = () => {
  alert('Link copied to clipboard');
  setVisible(-1)
};




const toggleSharePopup = (index) => {

  if (visible === index) {

    setVisible(-1);
  } else {
    // Clicked a different button, so  it and close the previously open button
    convertToMP4(props.playVid)
    setVisible(index);

  }
};


const ogImageHtm = `data:image/svg+xml;base64,${btoa(encodeURIComponent(ogImageHtml))}`;

// Create a Blob URL

// Create a Blob URL
//const encodedurl = URL.createObjectURL(blob);

const shareOnFacebook = ({videoUrl}) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${(videoUrl)}`;
  window.open(facebookUrl, '_blank');
};

const shareOnWhatsApp = (videoUrl) => {
  const whatsappText = `Check out this video on My Website: ${videoUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
  window.open(whatsappUrl, '_blank');
};



const shareOnTwitter = (videoUrl, title, imageUrl) => {
  const websiteDetails = {
    title: 'Blabzio',
    description: 'News/Chat/SocialMedia',
    url: 'blabzio.web.app',
  };

  const blobUrl = `https://twitter.com/${props.poster}`;

  const twitterText = `Check out this video on ${websiteDetails.title} ${websiteDetails.description}  : ${blobUrl}}\n${websiteDetails.description}`;

  
  const tweetWithImage = `${twitterText}`;


  const encodedTweet = encodeURIComponent(tweetWithImage);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`;



  window.open(twitterUrl, '_blank');
};



   const  setImg = props.setImg;
const setUser = props.setUser;

const  videos= props.playvid;

const SlideDisable= props.SlideDisable;
const setSlideDisable = props.setSlideDisable;



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
const [showNull, setShowNull] = useState(null)
useEffect(() => {
      loadComments();

      if(!videoRef){
        return;
      }
     
    videoRef.current.addEventListener('timeupdate', updateProgress);

    // Clean up the event listener when the component unmounts user.uid
    return () => {
   videoRef.current &&   videoRef.current.removeEventListener('timeupdate', updateProgress);
    };



    }, [user]);
  


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

const loadComments = () => {
  setLoadedComments(props.comments);
};

const updateLikes = props.updateLikes;


    const darkmode = useRef(null)
    
    const [value, setValue] = useState({
      userName: Useris,
      timePosted: "2hrs ago",
      profilePhoto: Image,
      comment: "",
      userid : user ? user.uid : "" ,
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
  // After adding the comment, reset the value state to clear the comment field
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
      setSlideDisable(true)


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
  
  
  

  const DeleteVid = props.DeleteVid;
/*
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


*/







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
 localStorage.setItem("Video", videosJSON);
 props.setoffed(pre => pre + 1)

}





const likesCount = useMemo(() => {
  if (typeof props.likes === 'string' && props.likes.length >= 0) {
    console.log("props", props.likes.split(',').length)
    return props.likes.split(',').length;
  } else {
    return 0;
  }


}, [props.likes]);

console.log("props", likesCount)


const useridd = props.user;

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

      toggleSharePopup(props.id)
      
    }
},


{
  label: 'Save',
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




const [liked,setliked] = useState(-1)
const togleBounce = (ids) => {
  if(ids === liked){
    setliked(-1)
  }else{
    setliked(ids)
  }



}

const time = props.time;

const [mp4urls, setmp4urls] = useState(null)
const convertToMP4 = async (inputWebMUrl) => {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg/dist/ffmpeg.min.js`);
  const ffmpeg = await response.arrayBuffer();

  const ffmpegInstance = createFFmpeg({ log: true });
  await ffmpegInstance.load(ffmpeg);

  // Fetch the WebM file
  const webmFile = await fetchFile(inputWebMUrl);

  // Run FFmpeg command to convert WebM to MP4
  await ffmpegInstance.run('-i', webmFile, '-c:v', 'libx264', '-c:a', 'aac', '-strict', 'experimental', '-b:a', '192k', 'output.mp4');

  // Get the data of the converted MP4 file
  const mp4Data = ffmpegInstance.FS('readFile', 'output.mp4');

  // Create a Blob from the data
  const mp4Blob = new Blob([mp4Data.buffer], { type: 'video/mp4' });

  // Create a download link or use the Blob as needed
  const mp4Url = URL.createObjectURL(mp4Blob);
  
  console.log('Converted MP4 URL:', mp4Url);
  setmp4urls(mp4Url)
  // Clean up, delete temporary files if needed
  ffmpegInstance.FS('unlink', 'output.mp4');
};



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
     return (
      <div key={props.id} className='cont'>




{/* End video Big Player mdi fas mdi orange */}

      <div style={{ background: darkmode.current   ? "black" : "white"}} className="ConBod " >
        <div  onMouseOver={() => startPlayback(props.id)}
 onMouseLeave={() => stopPlayback(props.id)  }  className="containered "   
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

            <div  onClick={() =>  {togleBounce(props.id);  updateLikes(props.id, props.user, props.poster, props.title )}  } className="icons-item right-icon" style={{marginLeft:"10px"}}>
              <span className="icon ml-1">


                <img src={ user && props.likes && props.likes.includes(user) ? hearted :  heart}  className={   `${   user && props.likes && props.likes.includes(user) ?  "" : liked === props.id && 'heartBeat'}`} alt="<3" id="likes-icon" ref={likesIconRef} />

              </span>
              <span className="icon-label likes right-label text-light" data-likes={props.likes && props.likes.length} ref={likesRef}>{ props.likes && props.likes.length}</span>
            </div>

            <div   className="icons-item right-icon">
              <span onClick={() =>  togglePlay(props.id)}  className="icon">
              <img src={chat} alt="cmt" id="comments-icon" />
              </span>
              <span className="icon-label comments text-light right-label">{ props.commentsLength
 && props.commentsLength
 === 0 ? "" : props.commentsLength
 && props.commentsLength
}</span> 
            </div>

            <div className="icons-item right-icon">
              <span className="icon">
              
              <button className='' 
              style={{color: user && props.Saved && props.Saved.includes(user) ?  "#6b490b" : "white", background:"none",border:"none", fontSize:"1.2rem", marginTop:"-5px", padding:"0px"}}
               onClick={ () => props.updateSaved(props.id, props.user, props.poster, props.title)} > <FaBookmark style={{  }} /> </button>
              </span>
              <span className="icon-label text-light shares right-label">{ props.Saved && props.Saved.length}</span>
            </div> 
          </div>
          <div style={{zIndex:"8"}} className="bottom">
            <span  className="progress-duration text-dark bold float-right  " style={{fontSize:"1rem", marginBottom: "-20px", marginTop: "10px"}} ref={durationRef}> </span>
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
<>


<div style={{ position: 'relative', width: "100%", marginTop:"-5px", marginLeft:"60px" , background:"red"}}>

<SpeedDial onClick={(e) => e.stopPropagation() } mask model={item2} radius={120} type="semi" direction="left" 
style={{ }}
      className='spedleft'            showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times" buttonClassName= "p-button-warning " />  

<ConfirmPopup />

</div>
<div style={{position:"relative",borderRadius:"8px",height:"fit-content", zIndex:"30" }} className={`share-popup ${visible === props.id ? 'p-fluid' : 'p-fluid d-none'}`}>
      {/* Add your social media icons and links here */}
      <BlabzioSeo title="Blabzio" image={icon}/>
    

      <Button onClick={() => setVisible(-1)} style={{position:"absolute", top:"0", right:"0" }} icon="pi pi-times" className="p-button-outlined p-button-primary" />
      <div  className="card flex flex-wrap flex-row align-items-center justify-content-center gap-5 float-left">

      <Link style={{marginRight:"9px"}}  to="/" target="_blank" rel="noopener noreferrer">
        
        <Tooltip target=".custom-target-icon" />
  
  <i  className="custom-target-icon  pi pi-replay p-text-secondary p-overlay-badge"
      data-pr-tooltip="Re-Share"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      data-pr-mousetrack="true"
      
      style={{ fontSize: '1.5rem', cursor: 'pointer', rotate:"-90deg" }}>
  </i>      
        
          </Link>

      <Link style={{marginRight:"9px"}}  to="https://www.facebook.com/sharer/sharer.php?u=YOUR_WEBSITE_URL" target="_blank" rel="noopener noreferrer">
        
      <Tooltip target=".custom-target-icon" />

<i className="custom-target-icon  pi pi-facebook p-text p-overlay-badge"
    data-pr-tooltip="Share on Facebook"
    data-pr-position="right"
    data-pr-at="right+5 top"
    data-pr-my="left center-2"
    data-pr-mousetrack="true"
    
    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
</i>      
      
        </Link>


        <Link style={{marginRight:"9px"}}  to="https://api.whatsapp.com/send?text=YOUR_WEBSITE_TITLE%20-%20YOUR_WEBSITE_URL" target="_blank" rel="noopener noreferrer">
        
        <Tooltip target=".custom-target-icon" />
  
  <i className="custom-target-icon  pi pi-whatsapp p-text-success  "
      data-pr-tooltip="Share on Whatsapp"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      data-pr-mousetrack="true"
      
      style={{ fontSize: '1.5rem', cursor: 'pointer',color:"green" }}>
  </i>      
        
          </Link>
   
          <Link
  onClick={(event) => {
    // Prevent default link behavior and start the conversion
    event.preventDefault();
   !mp4urls && convertToMP4(props.playVid);
  }}
  style={{ marginRight: "9px", color: "Black", fontWeight: "bold" }}
  to={`https://twitter.com/intent/tweet?text=Blabzio&url=${mp4urls}`}
  target="_blank"
  rel="noopener noreferrer"
> 

  <Tooltip target=".custom-target-icon" />

<i className="custom-target-icon  pi pi-times p-text-success  p-overlay-badge"
    data-pr-tooltip="Share on X"
    data-pr-position="right"
    data-pr-at="right+5 top"
    data-pr-my="left center-2"
    data-pr-mousetrack="true"
    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
</i>      
  </Link>
    
   
   
     <Button      tooltip="Copy Link" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} style={{color:"white", marginLeft:"2px", width:"fit-content", padding:"5px"}} onClick={() => copyLink(props.playVid)} label="" icon="pi pi-link " className="p-button-outlined p-button-secondary" >    
     </Button>
   </div>

    </div>
</>
}

<span className="icon" style={{display:"flex", flexDirection:"row"}}>
             <Avatar  onClick={ () => navigate('/profileComponents/Myprofile')} style={{marginTop:"28px"}} image={props.dp} className="flex align-items-center bg-transparent  justify-content-center mr-2" size="large" shape="circle" />
             <div style={{display:"flex", flexDirection: "column"}}>
<div style={{display:"flex"}}>
  
<h2 style={{ marginLeft: "-55px", fontSize: "1.4rem", width: "fit-content", whiteSpace:"nowrap" }}>
{props.title && props.title.length > 10 ? props.title.slice(0, 10) + "..." : props.title}
</h2>
 
   
            </div>
            <span style={{marginTop:"-10px"}}>
<span style={{display:"flex",flexDirection:"row"}}>
<h3 style={{color:"gray",  marginTop:"-1px",    marginBottom: "-5px", fontSize:"20px"}}     onClick={ () => navigate('/profileComponents/Myprofile')}>{ props.username }</h3>
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
   
    );
  }
  
  export default VideoPlayer;
  
    

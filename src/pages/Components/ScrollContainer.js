import React, {useRef,useEffect, useState, useMemo} from "react";
import { nanoid } from 'nanoid';
import { navigate } from 'gatsby';
import { Avatar } from 'primereact/avatar';
import { InputTextarea } from "primereact/inputtextarea";

import heart from "../../images/heart.webp";
import hearted  from "../../images/heart+.svg";
//import share  from "../../images/share.webp";
import chat  from "../../images/chat.webp";
import Share from'../../images/Shared.webp'
//import { withGesture } from "react-with-gesture";

import im from "../../images/proxy.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply, faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import Beats from "../../images/Beats.gif"
import { useCallback } from "react";
import {FaDragon, FaBookmark} from 'react-icons/fa'
import { useAuth } from "../../Accounts/useAuth";
import { useInView } from "react-hook-inview";
import BlabShare from "../../Navigation/BlabShare";
import styled from "@emotion/styled";
import "primereact/resources/primereact.min.css";                                       

import 'primeicons/primeicons.css';
import "../../styles/TheWall.css"
import { Button } from 'primereact/button';
import "../../styles/TheWall.css"
import '../../styles/Video.scss';

function ScrollContainer(
  {
   video,
content,

  offsetRadius,
 index,
  animationConfig,
  moveSlide,
  delta,
  down,
 
  keys,
  setvideodid,

  
  updateLikes,
  Comment,
  value,
  setValue,


  CommentReply,

  toggleLike,
  Reload,
  valueReply,
  setValReply,
  toggleDelete,
  last,
  updateSaved


   
    }) {
      const {user, users} = useAuth()

      const [isPlaying, setIsPlaying] = useState(false)
      const vidref = useRef(null);

      const bare = useAuth();

const videoRef = useRef(null);

      const darkmode = useRef("white");
      const duretaionr = useAuth(null);

      const rangeRef = useAuth(null);

      const [visible, setVisible] = useState(-1);






      

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
  } else if (timeDiffDay < 30) {
    return `${timeDiffDay} days `;
  }

  const timeDiffMo = Math.floor(timeDiffDay / 30);
  if (timeDiffMo < 12) {
    if (timeDiffMo < 2) {
      return `${timeDiffMo} month `;
    }
    return `${timeDiffMo} months `;
  } else {
    const timeDiffYr = Math.floor(timeDiffMo / 12);
    if (timeDiffYr < 2) {
      return `${timeDiffYr} year `;
    }
    return `${timeDiffYr} years `;
  }
};


const [replyComments, SetreplyComments] = useState(false)
 
const [showButton, setShowButton] = useState(true);





const displayTime = (time) => {
  const mins = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds <= 9 ? `0${seconds}` : seconds;
  return `${mins}:${seconds}`;
};  




const updateProgress = () => {
  if (videoRef.current && bare.current && duretaionr.current) {
    bare.current.style.width = `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%`;
 
    if (duretaionr.current && duretaionr.current.textContent) {
      duretaionr.current.textContent = `${displayTime(videoRef.current.currentTime)} : ${displayTime(videoRef.current.duration)}`;

      console.log("display",   `${displayTime(videoRef.current.currentTime)} : ${displayTime(videoRef.current.duration)}`)
    }
 
  }
};

const setProgress = (e) => {
  const time = e.nativeEvent.offsetX / rangeRef.current.offsetWidth;
  videoRef.current.currentTime = time * videoRef.current.duration;
};

if(visible){
console.log("lojj", visible)


    }



const [isplayable, setisPlayabele] = useState(true)



const setvisibility =(id) =>{
  

  setVisible(id)
}

const [timed, setTimed] = useState(-1)

const togglePlay = (id) => {


    
  if (videoRef.current && videoRef.current.id === id) {
    if (isPlaying) {
      videoRef.current.pause();
   setIsPlaying(false)
   setTimed(-1)
      setShowButton(true);
    } else {
     videoRef.current.play(); 
     setIsPlaying(true)
     setTimed(id)
      setShowButton(false);
    }
    }
    
    
};




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
   // Auto-play was prevented "hows"
   // Show paused UI.
 });
}




//setShowButton(false);


setShowtip(true)

}
console.log("id", id)
};




const stopPlayback = (id) => {
if(!vidref.current.id === id){
return;
}
if (vidref.current && isPlaying) {


var playPromise = vidref.current.play();

if (playPromise !== undefined) {
  playPromise.then(_ => {
    // Automatic playback started!
    // Show playing UI.
    // We can now safely pause video...
    vidref.current.pause();
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
const reff = useRef(false)

const [com, setcom] = useState(-1)


const activateComments = (id) => {
  if(com === id){
    setcom(-1)
    }else{
      setcom(id)
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



comentcontairef.current.classList.add("comments-active");
 // vidref.current.pause();

  setisPlayabele(false)
  if (videoRef.current.pause) {
    videoRef.current.style.cursor = "pointer";
  }
};

const deactivateComments = (id) => {

  if(com === id){
    setcom(-1)
  
    }else{
      setcom(id)
    }
  


  startPlayback(id)
 
  


  comentcontairef.current.classList.remove("comments-active");

  if (videoRef.current.pause) {
    
   
  //  comentcontairef.current.classList.remove("comments-active");
   // vidref.current.play();
    setisPlayabele(true)

    videoRef.current.style.cursor = "default";
  }



};


useEffect(() => {
 

  if(!videoRef){
    return;
  }
 
videoRef.current.addEventListener('timeupdate', updateProgress);

// Clean up the event listener when the component unmounts user.uid
return () => {
videoRef.current &&   videoRef.current.removeEventListener('timeupdate', updateProgress);
};



}, [user && isPlaying]);






const togglePla = (id) => {

  
  
   
  
  
    if (isPlaying) {
      let playPromise = videoRef.current.play();
   
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          videoRef.current.pause();
          setIsPlaying(false)
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.log(error)
        });
      }
       
    
     }else{
  
      let playPromise = videoRef.current.play();
   
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
        setIsPlaying(true)
        })
        .catch(error => {
          // Auto-play was prevented "visibility"
          // Show paused UI.
          console.log(error)
        });
      }
  
  
     }
  
  
  
  };
  
  

  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);
/*
  useEffect(() => {
    const handleResize = () => {
      const video = vidref.current;
  
      if (video) {
        const w = video.videoWidth;
        const h = video.videoHeight;
  
        if (w && h) {
          setVideoWidth(w);
          setVideoHeight(h);
        }
      }
    };
    if (typeof window !== 'undefined'){
    // Add event listener when the component mounts
    window.addEventListener('resize', handleResize);
    }
    // Remove the event listener when the component unmounts
    return () => {
      if (typeof window !== 'undefined'){
      window.removeEventListener('resize', handleResize);
      }
    };
  }, [user, vidref]);
  

*/

  const [ showReplies, setshowReplies ] =  useState(-1);

  const showRepliesToggle = (index) =>{
    if (showReplies === index) {
      // Clicked the currently open button, so close it
      setshowReplies(-1);
    } else {
      // Clicked a different button, so open it and close the previously open button
      setshowReplies(index);
    }
  }


const [disable, setdisabled] = useState(-1)


const handleToggledisable = (index) => {
  if (disable === index) {
    // Clicked the currently open button, so close it
    setdisabled(-1);
  } else {
    // Clicked a different button, so open it and close the previously open button
    setdisabled(index);
  }
};

  const [activeIndex, setActiveIndex] = useState(-1);

const handleToggleActive = (index) => {
  if (activeIndex === index) {
    // Clicked the currently open button, so close it
    setActiveIndex(-1);
  } else {
    // Clicked a different button, so open it and close the previously open button   window.addEventListener('beforeunload', function (event)  orange
    setActiveIndex(index);
  }
};




      const likesIconRef =  useRef(null);
      const likesRef =  useRef(null);

      const [state, setState] = useState(video);

      const [ref, isVisible] = useInView({
        threshold: 1,
      })

useEffect(() => {
  if (isVisible) {
   state.length > 0 && setState((state) => [...state]);
  }
}, [isVisible]);





const [observer, setObserver] = useState(null);

const handleViewChange = useCallback((entries) => {
  for (let entry of entries) {
    if (entry.intersectionRatio > 0.5) {
        if (videoRef.current) {
            videoRef.current.play();


 const videoElement = videoRef.current;

    
    // C URL with the video ID
    const videoUrl = `/Components/Wall/?id=${videoElement.id}`;
    
     ///URL without triggering a full page reload
setIsPlaying(true)
        window.history.pushState({}, '', videoUrl);

        }
    } else {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false)
        }
    }
  }
}, []);

useEffect(() => {
    const observer = new IntersectionObserver(handleViewChange, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    });
    setObserver(observer);

    if (videoRef.current) {
        observer.observe(videoRef.current);
        setIsPlaying(true)
    }

    return () => {
        if (observer) {
            observer.disconnect();
            setIsPlaying(false)
        }
    };
}, [handleViewChange]);



  const IconsContainer = styled.div`
  margin-top: 100px !important; 

  position: absolute;
    right: 0px;
    width: fit-content !important;
    /* float: right; */
    margin-left: auto;


  top: 0;
  bottom:0;
  left: 0;

background: trantparent;
  &.icons {
    /* Your styles for icons container */
  }
`;

const RightsContainer = styled.div`




backdrop-filter: blur(5px);
    opacity: 1.2;
    background: #00000045;
    height: 200px !important;
    margin-top: 20vh;
    border-radius: 12px;

 

    justify-content: center;
    position: initial!important;
    height: 100%;
    float: right!important;
    margin-left: auto;
    margin-right: 10px;



  &.rights.rightsBottom.rights {
    /* Your styles for rights container */


    width: 100px;
    height: 0px !important;
    margin-top: auto;
    z-index: 99;
    position: relative;
  }
`;

const IconsItem = styled.div`

box-shadow: 1px 1px black
    &.icons-item.icons-m.right-icon {
      /* Your styles for icons item */
    }
`;

const Icon = styled.span`
position: relative !important;
  &.icon.p-r {
    /* Your styles for icon */


  }
`;

const IconLabel = styled.span`
  &.icon-label.likes.right-label.text-light {
    /* Your styles for icon label */
  }
`;

const BottomContainer = styled.div`
position: absolute;

bottom:20px!important;
  &.bottom.positionBotto.positionBottoms .w-100 {
    /* Your styles for bottom container */
    bottom:10px ;
  }
`;

const ProgressDuration = styled.span`
  &.progress-duration.bold.float-right.text-light {
    /* Your styles for progress duration */
  }
`;

const ProgressRange = styled.div`

  &.progress-range.prog {
    /* Your styles for progress range */
   // margin-top: -30px !important
  }
`;

const ProgressBar = styled.div`
  &.progress-bar {
    /* Your styles for progress bar */
  }
`;

const BottomTitle = styled.div`

bottom: 0px !important ;
border-bottom-left-radius: 12px !important;
border-bottom-right-radius: 12px !important;
border-radius:12px !important;
left: 0px !important;
  &.bottomTitle.bottomAbout {
    /* Your styles for bottom title */
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;



const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const Title = styled.span`
  &.title {
    /* Your styles for title */
  }
`;

const Subtitle = styled.span`
  &.subtitle {
    /* Your styles for subtitle */
  }
`;



  const CommentsContainer = styled.div`


  &.comments-container {
    margin-bottom: -3px;
  }
`;

const CommentsContainerFullWidth = styled.div`



  &.comments-container.commentco.commentco.w-100 {
  
   



  }
`;

const CommentsHead = styled.div`
  &.comments-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CommentsHeadLabel = styled.span`
  &.comments-head-label {
    /* Your styles for comments-head-label */
  }
`;

const CommentsHeadClose = styled.span`
  &.comments-head-close {
    cursor: pointer;
    /* Your styles for comments-head-close */
  }
`;

const CommentsList = styled.div`
  &.comments-list {
    /* Your styles for comments-list */
  }
`;

const CommentBox = styled.div`

  &.comment-box {
    /* Your styles for comment-box */
  }
`;

const CommentHead = styled.div`
  &.comment-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CommentName = styled.h6`
  &.comment-name.by-autho {
    /* Your styles for comment-name.by-autho */
  }
`;

const CommentContent = styled.div`
  &.comment-content {
    /* Your styles for comment-content */
  }
`;


const comentcontairef = useRef(null)
 const commentscountr = useRef(null)

 const closeCommentsRef = useRef(null)

 const [liked,setliked] = useState(-1)
 const togleBounce = (ids) => {
   if(ids === liked){
     setliked(-1)
   }else{
     setliked(ids)
   }
 
 
 

 }
 

     
const [bigHeart, setBigHeart] = useState(-1)


function BigHeart(){
  
  return  bigHeart === content?.data?.id &&
 
  <div  style={{position:"absolute",borderRadius:"8px",height:"fit-content",display:"block", zIndex:"230", border:"none", background:"transparent", boxShadow:"none"}} className={`share-popup p-fluid timeouts`}>
      <i   className="timeout" style={{textAlign:"center", background:"transparent"}}>
      <img src={Beats} style={{width:"100%"}}   alt="<3"  />
      
      
  </i>
    </div>

}



console.log("datais", content)


function PLAYPAUSE(){

if(bigHeart === content?.data?.id){
   setTimeout(() => {
setBigHeart(-1)
   }, 3000) 

}
  return bigHeart !== content?.data?.id && isPlaying && timed === content?.data?.id ?

<div style={{position:"absolute",borderRadius:"8px",height:"fit-content", zIndex:"230", display:"block",background:"transparent",border:"none"}} className={`share-popup p-fluid timout`}>
    <i  className="timeout" style={{textAlign:"center"}}>
<FontAwesomeIcon
icon={faPlayCircle}
className="timeout"
style={{fontSize:"2rem", color:"orange"}}
/>

</i>
  </div>

:

bigHeart !== content?.data?.id &&
<div style={{position:"absolute",borderRadius:"8px",height:"fit-content", zIndex:"230", display:"block",background:"transparent",border:"none"}} className={`share-popup p-fluid timeout`}>
    <i  className="timeout" style={{textAlign:"center"}}>
<FontAwesomeIcon
icon={faPauseCircle}
className="timeout"
style={{fontSize:"2rem", color:"orange"}}
/>

</i>
  </div>

}



  return (
<>

 
<CommentsContainer >
<div className={`comments-container commentco commentco w-100}   ${com === content?.data?.id ? "comments-active" : ""}`} style={{ 
   position:"absolute",

zIndex: "4",
width: "100%",
margin: "auto",
left: "0",
     
right:"0"}} ref={comentcontairef}>




<div className="comments-head">
<span className="comments-head-label" ref={commentscountr}></span>
<span onClick={() => content && content.data &&  deactivateComments(content.data.id)} className="comments-head-close" ref={closeCommentsRef}>
  &#10005;
</span>
</div>


<span style={{fontSize:"1.67rem", position:"sticky", top:"0"}}>Comments: {content?.comments && content.comments?.length }</span>
<div  className="">




<div className="comments-lis"> 




{ content && content.data?.comments &&  content.data.comments.map((comment, index) => (



<div  style={{}}>
<ul key={index} id="comments-list" className="comments-list" style={{width:"fit-content", margin:"auto"}}>
<li>
<div  className="comment-main-level">
<div class="comment-avatar"><img src={im} alt=""/></div>
<div className="comment-box">
  <div className="comment-head">
      <h6 className="comment-name by-autho"> {comment.userName && comment.userName || "anonymous"}</h6>

      <span>{comment.timestamp && formatDate(new Date( parseInt(comment.timestamp, 10)))}</span>
<span style={{display:"flex", flexDirection:"row", marginTop:"-12px", marginLeft:"20px"}}>
{/*     <Button  size="small" style={ { display: disable === index ? "block" : "none",background:"transparent" ,marginTop:"5px", padding:"10px", width:"auto", height:"2rem" }} icon=" pi pi-exclamation-circle" rounded severity="danger" aria-label="Cancel" />



*/

<Button onClick={() => content && content.data && toggleDelete(content.data.id, comment.id,content.data.user)}  size="small" style={ { display: disable === index ? "block" : "none",background:"transparent" ,marginTop:"5px", padding:"10px", width:"auto", height:"2rem" }} icon="pi pi-trash" rounded severity="danger" aria-label="Cancel" />

}

<Button size="small"  onClick={() => handleToggledisable(index)}  style={{ background:"transparent",marginLeft:"10px", border:"none", width:"fit-content", height:"fit-content", display: disable === index ? "none" : "block"}} icon=" pi pi-ellipsis-h"></Button>



<Button onClick={ () => handleToggledisable(index)}  severity="warning"  style={{display: disable === index ? "block" : "none", marginLeft:"10px", background:"transparent", border:"none", width:"fit-content", height:"fit-content", color:"red"}} icon="pi pi-times-circle"></Button>



</span>
<div style={{marginRight:"auto", position:"absolute", top:"0", right:"0"}}>
<span style={{marginTop:"5px"}}>
{Array.isArray(content?.data?.Replies) &&
content.data.Replies.reduce((total, replyArray) => (
total + (Array.isArray(replyArray) ? replyArray.filter(reply => reply.parentid === comment.id).length : 0)
), 0)}


</span>
<button style={{background:"transparent", fontSize:"1rem", border:"none", padding:"0", color:"silver" }} onClick={() => handleToggleActive(index)}>
<FontAwesomeIcon 
icon={faReply}
/>


</button>


<button className="activatedLikes"  onClick={() => content && content.data && toggleLike(content.data.title, content.data.id, comment.id,content.data.user, content.data.poster, comment.comment )} style={{background:"transparent", fontSize:"1rem",margin:"4px",marginLeft:"20px", border:"none", padding:"0", outline:"none"}}  >
<span style={{display:"flex", flexDirection:"column" , color: comment.likes && comment.likes.includes(user) ? "orange" : "black"}}   >

<FontAwesomeIcon 

icon={faHeart}
/>
<i style={{marginLeft:"-5px"}}>{comment.likes && comment.likes.length}</i>

</span>


</button> 








</div>


  </div>
  <div className="comment-content">
  {comment.comment && comment.comment}
                  </div>
</div>
</div>



<ul className="comments-list reply-list" style={{display: activeIndex === index ? "block" : "none"}} >
<li>
  <div className="comment-avatar"><img src={im} alt=""/></div>
  <div className="comment-box">
      <div className="comment-head">
          <h6 className="comment-name">You</h6>
          <i className="fa fa-reply"></i>
          <i className="fa fa-heart"></i>
      </div>
      <div className="comment-content">

<Button icon="pi pi-times-circle" onClick={() =>  handleToggleActive(index) } style={{ background:"transparent", border:"none", color:"red",position:"absolute", top:"-10px", right:"-10px"}}></Button>

<InputTextarea
style={{width:"100%"}}
value={valueReply && valueReply}
name={valueReply && valueReply}
onChange={(e) => setValReply(prevValue => ({ ...prevValue, comment:  e.target.value })) }
rows={3}
cols={20}
/>

<Button onClick={() =>  {
handleToggleActive(index);
CommentReply(content.data.id, comment.id, content.data.user, content.data.poster, content.data.title);
}} style={{    position: "absolute",
bottom: "5px",
right: "0px",
width: "fitContent",
height: "fitContent",
paddingTop: "5px",

paddingBottom: "1px",
paddingLeft: "4px",
paddingRight: "4px",
color:"gray",
}

}
>reply</Button>
      </div>
  </div>
</li>




</ul>


<button onClick={ () => showRepliesToggle(index) } style={{background:"transparent ", border:"none", fontSize:"1rem", whiteSpace:"nowrap"}}> <i  style={{color:showReplies === index ?  "orange" : "gray"}}>{ showReplies === index ?   "Hide"  : `replies ${Array.isArray(content?.data?.Replies) &&
content.data.Replies.reduce((total, replyArray) => (
total + (Array.isArray(replyArray) ? replyArray.filter(reply => reply.parentid === comment.id).length : 0)
), 0)}
` }</i></button>   





{
Array.isArray(content?.data?.Replies)  &&  content && content.data.Replies &&  content?.data?.Replies.map((reply, index) =>
<>


<ul key={index}  className="comments-list reply-list"  >

{     Array.isArray(reply) && reply.map((replies) =>


replies.parentid === comment.id &&
<>


  <li  style={{ display: showReplies === index ? "block" : "none"}}>     

      <div className="comment-avatar"><img src={replies.profilePhoto ? replies.profilePhoto : im } alt=""/></div>
      <div className="comment-box">
          <div className="comment-head">

              <h6 className="comment-name">{replies.userName ? replies.userName : "Anonymous"}</h6>
              <span>{replies.timestamp && formatDate(new Date( parseInt(replies.timestamp, 10)))}</span>
                                
              <i style={{color:"orange"}} className="fa fa-reply"></i>
                    
                      <i  className="fa fa-heart fa-beat"></i>
          </div>
          <div className="comment-content">
{replies.comment}
          </div>
      </div>
</li></>  


)}

</ul>  </>
) }



</li>


</ul>


</div>



))}
{ content && content.data && last !== content.data.id && <button style={{background:"transparent", border:"none", outline:"none", whiteSpace:"nowrap",margin:"auto", width:"100%" , color:"gray" }} onClick={() => Reload(content.data.id ) }><i style={{color:"orange"}}>Show More</i></button>
}

<div  style={{ display: activeIndex === index ? "none" : "block", position:"sticky",height: "fit-content", width:"100", bottom :"-10px", zIndex:"100", background:"white", margin:"auto"}} >

<div  style={{  display: activeIndex === index ? "none" : "block", position:"relative",width:'fit-content',margin:"auto", background:"white"}}>
<InputTextarea
style={{width:"100%", position:"relative"}}
value={value && value}
name={value && value}
onChange={(e) => setValue(prevValue => ({ ...prevValue, comment:  e.target.value })) }
rows={3}
cols={70}
/>

<Button onClick={() => content && content.data && Comment(content.data.id, content.data.user, content.data.poster, content.data.title)} style={{position:"absolute", bottom:"0", right:"0"}}>comment</Button>
</div>
</div>





    </div>



</div>


</div>
</CommentsContainer>
<div key={index} >

    
<VidContainer 

>  

        <Video  
   
   
     poster={content && content.data.poster && content.data.poster} 
     

     id={content && content.data && content.data.id}

     onDoubleClick={() =>  {content.data &&  setBigHeart(content.data.id) ;  updateLikes( content.data.id, content.data.user, content.data.poster, content.data.title)  }}
     playsInline
     loop
     
     ref={videoRef}
    onClick={() => isplayable && togglePlay(content.data.id)  }

  >
    <source   src={content &&  content.data && content.data.playVid} type="video/mp4" />
    Your browser does not support the video tag.
  </Video>




  <IconsContainer  className="icon" style={{ right:"0"}}>

{
<RightsContainer id="rights " className="righs  d-flex flex-column   " >
     <IconsItem onClick={() =>   {togleBounce(content.data.id);  content.data && updateLikes( content.data.id, content.data.user, content.data.poster, content.data.title) }}  className="icons-item icons-m right-icon  d-flex flex-column" >
  
       <Icon  className="icon p-r">
         <img src={user && content && content?.data?.likes && content?.data?.likes.includes(user) ? hearted : heart}   className={ `${   user &&  content && content?.data?.likes && content.data.likes.includes(user) ?  "" : liked === content?.data?.id && 'heartBeat'}`} ref={likesIconRef}  alt="<3" id="likes-icon" />
    
    
       </Icon>

       <IconLabel style={{ fontSize: "0.90rem", color:"white", textShadow:"1px 1px black" }} data-likes={content && content?.data && content?.data?.likes} ref={likesRef}>
         {content && content?.data && content?.data?.likes?.length}
       </IconLabel>

       </IconsItem>



       <IconsItem className="icons-item icons-m right-icon  d-flex flex-column"   onClick={ () => content && content.data && activateComments(content.data.id)}>

       <Icon  className="icon p-r" style={{cursor:"pointer"}}>
       <img src={chat} alt="CMT" id="comments-ico"/>
       </Icon>

       <IconLabel style={{ fontSize: "0.90rem", color:"white", textShadow:"1px 1px black" }} data-likes={content && content?.data && content?.data?.commentsLength} >
       {content && content?.data && content?.data?.commentsLength}
       </IconLabel>
       </IconsItem>

       <IconsItem className="icons-item icons-m right-icon d-flex flex-column " >

       <Icon  className="icon p-r">
       <button className='drawr drawer4'   
        onClick={ () =>content && content.data && updateSaved(content.data.id, content.data.user, content.data.poster, content.data.title)}
           style={{color: user && content && content?.data && content?.data?.Saved && content?.data?.Saved.includes(user) ?  "#6b490b" : "white", background:"none",border:"none", fontSize:"1.2rem", marginTop:"-5px", padding:"0px"}}
           > <FaBookmark style={{fontSize:"20px"  }} /> </button>          </Icon>

       <IconLabel style={{ fontSize: "0.90rem", color:"white", textShadow:"1px 1px black" }} data-likes={content && content.data && content.data.Saved && content.data.Saved.length } >
         {content && content?.data && content?.data?.Saved && content?.data?.Saved?.length}
       </IconLabel>


       </IconsItem>

       <IconsItem className="icons-item icons-m right-icon  d-flex flex-column"   onClick={ () => content && content.data &&  setvisibility(content.data.id)}>

<Icon  className="icon p-r" style={{cursor:"pointer"}}>
<img src={Share} alt="CMT" id="comments-ico"/>
</Icon>

<IconLabel style={{ fontSize: "0.90rem", color:"white", textShadow:"1px 1px black" }} data-likes={content && content?.data && content?.data?.commentsLength} >
{content && content.data && content.data.commentsLength}
</IconLabel>
</IconsItem>
     {/* ... Other icons items ... */}
 </RightsContainer> }



 </IconsContainer>





{/*Add herer





*/}





          





<BottomContainer className="botto bg-dark text-light positionBotto positionBottom w-100">
<span  className="progress-duration text-dark bold float-right  " style={{fontSize:"1rem", marginBottom: "-20px", marginTop: "10px", color:"white"}} ref={duretaionr}> </span>
            <div className="progress-range" title="seek" ref={rangeRef} onClick={setProgress}>
              <div  className="progress-bar  progress-bar-animated"  ref={bare}></div>
            </div>
</BottomContainer>

{/*
<BottomContainer className="botto bg-light text-light positionBotto positionBottom w-100">
 
</BottomContainer>

<ProgressDuration className="progress-duration bold float-right text-light" style={{ textShadow: "1px 1px 1px black", fontSize: "1rem" }} ref={duretaionr}></ProgressDuration>
  <ProgressRange className="progress-range prog" title="seek" onClick={setProgress} ref={rangeRef} >
    <ProgressBar className="progress-bar" ref={bare}></ProgressBar>
  </ProgressRange>


 
 */}



<BottomTitle className="bottomTitle bg-dark bottomAbout"  onClick={() => navigate('/profileComponents/Myprofile')} style={{ display: "flex", left:"0", right:"0", flexDirection: "row", marginBottom:"60px", marginRight: "auto", position:"absolute", bottom:"0"}}>


<ProfileContainer>



<AvatarContainer className="icon" style={{ display: "flex", flexDirection: "row" }}>
<Avatar image={ content &&  content?.data && content?.data?.dp && content?.data?.dp} className="flex align-items-center bg-transparent justify-content-center mr-2" size="" shape="circle"></Avatar>

</AvatarContainer>


<TitleContainer style={{ display: "flex", flexDirection: "column" }}>




<span style={{fontSize:"20px", display:"flex", flexDirection:"row", marginBottom:"10px"}}>
<Subtitle style={{ display: "flex", flexDirection: "row", marginTop:"3px" }}>
      <h3 style={{ color: "gray", fontSize: "18px" , fontWeight:"bold"}}>{content && content?.data?.title && content?.data?.title}</h3>
      <i style={{ fontSize: '0.80rem', color: "rgb(207 120 40)", textShadow: "1px 1px black", marginTop: "1px", marginLeft: "2px" }} className="pi pi-verified"></i>
    </Subtitle>
  <b style={{color:"gray",  whiteSpace:"nowrap", fontSize:"13px", margin:"5px" , marginLeft:"20px"}}>0 Views<i id="country-code" style={{color: "#606060",  margin: "12px 0 0 4px"}} >
{formatDate(content &&  content.data && content.data.time || 0)}
</i> </b> </span>  



  


<Videotitle>
<h3 style={{fontWeight:"bold", float:"left"}}>
{content?.data && content?.data?.username || content?.data  && content?.data?.title}

</h3>


</Videotitle>

</TitleContainer>
</ProfileContainer>





</BottomTitle>



<BlabShare playVid={content?.data?.playVid}  id={content?.data?.id}   visible={visible} setVisible={setVisible}/>


<PLAYPAUSE />

<BigHeart/>
</VidContainer>
  </div>
</>
 
  );
}
export default ScrollContainer;


const ProfileContainer =  styled.span`
display: flex;
z-index: 9;

`;

const Videotitle =  styled.span`

`;




const Div =  styled.span`

`;

const Video = styled.video`
 
max-width: 100%;
max-height: 100%;

height: 100vh;
object-fit: contain;
width: auto;

margin-bottom: -210px;
position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  outline: 0;
  font-family: "YouTube Noto",Roboto,Arial,Helvetica,sans-serif;
  color: #eee;
  text-align: left;
  direction: ltr;
  font-size: 11px;
  line-height: 1.3;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  touch-action: manipulation;
  -ms-high-contrast-adjust: none;
  forced-color-adjust: none;
`;

const VidContainer = styled.div`
position: relative;
height: 90vh !important;
background: black;
margin-top: 50px;
border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-radius: 12px !important
    ;
`


/*

  {state.map((el, index) => (   ))}
*/
//import styled from "@emotion/styled";

//import { isObject } from "lodash";

 

/*


*/
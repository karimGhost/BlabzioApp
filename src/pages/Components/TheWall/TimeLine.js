import React, { useEffect, useState, useRef,useMemo } from 'react'; 
//import { Card } from 'primereact/card';

import { useAuth } from '../../../Accounts/useAuth';
//import { useTimeLine } from "../useTimeLine";
import chat  from "../../../images/chat.webp";
import share  from "../../../images/share.webp";
import { InputTextarea } from 'primereact/inputtextarea';
import { Link } from 'gatsby';
import heart from "../../../images/heart.webp";
import hearted  from "../../../images/heart+.png";
import { values } from 'lodash';
import { navigate } from 'gatsby';
import { Avatar } from 'primereact/avatar';
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons"; 
 import im from "../../../images/proxy.jpeg";
                                    
import LoadingAnim from '../../../Accounts/LoadingAnim';

import debounce from 'lodash/debounce';
import {  

firestore, getFirestore, collection, query, orderBy,where, limit, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { orderByKey, startAt } from "firebase/database";
import '../../../styles/Video.scss';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import "../../../styles/Timeline.css";
import "../../../styles/TheWall.css"
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


const firebaseConfigTimelinedd = {
  apiKey: "AIzaSyAlILFCEiJQQJsQB2a0uidx61r9zfEVLWc",
  authDomain: "notifications-a1743.firebaseapp.com",
  databaseURL: "https://notifications-a1743-default-rtdb.firebaseio.com",
  projectId: "notifications-a1743",
  storageBucket: "notifications-a1743.appspot.com",
  messagingSenderId: "624660139679",
  appId: "1:624660139679:web:a73fd504b5ba8e7b005caa",
  measurementId: "G-BCF42GY6H1"
};


export default function TimeLine({Watchlist, Switch,  Useris,
  updateLikes,
  Comment,
  values,
  setValue,
  vid, 
  setVid,
  visible,
  firestored,
  firestore,
  UpdateLoad,
   setUpdateLoad,
   setSlideDisable,
  
  
  keys,
  setvideodid,
  CommentReply,
  commentAfterReply,
  toggleLike,
  Reload,
  valueReply,
  setValReply,
  toggleDelete,
  last
}){



  const [uniqueLikesId, setUniqueLikesId] = useState(new Set());
  const [uniqueCommentId, setUniqueCommentId] = useState(new Set());
const [uniqueCommentreplyId, setuniqueCommentreplyId] = useState(new Set())
  const time = firebase.initializeApp(firebaseConfigTimelinedd, "timeLinedd");
  const wall = firebase.initializeApp(firebaseConfigTheWall, "appWall");

  const [BottomLoading, setBottomLoading] = useState(false)

const {user} = useAuth()

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
    // Clicked a different button, so open it and close the previously open button
    setActiveIndex(index);
  }
};


const timeLine = firebase.app("timeLinedd");
//const firestored = getFirestore(timeLine)


const appWall = firebase.app("appWall");

//const firestore = getFirestore(appWall);

const [isplayable, setisPlayabele] = useState(true)

//const {app05, user}  = useAuth();

const [timelineVid, setTimelinevid] = useState([]);

const [loading, setLoading] = useState(false)


   const likesRef = useRef(null)

   const commentsRef = useRef(null)

   const commentsreplyRef = useRef(null)
   const [vidval, setvidval] = useState(false);

   const Disable = (id) =>{
    setvidval(false)
    //setVid(pre => pre.id !== id)
  
    setSlideDisable(false)
  }
   if(timelineVid){
    console.log("are they all", timelineVid)
   }

   const maxRetries = 3;
   let retryCount = 0;

   async function TimeLine() {
    
    if(timelineVid.length === 0){
    setLoading(true)

    }
     const likes =   likesRef.current
        ?  query(
         collection(firestored, 'likes'),
         orderBy("id", "asc"),
         startAfter(likesRef.current),
         limit(2)
       )
        : query(collection(firestored, 'likes'), orderBy("id", 'asc'), limit(2));
  

      
      const comments = commentsRef.current
        ? query(
            collection(firestored, 'comments'),
            orderBy("id", "asc"),
            startAfter(commentsRef.current),
            limit(2)
          )
        : query(collection(firestored, 'comments'), orderBy("id",'asc' ), limit(2));
  
      const CommentReply = commentsreplyRef.current
        ? query(
            collection(firestored, 'CommentReply'),
            orderBy("id", "asc"),
            startAfter(commentsreplyRef.current),
            limit(2)
          )
        : query(collection(firestored, 'CommentReply'), orderBy("id",'asc' ), limit(2));
        try {
      const [LikesSnap, CommentsSnap, CommentReplySnap] = await Promise.all([
       await getDocs(likes),
     await   getDocs(comments),
     await   getDocs(CommentReply),
      ]);
  

     
  


      const values = [];
      const LikesS = [];
  
      LikesSnap.forEach((commentDoc) => {
        const commentDataLikes = commentDoc.data();
        const commentId = commentDataLikes.id;
        const comentids = commentDoc.id
  
        if (!uniqueLikesId.has(comentids)) {
          uniqueLikesId.add(comentids);
          values.push(commentDataLikes);
          LikesS.push(commentId);
        }
      });
     

      if (LikesS.length !== 0) {
        likesRef.current = LikesS[LikesS.length - 1];
      } else {
        likesRef.current = null;
      }
  
      const CommentsS = [];
  
      CommentsSnap.forEach((commentDoc) => {
        const commentDataComment = commentDoc.data();
        const commentId = commentDataComment.id;
        const comentids = commentDoc.id

        if (!uniqueCommentId.has(comentids)) {
          uniqueCommentId.add(comentids);
          values.push(commentDataComment);
          CommentsS.push(commentId);
        }
      });
  
      if (CommentsS.length !== 0) {
        commentsRef.current = CommentsS[CommentsS.length - 1];
      } else {
        commentsRef.current = null;
      }
  
      const CommentsreplyY = [];
  
      CommentReplySnap.forEach((commentDoc) => {
        const commentData = commentDoc.data();
        const commentId = commentData.id;
        const comentids = commentDoc.id


        if (!uniqueCommentreplyId.has(comentids)) {
          uniqueCommentreplyId.add(comentids);
          values.push(commentData);
          CommentsreplyY.push(commentId);
        }
      });
  
      commentsreplyRef.current = CommentsreplyY[CommentsreplyY.length - 1];

      if (CommentsreplyY.length !== 0) {
    
      } else {
        CommentsreplyY.current = CommentsreplyY[CommentsreplyY.length - 1]
      }
      await Promise.all(values);
      setTimelinevid((prev) => [...prev, ...values]);
      setUpdateLoad("")



    } catch (error) {
  console.error("Error in TimeLine operation:", error);
  setLoading(false)

  // Add retry logic here (increment retryCount, etc.)
  console.log("errr", "rrrrrrrrrr")
  if (retryCount < maxRetries) {
    setLoading(true)

    retryCount++;
    console.log(`Retrying (${retryCount}/${maxRetries})...`);
    setTimeout(async () => {
      try {
        // Retry the asynchronous operation
        await TimeLine();
      } catch (retryError) {
        console.error("Error in retry operation:", retryError);
        setLoading(false)
        setUpdateLoad("Error Reload!")

        throw retryError; // Ensure the retry error is propagated
      }
    }, 1000); // Wait for a moment before retrying
  } else {
    setLoading(false)

    console.error("Max retry count reached. Unable to fetch data.");
    setUpdateLoad("Reload The Page, Or check your internet");
  }
}
  }
  
  useEffect(() => {
if(commentsreplyRef.current){
  console.log("thisiscomment", commentsreplyRef.current)
}

  }, [commentsreplyRef.current])

useEffect(() => {
  if(timelineVid.length === 0){
  TimeLine() 

  }

}, [retryCount])
 
  const videoref = useRef(null)

  const bare = useRef(null);
  const duretaionr = useRef(null);
  const rangeRef = useRef(null);
  const commentscountr = useRef(null);
  const commentsCount2Ref = useRef(null);
  const countlistr = useRef(null);
  const overlayRef = useRef(null);
  const closeOverlayRef = useRef(null);
  const comentcontairef = useRef(null);
  const closeCommentsRef = useRef(null);
  const LikesRef = useRef(null);
  const likesIconRef = useRef(null);
  const [showNull, setShowNull] = useState(null);
  
  
  const vidawatched = useRef(null)




  const [uniqueVideoId, setUniqueVideoId] = useState(new Set());

  const [uniqueVideoIds, setUniqueVideoIds] = useState(new Set());
  const lastVideoRef = useRef(null);


  async function ReadTimeLine(id) {


    setSlideDisable(true)
    const videoCollection = collection(firestore, 'videos');
    console.log("idss", lastVideoRef.current);
  
  
     
    const videoQuery = query(videoCollection, where("id", "==", id), orderBy("id", "desc"));
  
    try {
      const snapshot = await getDocs(videoQuery);
  
      if (snapshot.size <= 0) {
        // If no documents are found, return early to avoid unnecessary processing
        setLoading(false);
        setUpdateLoad("No More Vids!")
        return;
      }
  
      const newVideos = [];
  
      for (const videoDoc of snapshot.docs) {
        const data = videoDoc.data();
        const videoId = videoDoc.id;
        console.log("if data", data);
  
        if (!uniqueVideoIds.has(videoId)) {
          uniqueVideoIds.add(videoId);
  
  
  
          try {
            setUpdateLoad("Loading ")
  
            // Check for video file existence and fetch URL
            const videoFileRef = appWall.storage().ref(`videos/${data.id}.webm`);
            const metadata = await videoFileRef.getMetadata();
            const videoFileURL = await videoFileRef.getDownloadURL();
            data.playVid = videoFileURL;
  
  
          } catch (error) {
            console.error("Error fetching video file:", error);
            setUpdateLoad("Loading Error ,Reload !")
            setvidval(false)
            data.playVid = null;
          }
  
       
          const limitedCommentsQuery = query(
            collection(firestore, 'videos', data.id, 'comments'),
            orderBy("id", "desc"),
            limit(7)
          );
          
          // Query for the total number of comments
          const totalCommentsQuery = query(
            collection(firestore, 'videos', data.id, 'comments'),
            orderBy("id", "desc")
          );
          
          const [commentsSnapshot, totalCommentsSnapshot] = await Promise.all([
            getDocs(limitedCommentsQuery),
            getDocs(totalCommentsQuery)
          ]);
          
  
  
  
          // Get the total number of comments valuereply
          const totalComments = totalCommentsSnapshot.size;
          
          // Fetch comments associated with this video
          const comment = [];
          const commentRepliesArray = [];
          
          commentsSnapshot.forEach(async (commentDoc) => {
            const commentData = commentDoc.data();
            const commentId = commentData.id;
  
            uniqueVideoId.add(commentId);
  
            // Log the comment ID
            console.log("Comment ID:", commentId);
          
            comment.push(commentData);
          
            const commentReplyQuery = query(
              collection(firestore, 'videos', data.id, commentId, 'commentreply', commentId),
              orderBy("timestamp", "desc")
            );
          
            const commentReplySnapshot = await getDocs(commentReplyQuery);
  
  
            const commentReplies = [];
            commentReplySnapshot.forEach((commentReplyDoc) => {
              commentReplies.push(commentReplyDoc.data());
            });
          
            commentRepliesArray.push(commentReplies);
          });
          
          data.comments = comment;
          data.commentsLength = totalComments;
          
        
          
          // Ensure all asynchronous operations are complete before continuing
         await Promise.all(commentRepliesArray);
  
  console.log("consoledval", commentRepliesArray)
  // Flatten the nested arrays of commentRepliesArray
  const flattenedReplies = commentRepliesArray.reduce((acc, val) => acc.concat(val), []);
  
  //console.log("consoledflat", flattenedReplies);
  
  // Now, assign the flattenedReplies to data.Replies
  data.Replies = commentRepliesArray;
  
                  newVideos.push({ id: videoId, data });
          
          
                }
      }
      setUpdateLoad("")
  
  
   setVid((pre) => (pre && pre.length > 0 ? [...pre, ...newVideos] : newVideos));
   setvidval(true)
      setLoading(false);
  
      console.log("datasVids", newVideos);
    } catch (error) {
      console.error("Error fetching video file:", error);
      setUpdateLoad("Reload The Page ,Or check your internet")
      setvidval(false)
  
    }



  }





  let lastScrollY = 0; // a variable to store the last scroll position

  const handleScroll = async () => {
    if (loading) {
      return;
    }
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
  
    // Check if you're scrolling down and near the bottom
    if (scrollY > lastScrollY && documentHeight - (scrollY + windowHeight) < 100) {
      // Set the last scroll position
      lastScrollY = scrollY;

      setUpdateLoad("Loading!")
  
        setBottomLoading(true)
      // If there's a last video and more videos to load, call loadVideos
      await TimeLine();
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  

const activateComments = (id) => {
  comentcontairef.current.classList.add("comments-active");
  videoref.current && videoref.current.pause();
  if (videoref.current && videoref.current.pause) {
    videoref.current.style.cursor = "pointer";
  }
};


const [loadedComments, setLoadedComments] = useState([]);

const loadComments = () => {
setLoadedComments(vid.comments);
};


const deactivateComments = () => {
  if (videoref.current.pause) {
    comentcontairef.current.classList.remove("comments-active");
    videoref.current.play();
    videoref.current.style.cursor = "default";
  }
};

  useEffect(() => {
   
  }, [user,  updateLikes]);
  
  








const darkmode = useRef(null)



 
const [showButton, setShowButton] = useState(true);


const togglePlay = (id) => {


    
  if (videoref.current && videoref.current.id === id) {
    if (isPlaying) {
    //  videoref.current.pause();
    
      setShowButton(true);
    } else {
    //  videoref.current.play();
    
      setShowButton(false);
    }
    }
    
    
};

const vidref = useRef(null)



const [showtip, setShowtip] = useState(false)



let playbackTimeout; 
const startPlayback = (id) => {

if(videoref.current && videoref.current.id   === id){
return;
}
if (videoref.current && !isPlaying) {

videoref.current.play();

var playPromise = videoref.current.play();





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
if( videoref.current && !videoref.current.id === id){
return;
}
if (videoref.current && isPlaying) {


var playPromise = videoref.current.play();

if (playPromise !== undefined) {
  playPromise.then(_ => {
    // Automatic playback started!
    // Show playing UI.
    // We can now safely pause video...
    videoref.current.pause();
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


const setProgress = (e) => {
  const time = e.nativeEvent.offsetX / rangeRef.current.offsetWidth;
  videoref.current.currentTime = time * videoref.current.duration;
};



 
useEffect(() => {
  console.log("vida", vid)

}, [vid])

const [isPlaying, setIsPlaying] = useState(false)

const togglePla = (id) => {

  
  
  
    if (isPlaying) {
      let playPromise = videoref.current.play();
   
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          videoref.current.pause();
          setIsPlaying(false)
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.log(error)
        });
      }
       
    
     }else{
  
      let playPromise = videoref.current.play();
   
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
        setIsPlaying(true)
        })
        .catch(error => {
          // Auto-play was prevented "visibility" timeline
          // Show paused UI.
          console.log(error)
        });
      }
  
  
     }
  
  
  
  };
  
  



  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const video = videoref.current;
  
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
  }, [user, videoref]);
  

  const likesCount = useMemo(() => {

    if(!vid ){
      return;
    }
    if (typeof  vid.likes === 'string' && vid.likes.length > 0) {
      return vid.likes.split(',').length;
    } else {
      return 0;
    }
  }, [vid && vid.likes]);
  
  //const local = localStorage.getItem('WatchList');
//const [Watchlist, setWatchList] = useState(local)
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

const [Val, setVal] = useState(null)


const format = (date) => {
  if (!date) {
    return "";
  }
  const timeDiffMs = new Date() - new Date(date);
  const timeDiffMSec = Math.floor(timeDiffMs / 1000);
  if (timeDiffMSec === 0) {
    return ``;
  }
  const timeDiffSec = Math.floor(timeDiffMs / 1000);
  if (timeDiffSec < 60) {
    return `${timeDiffSec}  `;
  }
  const timeDiffMin = Math.floor(timeDiffSec / 60);
  if (timeDiffMin < 60) {
    return `${timeDiffMin}  `;
  }
  const timeDiffHr = Math.floor(timeDiffMin / 60);
  if (timeDiffHr < 24) {
    return `${timeDiffHr}  `;
  }

  const timeDiffDay = Math.floor(timeDiffHr / 24);
  if (timeDiffDay < 2) {
    return `${timeDiffDay}  `;
  } else if (timeDiffDay < 30) {
    return `${timeDiffDay}  `;
  }

  const timeDiffMo = Math.floor(timeDiffDay / 30);
  if (timeDiffMo < 12) {
    if (timeDiffMo < 2) {
      return `${timeDiffMo}  `;
    }
    return `${timeDiffMo}  `;
  } else {
    const timeDiffYr = Math.floor(timeDiffMo / 12);
    if (timeDiffYr < 2) {
      return `${timeDiffYr}  `;
    }
    return `${timeDiffYr}  `;
  }
};


const sortedTimeline = timelineVid.length !== 0 && timelineVid
  .slice()
  .filter((a) => a.timestamp !== undefined && a.timestamp !== null)
  .sort((a, b) => {
    const timestampA = format(a.timestamp);
    const timestampB = format(b.timestamp);

    // Assuming formatDate returns valid timestamps
    if (timestampA !== undefined && timestampB !== undefined) {
      return timestampB - timestampA;
    }
   

    // black Handle the case where formatDate returns undefined
    // You may want to adjust this part based on your requirements
    return 0;
  })

if (timelineVid.length === 0) {
  return <div style={{marginRight: "0.5rem !important",margin: "auto",  width: "100vw",
  position: "fixed",
  left: "0",
  top:" 0"}}><LoadingAnim /></div>;
}




if( vidval && vid){



const deactivateComments = (id) => {
  startPlayback(id)
 
  if (vidref.current.pause) {
    
   
    comentcontairef.current.classList.remove("comments-active");
   // vidref.current.play();
    setisPlayabele(true)

    vidref.current.style.cursor = "default";
  }
};


const SlideContainer = {
  position: "absolute",

  height: "70%",
  top: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transformOrigin: "50% 50%"
}

const SlideCard = {
  position: "relative",
  maxWidth: "50%",
  minWidth: "30%",
  width: "100vw",
  height: "100%",
  background: "white",
  fontSize: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transformOrigin: "50% 50%"
}
  return(
     vid.map((content, index) => (
<>

<div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "60vh",
        margin: "0 auto",
        background: "white",
        left:"0",
        top:"0",
        zIndex:"20"
      }}
    >
      <Button onClick={()  =>  Disable(content.id)} icon="pi pi-chevron-left" style={{height:"fit-content", position:"fixed", top:"10px", zIndex:"88",left: visible && "190px", right: !visible && "0",  background:"black",  border: "1px solid orange"}}></Button>

      <div  style={SlideContainer}>
<div  style={SlideCard}>


      <div  className="slidContainer" key={keys}>
             <div>


{/* End video Big Player mdi fas mdi  Loading    <span className="">*/}

      <div style={{ marginTop:"-30px", background: darkmode.current   ? "black" : "white"}} className="ConBod contbod" >


     

        <div   className="containered conte "  
      >
    
    <div className="comments-container w-100" style={{zIndex:"4", width:"100%", margin:"auto"}} ref={comentcontairef}>
            <div className="comments-head">
              <span className="comments-head-label" ref={commentscountr}></span>
              <span onClick={() => deactivateComments(content.data.id)} className="comments-head-close" ref={closeCommentsRef}>
                &#10005;
              </span>
            </div>




            <span style={{fontSize:"1.67rem", position:"sticky", top:"0"}}>Comments: {/*content.comments && content.comments.length */}</span>
  <div  className="">



           
<div className="comments-lis"> 




{ content && content.data.comments &&  content.data.comments.map((comment, index) => (



<div  style={{position:"relate"}}>
<ul key={index} id="comments-list" className="comments-list" style={{width:"fit-content", margin:"auto"}}>
    <li>
        <div className="comment-main-level">
	<div class="comment-avatar"><img src={im} alt=""/></div>
              <div className="comment-box">
                <div className="comment-head">
                    <h6 className="comment-name by-autho"> {comment.userName && comment.userName || "anonymous"}</h6>

                    <span>{comment.timestamp && formatDate(new Date( parseInt(comment.timestamp, 10)))}</span>
<span style={{display:"flex", flexDirection:"row", marginTop:"-12px", marginLeft:"20px"}}>
 {/*     <Button  size="small" style={ { display: disable === index ? "block" : "none",background:"transparent" ,marginTop:"5px", padding:"10px", width:"auto", height:"2rem" }} icon=" pi pi-exclamation-circle" rounded severity="danger" aria-label="Cancel" />



*/
 
   <Button onClick={() => toggleDelete(content.data.id, comment.id,content.data.user)}  size="small" style={ { display: disable === index ? "block" : "none",background:"transparent" ,marginTop:"5px", padding:"10px", width:"auto", height:"2rem" }} icon="pi pi-trash" rounded severity="danger" aria-label="Cancel" />

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
 <button style={{background:"transparent", fontSize:"1rem", border:"none", padding:"0" }} onClick={() => handleToggleActive(index)}>
  <FontAwesomeIcon 
icon={faReply}
/>


</button>


<button className="activatedLikes"  onClick={() => toggleLike(content.data.title, content.data.id, comment.id,content.data.user, content.data.poster, comment.comment )} style={{background:"transparent", fontSize:"1rem",margin:"4px",marginLeft:"20px", border:"none", padding:"0", outline:"none"}}  >
<span style={{display:"flex", flexDirection:"column" , color: comment.likes && comment.likes.includes(user) ? "red" : "black"}}   >

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

<Button onClick={() =>{
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
    paddingRight: "4px"
}

}
>reply</Button>
                    </div>
                </div>
            </li>

          


        </ul>
       
      
        <button onClick={ () => showRepliesToggle(index) } style={{background:"transparent ", border:"none", fontSize:"1rem", whiteSpace:"nowrap"}}> <i>{ showReplies === index ? "Hide" : `replies ${Array.isArray(content?.data?.Replies) &&
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
                            <i className="fa fa-reply"></i>
                          
                            <i className="fa fa-heart fa-beat"></i>
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
 { last !== content.data.id && <button style={{background:"transparent", border:"none", outline:"none", whiteSpace:"nowrap",margin:"auto", width:"100%"  }} onClick={() => Reload(content.data.id ) }><i>Show More</i></button>
  }
  
    <div  style={{ display: activeIndex === index ? "none" : "block", position:"sticky",height: "fit-content", width:"100", bottom :"-10px", zIndex:"100", background:"white", margin:"auto"}} >

<div  style={{  display: activeIndex === index ? "none" : "block", position:"relative",width:'fit-content',margin:"auto", background:"white"}}>
            <InputTextarea
            style={{width:"100%", position:"relative"}}
value={values && values}
name={values && values}
  onChange={(e) => setValue(prevValue => ({ ...prevValue, comment:  e.target.value })) }
  rows={3}
  cols={70}
/>

<Button onClick={() => Comment(content.data.id, content.data.user, content.data.poster, content.data.title)} style={{position:"absolute", bottom:"0", right:"0"}}>comment</Button>
</div>
</div>



</div>











 
  </div>


 </div>




 <div key={index} className="comments-container " style={{marginBottom:" -3px"}}>
<h1>Comments </h1>
 
          </div>




          <div    className="vidcov"    
          
          onMouseOver={() => isplayable && startPlayback(content.data.id)}
          onMouseLeave={() => stopPlayback(content.data.id)}  >
<div style={{width:"100%", background:"inherit", position:"relative", left:"13%", right:"0", bottom:"0", top:"0"}}>
     <video 
        onMouseOver={() => isplayable && startPlayback(content.data.id)}
        onMouseLeave={() => stopPlayback(content.data.id)}         
          preload="none"
          poster={content && content.data.poster && content.data.poster}
onDoubleClick={() => updateLikes(content.data.id, content.data.user)}
            className=" vidslid vidaslid"
            playsInline
            loop
              autoPlay = {content?.data?.playVid }
           onClick={() => isplayable && togglePlay(content.data.id)}
            ref={vidref}
        id={content && content.data.id}
      width={videoWidth}
        height={videoHeight}
          >
    <source src={content && content.data.playVid} type="video/mp4" />
                Your browser does not support the video tag.    
                
                
    </video>  
    
      <Button style={{zIndex:"99",position:"absolute", top:"-50px",fontSize:"1.5rem", left:"0",background:"transparent", color:"black", textShadow:" 1px 1px black", border:"none", border: "1px solid orange"}}>Blabzio</Button>

</div>
             


          </div>
      
        
        
            <div className="icons">
            <div id="rights " className="right rights">

            <div  className="icons-item icons-m right-icon">
              <span  onClick={() => content && updateLikes( content.data.id, content.data.user, content.data.poster, content.data.title) } className="icon p-r">
                   
                <img src={ user && content && content.data.likes && content.data.likes.includes(user) ? hearted :  heart} alt="<3" id="likes-icon" ref={likesIconRef} />

                        </span>

              <span className="icon-label likes right-label text-light" style={{fontSize:"0.90rem"}} data-likes={content.data.likes} ref={likesRef}>{content.data.likes.length}</span>

            </div>
            <div  onClick={ () => content && activateComments(content.data.id)} className="icons-item icons-m right-icon">
              <span className="icon p-r">
              <img src={chat} alt="CMT" id="comments-icon"/>
              </span>   
              <span  style={{fontSize:"0.90rem"}} className="icon-label comments right-label text-light">{ content.data.commentsLength
 && content.data.commentsLength
}</span>
            </div>
            <div className="icons-item icons-m right-icon">
              <span className="icon p-r">
                <img src={share} alt="share"/>
              </span>
              <span style={{fontSize:"0.90rem"}}className="icon-label shares right-label text-light">4</span>
            </div> 
          </div>
          <div className="bottom positionBottom positionBottoms" >
            <span  className="progress-duration  bold float-right  text-light" style={{ textShadow:"1px 1px 1px black",fontSize:"1rem", marginBottom: "-20px", marginTop: "10px"}} ref={duretaionr}></span>
            <div className="progress-range" title="seek" ref={rangeRef} onClick={setProgress}>
              <div className="progress-bar" ref={bare}></div>
            </div>
            
         
            </div>
          </div>
        </div>

        <div className="bottomTitle"   onClick={ () => navigate('/profileComponents/Myprofile')} 
 style={{display:"flex", flexDirection:"column", marginRight:"auto"}}>




                <span className="icon" style={{display:"flex", flexDirection:"row"}}>

                <Avatar image={ content && content.data.dp && content.data.dp} className="flex align-items-center bg-transparent  justify-content-center mr-2" size="large" shape="circle" />
              
                <div style={{display:"flex", flexDirection: "column"}}>

<span style={{fontSize:"20px", display:"flex", flexDirection:"row", marginBottom:"10px"}}>{content && content.data.title}<b style={{color:"gray",  whiteSpace:"nowrap", fontSize:"13px", margin:"5px" , marginLeft:"20px"}}>0 Views<i id="country-code" style={{color: "#606060",  margin: "12px 0 0 4px"}} >
{formatDate(content && content.data.time || 0)}
</i> </b> </span>  

<span style={{marginTop:"-10px"}}>
 <span style={{display:"flex",flexDirection:"row"}}>
<h3 style={{color:"gray",  marginTop:"-5px",    marginBottom: "-5px", fontSize:"18px"}}>{ content && content.data.title && content.data.title}</h3>
<i style={{ fontSize: '0.80rem', color:"rgb(105 66 107)" ,textShadow:"1px 1px black", marginTop: "1px"
    ,marginLeft: "2px"}} className="pi pi-verified"></i>
</span>
</span> 

                               </div>
</span>
               


</div>


      </div>
    </div>
    </div>


{/* End video Big Player mdi fas mdi      <span className=""> localStorage*/}

   </div>
   </div>
   </div>
</>
))
  )
}





return (
Watchlist    ?   
(
  <>
      
    
      <div className=" mainVid "> 
      <div className="container  " style={{marginTop:"10px"}}>
        <ul className="timeline">
          {sortedTimeline.map((entry, _index) => (
         
  
            entry.Favourated === "you watched "  ? (
            <li key={_index}>
              {entry.content === "video" && (
                <>
                  <div className="timeline-time">
                    <span className="date">{"/"}</span>
                    <span className="time">{formatDate(entry.timestamp)}</span>
                  </div>
                  <div className="timeline-icon">
                    <a href="javascript:;">&nbsp;</a>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-header">
                      <span className="userimage">
                        <img src={entry.poster && entry.poster} alt="User" />
                      </span>
                      <span className="username">
  {`${entry.Favourated} `}
  <Link to={entry.userName}>{entry.userName}</Link>
  {` ${entry.content}`}
  </span>                        <span className="pull-right text-muted">
                     
                      </span>
                    </div>
                    <div className="timeline-vid">
                      <h4 className="template-title">
                        <i className="fa fa-map-marker text-danger fa-fw"></i>
                      
                      </h4>
                      <p >{`${entry.Favourated}  ${entry.id} ${entry.content}` }</p>
                      <p className="m-t-20">
                         {entry.title && entry.title}
                      </p>                          <img src={entry.poster && entry.poster} alt="Media" />
  
                    </div>
                    <Button style={{background:"black",  border: "1px solid orange"}} onClick={() => ReadTimeLine(entry.parentid)} >
    View
  
                    </Button>
               
                  </div>
                </>
              )}
            </li>   )  : (<></>)
          ))}
        </ul>
    </div>
    </div>
  </> 
)
:     

 (
<>
    
 {!sortedTimeline &&
 <div style={{margin:"auto"}}>No Data Available here!</div>


}
<div className=" mainVid "> 
    <div className="container  " style={{marginTop:"10px"}}>
      <ul className="timeline">
        {sortedTimeline && sortedTimeline.map((entry, _index) => (
          <li key={_index}>
            {entry.content === "video" && (
              <>
                <div className="timeline-time">
                  <span className="date">{"/"}</span>
                  <span className="time">{formatDate(entry.timestamp)}</span>
                </div>
                <div className="timeline-icon">
                  <a href="javascript:;">&nbsp;</a>
                </div>
                <div className="timeline-body">
                  <div className="timeline-header">
                    <span className="userimage">
                      <img src={entry.poster && entry.poster} alt="User" />
                    </span>
                    <span className="username">
{`${entry.Favourated} `}
<Link to={entry.userName}>{entry.userName}</Link>
{` ${entry.content}`}
</span>                        <span className="pull-right text-muted">
                   
                    </span>
                  </div>
                  <div className="timeline-vid">
                    <h4 className="template-title">
                      <i className="fa fa-map-marker text-danger fa-fw"></i>
                    
                    </h4>
                    <p >  {entry.title && entry.title}</p>
                    <p className="m-t-20">
                     
                    </p>                          <img src={entry.poster && entry.poster} alt="Media" />

                  </div>
             <Button style={{background:"black",  border: "1px solid orange"}} onClick={() => ReadTimeLine(entry.parentid)}>View</Button>
</div>
            </>
        )}
          </li>
        ))} 
      </ul>

     
  </div>
  </div>
</>  )  

);


                }
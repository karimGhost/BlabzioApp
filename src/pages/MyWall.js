import React, { useEffect, useState, useRef, isValidElement } from "react";
import { nanoid } from "nanoid";
import VideoPlayer from "./Components/Videoplayer";

import { useAuth } from "../Accounts/useAuth";
import ProfileIndex from "./ProfileIndex";

//import NAvbar from "../Navbar";
import Navbar from "../Navigation/Navbar"
import { propTypes } from "react-bootstrap/esm/Image";
import im from "../images/proxy.jpeg";
import { Button } from "primereact/button";
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { isObject } from "lodash";
import TimeLine from "./Components/TheWall/TimeLine";
import CommentInput from "./Components/CommentInput";
import EditedVideo from "./Components/Editvideo";
import MyVideosContainer from "./Components/TheWall/MyVideosContainer";
import debounce from 'lodash/debounce';
import { getFirestore, collection, query, orderBy,where, limit,enableTimestampsInSnapshots, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { orderByKey, startAt } from "firebase/database";
import { arrayOf, object } from "prop-types";
import LoadingAnim from "../Accounts/LoadingAnim";
import { initializeApp } from 'firebase/app';
import ScrollContainer from "./Components/ScrollContainer";
import { useLocation } from "@reach/router";
import blab from "../images/Blab.jpeg"
import Gallery from "./Profile/Gallery";
import ProfileSaved from "./Profile/ProfileSaved";
import ProfileTimeLine from "./Profile/ProfileTimeLine";

import styled from 'styled-components';

import "../styles/TheWall.css"
import "../styles/Video.scss"
import "primereact/resources/primereact.min.css";  
      import "../styles/index.css";
      import "primereact/resources/themes/lara-light-indigo/theme.css";     


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

 export default function MyWall(props) {
  const Saved = props.Saved || null;
  const timeL = props.timeL || null;

  const  AllData=props.AllData

  const setAllData=props.setAllData;
  const AllPosts = props.Allposts;

const wall = firebase.initializeApp(firebaseConfigTheWall, "appWall");

 const time = firebase.initializeApp(firebaseConfigTimeline, "timeLine");
  const timeLine = firebase.app("timeLine");
  
const appWall = firebase.app("appWall");
  
  const [lastDocumentInCurrentBatch, setLastDocumentInCurrentBatch] = useState(null);
  
  //const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2";
//const {user, app05} = useAuth(); localstorage  window.addEventListener


const {user} = useAuth()
//const firestor = getFirestore(appWall);
const storage = getStorage(appWall);
const firestored = getFirestore(timeLine)
const firestore = getFirestore(appWall);



const location = useLocation();

const ueryString = location.search;
const params = {};

if (ueryString) {
  ueryString
    .substring(1)
    .split('&')
    .forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = decodeURIComponent(value);
    });
}

const vidID = params.id || null;




  const [stream, setStream] = useState(null);
  const liveVideoFeed = useRef(null);
  const [permission, setPermission] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
const [videoDur, setVideoDur] = useState(null);
const [vid, setVid] = useState([])
const [recordedVideos, setRecordedVideos] = useState([])
const [videoid, setvideoid] = useState(null)
const [visible, setVisible] = useState(false);
const [BottomLoading, setBottomLoading] = useState(false)


/*
  useEffect(() => {
    // Check if localStorage is available (on the client-side) user
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedURL = window.localStorage.getItem("videoBlob");
      if (storedURL) {
        setImageURL(storedURL);
        setImageFile(storedURL);
      }
    }

  }, []); // The empty dependency array ensures this runs only once on mount type

*/
function toggleLike() {

}



const setvideodid = async (id, userid, poster, title) => {
  let val = "false";
  const timestamp = new Date().getTime();
  const videoCollection = collection(firestore, 'videos');
  const videoBuckup = collection(firestore, 'Favourated');

  // Define a variable to track whether the user has liked the video
  let hasLiked = false;

  // Retrieve the video document
  const videoQuery = query(
    videoCollection,
    orderBy("user"),
    where("user", "==", userid),
    where("id", "==", id)
  );

  const querySnapshot = await getDocs(videoQuery);

  if (!querySnapshot.empty) {
    const videoDoc = querySnapshot.docs[0]; // Assuming there's only one matching document sessionStorage
    const videoData = videoDoc.data();

    if (!videoData.likes) {
      videoData.likes = []; // Initialize the "likes" array if it doesn't exist.
    }

    if (videoData.likes.includes(user)) {
      // User has already liked, so remove the like.
      videoData.likes = videoData.likes.filter((id) => id !== user);
    } else {
      // User hasn't liked, so add the like.
      videoData.likes.push(user);
      hasLiked = true;
    }

    if (hasLiked) {
      // Update the Firestore document with the modified "likes" array.
      await updateDoc(videoDoc.ref, { likes: videoData.likes });
    }
  }

  // Build the Favs object
  const favs={
    userName: userid,
timed: timestamp,
Favourated: "you watched",
content: "video",
id:id,
personName: "anonymous",
poster: poster,
title: title
}



  // Adding Favs to the "Likes" collection in Firestore
  await addDoc(videoBuckup, favs);
}

const [SlideDisable, setSlideDisable] = useState(false)

  const mediaRecorder = useRef(null);
  const [showVid, setShowVid] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const overlayRef = useRef(null);
  const closeOverlayRef = useRef(null);

  const [showNull, setShowNull] = useState(null);

  const [loading, setLoading] = useState(false);

  const [lod, setlod] = useState(0);

  const val = () => {
    setlod((pre) => pre + 1);
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 1; // Number of items to fetch per page
  const isFetching = useRef(false); // prevent multiple simultaneous fetch requests ref
  const [pageNumber, setPageNumber] = useState(1);
  const [lastVideo, setLastVideo] = useState(null);
  const [uniqueVideoIds, setUniqueVideoIds] = useState(new Set());
  const lastVideoRef = useRef(null);

  const [uniqueVideoId, setUniqueVideoId] = useState(new Set());


  const [last,setLast] =  useState(true)

const commentsRef = useRef(null)



useEffect(() => {
console.log( "cold", commentsRef.current )
}, [commentsRef.current])

const Reload = async (ids) => {
  try {
    if (commentsRef.current === null) {
     
      for (const video of recordedVideos) {
        if (video.data.id  === ids &&  video.data.comments.length > 0) {
          

          commentsRef.current = video.data.id  === ids && video.data.comments[video.data.comments.length -1].id;

          break; // exit the loop once commentsRef is set window
        }
      }
    }
console.log( "colld", commentsRef.current )

    const commentsQuery = commentsRef.current && query(
      collection(firestore, 'videos', ids, 'comments'),
      orderBy("id", "desc"),
      where( props.userid === "user" ),
      startAfter(commentsRef.current),
      limit(7)
    );

    const commentsSnapshot = await getDocs(commentsQuery);

    if (commentsSnapshot.size <= 0) {
      // If no documents are found, returning early to avoid unnecessary processing
      setLast(ids);
      setUniqueVideoId(new Set())
      setLoading(false);
      return;
    }

    const totalComments = commentsSnapshot.size;
    const comment = [];
    const commentRepliesArray = [];

    await Promise.all(commentsSnapshot.docs.map(async (commentDoc) => {
      const commentData = commentDoc.data();
      const commentId = commentData.id;

      if (!uniqueVideoId.has(commentId)) {
        uniqueVideoId.add(commentId);

        console.log("Comment ID:", commentId);

        comment.push(commentData);

        const commentReplyQuery = query(
          collection(firestore, 'videos', ids, commentId, 'commentreply', commentId),
          orderBy("id", "desc")
        );

        const commentReplySnapshot = await getDocs(commentReplyQuery);

        const commentReplies = [];
        commentReplySnapshot.forEach((commentReplyDoc) => {
          commentReplies.push(commentReplyDoc.data());
        });

        commentRepliesArray.push(commentReplies);
      }
    }));

    const flattenedCommentReplies = commentRepliesArray;

    setRecordedVideos((videos) =>
      videos.map((video) => {
        if (video.data.id === ids) {
          return {
            ...video,
            data: {
              ...video.data,
              comments: [...video.data.comments, ...comment],
              Replies: [...video.data.Replies, ...flattenedCommentReplies],
            },
          };
        }
        return video;
      })
    );
  } catch (error) {
    console.error("Error fetching video file:", error);
  } finally {
    commentsRef.current = null;
  }
};

const [UpdateLoad, setUpdateLoad] = useState("Loading")
const MAX_RETRIES = 3;
let retryCount = 0;

const checkFirestoreAvailability = async () => {
  try {
    // Attempt a simple query to check Firestore availability
    const testQuery = query(collection(firestore, '_test_collection_'), limit(1));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error('Error checking Firestore availability:', error);
    return false;
  }
};

console.log("useid",  props.userid)



const loadVideos = async () => {

  const isFirestoreAvailable = await checkFirestoreAvailability();

  if (!isFirestoreAvailable) {
    // Handle the case when Firestore is not available
    console.error('Firestore is not available');
    setUpdateLoad("Reload The Page, Or check your internet");
    return;
  }



  const videoCollection = collection(firestore, 'videos');
  console.log("idss", lastVideoRef.current);

  if(recordedVideos === 0){
  setLoading(true);

  }

  

  const videoQuery = lastVideoRef.current
    ? query(videoCollection, orderBy("id", "desc"), where( "user", "==",  props.userid), startAfter(lastVideoRef.current), limit(10))
    : query(videoCollection, orderBy("id", "desc"), where( "user", "==",  props.userid  ), limit(10));
  try {
    const snapshot = await getDocs(videoQuery);
   
  
    const newVideos = [];

    for (const videoDoc of snapshot.docs) {
      const data = videoDoc.data();
      const videoId = videoDoc.id;
      console.log("if data", data);

      if (!uniqueVideoIds.has(videoId)) {
        uniqueVideoIds.add(videoId);

        try {
          setUpdateLoad("Loading ");
          const videoFileRef = appWall.storage().ref(`videos/${data.id}.webm`);
          const metadata = await videoFileRef.getMetadata();
          const videoFileURL = await videoFileRef.getDownloadURL();
          data.playVid = videoFileURL;
        } catch (error) {
          console.error("Error fetching video file:", error);
          setUpdateLoad("Loading Error, Reload!");
          data.playVid = null;
        }

        const limitedCommentsQuery = query(
          collection(firestore, 'videos', data.id, 'comments'),
          orderBy("id", "desc"),
          limit(7)
        );

        const totalCommentsQuery = query(
          collection(firestore, 'videos', data.id, 'comments'),
          orderBy("id", "desc")
        );

        const [commentsSnapshot, totalCommentsSnapshot] = await Promise.all([
          getDocs(limitedCommentsQuery),
          getDocs(totalCommentsQuery),
        ]);

        const totalComments = totalCommentsSnapshot.size;
        const comment = [];
        const commentRepliesArray = [];

        commentsSnapshot.forEach(async (commentDoc) => {
          const commentData = commentDoc.data();
          const commentId = commentData.id;

          uniqueVideoId.add(commentId);
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

        await Promise.all(commentRepliesArray);

        const flattenedReplies = commentRepliesArray.reduce((acc, val) => acc.concat(val), []);
        data.Replies = commentRepliesArray;

        newVideos.push({ id: videoId, data });
      }
    }
    setUpdateLoad("");
    setBottomLoading(false);
    setRecordedVideos((pre) => (pre.length > 0 ? [...pre, ...newVideos] : newVideos));

    setAllData((pre) => (pre.length > 0 ? [...pre, ...newVideos] : newVideos));


    setLoading(false);
    if (snapshot.size <= 0) {
      setLoading(false);
      setUpdateLoad("No More Vids!");

      setTimeout(() => {
        setBottomLoading(false)
      }, 5000);

      return;
    }

 
    console.log("datasVids", newVideos);
  } catch (error) {
    console.error("Error fetching video file:", error);
    setBottomLoading(false);

    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying (${retryCount}/${MAX_RETRIES})...`);
      setTimeout(loadVideos, 1000); // Wait for a moment before retrying
    } else {
      console.error("Max retry count reached. Unable to fetch data.");
      setUpdateLoad("Reload The Page, Or check your internet");
    }
  }
};





if(recordedVideos){
  console.log("recorded", recordedVideos)
}



useEffect(() =>{
  if (recordedVideos.length === 0) {

  loadVideos();

  }
  },[props.userid])

const [vals, setvals] = useState(true)
// In your component, you can use this function when the user scrolls to the bottom:


useEffect(() => {
if(recordedVideos && recordedVideos.length > 0){

const obb = recordedVideos &&  Object.values(recordedVideos);
lastVideoRef.current = obb && obb[obb.length -1].data?.id


console.log("last vid", lastVideoRef.current)
}
}, [recordedVideos]);



useEffect(() => {
   if (recordedVideos.length === 0) {
   
    loadVideos()
  }
}, [retryCount]);




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
    await loadVideos();
  }
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);



function setNull() {
    setShowNull(false);
  }

  /*
useEffect(() => {
  if (showNull === null) {
    setShowNull(true);
  } else {
    setShowNull(false);
  }
}, [])


*/




  const getCameraPermission = async () => {
    setRecordedVideo(null);
   if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: true,
          video: {
            facingMode: facingMode, // Use the current facingMode state here
          },
        };


     
      
        const audioConstraints = { audio: true };
        // create audio and video streams separately fas



        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );

        const audioOutput = new Audio();
        audioOutput.muted = true;
        audioOutput.srcObject = audioStream;
        audioOutput.play();

        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setPermission(true);
        // combine both audio and video streams
        const combinedStream = new MediaStream([
          ...audioStream.getAudioTracks(),
          ...videoStream.getVideoTracks(),
        ]);


        setStream(combinedStream);
        setShowVid(true);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      setShowVid(false);
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setPermission(false);
      setShowVid(false);
    }
  };

 

  const ExitCam = () => {
    stream.getTracks().forEach((track) => track.stop());
    setShowVid(false);
  };

  useEffect(() => {
    if (permission && liveVideoFeed.current && stream) {
      liveVideoFeed.current.srcObject = stream;
    }
  }, [permission, stream]);

  const [Image, setImg] = useState(im);
  const [Useris, setUser] = useState("");
  const [open, setOpen] = useState(true);
  const sameID = useRef(null);

  const Openit = () => {
    setOpen((pre) => !pre);
    setSlideDisable(false)
  };


  const updateSaved = async (id, userid, poster, title) =>{

    const timestamp = new Date().getTime();
    const videoCollection = collection(firestore, 'videos');
    const videoBuckup = collection(firestored, 'likes');
  
    let hasLiked = false;
  
    const videoQuery = query(
      videoCollection,
      where("user", "==", userid),
      where("id", "==", id)
    );
  
    try {
      const querySnapshot = await getDocs(videoQuery);
  
      if (!querySnapshot.empty) {
        const videoDoc = querySnapshot.docs[0];
        const videoData = videoDoc.data();
  
        if (videoData.Saved) {
          if (videoData.Saved.includes(userid)) {
            videoData.Saved = videoData.Saved.filter((likedUserId) => likedUserId !== userid);
            hasLiked = false;
          } else {
            videoData.Saved.push(userid);
            hasLiked = true;
          }
        } else {
          videoData.Saved = [userid];
          hasLiked = true;
        }
  
        await updateDoc(videoDoc.ref, { Saved: videoData.Saved });
  
       
        setRecordedVideos((videos) =>
        videos.map((video) => {
          if (video.data.id === id) {
            return {
              ...video,
              data: {
                ...video.data,
                Saved: videoData.Saved,
              },
            };
          }
          return video;
        })
      
      );
      const likes = {
        userName: userid,
        timestamp: timestamp,
        Favourated: hasLiked ? "you saved" : "you unsaved",
        Whocomment: user,
        content: "video", 
        About:"",
        userId: userid,
        parentid: id,
        id: nanoid(),
        pathid: id, 
        poster:poster || "",
        title:title

      };
  
        await addDoc(videoBuckup, likes);


       
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }

  }


  const updateLikes = async (id, userid, poster, title) => {
    const timestamp = new Date().getTime();
    const videoCollection = collection(firestore, 'videos');
    const videoBuckup = collection(firestored, 'likes');
  
    let hasLiked = false;
  
    const videoQuery = query(
      videoCollection,
      where("user", "==", userid),

      where("id", "==", id)
    );
  


    try {
      const querySnapshot = await getDocs(videoQuery);
  
      if (!querySnapshot.empty) {
        const videoDoc = querySnapshot.docs[0];
        const videoData = videoDoc.data();
  
        if (videoData.likes) {
          if (videoData.likes.includes(userid)) {
            videoData.likes = videoData.likes.filter((likedUserId) => likedUserId !== userid);
            hasLiked = false;

           
          } else {
            videoData.likes.push(userid);
            hasLiked = true;
          }
        } else {

     
          videoData.likes = [userid];
          hasLiked = true;
        }
  
        await updateDoc(videoDoc.ref, { likes: videoData.likes });
  
       
        setRecordedVideos((videos) =>
        videos.map((video) => {
          if (video.data.id === id) {
      
            return {
              ...video,
              data: {
                ...video.data,
                likes: videoData.likes,
              },
            };
            
          }
          return video;
        })
      
      );
       
  
        const likes = {
          userName: userid,
          timestamp: timestamp,
          Favourated: hasLiked ? "you liked" : "you unliked",
          Whocomment: user,
          content: "video", 
          About:"",
          userId: userid,
          parentid: id,
          id: nanoid(),
          pathid: id, 
          poster:poster || "",
          title:title
        };


        await addDoc(videoBuckup, likes);

    
       
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      console.log("hereree", error)
     
    }



  };
  




  const [value, setValue] = useState({
    comment: "",

  });

  const vidref = useRef(null);

  const [comentcontairef, setcommentContainer] = useState(true);

  function activateComments(id) {
    recordedVideos &&
      recordedVideos.map((video) => {
        if (video.data.id === id) {
          setcommentContainer((pre) => !pre);
          vidref.current.pause();
          if (vidref.current.pause) {
            vidref.current.style.cursor = "pointer";
          }
        }
      });
  }



  if(recordedVideos){
    console.log("aha",Object.values(recordedVideos))
  }


  

  const commentAfterReply = async (id,ids, userid, poster, title) => { 
    const videoCollection = collection(firestore, 'videos');
    const videoDocRef = doc(videoCollection, id); 

    const commentsCollection = collection(videoDocRef, 'comments');

    const videoDocRefref = doc(commentsCollection, id); 

    const comments = collection(videoDocRefref, 'commentreply');


    const commentsReply = collection(comments, ids);



    const videoQuery = query(
      videoCollection,
      where("user", "==", userid),
      where("id", "==", id)
    );
    
    const querySnapshot = await getDocs(videoQuery);
    
    if (!querySnapshot.empty) {
      const videoDoc = querySnapshot.docs[0]; // Assuming there's only one matching document
      const videoData = videoDoc.data();
    
      const timestamp = new Date().getTime();
    
      //  the comment object
      const comment = {
        userName: userid,
        timestamp: timestamp,
        Favourated: `you Commented  ${value.comment}`,
        content: "video", 
        id: ids,
        poster:poster,
        title:title
      };



    
    
    
     





   vid && setVid(prev => ({
        ...prev,
        comments: [...prev.comments, value]
      }));


      setRecordedVideos((videos) =>
      videos.map((video) => {
        if (video.data.id === ids) {
          return {
            ...video,
            data: {
              ...video.data,
              comments: videoData.comments,
            },
          };
        }
        return video;
      })
    )


    const videoBackup = collection(commentsReply, 'commentAfterReply'); 




    await addDoc(videoBackup, value);

    // Update of the Firestore document with the modified "comments" array
  
    // Push the comment to the "Comments" collection in Firestore
    await addDoc(videoBackup, comment); 
  }
  setValue((prevValue) => ({ ...prevValue, comment: "" }));

};

  

const [valueReply, setValReply] = useState({
 
  comment: "",
 
});

const CommentReply = async (ids, parentid, userid, poster, title) => {
  const videoCollection = collection(firestore, 'videos');
  const videoDocRef = doc(videoCollection, ids);

  const valueNew = {
    userName: "",
    timestamp: new Date().getTime(),
    profilePhoto: "",
    comment: valueReply.comment,
    userid: "",
    id: nanoid(),
    read: "notread",
    parentid: parentid,
  };
  setRecordedVideos((videos) =>
  videos.map((video) => {
    if (video.data.id === ids) {
      return {
        ...video,
        data: {
          ...video.data,
          Replies: video.data.Replies.map((replyArray) => {
            if (replyArray.some((reply) => reply.parentid === parentid)) {
              return replyArray.map((reply) =>
              reply.parentid === parentid
                ? Array.isArray(reply) ? [...reply, valueNew] : [valueNew]
                : reply
            );
            } else if (replyArray.length === 0) {
              return [valueNew];
            }
            return replyArray;
          }),
        },
      };
    }
    return video;
  })
);








  if (!valueReply.comment) {
    return;
  }

  const videoBackup = collection(firestored, 'CommentReply');

  const videoQuery = query(
    videoCollection,
    where("user", "==", userid),
    where("id", "==", ids)
  );

  const querySnapshot = await getDocs(videoQuery);

  if (!querySnapshot.empty) {
    const videoDoc = querySnapshot.docs[0];
    const videoData = videoDoc.data();

    const timestamp = new Date().getTime();

    // The comment object

    const comment = {
      userName: userid,
      timestamp: timestamp,
      Favourated:  `you Replied  ${valueNew.comment}`,
      Whocomment: user,
      content: "video", 
      About:"comment",
      userId: userid,
      parentid: ids,
      id: nanoid(),
      poster:poster,
      pathid: parentid, 
      title:title
    };



    const commentsCollectionReply = parentid && collection(videoDocRef, parentid, "commentreply", parentid);

    vid &&
      setVid((prev) => ({
        ...prev,
        commentsReply: [...prev.commentsreply, valueNew],
      }));
    
    
    

    await addDoc(commentsCollectionReply, valueNew);
    await addDoc(videoBackup, comment);
  }

  setValReply((prevValue) => ({ ...prevValue, comment: "" }));
};




async function toggleLike(title, parentid, ids, userid, poster, commentLiked) {
  const videoCollection = collection(firestore, 'videos');
  const videoBackup = collection(firestored, 'likes'); 

  setRecordedVideos((videos) =>
  videos.map((video) => {
    if (video.data.id === parentid) {
      return {
        ...video,
        data: {
          ...video.data,
          comments: video.data.comments.map((comment) =>
            (comment.id === ids) ? {
              ...comment,
              likes: (comment.likes && comment.likes.includes(userid)) ?
                comment.likes.filter((likedUserId) => likedUserId !== userid) :
                [...(comment.likes || []), userid],
            } : comment
          ),
        },
      };
    }
    return video;
  })
);


  const videoQuery = query(
    videoCollection,
    where("user", "==", userid),
    where("id", "==", parentid)
  );

  const querySnapshot = await getDocs(videoQuery);

  if (!querySnapshot.empty) {
    const commentsCollectionRef = collection(videoCollection, parentid, 'comments');

    const commentsSnapshot = await getDocs(commentsCollectionRef);
    const timestamp = new Date().getTime();

    if (!commentsSnapshot.empty) {
      commentsSnapshot.docs.forEach(async (doc) => {
        const videoData = doc.data();
    
        const likes = {
          userName: userid,
          timestamp: timestamp,
          Favourated: `you Liked   ${commentLiked}`,
          Whocomment: user,
          content: "video",
          About: "comment", 
          userId: userid,
          id: nanoid(),
          pathid: ids, 
          parentid: parentid,
          poster:poster,
          title:title
        };

        if (videoData.id === ids) {
          let hasLiked = false;
        

          if (videoData.likes) {
        

            if (videoData.likes.includes(userid)) {
              videoData.likes = videoData.likes.filter((likedUserId) => likedUserId !== userid);
              hasLiked = false;
            } else {
              videoData.likes.push(userid);
              hasLiked = true;
            }
          } else {
            // If there's no comments or likes array, creating
            videoData.likes = [userid];
            hasLiked = true;
           
          }

          // Update the likes in the existing document
          await updateDoc(doc.ref, { likes: videoData.likes });
          await addDoc(videoBackup, likes); 
     
      //    console.log('Likes updated:', videoData.likes);
        }

      });
    }
  }


}


  const Comment = async (id, userid, poster, title) => { 
    const videoCollection = collection(firestore, 'videos');  
    const videoDocRef = doc(videoCollection, id); 


    const valueN={
      userName: "",
      timestamp: new Date().getTime(),
      profilePhoto: "",
      comment: value.comment,
      userid: "",
      id: nanoid(),
      read: "notread",
      parentid: "",
    }

    const videoBackup = collection(firestored, 'comments'); 



    const videoQuery = query(
      videoCollection,
      where("user", "==", userid),
      where("id", "==", id)
    );
    
    const querySnapshot = await getDocs(videoQuery);
    
    if (!querySnapshot.empty) {
      const videoDoc = querySnapshot.docs[0]; 
      const videoData = videoDoc.data();
    
      const timestamp = new Date().getTime();
    
      //  the comment object
      const comment = {
        userName: userid,
        timestamp: timestamp,
        Favourated: `you Commented  ${value.comment}`,
        Whocomment: user,
        content: "video", 
        About:"",
        userId: id,
        path:'',
        id: nanoid(),
        poster:poster,
        title:title,
        parentid: id,
      };




   
  
     
    
    
     


      const commentsCollection = collection(videoDocRef, 'comments');
  vid.length !== 0 ? setVid(prev => ({
        ...prev,
        comments: [...prev.comments, valueN]
      })) : setVid({comments: [valueN]})

      await addDoc(commentsCollection, valueN);

    setRecordedVideos((videos) =>
      videos.map((video) => {
        if (video.data.id === id) {
          return {
            ...video,
            data: {
              ...video.data,
              comments: [...video.data.comments, valueN],
            },
          };
        }
        return video;
      })
    );

      // Update of the Firestore document with the modified "comments" array
    
      // Push the comment to the "Comments" collection in Firestore
      await addDoc(videoBackup, comment); 

      setValue((prevValue) => ({ ...prevValue, comment: "" }));

    }

  };
  /*
    setRecordedVideos((videos) =>
    videos.map((video) => {
      if (video.data.id === parentid) {
        return {
          ...video,
          data: {
            ...video.data,
            comments: video.data.comments.filter((comment) => comment.id !== ids),
          },
        };
      }
      return video;
    })
    );
*/
const loadV = () => {
  console.log("")
}

const DeleteVid =  async (id,  userid) => {

  const videoCollection = collection(firestore, 'videos');
  const videoDocRef = doc(videoCollection, id); 

  setRecordedVideos((videos) =>
  videos.filter((video) => video.data.id !== id)
);
  const videoQuery = query(
    videoCollection,
    where("user", "==", userid),
    where("id", "==", id)
  );
  for (const doc of videoDocRef.docs) {
 

  await deleteDoc(doc.ref);
  }
};


const toggleDelete = async (parentid, ids, userid) => {
  const videoCollection = collection(firestore, 'videos');
  const videoDocRef = doc(videoCollection, parentid); 

  setRecordedVideos((videos) =>
  videos.map((video) => {
    if (video.data.id === parentid) {
      return {
        ...video,
        data: {
          ...video.data,
          comments: video.data.comments.filter((comment) => comment.id !== ids),
        },
      };
    }
    return video;
  })
  );
  const videoQuery = query(
    videoCollection,
    where("user", "==", userid),
    where("id", "==", parentid)
  );

  const querySnapshot = await getDocs(videoQuery);

  if (!querySnapshot.empty) {
    const commentsCollectionRef = collection(videoCollection, parentid, 'comments');
    const commentsSnapshot = await getDocs(commentsCollectionRef);

    if (!commentsSnapshot.empty) {
      for (const doc of commentsSnapshot.docs) {
        const commentData = doc.data();

        //  if the comment ID matches
        if (commentData.id === ids) {
          // Update of the Firestore document by removing the comment
          await deleteDoc(doc.ref);
          // If there's a subcollection "commentreply",  delete documents from it as well
          const commentReplyCollectionRef = collection( videoDocRef,ids, "commentreply", ids);
          const commentReplySnapshot = await getDocs(commentReplyCollectionRef);

          if (!commentReplySnapshot.empty) {
            const deletePromises = commentReplySnapshot.docs.map(async (commentReplyDoc) => {
              // Delete documents from the "commentreply" subcollection
              await deleteDoc(commentReplyDoc.ref);

            });

            await Promise.all(deletePromises);
          }
        }
      }
    }
  }
};


  
  const [Editedvideo, setEditedVideo] = useState(null)


const [offed, setoffed] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedURL = window.sessionStorage.getItem("Video");
      if (storedURL) {
       setEditedVideo(JSON.parse(storedURL))

      }else{
        setEditedVideo(null)
      }
    }
  }, [offed]);
  
  
  const [scroll , setScroll] = useState(0);
useEffect(() => {  
 window.addEventListener('scroll', () => {
   setScroll(window.scrollY)
  });



},[])

const [WatchList, setWatchList] = useState('')


const [Switch, setSwitch] = useState(null)
  const  [SwitchVids,setSwitchVids] = useState(null)
  const [Watchlist, setWatchlist] = useState(null)
 const [showSaved, SetshowSaved] = useState(null)
if(Switch){
  console.log("siwiii",Switch)

}

const [ localLike, setLocalLike] = useState(null)






// Handle page Reload to clear Local Storage localStorage

useEffect(() => {
  //window.addEventListener('beforeunload', function (event) {
    // Clear local storage when the user is about to leave the page
   // localStorage.clear();
    
    // Optionally, you can display a confirmation message
    // to ask the user if they are sure they want to leave
  //  event.returnValue = 'Are you sure you want to leave?';
  //});
}, [])


const videoArray = isObject(recordedVideos) ? Object.values(recordedVideos) : recordedVideos;

console.log("vidsdo", videoArray)




const getTimeDifference = (date) => {
  if (!date) {
    return Infinity; // Return a large value for undefined/null dates
  }

  const timeDiffMs = new Date() - new Date(date);
  return timeDiffMs;
};

const sortedVideos = recordedVideos && recordedVideos
  .slice()
  .filter((a) => a && a.data && a.data.time !== undefined && a.data.time !== null)
  .sort((a, b) => {
    const timeDiffA = getTimeDifference(a.data.time);
    const timeDiffB = getTimeDifference(b.data.time);

    // Assuming getTimeDifference returns valid time differences
    return  timeDiffA - timeDiffB;
  });


  if ( loading ) {

    return <div style={{marginRight: "0.5rem !important",margin: "auto",  width: "100vw",
    position: "fixed",
    left: "0",
    top:" 0"}}><LoadingAnim/></div>;

  }



  if (vidID !== null) {
    const indexToUpdate = sortedVideos.findIndex((item) => item.data.id === vidID);
  
    if (indexToUpdate !== -1) {
      // Remove the item from its current position and unshift it to the beginning
      const [removedItem] = sortedVideos.splice(indexToUpdate, 1);
      sortedVideos.unshift(removedItem);
    }
  }
  
















  return(
  
    <>



    {/* <NAvbar vid={vid}/>  /reload  <div  style={{ display:"flex", justifyContent:"center", background:"#f1efec85", fontSize:"50px", position:"fixed", bottom:"0", left:"0", right:"0", margin:"auto", width:"100vw"}}>
         {BottomLoading ? <i style={{textAlign:"center", fontSize:"2rem"}} className="pi pi-spin pi-spinner"></i> : "" }
  
         </div>
       */} 
      
    
  
  {Editedvideo &&  <EditedVideo setoffed={setoffed}  EditedVideo={Editedvideo} setEditedVideo={setEditedVideo} />  }
  
   

      
  <>
  
     <div>
<ProfileContainer>
  
{open && sortedVideos.map((vid) => ( vid &&
  <Gallery 

title={vid.data  && vid.data.title}
                    videoplay={vid.data && vid.data.recordedVideo}
                    user={vid.data && vid.data.user}
                    setRecordedVideo={setRecordedVideos}
                    likes={vid.data && vid.data.likes}
                    shares={vid.data && vid.data.shares}
                    comments={vid.data && vid.data.comments}
                    i={vid.data && vid.data.id}
                    recordedVideos={recordedVideos}
                    setImg={setImg}
                    setUser={setUser}
                    dp={vid.data && vid.data.dp || im}
                    playVid={vid.data && vid.data.playVid}
                    username={vid.data && vid.data.username || vid.data  && vid.data.title}
                    Image={Image && Image}
                    Useris={Useris ? Useris : vid.data && vid.data.title}
                    setOpen={setOpen}
                    sameID={sameID}
                    updateLikes={updateLikes}
                    time={vid.data  && vid.data.time || 0}
                    setoffed={setoffed}
                    poster={vid.data  &&  vid.data.poster}
                    updateSaved ={updateSaved}
                    SavedVideo = {vid?.data  &&  vid?.data?.SavedVideo}
                    commentsLength ={vid.data.commentsLength}                    
                    Saved = {vid.data.Saved && vid.data.Saved}
                    SlideDisable= {SlideDisable}
                    setSlideDisable = { setSlideDisable}
                    DeleteVid={DeleteVid}
                
  
                    view ={props.view}
                     setView={props.setView}
   
   
  />
))}
  
  </ProfileContainer>       
   
       
     </div>
     </>

   

  

  




  
  
  
 
  </>
  


  );
}

export const Head = () => <title>TheWall</title>;


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
  overflow: hidden;
  border-radius: 8px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;
import React, { useEffect, useState, useRef, isValidElement } from "react";
import { nanoid } from "nanoid";
import MyWall from "./MyWall";
import { useAuth } from "../Accounts/useAuth";
import axios from "axios";



import Comments from "./Posted/Comments";                          
/*import NAvbar from "../Navbar";
import { isObject } from "lodash";
import TimeLine from "./Components/TheWall/TimeLine";
import CommentInput from "./Components/CommentInput";
import EditedVideo from "./Components/Editvideo";
import MyVideosContainer from "./Components/TheWall/MyVideosContainer";
import debounce from 'lodash/debounce';
import VideoPlayer from "./Components/Videoplayer";
import ProfileIndex from "./ProfileIndex";



*/
import Navbar from "../Navigation/Navbar"
import { propTypes } from "react-bootstrap/esm/Image";
import im from "../images/proxy.jpeg";



import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Skeleton } from 'primereact/skeleton';
import { Editor } from "primereact/editor";
import noImg from "../images/no-image.jpg";

import "firebase/compat/storage";

import { getFirestore, collection, query, orderBy,where, limit,enableTimestampsInSnapshots, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import LoadingAnim from "../Accounts/LoadingAnim";




import { useLocation } from "@reach/router";
import Gallery from "./Profile/Gallery";
import ProfileSaved from "./Profile/ProfileSaved";
import ProfileTimeLine from "./Profile/ProfileTimeLine";
import blab from "../images/Blab.jpeg";
import {firebaseConfig019} from "../Accounts/FirebaseAuth";

import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "../styles/TheWall.css";
import "../styles/Video.scss"
import "primereact/resources/primereact.min.css"; 
 import "../styles/index.css";

import styled from "@emotion/styled";
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

export default function AllPostsIndex(props) {
  const Saved = props.Saved || null;
  const timeL = props.timeL || null;
const AllData=props.AllData

const setAllData=props.setAllData;

  const AllPosts = props.Allposts;

const wall = firebase.initializeApp(firebaseConfigTheWall, "appWall");

 const time = firebase.initializeApp(firebaseConfigTimeline, "timeLine");
  const timeLine = firebase.app("timeLine");
  
const appWall = firebase.app("appWall");
  
  const [lastDocumentInCurrentBatch, setLastDocumentInCurrentBatch] = useState(null);
  
  //const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2"; newss
//const {user, app05} = useAuth(); localstorage  window.addEventListener


const {user, users, useruid} = useAuth();
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

const  [DisplayMode, setDisplayMode] = useState(false);

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


const Reload = async (ids) => {
  try {
    if (commentsRef.current === null) {
     
      for (const video of recordedVideos) {
        if (video.data.id  === ids &&  video.data.comments.length > 0) {
          

          commentsRef.current = video.data.id  === ids && video.data.comments[video.data.comments.length -1].id;

          break; // exit the loop once commentsRef is set window usernames
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


const [vals, setvals] = useState(true)
// In your component, you can use this function when the user scrolls to the bottom:


useEffect(() => {
if(recordedVideos && recordedVideos.length > 0){

const obb = recordedVideos &&  Object.values(recordedVideos);
lastVideoRef.current = obb && obb[obb.length -1].data?.id


console.log("last vid", lastVideoRef.current)
}
}, [recordedVideos]);





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
      const videoDoc = querySnapshot.docs[0]; // Assuming there's only one matching document HAsdat
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

const overflowWrap = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
};


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


const [WatchList, setWatchList] = useState('')


const [Switch, setSwitch] = useState(null)
  const  [SwitchVids,setSwitchVids] = useState(null)
  const [Watchlist, setWatchlist] = useState(null)
 const [showSaved, SetshowSaved] = useState(null)
if(Switch){
  console.log("siwiii",Switch)

}


//   Posts Starts HEre 

  const toast = useRef(null);
  const id = props.id;
  const profileImg = props.profileImg;
  const username = props.username;
  //const { user,setUser, loading,signOut } = useAuth(); app9
  const [lengthis, setLengthis] = useState([1,2,3,4])

   const  useid = props.useid || null;


  const [cards, setCards] = useState([]);
  const [Edits, setEdits] = useState(true);
  const [editing, setEditing] = useState({});
  const [CommentIt, setCommentIt] = useState(false);
  const [Loadit, setLoadit] = useState(false)
  const onHide = props.onHide;
  const [nothingToShow, setnothingToShow] = useState(false)
  const setonHide = props.setonHide;

  //const app4 = app4.database(); app9

  const nano = nanoid();

  async function handleoffed(id) {
    try {
      const commentRef = timeLine.database().ref("Replies/replied");
      const snapshot = await commentRef
        .orderByChild("ip")
        .equalTo(id)
        .once("value");
      snapshot.forEach((childSnapshot) => {
        // Check if the child has a matching ID and delete it if it does
        if (childSnapshot.val().ip === id) {
          commentRef.child(childSnapshot.key).remove();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const commentRef = timeLine.database().ref("commentpost");
      const snapshot = await commentRef
        .orderByChild("ip")
        .equalTo(id)
        .once("value");
      snapshot.forEach((childSnapshot) => {
        // Check if the child has a matching ID and delete it if it does
        if (childSnapshot.val().ip === id) {
          commentRef.child(childSnapshot.key).remove();
        }
        if (childSnapshot.val().ip === id) {
          handleoffed(childSnapshot.val().id);
        }
      });

      setonHide(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDismiss(id) {
    handleDelete(id);

    try {
      const commentRef = timeLine.database().ref("comments/cards");
      const snapshot = await commentRef
        .orderByChild("id")
        .equalTo(id)
        .once("value");
      snapshot.forEach((childSnapshot) => {
        // Check if the child has a matching ID and delete it if it does
        if (childSnapshot.val().id === id) {
          commentRef.child(childSnapshot.key).remove();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handlexits = (id) => {
    setCards((cards) => cards.filter((card) => card.id !== id));
    setcardid((cardid) => cardid.filter((car) => car.id !== id));

    setEditing((editing) => {
      const { [id]: _, ...rest } = editing;
      return rest;
    });

    setonHide(true);

    setHasdata("");
  };

  const apps2 = firebase.initializeApp(firebaseConfig019, "app2");
  const app2 = firebase.app("app2");

  const nansid = nanoid();

  const [cardid, setcardid] = useState([]);

  async function handledata(id) {
  
    try {
      const snapshot = await timeLine
        .database()
        .ref("comments")
        .orderByChild("id")
        .equalTo(id)
        .once("value");
      if (snapshot && snapshot.exists()) {
        await timeLine.database().ref(`comments/`).update({
          cards,
        });
        //console.log(exists)
        // Retrieve the list of followers for the user who posted the new item hasDat
      } else {
        const userRef = timeLine.database().ref(`comments/`);
        userRef.update({
          cards,
        });
        //console.log(success)
      }
    } catch (error) { 
      console.log(error);
      //console.log(error) handlecancel
    }

    const profilesRef = app2.database().ref(`profile/`);

    profilesRef.once("value", (snapshot) => {
      snapshot.forEach((profileSnapshot) => {
        const followers = profileSnapshot.child("followers").val();
        if (followers && Object.keys(followers).includes(user)) {
          const userId = profileSnapshot.key;
          console.log(
            "User with ID ",
            user,
            " has ",
            user,
            " in their followers"
          );
          // Do something with the userId here handledelete

          // Add a new notification for this follower
          const notification = {
            receive: userId,
            usersend: user,
            cardid,
            content: `${user} posted a new message: ${cardid}`,
            viewed: false,
          };

          const postsRef = timeLine.database().ref(`users/${user}/posts/`);
          const newPostRef = postsRef.push();
          newPostRef
            .set({
              user,
              cardid,
            })
            .then(() => {
              console.log("Post added successfully");
              setcardid([]);
            })
            .catch((error) => {
              console.error("Error adding post:", error);
            });
        }
      });
    });
  }

  const handleClick = () => {
    setCards((cards) => [
      ...cards,
      {
        id: nano,
        message: "",
        font: "sans-serif",
        showCommentBox: "",
        liked: "0",
        disliked: "1",
        profile: profileImg,
        user: username,
        datePosted: new Date(),
        mail: useruid.email,
        userId: user,
      },
    ]);

    setcardid((cardid) => [
      ...cardid,
      {
        id: nano,
        message: "",
        userid: user,
        user: username,
        datePosted: new Date(),
      },
    ]);

    setEditing((editing) => ({ ...editing, [cards.length]: true }));
    setonHide(false);
  };

  const [isLoading, setISLoading] = useState(true);

  const fetchCards = (limit) => {

    if(cards.length === 0){
      setLoadit(true)
    }
    const comments = timeLine.database().ref("comments/cards");
    if(useruid){
comments
.orderByChild("userId")
.equalTo(useruid)
  .limitToFirst(limit)
        .on("value", (snapshot) => {
          

const data = snapshot.val();
        if (!data) {
          setCards([]);
          alert("No data")
          setLoadit(false)

          console.log("theload", Loadit)
          if(cards.length === 0){
           
          
setnothingToShow(true);
setLoadit(false)

}
          return;
        }

        const cardArray = Object.values(data || {});
        const updatedCardArray = cardArray.map((card) => ({
          ...card,
          showCommentBox: false,
        }));

        if (useruid) {
          updatedCardArray.forEach((card) => {
            if (card.mail === users.email) {
              card.profile = profileImg;
              card.user = username;

            }
          });
        }

        if (id) {
          const cardWithId = updatedCardArray.find((card) => card.id === id);
          if (cardWithId) {
            updatedCardArray.push(cardWithId);
          }
        }

        const editingObject = Object.fromEntries(
          cardArray.map((card) => [card.id, true])
        );
        setEditing(editingObject);

       setCards(updatedCardArray)


       setRecordedVideos((pre) => (pre.length > 0 ? [...pre, ...updatedCardArray] : updatedCardArray));

        setISLoading(false);

        setLoadit(false)

        console.log("had", updatedCardArray)
      });

    }
  };

  const handleComment = (id) => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, showCommentBox: true } : card
      )
    );

    handledata(id);
  };

  const handlecancel = (id) => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, showCommentBox: false } : card
      )
    );
  };

  const handleEdit = (id, newMessage) => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, message: newMessage } : card
      )
    );

    setcardid((cardid) =>
      cardid.map((car) =>
        car.id === id ? { ...car, message: newMessage } : car
      )
    );
  };

  const handleCommen = (id) => {
    setEditing((editing) => ({ ...editing, [id]: false }));
  };

  const handlePost = (id) => {
    setEditing((editing) => ({ ...editing, [id]: true }));
    handledata(id);
    setonHide(true);

    setHasdata("");
  };

 
  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => {
    setTopRightModal(!topRightModal);
  };






  const [hasdata, setHasdata] = useState("");

  async function snoop(id) {
    const comments = timeLine
      .database()
      .ref("comments/cards")
      .orderByChild("id")
      .equalTo(id)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const comments = [];
          snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();

            comments.push(comment);
          });

          if (comments) {
            setHasdata(comments[0].message);
          }
          setCards((cards) => [
            ...cards,
            {
              id: nanoid(),
              message: "",
              copied: comments,
              font: "sans-serif",
              showCommentBox: "",
              liked: "0",
              disliked: "1",
              profile: profileImg,
              user: username,
              datePosted: new Date(),
              userId: user,
              mail: users.email,
            },
          ]);

          setcardid((cardid) => [
            ...cardid,
            {
              id: nanoid(),
              message: "",
              copied: comments,
              profile: profileImg,
              user: username,
              datePosted: new Date(),
              userId: user,
            },
          ]);
          setEditing((editing) => ({ ...editing, [cards.length]: true }));
          setonHide(false);
        }
      });
  }

  const [editorHtml, setEditorHtml] = useState("");

  const handleImagePaste = async (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");

    // Check if the pasted data is an image URL
    if (isImageUrl(pastedData)) {
      // Fetch the image URL and convert it to an HTML image tag handleDismiss
      try {
        const response = await axios.get(pastedData, { responseType: "blob" });
        const imageUrl = URL.createObjectURL(response.data);
        const imgTag = `<img src="${imageUrl}" alt="Pasted Image" />`;

        // Insert the image tag into the editor
        const newEditorHtml = editorHtml + imgTag;
        setEditorHtml(newEditorHtml);
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    }

    // Check if the pasted data is a YouTube link
    if (isYoutubeLink(pastedData)) {
      // Extract the YouTube video ID from the link isLoading
      const videoId = extractYoutubeVideoId(pastedData);

      // Create an HTML iframe tag for embedding the YouTube video
      const iframeTag = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      // Insert the iframe tag into the editor
      const newEditorHtml = editorHtml + iframeTag;
      setEditorHtml(newEditorHtml);
    }
  };

  if (nothingToShow) {

    return (

      <div>
        <h1> you Got Nothing here yet !</h1>
      </div>
    );
  }  
  
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const timeDiffMs = new Date() - new Date(date);
    const timeDiffSec = Math.floor(timeDiffMs / 1000);
    if (timeDiffSec < 60) {
      return `${timeDiffSec} sec ago`;
    }
    const timeDiffMin = Math.floor(timeDiffSec / 60);
    if (timeDiffMin < 60) {
      return `${timeDiffMin} min ago`;
    }
    const timeDiffHr = Math.floor(timeDiffMin / 60);
    if (timeDiffHr < 24) {
      return `${timeDiffHr} h ago`;
    }
    const timeDiffDay = Math.floor(timeDiffHr / 24);
    if (timeDiffDay < 30) {
      return `${timeDiffDay} day ago`;
    }
    const timeDiffMo = Math.floor(timeDiffDay / 30);
    if (timeDiffMo < 12) {
      return `${timeDiffMo} mo ago`;
    }
    const timeDiffYr = Math.floor(timeDiffMo / 12);
    return `${timeDiffYr} yr ago`;
  };

  
  // Helper function to check if a string is a valid image URL
  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };

  // Helper function to check if a string is a valid YouTube link
  const isYoutubeLink = (link) => {
    return (
      link.match(
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      ) !== null
    );
  };

  // Helper function to extract the YouTube video ID from a link handleCommen
  const extractYoutubeVideoId = (link) => {
    const videoIdMatch = link.match(
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
    );
    if (videoIdMatch) {
      return videoIdMatch[3];
    }
    return "";
  };

  let isBlogActive;

  if (location.pathname.startsWith(`/ProfileComponents/${props.userId}`)) {
    isBlogActive = true;
  } else {
    isBlogActive = false;
  }

  let bg;
  if (location.pathname.startsWith("/profileComponents/Profiles")) {
    bg = true;
  } else {
    bg = false;
  }


  if (hasdata) {
    console.log("hasdata", hasdata);
  }



  if ( loading ) {

    return <div style={{marginRight: "0.5rem !important",margin: "auto",  width: "100vw",
    position: "fixed",
    left: "0",
    top:" 0"}}><LoadingAnim/></div>;

  }


/*  if (vidID !== null) {
    const indexToUpdate = sortedVideos.findIndex((item) => item.data.id === vidID); setAllData
  
    if (indexToUpdate !== -1) {
      // Remove the item from its current position and unshift it to the beginning
      const [removedItem] = sortedVideos.splice(indexToUpdate, 1); formatDate
      sortedVideos.unshift(removedItem);
    }
  }*/

 
if(recordedVideos){

  console.log("vidsis",cards)
console.log("record", recordedVideos)
}

if(loading){

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

    <Gallery 
    onClick={ () =>{alert(DisplayMode); setDisplayMode(true) }}
    video={vid.data && vid.data.recordedVideo}

    title={vid.data  && vid.data.title}

    content = {vid}

index={vid.data.id}

CommentReply = {CommentReply}
updateLikes ={updateLikes}
 setValue ={setValue}
 Image={Image && Image}
 Useris={Useris ? Useris : vid.data && vid.data.title}

                  setRecordedVideo={setRecordedVideos}
                  Openit={Openit}
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
                    user={vid.data && vid.data.user}
                    setRecordedVideos={setRecordedVideos}
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
               setOpen={setOpen}
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
                    setDisplayMode= {setDisplayMode}
                    DisplayMode={DisplayMode}
  
                    view ={props.view}
                     setView={props.setView}
   
   
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
             <Comments
             AllData={AllData}

setAllData={setAllData}
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
               handlePost={() => handlePost(vid.id)}
               handleDismiss={() => handleDismiss(vid.id)}
               card={vid.font}
               showCommentBox={vid.showCommentBox}
               handlecancel={() => handlecancel(vid.id)}
               handleComment={() => handleComment(vid.id)}
               posted={vid.message}
             
            />
          }
        </div>
      </div>
  

  {isLoading && (
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

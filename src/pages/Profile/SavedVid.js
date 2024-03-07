import React, { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import MyVideos from "../Components/TheWall/MyVideos";
//import SidebarSide from "./SidebarSide";
import {useAuth} from "../../Accounts/useAuth";

//import MySaved from "./MySaved";

import im from "../../images/proxy.jpeg";
import ScrollContainer from "../Components/ScrollContainer";
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore, collection, query, orderBy,where, limit, startAfter, getDocs, documentId, addDoc, updateDoc, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import LoadingAnim from "../../Accounts/LoadingAnim";
//import CommentInput from "./CommentInput"; Alldataretrived   , vidsoo
import styled from "styled-components";
import "../../styles/TheWall.css";
import "../../styles/Video.scss";
import "primereact/resources/primereact.min.css";                                       
 import "../../styles/index.css";
 import "primereact/resources/themes/lara-light-indigo/theme.css";     

import { FaFileVideo, FaEye,FaComment, FaHeart,} from 'react-icons/fa';

const firebaseConfigTheWal = {
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
};



export default function SavedVid({ 
  AllData,
  setAllData,
            
  recordedVideos,setRecordedVideos,content,setDisplayMode,poster,DisplayMode
}) {
  firebase.initializeApp(firebaseConfigTheWal, "appWal");

  const appWall = firebase.app("appWal");
//const user = "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2"; app05


const time = firebase.initializeApp(firebaseConfigTimeline, "timeLine");
const timeLine = firebase.app("timeLine");

const firestore = getFirestore(appWall);
const firestored = getFirestore(timeLine)

const [vid, setVid] = useState(null)
const [SlideDisable, setSlideDisable] = useState(false)

const {user, app05} = useAuth();
  const [stream, setStream] = useState(null);
  const liveVideoFeed = useRef(null);
  const [permission, setPermission] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
const [videoDur, setVideoDur] = useState(null);

const [videoid, setvideoid] = useState(null)

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
  }, []); // The empty dependency array ensures this runs only once on mount localstorage
*/


const [Watchlist, setWatchlist] = useState(null)

const [visible, setVisible] = useState(false);
const  [SwitchVids,setSwitchVids] = useState(null)



const setvideodid = (id, userid) => {
  let val = "false";

  const updatedVideos =
    recordedVideos &&
    recordedVideos.reverse().map((video) => {
      if (video.id === id) {
        val = "true";
      }
    });

  if (val === "false") {
    return;
  }

  const videoRef = appWall.database().ref("videos").child(userid);
  const timestamp = new Date().getTime();
          const timeLine = app05.database().ref('profile').child(user.uid);
          
          const favs={
              userName: userid,
         timed: timestamp,
         Favourated: "you watched ",
         content: "video",
         id:id,
        personName: "anonymous"
        }
        
  videoRef.once("value", (snapshot) => {
    let childKey; // Initialize childKey outside the loop
    snapshot.forEach((childSnapshot) => {
      childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      if (childData.id === id) {
        // Check if 'watched' is not an empty string and includes the 'id'. localStorage
        if (childData.watched  && childData.watched !== "" && childData.watched.includes(user.uid)) {
          // Remove the 'id' from the 'likes' array.
        


          return; // Exit the forEach loop when found.
        } else {
          // Add your user's 'id' to 'likes' since it's not found.
          const newWatch =
            childData.watched !== ""
              ? childData.watched + "," + user.uid
              : user.uid;
          videoRef.child(childKey).child("watched").set(newWatch);

        
        
          timeLine.child("favs").push(favs)
        

          return; // Exit the forEach loop when found.
        }
      }
    });
  });
};


  const mediaRecorder = useRef(null);
  const [showVid, setShowVid] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const overlayRef = useRef(null);
  const closeOverlayRef = useRef(null);

  const [showNull, setShowNull] = useState(null);

  const [loading, setLoading] = useState(false);

  const [lod, setlod] = useState(0);
  const [BottomLoading, setBottomLoading] = useState(false)

  const val = () => {
    setlod((pre) => pre + 1);
  };





  useEffect(() => {
    val();

    console.log(`Trigered ${lod}  Times`);
  }, [recordedVideos]);


  const [uniqueVideoIds, setUniqueVideoIds] = useState(new Set());
  const lastVideoRef = useRef(null);

  
  
  
  const yourVids =   false;




const [reload, setReLoad] = useState(false)

const [UpdateLoad, setUpdateLoad] = useState("Loading")
const [uniqueVideoId, setUniqueVideoId] = useState(new Set());

const [last,setLast] =  useState(true)

const commentsRef = useRef(null)


const Reload = async (ids) => {
  try {
    if (commentsRef.current === null) {
     
      for (const video of recordedVideos) {
        if (video.data.id  === ids &&  video.data.comments.length > 0) {
          

          commentsRef.current = video.data.id  === ids && video.data.comments[video.data.comments.length -1].id;

          break; // exit the loop once commentsRef is set
        }
      }
    }
console.log( "colld", commentsRef.current )

    const commentsQuery = commentsRef.current && query(
      collection(firestore, 'videos', ids, 'comments'),
      orderBy("id", "desc"),
      startAfter(commentsRef.current),
      limit(7)
    );

    const commentsSnapshot = await getDocs(commentsQuery);

    if (commentsSnapshot.size <= 0) {
      // If no documents are found, returning early to avoid unnecessary processing window.addEventListener('beforeunload', function (event)  localStorage
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
    
    setAllData((videos) =>
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

const [isitDry, setDry] = useState(false)


const MAX_RETRIES = 3;
let retryCount = 0;





        const loadVideos = async () => {
         
  const videoCollection = collection(firestore, 'videos');
  setDry(false)
  console.log("idss", lastVideoRef.current);
  let videoQuery;
 
  videoQuery = lastVideoRef.current

  ? query(videoCollection, orderBy("id", "desc"),  where("Saved", "array-contains",  "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2"), startAfter(lastVideoRef.current), limit(3))
  :    query(videoCollection, where("Saved", "array-contains",  "VF4s0blbB3ZtZuLh0ZuUKo9UtLQ2"), orderBy("id", "desc"), limit(3));
  

  try {



    const snapshot = await getDocs(videoQuery);

    if (snapshot.size <= 0) {
      // If no documents are found, return early to avoid unnecessary processing
      setLoading(false);
      setDry(true)
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
        



        // Get the total number of comments
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

    setBottomLoading(false);
    setDry(true)
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
    setUpdateLoad("Reload The Page ,Or check your internet")




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



const type =   typeof window !== 'undefined';



  const [Saved, setSaved] = useState(  type ? sessionStorage.getItem('SavedVids') : []);
  const [Likes, setLikes] = useState( type ? sessionStorage.getItem('LocalLikes') : []);
  const [watch, setWatch] = useState(type ?  sessionStorage.getItem('WatchList') : []);
  const [Mine, setMine] = useState( type ? sessionStorage.getItem('switchedVid') : []);
  const [Local, setLocal] = useState( type ? sessionStorage.getItem('switched') : []);
  
  useEffect(() => {
  
    if (Saved) {
      setRecordedVideos([])

      setTimeout(loadVideos, 1000); // Wait for a moment before calling localStorage

    


    }
  
    if (watch) {
      setRecordedVideos([])

      setTimeout(loadVideos, 1000); // Wait for a moment before calling
    }
  
    if (Likes) {
      setRecordedVideos([])

      setTimeout(loadVideos, 1000); // Wait for a moment before calling
    }
  
    if (Mine) {
      setRecordedVideos([])

      setTimeout(loadVideos, 1000); // Wait for a moment before calling
    }
  
    if (Local) {
      setRecordedVideos([])

      setTimeout(loadVideos, 1000); // Wait for a moment before calling
    }
  }, [Saved, Likes, watch, Mine, Local]);
  







useEffect(() => {
  if(!AllData){
    return;
  }
  if(AllData?.length > 0){
  
  const obb = AllData &&  Object.values(AllData);
  lastVideoRef.current = obb && obb[obb.length -1].data?.id
  

  }

  }, [AllData]);


  useEffect(() => {
    if(!AllData){
      return;
    }
    if (AllData?.length === 0) {
     
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
  // await loadVideos();
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
  useEffect(() => {


    const vidDataRef = appWall.database().ref(`videos`);
    setLoading(true);

    // Listen for changes to the video metadata console.log("hows") user
    const listener = vidDataRef.on("value", async (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setLoading(false);
        return;
      }

      const vidData = Object.entries(data);

      // Fetch video files rtdb
      const videoDataWithFiles = await Promise.all(
        vidData.map(async ([uid, userData]) => {
          return Promise.all(
            Object.entries(userData).map(async ([key, video]) => {
              // Assuming video.id contains the unique ID for each video
              const videoFileRef = appWall
                .storage()
                .ref(`videos/${video.user}/${video.id}.webm`);
              try {
                const videoFileURL = await videoFileRef.getDownloadURL();
                return { ...video, playVid: videoFileURL };
              } catch (error) {
                console.error("Error fetching video file:", error);
                return { ...video, playVid: null };
              }
            })
          );
        })
      );

 





      // Flattened array 
      const flattenedVideoData = videoDataWithFiles.flat();

      console.log("show", flattenedVideoData);
      setRecordedVideos(flattenedVideoData);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => vidDataRef.off("value", listener);
  }, [user]);

*/







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
  const [open, setOpen] = useState(false);
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
    }



  };
  


  const [value, setValue] = useState({
    userName: "",
    timePosted: "2hrs ago",
    profilePhoto: "",
    comment: "",
    userid: "",
    id: nanoid(),
    read: "notread",
  });

  const vidref = useRef(null);

  const [comentcontairef, setcommentContainer] = useState(true);

  function activateComments(id) {
    recordedVideos &&
      recordedVideos?.map((video) => {
        if (video.id === id) {
          setcommentContainer((pre) => !pre);
          vidref.current.pause();
          if (vidref.current.pause) {
            vidref.current.style.cursor = "pointer";
          }
        }
      });
  }


  const [valueReply, setValReply] = useState({
 
    comment: "",
   
  });
  
  
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

    // Update the Firestore document with the modified "comments" array
  
    // Push the comment to the "Comments" collection in Firestore
    await addDoc(videoBackup, comment); // Removed "user" and spread operator
  }
  setValue((prevValue) => ({ ...prevValue, comment: "" }));

};

  
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
  const videoBackup = collection(firestored, 'comments'); 

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
    const timestamp = new Date().getTime();

    const commentsSnapshot = await getDocs(commentsCollectionRef);
    
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
            // If there's no comments or likes array, create them
            videoData.likes = [userid];
            hasLiked = true;
           
          }

          // Update the likes in the existing document
          await updateDoc(doc.ref, { likes: videoData.likes });
          await addDoc(videoBackup, likes); 
          // Perform additional actions if needed
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
    const videoDoc = querySnapshot.docs[0]; // Assuming there's only one matching document
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
 vid.length === 0 ? setVid({
      comments: [valueN]
    }) : 
    setVid(prev => ({
      ...prev,
      comments: [...prev.comments, valueN]
    }))

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

    // Update the Firestore document with the modified "comments" array
  
    // Push the comment to the "Comments" collection in Firestore
    await addDoc(videoBackup, comment); // Removed "user" and spread operator

    setValue((prevValue) => ({ ...prevValue, comment: "" }));

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
  
          // Check if the comment ID matches
          if (commentData.id === ids) {
            // Update the Firestore document by removing the comment Loading
            await deleteDoc(doc.ref);
            // If there's a subcollection "commentreply", you may want to delete documents from it as well
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







useEffect(() => {
 // window.addEventListener('beforeunload', function (event) {
    // Clear local storage when the user is about to leave the page
  //localStorage.clear()   l
    
    // Optionally, you can display a confirmation message
    // to ask the user if they are sure they want to leave localstorage
 //   event.returnValue = 'Are you sure you want to leave?';
 // });
}, [])

if(Switch){
  console.log("siwiii",Switch)

}
const Videos =  recordedVideos && recordedVideos?.length > 0 && Object.values(recordedVideos)

  if (loading || recordedVideos?.length < 0) {
    return <div style={{marginRight: "0.5rem !important",margin: "auto",  width: "100vw",
    position: "fixed",
    left: "0",
    top:" 0"}}><LoadingAnim/></div>;
  }

const SavedData = []


if(Switch){
  
}



return(

  <>
  
  {DisplayMode   ? 

 
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

  }
  </>
)
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

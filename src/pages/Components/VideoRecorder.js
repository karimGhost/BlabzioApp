import React, { useEffect, useState, useRef } from "react";

import { nanoid } from "nanoid";
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { Player, ControlBar, BigPlayButton, PosterImage } from 'video-react';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import {useAuth} from "../../Accounts/useAuth"
import { Button } from "primereact/button";

import 'video-react/dist/video-react.css'; // 
const firebaseConfigVideo = {
    apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
    authDomain: "thewall-10a4a.firebaseapp.com",
    databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
    projectId: "thewall-10a4a",
    storageBucket: "thewall-10a4a.appspot.com",
    messagingSenderId: "221023885061",
    appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
    measurementId: "G-7V80059NF7"
  };










const VideoRecorder = (props) => {



const {user} = useAuth()


//const {user} = useAuth()





firebase.initializeApp(firebaseConfigVideo, "appvid");

const appvid = firebase.app("appvid")





const mimeType = "video/webm";

const [recordingStatus, setRecordingStatus] = useState("inactive");
const [videoChunks, setVideoChunks] = useState([]);
  
const facingMode = props.facingMode;
const setFacingMode = props.setFacingMode;

const stream = props.stream;
const  setStream  = props.setStream;
const liveVideoFeed = props.liveVideoFeed;
const permission  = props.permission;
const  setPermission = props.setPermission;
const recordedVideo = props.recordedVideo ;
const setRecordedVideo = props.setRecordedVideo;

const mediaRecorder =  props.mediaRecorder ;

const fileInputRef = useRef(null);

const firestore = getFirestore(appvid);
const storage = getStorage(appvid);






useEffect(() => {
  window.addEventListener('beforeunload', function (event) {
  // localStorage.clear();
    
    // to ask the user if they are sure they want to leave
    event.returnValue = 'Are you sure you want to leave? the Recording ';
  });
}, [])

  


    useEffect(() => {
        if (permission && liveVideoFeed.current && stream) {
            liveVideoFeed.current.srcObject = stream;
        }
    }, [permission, stream]);
    
const switchCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    await props.getCameraPermission();
  };



const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localVideoChunks.push(event.data);
    };
    setVideoChunks(localVideoChunks);







};






const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState('');

  useEffect(() => {
    // Check if localStorage is available (on the client-side)
    if (typeof window !== 'undefined' && window.sessionStorage ) {
      const storedURL = window.sessionStorage.getItem("url");
      if (storedURL) {
        setImageURL(storedURL);
        setImageFile(storedURL)
      }
    }

  }, []); // The empty dependency array ensures this runs only once on mount user videos localstorage ER








  


const recordedVideos = props.recordedVideos;
const  setRecordedVideos = props.setRecordedVideos;

const [Title, setTitle] = useState("");


const [isRequired, setisRequired] = useState(false);


console.log("As much as we record we do ", props.Useris)



const addRecordedVideo = async () => {
  if (Title.length === 0) {
      setisRequired(true);
      return;
  }

  if (!imageFile) {
      alert('Please add a Poster image');
      return;
  }

  const timestamp = new Date().getTime();

  const recordedVideoDataUrl = recordedVideo && URL.createObjectURL(recordedVideo); 

  const newRecordedVideo = {
      user: user,
      dp: props.Image,
      username: props.Useris,
      id: nanoid(),
      recordedVideo:recordedVideoDataUrl,
      title: Title,
      likes: '',
      shares: '',
      watched: '',
      time: timestamp,
      poster: imageFile,
      comments: [{}],
      Saved: '',

  };

  try {
      // Add the video data to Firestore
      const videoCollection = collection(firestore, 'videos');
      await addDoc(videoCollection, newRecordedVideo);

      // Upload the video file to Firebase Storage
    

      const reader = new FileReader();
reader.onload = () => {
  const dataUrl = reader.result; // This will be a valid Data URL
  // Now you can upload the dataUrl to Firebase Storage
  const videoStorageRef = ref(storage, `videos/${newRecordedVideo.id}.webm`);

  uploadString(videoStorageRef, dataUrl, 'data_url')
    .then(() => {
      // Upload successful
    })
    .catch((error) => {
      console.error('Error uploading:', error);
    });
};
reader.readAsDataURL(recordedVideo);
      // Get the download URL for the uploaded video
      //const downloadURL = await getDownloadURL(videoStorageRef); localStorage

      newRecordedVideo.playVid = recordedVideo;
      setRecordedVideos((prevState) => [...prevState, newRecordedVideo]);

      // Proceed with using the downloadURL as needed 

      sessionStorage && sessionStorage.removeItem('blob');
      sessionStorage && sessionStorage.removeItem('url');
      sessionStorage && sessionStorage.removeItem('videoBlob');

     
      props.stopCameraStream();
      props.setShowVid(false); setRecordedVideo([]);
      setStream(null);
  } catch (error) {
      console.error('Errordd:', error);
  }


};

      const ExitCam = props.ExitCam;
    
      const handleFileInputChange = (e) => {
        const file = e.target.files[0];
     
        if (file) {
          const reader = new FileReader();
      
          reader.onload = () => {
            const fileDataUrl = reader.result; // This will be a base64 data URL
            sessionStorage && sessionStorage.setItem("poster", fileDataUrl);

            setImageFile(fileDataUrl)
          };
      
          // Read the file as data URL, which will be base64-encoded
          reader.readAsDataURL(file);
        }
      };

     



      const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          const videoBlob = new Blob(videoChunks, { type: mimeType });

          setRecordedVideo(videoBlob);
          setVideoChunks([]);
      
          // Create a video element to load the recorded video data
          const videoUrl = URL.createObjectURL(videoBlob);
          const videoElement = document.createElement("video");
          videoElement.src = videoUrl;
      
          // Create a canvas element to capture a frame
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
      
          videoElement.onloadedmetadata = () => {
            // Set canvas dimensions to match the video dimensions
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
      
            // Capture the first frame (adjust currentTime as needed)
            videoElement.currentTime = 0;
      
            videoElement.oncanplay = () => {
              // Set canvas dimensions to match the video dimensions
              canvas.width = videoElement.videoWidth;
              canvas.height = videoElement.videoHeight;
            
              // Capture the first frame
              context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            
              // Convert the canvas content to a data URL (PNG format)
              const imageDataURL = canvas.toDataURL("image/png");
            
              // Save the data URL to localStorage
              sessionStorage && sessionStorage.setItem("poster", imageDataURL);
            
              // You can also set the data URL for display purposes localStorage
              setImageURL(imageDataURL);
              setImageFile(imageDataURL);
            };
        
            } 
            // Start loading the video
            videoElement.load();
          }
              
      };

      const videoRef = useRef(null);

   
      if(imageFile){
        console.log("here is how look", imageFile)
      }
  


    return (
        <div>
   
    <main className= { props.showVid &&' boxmain'}>
        <div className="video-controls">
            { /*!permission ? (
            <button onClic={getCameraPermission} type="button">
               open camera
            </button>
            ) : null */}
            
        </div>

                {permission && liveVideoFeed ? (
    <div style={{position:'relative' }}  className="video-player">

      { recordingStatus === 'inactive' && <> <Button onClick={ExitCam}>Exit</Button>   <Button onClick={ExitCam}>Upload</Button>  </>}
        {  recordingStatus === 'recording' &&  <span style={{color:'red'}} > <ul><li style={{color:'red', position:'absolute',zIndex:'20'}} className='recordmode'>{recordingStatus}</li></ul></span>}

    
    
    <video  className='live-player  m-50' ref={liveVideoFeed} autoPlay playsInline>
    
    
    </video>
    {permission && recordingStatus === "inactive" ? (
           <Button   icon="pi pi-video" style={{ zIndex: '20', position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'transparent', border: '2px solid green', borderRadius: '50%', width: '3rem', height: '3rem' }} onClick={startRecording} type="button">
       </Button>
            ) : null}
            {recordingStatus === "recording" ? (
           <Button  icon="pi pi-stop-circle" style={{ zIndex: '20', position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: 'transparent', border: '2px solid red', borderRadius: '50%', width: '3rem', height: '3rem' }} onClick={stopRecording} type="button">
       </Button>
       
            ) : null}
{ recordingStatus === "inactive"  && <Button className="switchcam" icon="pi pi-sync" label="switch_Cam" style={{ background:"transparent",position:'absolute',zIndex:'20', top:'0', right:'0'}} type='button' onClick={switchCamera}> switchcam </Button> }
    </div>
) : null}
                    
                { !permission && recordedVideo ? (
        <div className="video-player">
            <div style={{position:"relative",}}>

<div data-vjs-player>

<Player fluid={false} width={640} height={660} poster={imageFile}>
      <source src={ URL.createObjectURL(recordedVideo) } type="video/webm"  />
      <ControlBar autoHide={true} />
      <BigPlayButton position="center" />
    
    </Player>    </div>
              
         <input
  type="file"
  accept="image/*" // Set the accepted file types, such as images
  onChange={handleFileInputChange}
  style={{ display: "none" }} // Hide the input element
  ref={fileInputRef} // Create a ref to access the input element
/>


<button   style={{background:"transparent", border:"1px solid purple ", borderRadius:"5px", whiteSpace:"nowrap", position:"absolute", top:"0",left:"0"}} onClick={() => fileInputRef.current.click()}>Change Poster</button>
            </div>
            
         <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"50%"}}>

                  <Button icon="pi pi-check-square" style={{background:"green"}} onClick={addRecordedVideo}>
                post Video
            </Button>
            <div>

         <InputText style={{border: isRequired && " 1px solid red"}}  onInput={() => Title.length >= 0 && setisRequired(false)} value={Title} required={isRequired}
           onChange={(e) => setTitle( e.target.value) }
 placeholder={isRequired ? "Please Enter Title" : "Video Title"}             tooltipOptions={{ className: 'tooltips',position: 'bottom'}}> 

 </InputText>     
{  isRequired &&
 <p className="bg-danger">Please fill The Title !!</p>
}
            </div>


            <Button icon="pi pi-refresh"  onClick={props.getCameraPermission}>
             retake video
            </Button>

</div>
        </div>
        ) : null}
    </main>
</div>

    );
};
export default VideoRecorder;

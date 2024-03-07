import React, {useRef, useEffect, useState, lazy, Suspense } from "react";

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Editor } from "primereact/editor";
import { FileUpload } from 'primereact/fileupload';


import Vida from './Vida'
import { useAuth } from "../../Accounts/useAuth";
                                             
                                                          

const firebaseConfigTheWallEditor = {
  apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
  authDomain: "thewall-10a4a.firebaseapp.com",
  databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
  projectId: "thewall-10a4a",
  storageBucket: "thewall-10a4a.appspot.com",
  messagingSenderId: "221023885061",
  appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
  measurementId: "G-7V80059NF7",
};


function EditedVideo({Editedvideo, setEditedVideo, setoffed}){
  const toast = useRef(null);

const {user} = useAuth()

    firebase.initializeApp(firebaseConfigTheWallEditor, "appWallEditor");

    const appvid = firebase.app("appWallEditor");

const [visible, setVisible] = useState(true);

const [values, setValues] = useState("")
const [video, setVideo] = useState('');

const [counter, setCounter] = useState(0);


   const [imageURL, setImageURL] = useState('');
   const [imageFile, setImageFile] = useState('');
   const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

 
   const [isEditing, setIsEditing] = useState(false);

   


const handleFileInputChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const fileDataUrl = reader.result; // This will be a base64 data URL localstorage
      localStorage && localStorage.setItem("poster", fileDataUrl);

      setImageFile(fileDataUrl)
    };

    // Read the file as data URL, which will be base64-encoded localstorage
    reader.readAsDataURL(file);
  }
};


const [videoURL,setTrimmedVideoURL] = useState("")

useEffect(() => {

    if(EditedVideo){
        setVisible(true)
    }else{
        setVisible(false)

    }



}, [counter])






useEffect(() => {
  // Check if localStorage is available (on the client-side)
  if (typeof window !== 'undefined' && window.localStorage ) {
    const storedURL = window.localStorage.getItem("Video");
   
    if (storedURL) {
      setVideo( JSON.parse(storedURL))
    }
  }
}, []); // The empty dependency array ensures this runs only once on mount window



const [cropped, setCropped] = useState(null);

const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setEditedVideo( URL.createObjectURL(selectedVideo));

    
  };


/*

  const handleCrop = async (cropData) => {
    try {
      const croppedBlob = await VideoCropper.crop(video && video.videos.video, cropData);
      setCroppedVideo(URL.createObjectURL(croppedBlob));

     setCropped(croppedBlob)


    } catch (error) {
      console.error('Error cropping video:', error);
    }
  };

*/

const [croppedVideo, setCroppedVideo] = useState(null);


const [title, setTitle] = useState(video &&  video.title)
  
const [Edits,setEdits] = useState(true)

const fileInputRef = useRef(null);


  


const newRecordedVideo = {
    user: video && video.user,
id: video && video.id,
    recordedVideo: cropped ,
     title: title ,
   poster: imageFile && imageFile,
   Edited: "true",
 
   };


function handleSaveCroppedVideo( user) {

    const vidapp = appvid.database();
    const videoRef = vidapp.ref('videos').child(user);
    
  if(!video){
    return;
  }
    
    videoRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
  
        if (childData.id === video.id) {
  
  
          videoRef.ref().update(newRecordedVideo);
  
  
  
          const storageRef = appvid.storage().ref();
          const videoFileRef =  storageRef.child(`videos/${video.user}/${video.id}.webm`);
          
          videoFileRef.update(newRecordedVideo.recordedVideo, { contentType: 'video/webm' })
          .then((snapshot) => {
          console.log("videSnap", snapshot)
          
          return videoFileRef.getDownloadURL();
          
        
        
            }) 
             .then((downloadURL) => {
              console.log('Download URL:', downloadURL);
          
              // Proceed with using the downloadURL as needed (e.g., displaying the video)
            })
            .catch((error) => {
              console.error('Error uploading video:', error);
              toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Modifying video Try Again After Some Time' });
  
            });
  
  
  
        

        
        
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Video Modified Succesfuly Refresh Page' });
  
      if(  typeof window !== 'undefined' ){
    localStorage.removeItem("Video")


      localStorage.removeItem("url")

        localStorage.removeItem("blob")
        }
  
      }
    }) })
  
  
    
  
  
  }


function CheckLocalhost(){
   localStorage.clear() 
 setoffed(pre => pre + 1) 
}








    return(

        <div className="card flex justify-content-center    h-100 " style={{position:"fixed", top:"0" , height: "100vh", width:"100vw", background:"white", zIndex:"30"}}>

<div style={{margin:"auto"}}> 

<div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
<Button label="Abort" icon="pi pi-times"   onClick={CheckLocalhost}   className="p-button-text" />
  
{/*

<input
  type="file"
  accept="image/*" // Set the accepted file types, such as images
  onChange={handleFileInputChange}
  style={{ display: "none" }} // Hide the input element
  ref={fileInputRef} // Create a ref to access the input element
/>


<button   style={{background:"transparent", border:"1px solid purple ", borderRadius:"5px", whiteSpace:"nowrap", marginTop:"-20px"}} onClick={() => fileInputRef.current.click()}>Change Poster</button>
 */}
</div>




      <h2>Video Editor</h2>

{ video &&
  
      <Vida  vida  = {video.video}

videoSrc = {video.video}/> }
    
      <Button label="Update" icon="pi pi-check"  onClick={handleSaveCroppedVideo}    autoFocus />

</div>
            

        </div>
    )
}

export default EditedVideo;



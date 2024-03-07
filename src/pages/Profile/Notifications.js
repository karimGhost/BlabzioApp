import React, { useEffect, useState } from "react";
import { Card,  Row, Col, Container } from "react-bootstrap";
import Navbar from '../../Navigation/Navbar'
import firebase from 'firebase/compat/app';
import { Alert } from 'react-bootstrap';
import 'firebase/auth';
import 'firebase/database';
import { useAuth } from '../../Accounts/useAuth';
import { Link, navigate } from "gatsby";
import ReactHtmlParser, { Comment } from "html-react-parser";
import im from "../../images/proxy.jpeg";
import { Button } from "primereact/button";
import Layout from "../../Navigation/Layout";
import { FaCheckCircle, FaDivide, FaHeart, FaPencilAlt, FaRedoAlt, FaStar } from "react-icons/fa";
import {  useLocation } from '@reach/router';
import {firebaseConfig019} from "../../Accounts/FirebaseAuth";
const firebaseConfig2 = {
  apiKey: "AIzaSyA4-6Spjqf7Z_ks7fak2jnGKqtJG4uRqMk",

  authDomain: "zenahubglob.firebaseapp.com",

  databaseURL: "https://zenahubglob-default-rtdb.firebaseio.com",

  projectId: "zenahubglob",

  storageBucket: "zenahubglob.appspot.com",

  messagingSenderId: "414119474155",

  appId: "1:414119474155:web:d93f733443172ecd739fae",

  measurementId: "G-B65PR7NNXS"

};



const firebaseConfig909 = {

  apiKey: "AIzaSyAlILFCEiJQQJsQB2a0uidx61r9zfEVLWc",

  authDomain: "notifications-a1743.firebaseapp.com",

  databaseURL: "https://notifications-a1743-default-rtdb.firebaseio.com",

  projectId: "notifications-a1743",

  storageBucket: "notifications-a1743.appspot.com",

  messagingSenderId: "624660139679",

  appId: "1:624660139679:web:a73fd504b5ba8e7b005caa",

  measurementId: "G-BCF42GY6H1"

};



function NotificationCard() {
 
  const { user,setUser, loading,signOut } = useAuth();


  const apps15 =firebase.initializeApp(firebaseConfig2, 'app15');
  const app15 = firebase.app('app15');

  const apps2 = firebase.initializeApp(firebaseConfig019, 'app2');
  const app2 = firebase.app('app2') 





  //const app8 = app9.database().ref(`notifications/`)

  const followersRef = app2.database().ref(`profile/followers/`);
  const postsRef = app15.database().ref(`comments/cards/`);

  
  const postreplies = app15.database().ref(`Reply/`);
  const postreplied = app15.database().ref(`Replies/replied`);
  const postratings = app15.database().ref(`Ratings/`);
  

  const apps9 = firebase.initializeApp(firebaseConfig909, 'app9');
  const app9 = firebase.app('app9') ;


function toView(id){
  
}

  const [notifications, setNotifications] = useState([]);

  const onViewNotification = (notificationId) => {
    const notificationRef = app9.database().ref(`users/${user.uid}/posts`);
  
    notificationRef.once('value', (snapshot) => {
      snapshot.forEach((postSnapshot) => {
        const post = postSnapshot.val();
  
        // Check if any object in the cardid array has a matching id
        const foundPost = post && post.cardid && post.cardid.find((card) => card.id === notificationId);
        
        if (foundPost) {
          // Delete the post from the database
          postSnapshot.ref.remove();
        }
      });
    });
  };
  



  useEffect(() => { 
    // Get the notifications for the current user ID
    if(!user){return;}
    const notificationsRef = app9.database().ref(`users/${user.uid}/posts`);
  
    notificationsRef.on('value', (snapshot) => {

      const notifications = [];
      snapshot.forEach((notifSnapshot) => {

const posts = notifSnapshot.val();
      
notifications.push(posts.cardid);
        

      });

      setNotifications(notifications);
      
    });
  
    return () => {
      notificationsRef.off('value');
    };
  }, [user,app9]);
  


  const [showNotification, setShowNotification] = useState(false);


  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    if (user) {
      const imageObjects = [];
  
      if (notifications) {
        notifications.forEach((notificationArra) => {
          if (notificationArra) {
            notificationArra.forEach((notification) => {
              const id = notification.userid;
              const imageObj = {
                id: id,
                image: null
              };
              imageObjects.push(imageObj);
  
              app2.database().ref(`profile/${id}/profileImg`).on('value', (snapshot) => {
                console.log(JSON.stringify(snapshot.val()));
                if (!snapshot.val()) {
                  console.log("Snapshot value is null or undefined");
                  return;
                }
  
                // check if snapshot.val() is an object
                if (typeof snapshot.val() === 'object') {
                  const val = snapshot.val();
                  imageObj.image = val.profileImg;
                } else {
                  imageObj.image = snapshot.val();
                }
  
                setProfileImages((prevState) => [...prevState]);
              });
            });
          }
        });
      }
    }
  }, [ notifications]);
  

  function handleButtonClick() {
    setShowNotification(true);
  }



if(notifications){
  console.log( "this are the offof",notifications.message)
}
const counts = {};

notifications.forEach((notificationArra) => {
  if (Array.isArray(notificationArra)) {
    notificationArra.forEach((notification) => {
      const message = notification.message;
      counts[message] = (counts[message] || 0) + 1;
    });
  }
});






const countsArray = Object.entries(counts);


  return (

   

<>
<Navbar  length ={countsArray.length}/>
<section style={{ backgroundColor: "#f7f6f6" , marginTop:"100px"  }}>

<div className="py-5 text-dark" style={{ maxWidth: "1000px"}}>
  <Row className="justify-content-center">
    <Col md="12" lg="10" xl="8">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span tag="h4" className="text-dark mb-0">
          Unread comments ({countsArray.length})
        </span>
        <Card>
          <Card.Body className="p-2 d-flex align-items-center">
         { /*  <span
              tag="h6"
              className="text-primary fw-bold small mb-0 me-1"
            >
              Comments "ON"
            </span> 
            <Button defaultChecked id="flexSwitchCheckChecked" /> */}
          </Card.Body>
        </Card>
      </div>
  {notifications &&
              notifications.map((notificationArra, index) => (
                <div key={index} className="d-flex">

{notificationArra && 
                     notificationArra.map((notification, innerIndex) => (
      <Card className="mb-3" key={innerIndex}>
        <Card.Body>

            <div style={{marginLeft:"auto"}} className="d-flex row w-100">  
            <div className="d-flex row">
            

            <div className="w-100 ml-auto">
              <div className="  align-items-center mb-3 d-flex">
              <Link to={`/profileComponents/Profiles?id=${notification.userid}`}>    <Card.Img
              className="rounded-circle  shadow-1-strong  "
              src={profileImages.find(imageObj => imageObj.id === notification.userid) ? profileImages.find(imageObj => imageObj.id === notification.userid).image : im}
                            alt="avatar"
                            style={{width:"50px", height:"50px"}}
              width="20"
              height="20"

            /> </Link> 
                <span
                  tag="h6"
                  className="text-primary fw-bold mb-0"
                >
                        <Link to={`/profileComponents/Profiles?id=${notification.userid}`}>  {notification.user}</Link>  <i style={{fontSize:"10px" , color:"grey"}}>from people you follow has a new post{" "} </i>
                        
                        </span>    
                       
                        <p style={{fontSize:"0.65rem", color: "blueviolet"}} className="mb-5 mr-auto">2 days ago</p>
                 </div>



                
             

                <div className="text-dark  mx-4 pl-5 pr-5">
                
         
                {notification.message.includes("<p>") && ReactHtmlParser(notification.message)}
                </div>
              </div>
              <div style={{marginLeft:" auto", marginRight:"auto", width:"100%"}} className="d-flex justify-content-between  mx-auto">
                <p className="small mb-0" style={{ color: "#aaa" }}>
                  <Button onClick={() => onViewNotification(notification.id)} style={{backgroundColor:"none", border:"none", float:"left",color:"red"}} outlined className="link-grey  p-2 py-1 mx-1 bg-none">
                    Remove
                  </Button>{" "}
                  •
                  <Link to={`/news/Posted/Postit?id=${notification.id}`}>
                    <Button style={{backgroundColor:"none", border:"none", color:"green"}} outlined className="link-grey p-2 mx-1 bg-none">
                  View
                  </Button>{" "}
                  </Link>
                  
              
                </p>
            
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>))}
</div> 
              ))}
    </Col>
  </Row>
</div>
</section>

</>




  );
}
export default NotificationCard;


  


import React, { useState, useRef, useEffect, useCallback} from "react";
import ReactHtmlParser from "html-react-parser";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from 'primereact/selectbutton';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import {Badge} from 'primereact/badge'
import { nanoid } from 'nanoid';
import { Row } from "react-bootstrap";
import { InputTextarea } from 'primereact/inputtextarea';

import { InputText } from 'primereact/inputtext';
import { FaComment, FaReply } from "react-icons/fa";
import { Button } from 'primereact/button';
import Container from "react-bootstrap";
import firebase from 'firebase/compat/app';
import { useAuth } from '../../Accounts/useAuth';
import  Card from "react-bootstrap/Card";
import {  useLocation } from '@reach/router';
import { Link } from "gatsby";
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { isObject } from "lodash";
import { debounce } from 'lodash';
import {  faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'primeicons/primeicons.css';

import noImg from   "../../images/no-image.jpg"
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

function resizeImages(htmlString) {
const regex = /<img [^>]*>/g;
const matches = htmlString.match(regex) || [];
for (const match of matches) {
  const widthRegex = /width="(\d+)"/;
  const heightRegex = /height="(\d+)"/;
  
  const widthMatch = match.match(widthRegex);
  const heightMatch = match.match(heightRegex);
  const width = widthMatch ? parseInt(widthMatch[1]) : undefined;
  const height = heightMatch ? parseInt(heightMatch[1]) : undefined;
  const newWidth = width ? Math.floor(width / 2) : undefined;
  const newHeight = height ? Math.floor(height / 2) : undefined;
  const widthAttr = newWidth ? ` width="${newWidth}"` : "";
  const heightAttr = newHeight ? ` height="${newHeight}"` : "";
  const newTag = match.replace(/\/?>/, `${widthAttr}${heightAttr} class="resized-imaged cursor-zoom">`);
  htmlString = htmlString.replace(match, newTag);
}



const reg = /<p\b[^>]*>/gi;
  htmlString = htmlString.replace(reg, '<p class={` ${props.dark ?   "resizeded-p" : "resized-P" }`}>');

  const rel= /<code\b[^>]*>/gi;
  htmlString = htmlString.replace(rel, '<code class={` ${props.dark ?   "resizeded-p"  : "resized-P"}`} style={{color: props.dark ? "white" : "black"}}>');

  const re= /<h1\b[^>]*>/gi;
  htmlString = htmlString.replace(re, '<p class={` ${props.dark ?   "resizeded-p" : "resized-P" }`}>');


return htmlString;
}
export default function Comments(props) {

const toast = useRef(null);
const propsd = props.dark;
const [cards, setCards] = useState([]);
const [cardmessage, setCardMessage] = useState('');
const display = props.DisplayMode;
const { user,setUser, loading,signOut } = useAuth();


firebase.initializeApp(firebaseConfig2, 'app1515');
const app1515 = firebase.app('app1515');

const [valid, setValid] = useState(false)
function validated(){
setValid(pre => !pre)
}



const  prof =  props.profileImg;
const  username = props.username;

                                          // Rating constructon start 
const [Rate, setRate] = useState([])
const [vote, setVote] = useState({
  upvote: 0,
  downvote: 0,
  userVote: 0 // -1 for downvote, 0 for no vote, 1 for upvote setAllData
});










const [rates, setRates] = useState([]);

// Function to handle the user's dislike action
async function handleDislike(id,e) {
  

  if (!props.user) {
    return; // User is not logged in, do nothing
  }

  const cardId = `card-${id}-${props.user}`;  
  setRates((prevRates) => {
    const updatedRates = prevRates.map((rate) => {
      if (rate.cardId === cardId ) {
        return {
          ...rate,
          disliked: true,
          liked: false,
        };
      }
      return rate;
    });

    // If the user hasn't rated this card before, addig a new entry
    if (!updatedRates.some((rate) => rate.cardId === cardId && rate.user === props.user)) {
      updatedRates.push({
        cardId,
        user: props.user,
        liked: false,
        disliked: true,
        ip: id,
        userId: user.uid,
      });
    }

    return updatedRates;
  });

  try {
    const snapshot = await app1515.database()
      .ref('Ratings')
      .orderByChild('cardId')
      .equalTo(cardId)
      .once('value');

    if (snapshot.exists()) {
      const ratingKey = Object.keys(snapshot.val())[0]; // if there's only one matching rating
      const rating = snapshot.val()[ratingKey];
      await app1515.database().ref(`Ratings/${ratingKey}`).update({
        disliked: !rating.disliked,
        liked: false,
      });
    } else {
      const userRef = app1515.database().ref('Ratings');
      await userRef.push({
        cardId,
        user: props.user,
        liked: false,
        disliked: true,
       ip: id,
       userId: user.uid,
       date: new Date()
      });
    }
  } catch (error) {
    console.error('Error updating:', error);
  }

  e.stopPropagation();
}


// Function to handle the user's like action
async function handleLike(id) {
 
  if (!props.user) {
    return; // User is not logged in, do nothing
  }

  const cardId = `card-${id}-${props.user}`;  

  // Update the local state
  setRates((prevRates) => {
    const updatedRates = prevRates.map((rate) => {
      if (rate.cardId === cardId) {
        return {
          ...rate,
          liked: true,
          userId: user.uid,
          disliked: false,
        };
      }
      return rate;
    });

    // If the user hasn't rated this card before, add a new entry deleted user
    if (!updatedRates.some((rate) => rate.cardId === cardId && rate.user === props.user)) {
      updatedRates.push({
        cardId,
        user: props.user,
        liked: true,
        disliked: false,
        ip: id,
        userId: user.uid,
        date: new Date()
      });
    }

    return updatedRates;
  });

  try {
    const snapshot = await app1515.database()
      .ref('Ratings')
      .orderByChild('cardId')
      .equalTo(cardId)
      .once('value');

    if (snapshot.exists()) {
      const ratingKey = Object.keys(snapshot.val())[0]; // assuming there's only one matching rating
      const rating = snapshot.val()[ratingKey];
      await app1515.database().ref(`Ratings/${ratingKey}`).update({
        liked: !rating.liked,
        userId: user.uid,
        disliked: false,
      });
    } else {
      const userRef = app1515.database().ref('Ratings');
      await userRef.push({
        cardId,
        user: props.user,
        liked: true,
        disliked: false,
        ip: id,
        userId: user.uid,
        date: new Date()
      });
    }
  } catch (error) {
    console.error('Error updating:', error);
  }
}


useEffect(() => {

  const ratingsRef = app1515.database().ref('Ratings');

  // Listen for changes to the user's rating data
  const listener = ratingsRef.on('value', (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      setRates([]);
      return;
    }

    const ratings = Object.entries(data).map(([key, value]) => ({
      ...value,
      id: key,
    }));

    setRates(ratings);
  });

  // Clean up the listener when the component unmounts
  return () => ratingsRef.off('value', listener);
}, [user]);




/*


 useEffect(() => {
      try {
        const RateRef = app5.database().ref(`Ratings/`);
    
        RateRef.on('value', (snapshot) => {
          const ratesnapshot = snapshot.val();
          if (ratesnapshot) {
            const allData = Object.values(ratesnapshot);
            setRate(allData);
          } else {
            setRate([]);
          }
        });
    
        return () => {
          RateRef.off('value')
        };
      } catch (error) {
        console.error('Error setting up Firebase listener:', error)
      }
  
  
  
}, [user]);

console.log('This are the data from Rate firebase see them ',rates)
///the Rates up
///
async function handleDisLikes(d) {
  if (props.user) {
    setRate((rate) => {
      const updatedRate = [...rate];
      const index = updatedRate.findIndex((r) => r.user === props.user);
      if (index !== -1) {
        updatedRate[index] = {
          ...updatedRate[index],
          disliked:  false,
          liked: !liked,
        };
      } else {
        updatedRate.push({
          ip: d,
          id: props.user,
          disliked: false,
          liked: true,
          user: props.user,
        });
      }
      return updatedRate;
    });

    try {
      const snapshot = await app5.database()
        .ref(`Ratings/`)
        .orderByChild('user')
        .equalTo(props.user)
        .once('value');

      if (snapshot.exists()) {
        const ratingKey = Object.keys(snapshot.val())[0]; // assuming there's only one matching rating
        const rating = snapshot.val()[ratingKey];
        await app5.database().ref(`Ratings/${ratingKey}`).update({
          liked: !rating.liked,
          disliked: rating.disliked? false : rating.disliked,
        });
      } else {
        const userRef = app5.database().ref(`Ratings/`);
  await userRef.update({
    ip: d,
    id: props.user,
    disliked: false,
    liked: true,
    user: props.user,
  });
      }
    } catch (error) {
      console.log(error);
    }
    validated();
  }
}

//Ratings Construction End

*/

                                                //handle commenting start constuction



async function handleClick(ip) {
const id = nanoid();
if (cardmessage.trim() !== '') {
  try {
    const snapshot = await app1515.database().ref("commentpost")
      .orderByChild("ip")
      .equalTo(ip)
      .once("value");
    if (snapshot.exists()) {
      await app1515.database().ref(`commentpost/${id}`).update({
        id: id,
        ip: ip,
        message: cardmessage.trim(),
        profile: props.profileuser,
        username: props.user,
        font: "sans-serif",
        showCommentBox: '',
        cardm: cards.length,
        isactive: true,
        liked: '0',
        disliked: '1',
        userId: user.uid,
        date: new Date(),
      });
    } else {
      setCards([...cards, {
        id: id,
        ip: ip,
        message: cardmessage.trim(),
        profile: props.profileuser,
        username: props.user,
        font: "sans-serif",
        showCommentBox: '',
        cardm: cards.length,
        isactive: true,
        liked: '0',
        disliked: '1',
        userId: user.uid,
        date: new Date(),
      }]);

      const userRef = app1515.database().ref(`commentpost/${id}`);
      userRef.set({
        id: id,
        ip: ip,
        message: cardmessage.trim(),
        profile: props.profileuser,
        username: props.user,
        font: "sans-serif",
        showCommentBox: '',
        cardm: cards.length,
        isactive: true,
        liked: '0',
        disliked: '1',
        userId: user.uid,
        date: new Date(),
      });
    }
  } catch (error) {
    console.log(error);
 
  } finally {
    setCardMessage('');
   
  }
}
}

                                                        //handle commenting end construction

const [showreply, setShowReply] = useState(true)

const [replied, setReplied] = useState([]);

const [cardreply, setCardreply] = useState('0');

const [replyHid, setReplyHid] = useState(false) 

const [visible, setVisible] = useState(false);

function testit(){
  props.handleCommen()
  setVisible(false)
}


  const [position, setPosition] = useState('center');
  const footerContent = (
      <div>
          <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text pi-text-help" />
          <Button className="p-button-warning" severity="warning" label="YEP!" icon="pi pi-check" onClick={testit} autoFocus />
      </div>
  );

  const show = (position) => {
      setPosition(position);
      setVisible(true);
  };



  const [visib, setVisib] = useState(false);

  function testdelete(id){
    props.handleDismiss(id)
    setVisible(false)


    
  }

  async function handleDeletereply(id)  {


    try {
      const commentRef = app1515.database().ref("Replies/replied");
      const snapshot = await commentRef.orderByChild("ip").equalTo(id).once("value");
      snapshot.forEach((childSnapshot) => {
        // Check if the child has a matching ID and delete it if it does
        if (childSnapshot.val().ip === id) {
          commentRef.child(childSnapshot.key).remove();
        }
      });
  
    } catch(error){
      console.log(error)
    }
  
     
  }

  
  async function handleDelete(id)  {

    handleDeletereply(id)
    try {
      const commentRef = app1515.database().ref("commentpost");
      const snapshot = await commentRef.orderByChild("id").equalTo(id).once("value");
      snapshot.forEach((childSnapshot) => {
        // Check if the child has a matching ID and delete it if it does
        if (childSnapshot.val().id === id) {
          commentRef.child(childSnapshot.key).remove();
        }
      });
      
    } catch(error){
      console.log(error)
    }
  
    
  }
  


    const [positio, setPositio] = useState('center');
    const footerConten = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisib(false)} className="p-button-text pi-text-help" />
            <Button style={{background:"red"}} className="p-button-error" severity="error" label="confirm" icon="pi pi-check" onClick={() => testdelete(props.ids)} autoFocus />
        </div>
    );

    const sho = (positio) => {
        setPositio(position);
        setVisib(true);
    };
 
  



const [howm, sethowm] = useState([]);

function handleClear() {
toast.current.value = "";
}






const [ val, setval] = useState(true)
const handleReplyHid = (d) => {

  setCards((prevCards) =>
  prevCards.map((card) =>
    card.id === d ? { ...card, isactive: !card.isactive  } : card
  
  
    )

);




cards.map((card) =>
card.id === d && card.isactive ? setval(false)  : card.id === d && !card.isactive ? setval(true)
: true

)





 
}




const handleDismiss = (id) => {
  setReplied((cards) => cards.filter((card) => card.id !== id));
  setCardreply((editing) => {
    const { [id]: _, ...rest } = cardreply;
    return rest;
  });
};


                                                    //  reply coment construction start props.setAllData

async function  handleReply(d) {

const ids = nanoid();

    if( cards.some((card) => card.id === d)){
      
    setReplied((cards) => [
        ...cards,
      {
        ip: d,
        id: ids,
        message: "",
        font: "sans-serif",
        showCommentBox: "",
        isactive: true,
        leng:"i",
        likes: null,
        profile: props.profileuser, // Add new property for profile 
        username: props.user,
        userId: user.uid,
        date: new Date(),
      },
      ]);
     
     
      
     
  setCards((prevCards) =>
    prevCards.map((card) =>
      card.id === d ? { ...card, isactive: true  } : card
    )
  );


    }else{

    }
  
   
      


 


};





    /*

     useEffect(() => {

  app5.database()
    .ref("Replies")
    .once("value")
    .then((snapshot) => {
    const Replies = snapshot.val();
    if(Replies && Replies.replied){
    const cardArray = Object.values(Replies.replied);
        setReplied(cardArray);
          console.log('are these Replies ',cardArray)
  const editingObject = Object.fromEntries(cardArray.map((card) => [card.id, true]));
     setCardreply(editingObject);
}

  


})



console.log('are these Replies ', cards)

}, [user]);
  

*/




async function handlePost(id) {
const nano = nanoid();
setCardreply((cardreply) => ({ ...cardreply, [id]: true }));
handleClear();

try {
  const snapshot = await app1515
    .database()
    .ref(`Replies/`)
    .orderByChild("ip")
    .equalTo(id)
    .once("value");
    
  if (snapshot.exists()) {
    await app1515
      .database()
      .ref(`Replies/`)
      .update({
       replied, 
      });
  } else {
    const Replies = app1515.database().ref(`Replies/`);
    Replies.set({
       replied,
    });
  }
} catch (error) {
  console.log(error);
}
 
validated()
}

/*



*/

                           /* Limit height of Box item */



                               /*end of Limiting Box size */



useEffect(() => {
  if (user) {
    const commentsRef = app1515.database().ref(`Replies/`);
    const commentsListener = commentsRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const commentsArray = Object.values(snapshot.val().replied);
        const editingObject = commentsArray.reduce((acc, card) => {
          acc[card.id] = true;
          return acc;
        }, {});
        setCardreply(editingObject);
        setReplied(commentsArray);
      }
    });

    // Return a cleanup function to remove the listener when the component unmounts or when the `user` state changes.
    return () => commentsRef.off('value', commentsListener);
  }
}, [user]);
//end reply construct

// dismiss comment Construct start

const handlePostExit = (ip, id) => {


  setReplied((cards) => cards.filter((card) => card.id !== id));


};



//dismised End

// Thumbs Start Construct 

const [selectedThumb, setSelectedThumb] = useState(null);





const items = [
  { 
      label: 'Add',
      icon: 'pi pi-pencil',
      size: 'sm',
      buttonClassName: "p-button-warning bold border-non  w-2rem h-2rem p-button-outlined sm m- p-button-rounded p-mt-2 p-0",
      command: () => {
        //  toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        
        show('top-left')
      }
  },

  {

    label: 'Delete',
    icon: 'pi pi-trash',
    size: 'sm',
    color: 'danger',
    style: { backgroundColor: 'red', color: 'white' },
    className: 'my-danger-class',
      command: () =>  {
         // toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
         sho('top')
      }
  },
  {
      label: 'Share',
      icon: 'pi pi-external-link',
      size: 'sm',

      command: () => {
          props.snoop()
      }
  }
];




const List = [
  {
    label: 'share',
    icon: 'pi pi-external-link',
    size: 'sm',

    command: () => {
        props.snoop()
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
        }  }
];

//Thumbs Construct end

//construct Adjusting the textarea based in the values entered 
const [rows, setRows] = useState(2);

function handleChange(event) {
const textareaLineHeight = 24; // 
const previousRows = event.target.rows;
event.target.rows = 2; // reset the number of rows to 1
const currentRows = Math.ceil((event.target.scrollHeight - textareaLineHeight) / textareaLineHeight);
if (currentRows === previousRows) {
  event.target.rows = currentRows;
} else {
  event.target.rows = currentRows;
  setRows(currentRows);
}

setCardMessage(event.target.value)




}

const [numDislikedCardRates, setNumDislikedCardRates] = useState(0);


const Handlecancel = () =>{
handleClear()

props.handlecancel();



}


const [rowe, setRowe] = useState(2);


const handleEdit = (id, event) => {
 


  const textareaLineHeight = 24; // adjust this value based on   font-size
  const previousRows = event.target.rows;
  event.target.rows = 2; // reset the number of rows to 1
  const currentRows = Math.ceil((event.target.scrollHeight - textareaLineHeight) / textareaLineHeight);
  if (currentRows === previousRows) {
    event.target.rows = currentRows;
  } else {
    event.target.rows = currentRows;
    setRows(currentRows);
  }

  setReplied((replied) =>
  replied.map((card) =>
      card.id === id ? { ...card, message: event.target.value} : card
    )

  );

};



const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
  setIsOpen(!isOpen);
};





  

  const [rateClick, setRatesClick] = useState([]);

  useEffect(() => {

    const ratingsRef = app1515.database().ref('Reply');
  
    // Listen for changes to the user's rating data
    const listener = ratingsRef.on('value', (snapshot) => {
      const data = snapshot.val();
  
      if (!data) {
        setRatesClick([]);
        return;
      }
  
      const ratings = Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
      }));
  
      setRatesClick(ratings);
    });
  
    // Clean up the listener when the component unmounts
    return () => ratingsRef.off('value', listener);
  }, [user]);
  
  
  


  // Function to handle the user's dislike action
  async function handleDislikeClick(id) {
    
    if (!props.user) {
      return; // User is not logged in, do nothing
    }
  
    const cardId = `card-${id}-${props.user}`;  
    setRatesClick((prevRates) => {
      const updatedRates = prevRates.map((rate) => {
        if (rate.cardId === cardId ) {
          return {
            ...rate,
            disliked: true,
            userId: user.uid,
            liked: false,
          };
        }
        return rate;
      });
  
      // If the user hasn't rated this card before, add a new entry
      if (!updatedRates.some((rate) => rate.cardId === cardId && rate.user === props.user)) {
        updatedRates.push({
          cardId,
          user: props.user,
          liked: false,
          disliked: true,
          ip: id,
          date: new Date(),
          userId: user.uid,

        });
      }
  
      return updatedRates;
    });
  
    try {
      const snapshot = await app1515.database()
        .ref('Reply')
        .orderByChild('cardId')
        .equalTo(cardId)
        .once('value');
  
      if (snapshot.exists()) {
        const ratingKey = Object.keys(snapshot.val())[0]; // assuming there's only one matching rating
        const rating = snapshot.val()[ratingKey];
        await app1515.database().ref(`Reply/${ratingKey}`).update({
          disliked: !rating.disliked,
          liked: false,
        });
      } else {
        const userRef = app1515.database().ref('Reply');
        await userRef.push({
          cardId,
          user: props.user,
          liked: false,
          disliked: true,
         ip: id,
         userId: user.uid,
         date: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  }
  
  
  // Function to handle the user's like action
  async function  handleLikeClick(id) {
    if (!props.user) {
      return; // User is not logged in, do nothing
    }
  
    const cardId = `card-${id}-${props.user}`;  
  
    // Update the local state
    setRatesClick((prevRates) => {
      const updatedRates = prevRates.map((rate) => {
        if (rate.cardId === cardId) {
          return {
            ...rate,
            liked: true,
            userId: user.uid,
            disliked: false,
          };
        }
        return rate;
      });
  
      // If the user hasn't rated this card before, add a new entry
      if (!updatedRates.some((rate) => rate.cardId === cardId && rate.user === props.user)) {
        updatedRates.push({
          cardId,
          user: props.user,
          liked: true,
          disliked: false,
          ip: id,
          userId: user.uid,
          date: new Date()
        });
      }
  
      return updatedRates;
    });
  
    try {
      const snapshot = await app1515.database()
        .ref('Reply')
        .orderByChild('cardId')
        .equalTo(cardId)
        .once('value');
  
      if (snapshot.exists()) {
        const ratingKey = Object.keys(snapshot.val())[0]; // assuming there's only one matching rating
        const rating = snapshot.val()[ratingKey];
        await app1515.database().ref(`Reply/${ratingKey}`).update({
          liked: !rating.liked,
          disliked: false,
        });
      } else {
        const userRef = app1515.database().ref('Reply');
        await userRef.push({
          cardId,
          user: props.user,
          liked: true,
          disliked: false,
          ip: id,
          userId: user.uid,
          date: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  }

  
   



const [htmlString, setHtmlString] = useState("");




const handleImageOrVideos = (url) => {
  const fileExtension = url.split('.').pop().toLowerCase();

  if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'gif'  || fileExtension === 'img') {
    // If the URL is pointing to an image
    return `<div class="card flex w-50 justify-content-center"><Image class="sized"   src="${url}" zoomSrc="${url}" alt="Image" class="resizedImages" width="250"  preview /></div>`;
  } else if (fileExtension === 'mp4') {
    // If the URL is pointing to a video
    return `<video src="${url}" controls>Your browser does not support the video tag.</video>`;
  } else if (fileExtension === 'mp3') {
    // If the URL is pointing to an audio file
    return `<audio src="${url}" controls>Your browser does not support the audio tag.</audio>`;
  } else {
    // If the URL is not pointing to an image, video, or audio file, check if it's a YouTube link
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([\w-]{11})(\S+)?$/; 
    const match = url.match(youtubeRegex);
    if (match) {
      // If the URL is a YouTube link, extract the video id
      const videoId = match[5];
      return `<div className="Fit" style="position: relative; padding-bottom: 56.25%; height: 300px, width: 300px"><iframe src="https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1" title="YouTube video player" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    } else {
      // If the URL is not pointing to an image, video, or YouTube link, return the URL
      return url;
    }
  }
};

// const words = newMessage.split(' ');
const generateMarkup = () => {
  const words = htmlString.split(' ');
  const elements = [];

  words.forEach((word, index) => {
    if (word.startsWith('http') || word.startsWith('https')) {
      const element = handleImageOrVideos(word) || (
        <a href={word} target="_blank" rel="noopener noreferrer">
          {word}
        </a>
      );
      elements.push(element);
    } else if (word.startsWith("data:image/")) {
      // If the word is a base64-encoded image data URL, create an <img> tag
      elements.push(`<div class="card flex justify-content-center"><Image className="sized" src="${word}" zoomSrc="${word}" alt="Image" class="resizedImages" width="250" preview /></div>`);
    } 
  });

  return elements.join('');
};

const resized = () => {
  const htmlStrin = generateMarkup();

  const regex = /<pre [^>]*>/g;
  const matches = htmlStrin.match(regex) || [];
 
  let modifiedHtmlString = htmlStrin ;
  for (const match of matches) {
    const newTag = `<pre class="d-block w-40" id="resized" > ${match} </pre>`;
     modifiedHtmlString = modifiedHtmlString.replace(match, newTag)
  }

  return modifiedHtmlString;
};



const [zoom, setzoom] = useState(false)


const [edrefs, setedref] = useState(true);


const edref = useRef(null) 
const setFullSizeImage = props.setFullSizeImage;
const fullSizeImage = props.fullSizeImage;






const editRef = useRef(null);

const [useref, setuseRef] = useState(true);

const [cas, setCas] = useState(true)


useEffect(() => {

 
  function handleHeightChange() {
if(cas){

    if(editRef.current){
      const editHeight = editRef.current.getBoundingClientRect().height;
          if (editHeight >= 120) {
            editRef.current.style.height = "60vh";
            edref.current.style.display = "flex";
          } else {
            editRef.current.style.height = "fit-content";
            edref.current.style.display = "none";
          }
    
       
      
    
      }
      }
}
  // Monitor changes to the editRef element's height
  const observer = new ResizeObserver(handleHeightChange);
  
  if (editRef.current) {
    observer.observe(editRef.current);
  }

  // Cleanup the observer when component unmounts
  return () => {
    if (editRef.current) {
      observer.unobserve(editRef.current);
    }

  };
}, [cas]);








useEffect(() => {

  const images = document.querySelectorAll(".resized-imaged");
  images.forEach(image => {
    image.addEventListener("click", handleImageClick);
    return () => {
      image.removeEventListener("click", handleImageClick);
    };
  });
}, []);




const debouncedHandleChange = debounce((event) => {
  handleEd(event);

}, 300);


const edits = (id) => {


  edited(id);
  
  debouncedHandleChange(id);


};

function handleEd(id) {
 
  setCas(false)
  if (editRef.current  && id === editRef.current.id) {
    
    editRef.current.style.height = '100%';

  


  }
}



function edited(id) {

 
  setCas(false)

  if (editRef.current && id === editRef.current.id) {
   

    editRef.current.style.height = '100%';
    setedref(false);
  


  }

}



function handleImageClick(event) {

  if(useref === true){

  const clickedEl = event.target;


  if (clickedEl.tagName === "IMG") {
    // Do something with the clicked image

    setFullSizeImage(clickedEl.src)



}
  }


}




function resizeImage() {
  const htmlStrin =  generateMarkup();
  const regex = /<img [^>]*>/g;
const reg = /<pre [^>]*>/g;
  const matches = htmlStrin.match(regex) || [];
  let modifiedHtmlString = htmlString;
  for (const match of matches) {
    const widthRegex = /width="(\d+)"/;
    const heightRegex = /height="(\d+)"/;
    const srcRegex = /src="([^"]+)"/; // add regex to extracregex to extractt src attribute

    const widthMatch = match.match(widthRegex);
    const heightMatch = match.match(heightRegex);
    const srcMatch = match.match(srcRegex); // match src attribute

    const width = widthMatch ? parseInt(widthMatch[1]) : undefined;
    const height = heightMatch ? parseInt(heightMatch[1]) : undefined;
    const newWidth = width ? Math.floor(width / 2) : undefined;
    const newHeight = height ? Math.floor(height / 2) : undefined;
    const widthAttr = newWidth ? ` width="${newWidth}"` : "";
    const heightAttr = newHeight ? ` height="${newHeight}"` : "";
    const src = srcMatch ? srcMatch[1] : ''; // extract the src value from the match
    const newTag = `<Image src="${src}" id="resizedImages" style="width:100%; max-width:300px" class="resizedImages p-image-preview p-image-mask" width="250" preview  />`;
const ma = htmlStrin.match(reg);

    modifiedHtmlString = modifiedHtmlString.replace( 
      match,
      `<div class=" mt-5 p-image-preview-container card flex justify-content-center imagewraper d-flex-column">${newTag}</div>`
    );
  }
  return modifiedHtmlString;
}

const ifZomed ={
  position : zoom && "absolute",
  top: zoom && "0",
  left: zoom && "0",
  right:  zoom &&"0",

  bottom: zoom && "0",
zIndex: zoom && "50",
backgroundColor:  zoom && "rgba(0,0,0,0.11)"
}




/*

useEffect(() => {
  if (user) {
    try {
      const RateRef = app5.database().ref(`Ratings/`);
  
      RateRef.on('value', (snapshot) => {
        const ratesnapshot = snapshot.val();
        if (ratesnapshot) {
          const RateArray = Object.values(ratesnapshot);
          setRate(RateArray);
        } else {
          setRate(null);
        }
      });
      
      return () => {
        RateRef.off('value');
      };
    } catch (error) {
      console.error('Error setting up Firebase listener:', error);
    }
  } else {
    setRate(null);
  }
}, [user]);
*/

useEffect(() => {
if (user) {
  const commentsRef = app1515.database().ref(`commentpost/`);
  commentsRef.on('value', (snapshot) => {

    if(!snapshot.val()){
      return;
    }
  
    const commentsArray =    Object.values(snapshot.val());
    setCards(commentsArray);
  });

  // cleanup function to remove the listener when the component unmounts
  return () => commentsRef.off('value');
}
}, [user]);



           
 
    


useEffect(() => {
  if (props.posted && typeof props.posted !== "object") {


    const resizedHtmlString = resizeImages(props.posted);
    setHtmlString(resizedHtmlString);
  
  }else if(props.posted && typeof props.posted === "object"){
  
    setHtmlString( `<div>

    <h6> From News Content</h6>
    <h5>${props.posted.title}</h5>
      <img src=${props.posted.images[3] ? props.posted.images[3] : noImg} />
     
      <p>${props.posted.paragraphs}</p>
    </div>`)
  

  }

}, [props.posted]);



const [htmlCopied, setHtmlCopied] = useState("");




useEffect(() => {
  if (props.copied && typeof props.copied[0].message !== "object") {

    const resizedHtmlString = resizeImages(props.copied[0].message);
    setHtmlCopied(resizedHtmlString);
  }else if(props.copied && typeof props.copied[0].message === "object") {
    setHtmlCopied(`<div class="bggray">
   
      <img class="bgimg" src=${props.copied[0].message.images[3] ? props.copied[0].message.images[3]  : noImg} />
      <h1 class="bgh1">${props.copied[0].message.title}</h1>
      <p class="bgp">${props.copied[0].message.paragraphs}</p>
    </div>`);
  
}
}, [props.copied]);



                                      //show the user there upvotes
/*

useEffect(() => {
  if (!props.user) {
    setRates([]);
    return;
  }

  const ratingsRef = app5.database().ref('Ratings');

  // Listen for changes to the user's rating data
  const listener = ratingsRef.orderByChild('user').equalTo(props.user).on('value', (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      setRates([]);
      return;
    }

    const ratings = Object.entries(data).map(([key, value]) => ({
      ...value,
      id: key,
    }));

    setRates(ratings);
  });

  // Clean up the listener when the component unmounts
  return () => ratingsRef.off('value', listener);
}, [props.user]);


////the Top
useEffect(() => {
  if (user) {
    try {
      const RateRef = app5.database().ref(`Ratings/`);
  
      RateRef.on('value', (snapshot) => {
        const ratesnapshot = snapshot.val();
        if (ratesnapshot) {
          const rateObj = {};
          Object.keys(ratesnapshot).forEach((key) => {
            const rate = ratesnapshot[key];
            const cardId = rate.ip;
            if (!rateObj[cardId]) {
              rateObj[cardId] = [];
            }
            rateObj[cardId].push(rate);
          });
          setRate(rateObj);
        } else {
          setRate({});
        }
      });
      
      return () => {
        RateRef.off('value');
      };
    } catch (error) {
      console.error('Error setting up Firebase listener:', error);
    }
  } else {
    setRate({});
  }
}, [user]);
*/
                                                     //end of user upvotes show

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
           
                                                    
const copied = props.copied;

const used = props.user;




const location = useLocation();
let isBlogActive;

if (location.pathname.startsWith('/profileComponents/Myprofile')) {
  isBlogActive = true;
} else {
  isBlogActive = false;
}


return (
  
  <section className={` zIndex-2 ${props.dark &&  "darke"}`} style={{height: "fit-content", width:'' }}>
                                     {/* PAge splits  */}

{  <div style={{width:  display === true ? "80%"  : " ",  margin:  display === true ?"auto" :""}}> 
        

        <Toast ref={toast} />
{!props.shared && 
  <div className={`py-1 `} >
    <Row style={{background: "transparent", width:"100%", margin:"auto"}} className="justify-content-center  ">
      <div style={{width:"100%"}} md="12" lg="10" xl="10" className=" w-100 p-0 " >
        <Card id="wsmall" className={ `"p-0   carded  " ${props.dark ? "bb" : "pp"}`}  style={{  color: props.dark ? "silver" : "black", background: props.dark ? "#141515"  :  "white", width:"100%", padding: "0", marginLeft:"25%" , margin:"auto"}}>
          <Card.Body style={{ boxShadow: !props.dark && "4px 4px 8px -2px rgba(242,242,242,0.53)", webkitBoxShadow: !props.dark && '4px 4px 8px -2px rgba(242,242,242,0.53)'}} className=" p-0">
          <Card.Body>
      { props.user === username ?
          <SpeedDial showIcon=" pi pi-ellipsis-h"   hideIcon="pi pi-times"  outlined  buttonClassName={` p-button-warning bold border-non p-button-outlined    sm   p-mt-2 p-0 p-2`} model={items}  visible={isOpen}
    onShow={handleToggle}
    onHide={handleToggle} direction="down" style={{ padding: "2px",paddingLeft:"4px",  zIndex: "3",position: "absolute", top: "0", left: "0",  color: "black", fontWeight:"bold"}} />

    :

  <SpeedDial showIcon=" pi pi-ellipsis-h"   hideIcon="pi pi-times" outlined  buttonClassName= {`   p-button-success bold border-non  w-2rem h-2rem p-button-outlined sm   p-mt-1   p-2  '`} model={List}  visible={isOpen}
    onShow={handleToggle}
    onHide={handleToggle} direction="down" style={{padding: "2px",paddingLeft:"4px", zIndex: "3",position: "absolute", top: "0", left: "0",   color: "black", fontWeight:"bold"}} />
        }
   <div className="card"> 

<Dialog header="Please Confrim" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
            <p className="m-0">
Are you sure you want to Edit your post!
            </p>
        </Dialog>



<Dialog header="Please Confrim" visible={visib} position={positio} style={{ width: '50vw' }} onHide={() => setVisib(false)} footer={footerConten} draggable={false} resizable={false}>
            <p style={{fontSize: "1.4rem"}} className="m-0 ">
Are you sure you want to delete Your post ?
            </p>

        </Dialog>


</div>

{/* <Button label="Top" icon="pi pi-arrow-down" onClick={() => show('top')} className="p-button-warning" style={{ minWidth: '10rem' }} />
<Button label="TopRight" icon="pi pi-arrow-down-left" onClick={() => show('top-right')} className="p-button-warning" style={{ minWidth: '10rem' }} /> */}

            <div  style={{marginBottom: "-30px"}}className="d-flex flex-start align-items-center ">
            <Link to={props.username === props.user ? `/Profile/P` :
             props.username ?`/Profile/Pr?iBla6=${props.userId}` : ""}>  

            <Card.Img
                className="rounded-circle shadow-1-strong me-3  imgs"
                src={props.profileImg}
                style={{width: "50px", height: "50px"}}
                alt={props.username}
                width="60"
                height="60"
              /></Link>
              <div>
              <Link to={ props.username === props.user ? `/Profile/P` : props.username ?  `/Profile/Pr?iBla6=${props.userId}` : ""}>  
               <h5  className="fw-bold fsize  mb-1 ml-2" style={{color:  props.dark ? "silver" : "black"}}>{props.username ? props.username : "Deleted User"}</h5></Link>
                <p className="text-muted small mb-0 ml-2">
                 {/* posted on */} {props.datePosted}
                </p>
              </div>
              </div> 
              </Card.Body>
              
<div  className="w-auto p-0 " style={{color: props.dark ? "white" : "black", marginLeft: "auto", marginRight: "auto", padding:"0px", width:"100%"}} >




<div onClick={ () =>   edited(props.ids)}   ref={editRef}  className={`ppp ${props.dark && "ppr"}`}   id={props.ids} style={{position:"relative",  background: "transparent",  cursor:"pointer", overflow:"hidden",  boxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)", webkitBoxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)",
moZboxShadow: "inset 0px -28px 17px 1px rgba(0,0,0,0.19)", marginLeft:"90px", marginRight:" 50px"}}  >
{ReactHtmlParser(resizeImage(), { decodeEntities: false, })}
            </div>
        { edrefs &&  <div id={props.ids}  ref={edref}
   onClick={ () =>   edits(props.ids)}  
         style={{height:"fit-content",display:"flex", flexDirection:"column", cursor:"pointer", background: "rgba(0,0,0,0.19)", color:"purple", fontSize:"1rem"}}>
        <FontAwesomeIcon fa-fade style={{color:"orange"}}  className="bounce-fadeds" icon={faChevronDown }/>   <span style={{textAlign:"center", fontSize:"0.80rem"}}>Show More</span> </div> }
     

<p className="text-dark">{copied && copied.user}</p>
{props.copied && props.copied.length > 0 &&
<div style={{width: "100%", background: props.dark &&  "#141515"} } >
       
     <div style={{alignItems:"center", width: "50%", margin: "auto",  background: props.dark ?  "#141515" : 'rgba(0,0,0,0.11)'}}>
            <p style={{textAlign : "center", color: "green", fontWeight:"bold", fontFamily:"cursive", background: "black"}}>reposted content</p>
             <div style={{display: "flex"}}>
             <Link to={`/Profile/Pr?iBla6=${props.copied[0].userId}`}>     <Card.Img
                className="rounded-circle shadow-1-strong me-3"
                src={copied[0].profile}
                alt={copied[0].user}
                width="60"
                height="60"
              /></Link>
              <div style={{display: ""}}>
              <Link to={`/Profile/Pr?iBla6=${props.copied[0].userId}`}>  <h5  className="fw-bold text-dark  mb-1">{copied[0].user}</h5></Link>
                <p className="text-muted small ml-1 pl-1 mb-0">
                 {/* posted on */} { formatDate(copied[0].datePosted)}
                </p>



                </div>
               
              </div>
             
            
<div className={`w-auto ppp p-0  ${props.dark && "darke"}`}  style={{  color: props.dark ? "white" : "black", marginLeft: "auto", marginRight: "auto", padding:"0px", width:"200%"}} >


            {ReactHtmlParser(htmlCopied) }

</div>   

</div>
</div>           
}  

</div>              
            

           
<Card.Body style={{background: props.dark && ""}} className={` ${props.dark && "#141515" } px-1 `} >
            <div className="small d-flex justify-content-start w-100  mx-0 ">

             
                <div className="thumbs-container p-grid mt-2 pt-1">
  <div style={{zIndex: isOpen ?  "1" : "3"}} className="thumb p-col-6 px-1  ">
  <Button
onClick={() => handleLike(props.ids)} 
style={{  background:props.dark ?  "#141515": "white",
 backgroundColor: props.dark ? "#141515": "white",border:"none", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',color: props.dark ? "silver" :   "gray" }}
className={`${   rates &&  Array.isArray(rates) &&  
    rates.some((c) => 
     c.ip === props.ids && c.liked === true ) ? "selected" :
      '', props.dark &&  "darken"  }`}

>
<i className="fot pi pi-thumbs-up p-overlay-badge" 
style={{ textShadow:"none", fontSize: Array.isArray(rates) &&
Rate.id && Rate[props.ids].some((c) => c.disliked) && "1.4rem" }}>

  <Badge  style={{background: "transparent", color: "green"}}
   className="badged pl-2" severity="s" value={ rates &&  Array.isArray(rates) && 
      rates.some((c) =>  c.ip === props.ids && c.liked === true ) && rates.filter((rate) => rate.ip === props.ids).filter((rate) => rate.liked === true).length
}></Badge>
</i>
</Button>

  </div>

  <div className="thumb p-col-6 p-3 mx-0 ">

  <Button
onClick={() => 
      handleDislike(props.ids)
     }   style={{background : props.dark ? "#141515": "white", backgroundColor: props.dark ?  "#141515" : "white",border:"none", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' , color:props.dark ? "silver" : "gray"}}

className={`${rates &&  Array.isArray(rates) &&  
rates.some((c) => 
c.ip === props.ids && c.disliked === true ) ? "selectedr" : 
"" , props.dark &&  "darken"}`}>
<i className=" fot pi pi-thumbs-down p-overlay-badge" style={{ textShadow:"none", fontSize: Array.isArray(Rate) && Rate.id && Rate[props.ids].some((c) => c.disliked) && "1.4rem",  }}>
<Badge style={{background: "transparent", color: "red"}} 
className="badged pl-2" severity="s" value={ rates &&  Array.isArray(rates) &&   rates.some((c) =>  c.ip === props.ids && c.disliked === true ) && rates.filter((rate) => rate.ip === props.ids).filter((rate) => rate.disliked === true).length}></Badge>
</i>
</Button>


  </div>
</div>

            {!props.showCommentBox ? 
 <div onClick={props.handleComment} className="card" style={{background: props.dark ? "#141515"  :  "white"}}>


            <button style={{background: props.dark ? "#141515"  :  "white",  marginTop: " 2.0rem", border:"none", boxShadow:"1px 2px 2px 1px rgba(0,0,0,0.11)", textShadow:props.dark && " none", color:  "#868686"}} className="d-flex align-items-center me-3  ">
                                      <FaComment  style={{color:"#868686"}}/>
                                      <p className="mb-0">Comment <span> ({ Array.isArray(cards) &&  cards.filter((card) => card.ip === props.ids).length })</span></p>
                                    </button>



        </div>
          


           :
           <div  onClick={Handlecancel} className="card" style={{background: props.dark ? "#141515"  :  "white"}}>



            <button style={{ textShadow:props.dark && " none",marginTop: " 2.0rem", border:"none",color:  "#868686" , background: props.dark ? "#141515"  :  "white"}} className="d-flex align-items-center me-3 ">
                                      <FaComment style={{color:"#868686"}}/>
                                      <p className="mb-0">Close <span>   ({ Array.isArray(cards)  && cards.filter((card) => card.ip === props.ids).length })</span></p>
                                    </button>

        </div>
          }

            </div>
            
            </Card.Body>
       

          </Card.Body>
         

          {props.showCommentBox &&
<Card.Footer
className="py-3 border-0"
style={{ backgroundColor: props.dark ? "#141515" : "#f8f9fa" }}
>
<div className="d-flex flex-start w-100">
<Link to={`/Profile/Profiles?id=${props.userId}`}> 
<Card.Img 
    className="rounded-circle shadow-1-strong me-3 mr-1"
    src={props.profileImg}
    alt={props.username}
    width="40"
    height="40"
    style={{marginLeft: "-4px"}}
  />
        </Link>
  {/*
  <MDBTextArea 
label='Message' 
id='textAreaExample' 
minRows={2} 
style={{backgroundColor: '#fff', width: '200px'}} 
wrapperClass="w-100" 
className="textarea"

(e) => setCardMessage(e.target.value)
/>

  */}

<div className="textarea-wrapper">
<textarea
  onChange={handleChange}
  placeholder="add Comment.."
  style={{ height: rows * 24 + 'px' , padding: "10px", borderRadius: "20px", border: "1px solid grey"}} // adjust this value based on your font-
  className="w-100"
  id="area"
  ref={toast} 
  value={cardmessage }
/>
</div>

           </div>
<div className="float-end mt-2 pt-1">
  <Button  style={{borderRadius: "15px", background: "black"}} size="sm" className="me-1  sizeis " onClick={() => handleClick(props.ids)}>post</Button>

       </div>
</Card.Footer>


          }


{props.showCommentBox &&
<section  style={{ height:'fit-content',zIndex:'1', marginBottom:"",  }} className="gradient-custom   mb-3 zIndex-3 h-100 " >
<div className="py-5" style={{ maxWidth: "1000px", background: props.dark && "#141515" }}>
 <Row className="justify-content-center">
   <div className="col" md="12" lg="10" xl="8">
     <Card >
       <Card.Body className="p-2 m-0 " style={{background: props.dark && "#141515"}} >
     {    <p tag="h4" className="text-center mb-4 pb-2">
           comments {replied && replied.message}
         </p> }
         
         {Array.isArray(cards) && cards && cards.slice().reverse().map((card) => (
          card.ip === props.ids &&
         <Row style={{width: "100%", justifyContent:" center"}} key={card.id}>
           <div>
            <div className=" d-flex flex-start" >
             <Link to={`/Profile/Pr?iBla6=${card.userId}`}>  
               <Card.Img
                 className="rounded-circle shadow-1-strong me-3 "
                 src={card.profile}
                 alt="card.user"
                 width="55"
                 height="55"
       /> </Link>

               <div className="flex-grow-1 flex-shrink-1">
                 <div>
                   <div className="d-flex  justify-content-between align-items-cente">
                   <Link to={`/Profile/Pr?iBla6=${card.userId}`}> <p className="mb-1">
                        <span className="small"  style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }} ><p>{card.username} {" "} <i>-{formatDate(card.date)}</i> </p>  </span>
                     </p></Link>
                    

    {props.user &&
    <SpeedDial showIcon="pi pi-ellipsis-h" hideIcon="pi pi-times"  outlined size="sm" buttonClassName={ `${card.username === props.user ? "p-button-warning" :  props.username ? "p-button-secondary" :  "p-button-success"  }  bold border-non  w-2rem h-2rem p-button-outlined sm m- p-button-rounded p-mt-4 mt-5 p-0 mr-5`} model={
      card.username === props.user ? [


       {  
        label: 'delete',
        icon: 'pi pi-trash',
        size: 'sm',
    
        command: () => {
       handleDelete(card.id)
        }
    }
      
  
      ] :
      
      
     props.user === props.username ?
     [ {  
        label: 'delete',
        icon: 'pi pi-trash',
        size: 'sm',
    
        command: () => {
       handleDelete(card.id)
        }
    },
    {

      label: 'Report',
      icon: 'pi pi-exclamation-triangle',
      size: 'sm',
      command: () =>  {
         // toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        
      }
           } 
  
     ]


      :

      props.user === props.username && card.username ===  props.username ?
      [ {  
        label: 'delete',
        icon: 'pi pi-trash',
        size: 'sm',
    
        command: () => {
       handleDelete(card.id)
        }
    }]
     
      :
card.username !== props.user && props.username !== props.user &&

      [ {

        label: 'Report',
        icon: 'pi pi-exclamation-triangle',
        size: 'sm',
        command: () =>  {
           // toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
         alert("reported")
        }
             } ]} 
    onShow={handleToggle}
    onHide={handleToggle}  direction="down" style={{ zIndex: "3",position: "absolute", top: "0", right: "-30px",  border: "none", color: "black", fontWeight:"bold"}} />
            }
                   <div className="d-flex align-items-center mb-1">
                
                   
                 </div>
                </div>
              <div className="ppp" style={{marginBottom: "-10px", margin: "auto", paddingBottom:"0" }}  >
<p style={{ fontSize: "1rem", fontFamily: "monospace"}} className=" break small bold italic mb-0 break-word ">
                   {ReactHtmlParser(card.message)}
                   </p>

              </div>
              
              



                       <div className="thumbs-container p-grid"  style={{marginLeft: "-40px"}}>
  <div className="thumb p-col-6 pr-2">
  <Button
onClick={() => handleLikeClick(card.id)} style={{ paddingTop: "5px" , paddingBottom: "5px",background : props.dark ? "#141515" : "white", backgroundColor: props.dark ? "#141515" : "white",border:"none", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',color: props.dark ?"silver" : "gray" }}
className={`'fot '  ${rateClick &&  Array.isArray(rateClick) &&
  rateClick.some((c) => 
     c.ip === card.id && c.liked === true ) ? "selected" :
      '' }`}

>
<i className="pi pi-thumbs-up p-overlay-badge" 
style={{ fontSize: Array.isArray(rateClick) &&
rateClick.id && rateClick[card.id].some((c) => c.disliked) && "1.4rem" }}>

  <Badge style={{background: "transparent", color: "green"}}
   className="badged pl-2" severity="s" value={ rateClick &&  Array.isArray(rateClick) && 
    rateClick.some((c) =>  c.ip === card.id && c.liked === true ) && rateClick.filter((rateClick) => rateClick.ip === card.ip).filter((rateClick) => rateClick.liked === true).length
}></Badge>
</i>
</Button>


  </div>

  <div className="thumb p-col-6 p-3 ">
  <Button
onClick={() => 
      handleDislikeClick(card.id)
    
  }
className={`'fot' ${ rateClick &&  Array.isArray(rateClick) &&   rateClick.some((c) =>  c.ip === card.id && c.disliked === true ) ? "selectedr" : '' }`}
style={{paddingTop: "5px" , paddingBottom: "5px", background: props.dark ? "#141515" : "white", backgroundColor: props.dark ? "#141515" : "white",border:"none", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' , color: props.dark ? "silver" : "gray"}}>
<i className="pi pi-thumbs-down p-overlay-badge" style={{ fontSize: Array.isArray(rateClick) && rateClick.id && rateClick[card.id].some((c) => c.disliked) && "1.4rem" }}>
  <Badge style={{background: "transparent", color: "red"}} className="badged pl-2" severity="s" value={ rateClick &&  Array.isArray(rateClick) &&   rateClick.some((c) =>  c.ip === card.id && c.disliked === true ) && rateClick.filter((rateClick) => rateClick.ip === card.id).filter((rateClick) => rateClick.disliked === true).length
}></Badge>
</i>
</Button>
  </div>
  
  <div style={{display:"flex", flexDirection:"column"}} className="mb-0 btomrr pb-0 ">
 
    
<Button className={`small btomr fot p-1 bg-dark  ${card.isactive && replied ?  "mb-1 mt-3" : "mb-3 mt-5" }`} style={{width: "fit-content"}}
 onClick={() => handleReplyHid(card.id)}
  icon={   ( ( replied.filter((reply) => reply.ip === card.id).length) ) } 
 label= { `${card.isactive ? replied &&    ')Hidereplies' : 'Showreplies'  } ` }      />

{card.isactive && replied &&
<Button style={{fontWeight: "bold",marginBottom: "-30px", 
 fontSize:"1rem", cursor:"pointer", wordBreak: "keep-all", whiteSpace: "nowrap"}}
 className="fot m-1 btom text-dark bold  small p-1 " icon="pi pi-reply" onClick={() => handleReply(card.id)} label="reply"/>
         }
</div>

</div>

<div className="col-sm-flex-column">

            

                    
 

</div>
       
                   </div>

                 
 

                 {  replied.slice().reverse().map((car) => (

   (car.ip === card.id && 
    
               <div key={car.id} className="d-flex flex-start w-100 wrap mt-4">
              {card.isactive ? <div>
                <Link to={`/Profile/Pr?=iBla6/${car.userId}`}>  
                     <Card.Img
                       className="w-20 rounded-circle shadow-1-strong me-3"
                       src={car.profile}
                   style={{width: "40px", height: "40px"}}
                       alt="avatar"
                       width="65"
                       height="65"
                     />
                  </Link> 

                   <div className="flex-grow-1 flex-shrink-1">
                     <div>
                      
                       <div className="d-flex justify-content-between align-items-center">
                       <Link to={`/Profile/pr?=iBla6/${car.userId}`}>   <p style={{color: props.dark ? "ghostwhite" : "black" }}className="mb-1">
                          {car.username}{" "}
                           <span className="small">-{formatDate(car.date)}</span>
                         </p> </Link>
                       </div>
                       {!cardreply[car.id] ? (
                      <div>
                              <textarea placeholder="add reply..."       
         style={{ height: rows * 24 + 'px' , padding: "10px", borderRadius: "20px", border: "1px solid grey"}} // adjust this value based on your font-

                        onChange={(event) => handleEdit(car.id, event )}  /> 

                        <Button  className=" bg-dark  p-1 mr-3" onClick={()  => handlePost(car.id)}>post</Button>

               <Button className="bg-danger p-1" onClick={() => car.ip === card.id && handlePostExit(car.ip, car.id)}>cancel</Button>
</div>
                         )  : (
                     
                        <div className="d-flex justify-content-between align-items-center">
                     <p className="small mb-0 ">
                     {car.message}
                       </p> 
                         </div>
                       ) }

                      </div>
                  


</div>
</div> : <></>}
                 </div> 
      
   )   
               )) }

         
     </div>
                     
   </div>
                       
                       
             
           </div>
         <div style={{borderBottom:"1px solid black", margin: "auto", width:"100%" ,padding: "0px"}}></div>
         </Row>
         ))}
       </Card.Body>

     </Card>

   </div>

 </Row>

</div>
</section>



         
         }

                             
                         

                          </Card>
                      <div style={{width:"65%", marginLeft:"25%"}}><hr></hr>
                        </div>    



                        </div>
                      </Row>
                    </div>
}
</div>}

                    </section>

                  );
}
                

              


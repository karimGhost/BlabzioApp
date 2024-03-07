import React from 'react'
import Layout from './Layout'

//import Market from '../pages/Market'
import {  useLocation } from '@reach/router';

import {useState, useEffect} from 'react' 
import { Link } from 'gatsby'
//import requests from "../../requests";
//import axio from '../../axios';
//import PagesData from './PagesData'
import { useAuth } from '../Accounts/useAuth'
import { FaFacebook,FaInstagram, } from 'react-icons/fa'
//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import i18n from "../components/i18n"
//import Loadings from '../components/Loadings'
//import AOS from "aos";
//import "aos/dist/aos.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import 'pure-react-carousel/dist/react-carousel.es.css';


const firebaseConfig6 = {
  apiKey: "AIzaSyBL9EyNItdif__jADl2m8rx5TFMBXFl6NE",
  authDomain: "zenaitsworld.firebaseapp.com",
  projectId: "zenaitsworld",
  storageBucket: "zenaitsworld.appspot.com",
  messagingSenderId: "752059821465",
  appId: "1:752059821465:web:a892347312cbfad858f708",
  measurementId: "G-GEMHBSGYPY"

};







export default function Footer() {


  firebase.initializeApp(firebaseConfig6, 'app6');
  const app6 = firebase.app('app6');
  const location = useLocation();


  const [news, setNews] = useState();

  useEffect(() => {
    app6.database().ref('Business').on('value', snapshot => {
      setNews(snapshot.val());
  
    })
    },[]) ;
  
    const [itemsPerPage] = useState(10); // number of items to display per page
    const [currentPage, setCurrentPage] = useState(1); // current page number
    const totalPages = news ? Math.ceil(Object.keys(news).length / itemsPerPage) : 0;
    console.log(`totalpages ${totalPages}`)
    console.log(`currentPages ${currentPage}`)
    console.log(`itemsperpage ${itemsPerPage}`)
  
  
  // Method for handling page changes
  const handlePageChange = (page) => {
    if (page <= totalPages) {
      setCurrentPage(page);
    }
  };

  let isActive;
 if (location.pathname.startsWith('/profileComponents/Myprofile')) {
  isActive = true;
 }else if (location.pathname.startsWith('/profileComponents/Profiles')){
  isActive = true

 }else{
  isActive = false

 
 }
  // Get the news items for the current page
  const currentNews = news && Object.values(news).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage )
  
  
  const [da, setda] = useState('Buss')
  
  const [off, setoff] =  useState(false);
  
  
  
  function locale(ne){
  
  
  setda(ne)
   /* localStorage.setItem('data', JSON.stringify(ne)) */
  setoff(true)
  
  //localStorage.setItem('data', JSON.stringify(ne))
  
  }


  const { user, loading,signOut } = useAuth();
  
  
  const [lang, setLang] = useState("");
  const [language, setLanguage] = useState("");
  
  const [lag,setLag] = useState('')
  const [la,setLa] = useState('')
  
  console.log(`$the object is as ${lag}`)
  const [v , setv] = useState()


 
  const [light,setLight ] = useState(false)
  
  

  return (
  
    <div >  {!isActive && 
      <footer> 
          <div  style={{backgroundColor: "#141515",  color:"silver"}} className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-sm-5">
<h1>Blabzio</h1>
                  <h5 className="font-weight-normal mt-4 mb-5">
                Blub/zio .... Did You Find  AnyThing to Bluber :) ?
                  </h5>
                  <ul className="social-media mb-3">
                    <li>
                      <a  style={{color: "black"}} >
                       
                     <FaFacebook/>B
                   </a>
                    </li>

                    <li>
                      <a  style={{color: "black"}}>
                     L
                      </a>
                    </li>
                    <li>
                      <a style={{color: "black"}}>
                     A
                                            </a>
                    </li>
                    <li>
                      <a style={{color: "black"}}>
                   b
                                            </a>
                    </li>
                    <li>
                      <a style={{color: "black"}}>
                   z
                                            </a>
                    </li>
                    <li>
                      <a style={{color: "black"}}>
                   i
                                            </a>
                    </li>
                    <li>
                      <a style={{color: "black"}}>
                   o
                                            </a>
                    </li>
                  </ul>
                  <Link style={{marginBottom:"10px", color: "gray"}} to="">About us</Link> <br></br>
                  <Link  style={{marginBottom:"10px", color: "gray"}} to="">Terms & Conditions</Link><br></br>
                  <Link  style={{marginBottom:"5px", color: "gray"}} to="">Privacy Policy </Link>

                </div>
                <div className="col-sm-4">
                  <h3 className="font-weight-bold mb-3">RECENT POSTS</h3>

                
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="footer-border-bottom pb-2">
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={currentNews && currentNews[1].urlToImage}
                              onClick={() => locale(currentNews && currentNews[1].url)}
                            
                              alt="thumb"
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-9">
                            <h5                               onClick={() => locale(currentNews && currentNews[1].url)}
 className="font-weight-600">
                         
                             {currentNews && currentNews[1].title >= 5 ? currentNews.title[1].slice(0, 10) + '...' : currentNews && currentNews[1].title}

                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="footer-border-bottom pb-2 pt-2">
                        <div className="row">
                          <div className="col-3">
                            <img
                        src={currentNews && currentNews[2].urlToImage}
                        onClick={() => locale(currentNews && currentNews[2].url)}

                              alt="thumb"
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-9">
                            <h5 className="font-weight-600"  onClick={() => locale(currentNews && currentNews[2].url)}
> 
                         {currentNews && currentNews[2].title >= 5 ? currentNews.title[2].slice(0, 10) + '...' : currentNews && currentNews[2].title}

                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div>
                        <div className="row">
                          <div className="col-3">
                          <img
                        src={currentNews && currentNews[3].urlToImage}
                        onClick={() => locale(currentNews && currentNews[3].url)}

                              alt="thumb"
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-9">
                          <h5 className="font-weight-600"  onClick={() => locale(currentNews && currentNews[3].url)}
> 
                         {currentNews && currentNews[3].title >= 5 ? currentNews.title[3].slice(0, 10) + '...' : currentNews && currentNews[3].title}

                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <h3 className="font-weight-bold mb-3">CATEGORIES</h3>
                  <div className="footer-border-bottom pb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"> <Link style={{color: "silver"}} to="/" >Magazine </Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" >Business </Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 style={{ color: "silver"}} className="mb-0 font-weight-600"><Link style={{ color: "silver"}} to="/" > Sports</Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" > Arts</Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" > </Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/"> Entertainment</Link> </h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" >Magazine</Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" > Travel</Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600"><Link style={{color: "silver"}} to="/" >Technology</Link></h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
          
          <div style={{backgroundColor: "#000"}}className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div style={{color: "grey"}} className="fs-14 font-weight-600 text-silver">
                      © 2022 - {new Date().getFullYear()} @  <a href="" target="_blank" className="text-white"> Blabzio</a>. All rights reserved.
                    </div>
                    <div style={{color: "goldenyellow"}}  className="fs-14 font-weight-600 text-silver">
                    Made  by <a href="" target="_blank" className="text-white">Abdulkarim </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </footer>}
   </div> 
    
  )
}



/*



  useEffect(() => {
  // Only run the effect if the user object is defined
  if (user) {
    app6.database().ref(`users/${user.uid}`).on('value', snapshot => {
      console.log(JSON.stringify(snapshot.val()))
      if (!snapshot.val()) {
        setLag(true);
        console.log("Snapshot value is null or undefined");
        return;
      }
      setLag(false);
      // check if snapshot.val() is an object
      if(typeof snapshot.val() === 'object'){
        const val = snapshot.val();
        i18n.changeLanguage(val.language);
      } else {
        i18n.changeLanguage(snapshot.val());
      }
    });
  }
  }, [user]);
  
  function handleLanguageChange(event) {
  const newLanguage = event.target.value;
  setLanguage(newLanguage);
  i18n.changeLanguage(newLanguage);
  
  
  app6.database().ref(`users/${user.uid}`).set({ language: newLanguage })
  
  
  // localStorage.setItem('lag', JSON.stringify(newLanguage));
  }
  
  
  /*
  if(!news ){
    return <div style={{ color: "black"}}>Loading data please wait !!!</div>
  }
  */

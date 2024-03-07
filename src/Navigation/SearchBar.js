import React, { useEffect, useState } from 'react';
import * as sr from '../styles/search.module.css'
import { FaSearch, FaSearchengin, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import { AutoComplete } from "primereact/autocomplete";
import { Link } from 'gatsby';

//import PagesData from '../components/PagesData';
import { faSearch,faTimesCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import Layout from './Layout';
import styled from '@emotion/styled';


const firebaseConfig7 = {
  apiKey: "AIzaSyBL9EyNItdif__jADl2m8rx5TFMBXFl6NE",
  authDomain: "zenaitsworld.firebaseapp.com",
  projectId: "zenaitsworld",
  storageBucket: "zenaitsworld.appspot.com",
  messagingSenderId: "752059821465",
  appId: "1:752059821465:web:a892347312cbfad858f708",
  measurementId: "G-GEMHBSGYPY"

};



function SearchBar(props) {

  firebase.initializeApp(firebaseConfig7, 'app7');
  const app7 = firebase.app('app7');

/* Object search*/
const [news, setNews] = useState();

const [da, setda] = useState('Ent')
 
const [off, setoff] =  useState(false);

const [saved, setSaved] = useState([])

function saveit(item) {
  setSaved({
    ...saved,
    [item.title]: !saved[item.title]
  });
}
 



function locale(ne){

  setda(ne)
   /* localStorage.setItem('data', JSON.stringify(ne)) */
  setoff(true)
  //localStorage.setItem('data', JSON.stringify(ne))
 
  }


    const [newsValues, setnewsValues] = useState([]);
const [selectedCountry, setSelectedCountry] = useState(null);
const [filteredCountries, setFilteredCountries] = useState(null);




const search = (event) => {
  let newsValues;
  if(news){
    newsValues = Object.values(news) ;
   }

    // Timeout to emulate a network connection
    setTimeout(() => {
        let _filteredCountries;
        
       
      
        if (!event.query.trim().length) {

            _filteredCountries = [...newsValues];
        }
        else {
            _filteredCountries = newsValues.filter((e) => {
                return e.title.toLowerCase().startsWith(event.query.toLowerCase());

            });
        }

        setFilteredCountries(_filteredCountries);
    }, 250);
}

useEffect(() => {
  app7.database().ref('Entertainment').on('value', snapshot => {
    setNews(snapshot.val());




  })
  },[]) ;

/*Object Search */
const [wid, setwid] = useState()
 
    const [searchValue, setSearchValue] = useState("");
   const isOpen = props.isOpe;

   const setIsOpen = props.setIsOpe;

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        console.log(searchValue);
        resetInputField();
    }

   

    const toggleSearc = (e) => {
        setIsOpen(true);
        props.setBu(false)
        e.preventDefault();

    }

    const closed = (e) =>{
        setIsOpen(false)
        e.preventDefault();
        props.setBu(true)
    }

    const closes = (e) =>{
        setIsOpen(false)
        e.preventDefault();
        props.setBu(true)
    }


    const margi={
   marginRight:    wid + 'px',



    }
const [searchData,setSearchData ] = useState('');
    const hideit= props.hideit;

const setHideit = props.setHideit;
if (typeof window !== 'undefined') {

hideit ? document.body.style.overflow ='hidden' :  document.body.style.overflow = '' ;

}

const  itemtemp = (item) => {
  return  (



    <div className='flex align-items-center'> 
  
      <img alt={item.title}
      src ={item.urlToImage} 
     
      style={{width: "18px"}}
/>
<div>{item.title}</div>
      </div>
  )
}
    return (

        <div   id="sixseve" style={{justifyContent:"center"}} className={ isOpen ? sr.searchcontain : sr.searchcontainer}>
   
   {/*  <PagesData  off={off} setoff={setoff}  da={da} />
*/}

     <Dropdown  className= {hideit && 'hid'}  style={{ width: hideit  && "100vw" , margin: hideit && "auto", position: hideit && "relative", left:  hideit && "0", right:  hideit && "0", top: hideit && "0"}} >
  
     <button
     className='hidden-arrow searchbarico h-20 bord b-dark bg-none '
  style={{border:"none",display: hideit && "none", height: "fit-content", width: "fit-content", padding: "0 10px",  background: "transparent", marginTop:"5px"}}
 
  id="navbarDropdown.MenuLink"
  role="button"
  data-mdb-toggle="dropdown"
  aria-expanded="false"
  onClick={() => props.setHideit(true)}

>
{props.HideSearch &&
  <FontAwesomeIcon className='bgsearc fontSearch fotSize' style={{fontSize: "2.5rem", width: "1rem" }} icon={faSearch}/> }
</button>



 


{hideit && 
    <div  style={{marginLeft: "auto", marginRight: "auto"}} className="input-grou mt-2   bg-dark">
      <div style={{marginLeft: "auto", marginRight: "auto" }}  className=" display-flex justify-center center form-outline  mx-auto ">

      <div className="card flex justify-content-center w-100 styleAuto" >
        
      <AutoComplete style={{position:"relative"}} field="title"  value={selectedCountry} suggestions={filteredCountries} completeMethod={search} onChange={(e) => setSelectedCountry(e.value)} itemTemplate ={itemtemp}  />
 
        <label  style={{ width:"fit-content", zIndex:"22",position:"absolute", left:"12%",top:"10px", height:"100%", padding: "0",border:'none' }} className="form-label fom itsfom" Htmlfor="form1">{ !selectedCountry  ?    <Dropdown.Item   onClick={() => setHideit(pre => !pre)} style={{width:"fit-content", padding:"0px"}}> <FontAwesomeIcon onClick={() => setSelectedCountry(null)} aria-labelledby="navbarDropdown.MenuLink" data-toggle="navbarDropdown.MenuLink" style={{color: "greenyellow", width: "fit-content", height:"30px", cursor:"pointer", marginLeft:"px",marginTop:"px", fontSize: "1.4rem"}} icon={faTimesCircle}/></Dropdown.Item> : <FontAwesomeIcon  className='ligh ' style={margi} icon={faSearch} /> } 
       
</label>

      </div>

   

      {selectedCountry &&

<div  className="col-xl-8 col-lg-8 col-sm-6">
                        
                        <div className="rotate-img" onClick={() => locale(selectedCountry  && selectedCountry.url)}>
                          <img
                            src={selectedCountry  && selectedCountry.urlToImage} 
                            alt="thumb"
                            className="img-fluid"  onClick={() => locale(selectedCountry  && selectedCountry.url)}/>
                        </div>
                     
                        <h2 className="mt-3 text-primary mb-2" onClick={() => locale(selectedCountry  && selectedCountry.url)}>
                        { selectedCountry  && selectedCountry.title}
                     
                        </h2>
                        <p className="fs-13 mb-1 text-muted" onClick={() => locale(selectedCountry  && selectedCountry.url)}>
                          <span className="mr-2">Photo </span>10 Minutes ago
                        </p>
                        <button 
                     onClick={() =>selectedCountry &&  saveit(selectedCountry)}
                     style={{
                     color: saved[selectedCountry && selectedCountry.title] ? "tomato" : "yellowgreen",
                     border: "none"
                     }}
                     ><FontAwesomeIcon icon={faDownload} className="savedit" style={  { color: saved[selectedCountry && selectedCountry.title] ? "tomato" :  "yellowgreen"}} /> {saved[selectedCountry && selectedCountry.title] ? 'saved' : "save"} </button>  
                        <p className="my-3 fs-15" onClick={() => locale(selectedCountry && selectedCountry.url)}>
                        {selectedCountry  && selectedCountry.content}
                        </p>
                        <Link to="/" className="font-weight-600 fs-16 text-dark" >Read more</Link>
                     
                     
                      </div> 
}
 </div>
   
</div>

}
    
 

<Dropdown.Menu   className= {` ${hideit && 'hi'} mt-6 ${props.light && "backframe" }` } aria-labelledby="navbarDropdown.MenuLink mt-3">





    <hr className="dropdown-divider" /> 
  
<div>

</div>


</Dropdown.Menu>
</Dropdown>

{ hideit && <StyledBackdrop onClick={() => setHideit(pre => !pre)}/>
}
        </div>

        
    );
}

export default SearchBar;


/*  form-control rounded     */

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-out, visibility 0s 0.3s ease-out;
  z-index: 2;

  ${(props) =>
    !props.hideit &&
    `
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-out;
  `}
`;


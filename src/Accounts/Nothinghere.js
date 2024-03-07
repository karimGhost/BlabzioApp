import React from 'react';


import { FaRedo } from 'react-icons/fa';
import "../styles/Nothing.css"

function Nothinghere(props) {


  

  return( 
    
  <div className="landing-page">
      <div className="" id="logow">

        <div className="animated-logo">
          <span className="blabzio-text">
         <span className="letter-b">B</span>   lab<span className="letter-z">Z</span>io
          </span>
      

        </div>
                                <i>   {props.saved ? "Did you Save" :
props.likes ? "Did you Like" : 
props.yourVids ?
"Do you Have" : ""} A Clip ? <b>Wait a Bit or Click Here <button  onClick={props.refresh}><FaRedo/>  </button> Refresh  </b>  <br></br> :Else if  Not, <b> well There is nothing Here! </b> </i>

      </div>
    </div>
  );
}
export default Nothinghere;

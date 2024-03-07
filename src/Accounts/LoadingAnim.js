import React, { useEffect, useState } from 'react';


import { FaRedo } from 'react-icons/fa';
import "../styles/Nothing.css"

function LoadingAnim(props) {


  
  const [reload, setReload] = useState(false)


  const setReloadWithTimeout = () => {
    setTimeout(() => {
      if (reload === false) {
        setReload(true);
      }
    }, 11000);
  };

  useEffect(() => {
    setReloadWithTimeout(); //  app05 start the timeout randomstring

    // Cleanup the timeout if the component unmounts or reload becomes true
    return () => {
      clearTimeout(setReloadWithTimeout);
    };
  }, [reload]); //  re-run



  return( 
    
  <div className="landing-page">
      <div className="" id="logow">

        <div className="animated-logo">
          <span className="blabzio-text">
         <span className="letter-b">B</span>   lab<span className="letter-z">Z</span>io
          </span>


        </div>

{     reload &&   <button  onClick={props.refresh}><FaRedo/> Refresh </button>   }


      </div>
    </div>
  );
}
export default LoadingAnim;

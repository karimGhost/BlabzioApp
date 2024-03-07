import React, { Component, useState } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Button } from 'primereact/button';
import BlabzioSeo from '../Accounts/BlabzioSeo';

import icon from "../images/icon.png";
import { Tooltip } from 'primereact/tooltip';
import { Link } from 'gatsby';

export default function BlabShare(props){

const [mp4urls, setmp4urls] = useState(null)

    
    const convertToMP4 = async (inputWebMUrl) => {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg/dist/ffmpeg.min.js`);
      const ffmpeg = await response.arrayBuffer();
    
      const ffmpegInstance = createFFmpeg({ log: true });
      await ffmpegInstance.load(ffmpeg);
    
      // Fetch the WebM file
      const webmFile = await fetchFile(inputWebMUrl);
    
      // Run FFmpeg command to convert WebM to MP4
      await ffmpegInstance.run('-i', webmFile, '-c:v', 'libx264', '-c:a', 'aac', '-strict', 'experimental', '-b:a', '192k', 'output.mp4');
    
      // Get the data of the converted MP4 file
      const mp4Data = ffmpegInstance.FS('readFile', 'output.mp4');
    
      // Create a Blob from the data
      const mp4Blob = new Blob([mp4Data.buffer], { type: 'video/mp4' });
    
      // Create a download link or use the Blob as needed
      const mp4Url = URL.createObjectURL(mp4Blob);
      
      console.log('Converted MP4 URL:', mp4Url);
      setmp4urls(mp4Url)
      // Clean up, delete temporary files if needed
      ffmpegInstance.FS('unlink', 'output.mp4');
    };





    const copyLink = () => {
      alert('Link copied to clipboard');
      props.setVisible(-1)
    };
    
    
    
    
    const toggleSharePopup = (index) => {
    
      if (props.visible === index) {
    
        props.setVisible(-1);
      } else {
        // Clicked a different button, so  it and close the previously open button
        convertToMP4(props.playVid)
        props.setVisible(index);
    
      }
    };
    




    return(



<div style={{position:"absolute",borderRadius:"8px",height:"fit-content", zIndex:"230", display:"block",}} className={`share-popup ${props.visible === props.id ? 'p-fluid' : 'p-fluid d-none'}`}>
      {/* Add your social media icons and links here */}
      <BlabzioSeo title="Blabzio" image={icon}/>
 
 <div style={{display:"flex", flexDirection:"row", position:"absolute", top:"0", right:"0", left:"0"}}>

     <b style={{fontSize:"1.5rem", fontFamily:"fantasy", }}>
    SHARE 
    </b> 
                      <Button onClick={() => props.setVisible(-1)} style={{float:"right",marginLeft:"auto", width:"2rem ", height:"2rem"}} icon="pi pi-times" className="p-button-outlined p-button-primary" />

 </div>
  


       
      <div  style={{marginTop:"30px"}} className="card flex flex-wrap flex-row align-items-center justify-content-center  gap-5 float-left">
       

      <Link style={{marginRight:"9px", border:"1px solid orange"}}  to="/" target="_blank" rel="noopener noreferrer">
        
        <Tooltip target=".custom-target-icon" />
  
  <i  className="custom-target-icon  pi pi-replay p-text-secondary p-overlay-badge"
      data-pr-tooltip="Re-Share"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      data-pr-mousetrack="true"
      
      style={{ fontSize: '1.5rem', cursor: 'pointer', rotate:"-90deg" }}>
  </i>      
        
          </Link>

      <Link style={{marginRight:"9px"}}  to="https://www.facebook.com/sharer/sharer.php?u=YOUR_WEBSITE_URL" target="_blank" rel="noopener noreferrer">
        
      <Tooltip target=".custom-target-icon" />

<i className="custom-target-icon  pi pi-facebook p-text p-overlay-badge"
    data-pr-tooltip="Share on Facebook"
    data-pr-position="right"
    data-pr-at="right+5 top"
    data-pr-my="left center-2"
    data-pr-mousetrack="true"
    
    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
</i>      
      
        </Link>


        <Link style={{marginRight:"9px"}}  to="https://api.whatsapp.com/send?text=YOUR_WEBSITE_TITLE%20-%20YOUR_WEBSITE_URL" target="_blank" rel="noopener noreferrer">
        
        <Tooltip target=".custom-target-icon" />
  
  <i className="custom-target-icon  pi pi-whatsapp p-text-success  "
      data-pr-tooltip="Share on Whatsapp"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      data-pr-mousetrack="true"
      
      style={{ fontSize: '1.5rem', cursor: 'pointer',color:"green" }}>
  </i>      
        
          </Link>
   
          <Link
  onClick={(event) => {
    // Prevent default link behavior and start the conversion
    event.preventDefault();
   !mp4urls && convertToMP4(props.playVid);
  }}
  style={{ marginRight: "9px", color: "Black", fontWeight: "bold" }}
  to={`https://twitter.com/intent/tweet?text=Blabzio&url=${mp4urls}`}
  target="_blank"
  rel="noopener noreferrer"
> 

  <Tooltip target=".custom-target-icon" />

<i className="custom-target-icon  pi pi-times p-text-success  p-overlay-badge"
    data-pr-tooltip="Share on X"
    data-pr-position="right"
    data-pr-at="right+5 top"
    data-pr-my="left center-2"
    data-pr-mousetrack="true"
    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
</i>      
  </Link>
    
   
   
     <Button      tooltip="Copy Link" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} style={{color:"white", marginLeft:"2px", width:"fit-content", padding:"5px"}} onClick={() => copyLink(props.playVid)} label="" icon="pi pi-link " className="p-button-outlined p-button-secondary" >    
     </Button>
   </div>

    </div>
    )
}
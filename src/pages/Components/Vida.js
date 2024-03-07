import React, { useState, useRef } from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

function Vida(){
  return(
    <></>
  )
}
export default Vida;

/*


  const videoRef = useRef(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(100);

  // Cloudinary configuration
  const cloudName = 'your_cloud_name';
  const apiKey = 'your_api_key';
  const apiSecret = 'your_api_secret';

  // Function to handle video trim and save
  const handleTrimAndSaveVideo = async () => {
    const cloudinaryOptions = {
      resource_type: 'video',
      transformation: [
        {
          effect: 'trim',
          start_offset: `${startTime}%`,
          end_offset: `${endTime}%`,
        },
      ],
    };
    

    const cl = new cloudinary.Cloudinary({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    const publicId = 'your_video_public_id'; // Replace with your video's public ID localstorage

    try {
      const response = await cl.video(publicId, cloudinaryOptions).toHtml();
      // The response should contain the trimmed video URL
      console.log('Trimmed video URL:', response);
    } catch (error) {
      console.error('Error trimming video:', error);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        src={vida}
      ></video>
      <Nouislider
        range={{ min: 0, max: 100 }}
        start={[startTime, endTime]}
        onSlide={(values) => {
          setStartTime(values[0]);
          setEndTime(values[1]);
        }}
      />
      <button onClick={handleTrimAndSaveVideo}>Trim and Save Video</button>
    </div>
  );
}

*/
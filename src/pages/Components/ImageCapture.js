import React, { useState } from "react";

function ImageCapture() {
    const [imageURL, setImageURL] = useState("");
    const [imageFile, setImageFile] = useState(null);
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
        setImageURL(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCaptureImage = () => {
    // Capture image from camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const mediaStreamTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);

        imageCapture
          .takePhoto()
          .then((blob) => {
            setImageFile(blob);
            setImageURL(URL.createObjectURL(blob));
            stream.getTracks().forEach((track) => track.stop());
          })
          .catch((error) => {
            console.error("Error capturing image: ", error);
          });
      })
      .catch((error) => {
        console.error("Error accessing camera: ", error);
      });
  };

  const handleSaveImage = () => {
    // Save the image to local storage
    if (imageFile) {
     localStorage.setItem("uploadedImage", imageURL); 
    }
  };

  return (
    <div>
      {imageURL && <img src={imageURL} alt="Uploaded" width="200" />}
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      <button onClick={handleCaptureImage}>Capture Image</button>
      <button onClick={handleSaveImage}>Save to Local Storage</button>
    </div>
  );
}

export default ImageCapture;

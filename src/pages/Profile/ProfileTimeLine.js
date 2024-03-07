import styled, {css} from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


import { FaPlay, FaPause, FaHeart, FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import { nanoid } from 'nanoid';

import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {FaBookmark} from 'react-icons/fa'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Tooltip } from 'primereact/tooltip';

import icon from  "../../images/icon.png";
import blab from  "../../images/Blab.jpeg";

const firebaseConfigTheWallPlayer = {
  apiKey: "AIzaSyChFGTB5YEugUKho-YqcWVZtKJG3PIrtt0",
  authDomain: "thewall-10a4a.firebaseapp.com",
  databaseURL: "https://thewall-10a4a-default-rtdb.firebaseio.com",
  projectId: "thewall-10a4a",
  storageBucket: "thewall-10a4a.appspot.com",
  messagingSenderId: "221023885061",
  appId: "1:221023885061:web:bc550d03edd2fbf60e496c",
  measurementId: "G-7V80059NF7",
};

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2px;

  @media screen  and (max-width: 424px){
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  }
`;

const MediaItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;


const ProfileTimeLine = ({ mediaItems }) => {
  return (

    <>
    <div>
  <ProfileContainer>
      {mediaItems?.map((media, index) => (
        <MediaItem key={index}>
            <img src={blab} alt={`Image ${index}`} />
      
          
          
        </MediaItem>
      ))}
    </ProfileContainer>

    </div>
    </>
  
  );
};

export default ProfileTimeLine;
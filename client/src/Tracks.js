import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from 'react-bootstrap/Button';

function myFunction() {
  document.getElementById('track1').innerHTML = 'You chose the first track!';
}

function Tracks() {
  const [tracks, setTracks] = useState([]);
  // const [track1, setTrack1] = useState('');
  // const [track2, setTrack2] = useState('');

  useEffect(() => {
    try {
      async function fetchTrackIDs() {
        const request = await axios.get(
          `http://127.0.0.1:9090/rank/album-tracks`
        );
        console.log(request.data);
        setTracks(request.data);
      }
      fetchTrackIDs();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <button type="button" class="btn" id="track1" onClick="myFunction()">
        {tracks[0]}
      </button>
      <button type="button" class="btn" id="track2" onClick="myFunction()">
        {tracks[1]}
      </button>
    </div>
  );

  // for (let i = 0; i < tracks.length - 1; i++) {
  //   setTrack1(tracks[i]);
  //   for (let j = 1; j < tracks.length; j++) {
  //     setTrack2(tracks[j]);
  //     // function for choosing between the two
  //   }
  // }

  // prints a every element in tracks
  // return (
  //   <div>
  //     {tracks.map((t) => {
  //       return <p>{t}</p>;
  //     })}
  //   </div>
  // );
}

export default Tracks;

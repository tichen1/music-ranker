import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Artist() {
  const [artist, setArtist] = useState('');

  useEffect(() => {
    try {
      async function fetchArtist() {
        const artist = await axios.get(`http://127.0.0.1:9090/rank/artist`);
        console.log(artist);
        setArtist(artist.data.name);
      }
      fetchArtist();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <button className="text-capitalize">{artist}</button>
    </>
  );
}

export default Artist;

import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
// import axios from './axios.js'

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button } from 'reactstrap';

// module imports
import Artist from './Artist.js';
import Tracks from './Tracks.js';

function App() {
  return (
    <>
      <Tracks />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const router = require('express').Router();
const axios = require('axios');
const joi = require('joi');
require('dotenv').config();
const token = require('../helper/token.js');

// VARIABLES
const { SPOTIFY_LINK } = process.env;
const artistID = '7w29UYBi0qsHi5RTcv3lmA'; // bjork artistID
const albumID = '0HMsmYvoT1h2x1C4di5faf'; // homogenic albumID

router.get('/artist', async (req, res) => {
  try {
    // const artistID = '7w29UYBi0qsHi5RTcv3lmA';
    const response = await axios.get(
      `${SPOTIFY_LINK}/artists/${artistID}`,
      await token.getConfig()
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(error.response.status).send(error.message);
  }
});

router.get('/album', async (req, res) => {
  try {
    // const artistID = '7w29UYBi0qsHi5RTcv3lmA';
    const response = await axios.get(
      `${SPOTIFY_LINK}/albums/${albumID}`,
      await token.getConfig()
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(error.response.status).send(error.message);
  }
});

router.get('/album-tracks', async (req, res) => {
  try {
    const album = await axios.get(
      `${SPOTIFY_LINK}/albums/${albumID}`,
      await token.getConfig()
    );

    let trackIDs = [];
    for (let i = 0; i < album.data.tracks.items.length; i++) {
      trackIDs.push(album.data.tracks.items[i].name);
    }

    console.log(trackIDs);
    res.send(trackIDs);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.get('/track', async (req, res) => {
  try {
    let { trackID } = req.query;
    const response = await axios.get(
      `${SPOTIFY_LINK}/tracks/${trackID}`,
      await token.getConfig()
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(error.response.status).send(error.message);
  }
});

router.get('/search-artists', async (req, res) => {
  try {
    const response = await axios.get(
      `${SPOTIFY_LINK}/search?q=artist:bjork&type=artist&limit=50`,
      await token.getConfig()
    );

    console.log(response.data.artists);
    res.send(response.data.artists);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.get('/artist-albums', async (req, res) => {
  try {
    // get artist name
    const artist = await axios.get(
      `${SPOTIFY_LINK}/artists/${artistID}`,
      await token.getConfig()
    );
    const artistName = artist.data.name;

    // const artistID = '7w29UYBi0qsHi5RTcv3lmA';
    const response = await axios.get(
      `${SPOTIFY_LINK}/artists/${artistID}/albums?include_groups=album&limit=50`,
      await token.getConfig()
    );

    let albums = response.data.items;
    // for (let i = 0; i < response.data.items.length; i++) {
    //   if (response.data.items[i].artists[0].name === artistName) {
    //     albums.push(response.data.items[i]);
    //   }
    // }

    console.log(albums);
    res.send(albums);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post('track-object', (req, res) => {
  
  const { track, album, artist, image } = req.body;
  res.send({
    track: `${track}`,
    album: `${album}`,
    artist: `${artist}`,
    image: `${image}`,
    votes: 0,
  });
});

module.exports = router;

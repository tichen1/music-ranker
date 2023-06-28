const axios = require('axios');
require('dotenv').config();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const isEmpty = (value) => {
  return value === undefined || value === null;
};

const hasValue = (value) => {
  return value !== undefined && value !== null;
};

const getTicker = () => {
  const dateNow = new Date();
  return parseInt(dateNow.getTime() / 1000);
};

let accessToken = null;
let expiresIn = 0;

const getAccessToken = async () => {
  try {
    const tickerNow = getTicker();

    if (isEmpty(accessToken) || tickerNow >= expiresIn) {
      const data = {
        grant_type: 'client_credentials',
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      };

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        data,
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      );

      accessToken = response.data.access_token;
      // 55 minutes to be safe
      expiresIn = response.data.expires_in - 300 + tickerNow;
    }
    return accessToken;
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getConfig = async () => {
  const accessToken = await getAccessToken();
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

const a = 3;
// exports.a = a;
exports.getAccessToken = getAccessToken;
exports.getConfig = getConfig;

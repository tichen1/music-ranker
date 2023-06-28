const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const token = require('./helper/token.js');

const app = express();
// { credentials: true, origin: process.env.ALLOW_ORIGIN }
app.use(cors());

const rankRoute = require('./routes/rank.js');
app.use('/rank', rankRoute);

app.get('/', async (req, res) => {
  const dateNow = new Date();
  res.send(`${process.env.ALLOW_ORIGIN}: ${dateNow.toUTCString()}`);
});

// set mongodb connection
// var db = mongoose.connection;

// MongoClient.connect('mongodb://localhost:9090/musicranker', function (err, db) {
//   if (!err) {
//     console.log('We are connected');
//   }
// });

app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port ${process.env.APP_PORT}`);
});

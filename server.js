'use strict';

console.log('hi guise');

// imports
const express = require('express');
const cors = require('cors');
const app = express();

// import to use process.env.PORT
require('dotenv').config();

// local port
const PORT = process.env.PORT || 3002;

app.use(cors());

const getWeather = require('./modules/weather.js');
const getMovie = require('./modules/movie.js');

app.get('/weather', getWeather);
app.get('/movie', getMovie);

// catch all
app.get('*', (request, response) => {
  response.status(404).send('This is not exactly correct..');
});

// tell our server to listen
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

'use strict';

console.log('hi guise');

// imports
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

// import to use process.env.PORT
require('dotenv').config();

// local port
const PORT = process.env.PORT || 3002;

// Require in JSON
const weatherData = require('./data/weather.json');


// this route: http://localhost:3001/weather?searchQuery=seattle
app.get('/weather', async (request, response) => {

  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=-${request.query.lon}&key=${process.env.WEATHER_API}&days=5&lan=en&units=I`;

  const weatherArr = await axios.get(weatherUrl);

  try {
    let city = weatherArr.data.data.map(weather => new Forecast(weather));
    response.send(city);
  } catch (error) {
    response.status(404).send('Oop, Check for a typo. Cannot retrieve movie data!');
  }
});

class Forecast {
  constructor(weather) {
    this.description = weather.weather.description;
    this.date = weather.valid_date;
  }
}

app.get('/movies', async (request, response) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&query=${loco}&include_adult=false`;
  let loco = request.query.location;

  const movieData = await axios.get(movieUrl);

  try {
    let movieResults = movieData.data.map(movieData => new Movie(movieData));
    response.send(movieResults);
  } catch (error) {
    response.send('Oop, Check for a typo. Cannot retrieve movie data!');
  }
});

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.genres = movieData. genres;
    this.overview = movieData.overview;
    this.image_url = `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`;
  }
}


// catch all
app.get('*', (request, response) => {
  response.status(404).send('This is not exactly correct..');
});

// tell our server to listen
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

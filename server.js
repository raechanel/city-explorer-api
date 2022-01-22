'use strict';

console.log('hi guise');

// imports
const express = require('express');
const cors = require('cors');
const app = express();
// const axios = require('axios');


// import to use process.env.PORT
require('dotenv').config();
// local port
const PORT = process.env.PORT || 3002;

app.use(cors());

const getWeather = require('./modules/weather.js');
const getMovie = require('./modules/movie.js');

app.get('/weather', getWeather);
app.get('/movie', getMovie);


// async function getMovie (request, response){

//   let loco = request.query.searchQuery;
//   const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&query=${loco}&include_adult=false`;

//   const movieData = await axios.get(movieUrl);

//   try {
//     let movieResults = movieData.data.results.map(movieData => new Movie(movieData));
//     response.send(movieResults);
//   } catch (error) {
//     response.send('Oop, Check for a typo. Cannot retrieve movie data!');
//   }
// });

// class Movie {
//   constructor(movieData) {
//     this.title = movieData.title;
//     this.overview = movieData.overview;
//     this.imageUrl = movieData.poster_path ? 'https://image.tmdb.org/t/p/w500' + movieData.poster_path:'';
//     this.releaseDate = movieData.release_date;
//   }
// }

// catch all
app.get('*', (request, response) => {
  response.status(404).send('This is not exactly correct..');
});

// tell our server to listen
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

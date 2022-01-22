'use strict';

const axios = require('axios');

// route: https://api.themoviedb.org/3/search/movie?api_key=917a9f39a5044df6a8d04ebea7c89d85&query=trenton&include_adult=false

async function getMovie (request, response){

  let loco = request.query.searchQuery;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&query=${loco}&include_adult=false`;

  const movieData = await axios.get(movieUrl);

  try {
    let movieResults = movieData.data.results.map(movieData => new Movie(movieData));
    response.send(movieResults);
  } catch (error) {
    response.send('Oop, Check for a typo. Cannot retrieve movie data!');
  }
}

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.imageUrl = movieData.poster_path ? 'https://image.tmdb.org/t/p/w500' + movieData.poster_path:'';
    this.releaseDate = movieData.release_date;
  }
}

module.exports = getMovie;

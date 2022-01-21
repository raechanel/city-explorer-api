'use strict';

console.log('hi guise');


const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

//middleware
require('dotenv').config();
const PORT = process.env.PORT || 3002;

// Require in JSON
const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('hello');
});

app.get('/banana', (request, response) => {
  response.send('oh wow');
});

// we access query parameters using the request object: request.query.<parameter-name>

app.get('/sayHello', (request, response) => {
  let name = request.query.name;
  console.log(request.query);
  console.log(name);
  response.send(`Hello ${name}, from the server`);
});

// this route: http://localhost:3001/weather?searchQuery=seattle
app.get('/weather', async (request, response) => {
  // let searchQuery = request.query.searchQuery;

  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=-${request.query.lon}&key=${process.env.WEATHER_API}&days=5&lan=en&units=I`;

  // let city = (weatherData.filter(cityWeather => cityWeather.city_name.toLowerCase() === searchQuery));
  const weatherArr = await axios.get(weatherUrl);
  
  try {
    let anotherCity = weatherArr.data.data.map(weather => new Forecast(weather));
    response.send(anotherCity);
  } catch (error) {
    response.status(404).send('pick another city');
  }
});

class Forecast {
  constructor(weather){
    this.description = weather.weather.description;
    this.date = weather.valid_date;
  }
}


app.get('*', (request, response) => {
  response.status(404).send('This is not exactly correct..');
});

// tell our server to listen
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

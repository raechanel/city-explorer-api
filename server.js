'use strict';

console.log('hi guise');


const express = require('express');

const app = express();

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
app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;

  let city = (weatherData.filter(cityWeather => cityWeather.city_name.toLowerCase() === searchQuery));

  try {
    let anotherCity = city[0].data.map(weather => new Forecast(weather));
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

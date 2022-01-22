// 'use strict';

// const axios = require('axios');

// let cache = {};

// // this route: https://api.weatherbit.io/v2.0/forecast/daily/?lat=47&lon=-122&key=70a5381f94e84b70a207e6a1f5a6767b&days=5&lan=en&units=I
// async function getWeather (request, response){
//   const key = 'weather-' + latitude + longitude;

//   const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=-${request.query.lon}&key=${process.env.WEATHER_API}&days=5&lan=en&units=I`;

//   const weatherArr = await axios.get(weatherUrl);

//   if (cache[key]) && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache Hit');
//   } else {
//     console.log('Cache Miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = axios.get(weatherUrl)
//     .then(response => parseWeather(response.body));
//   }

//   return cache[key].data;
// }

//   try {
//     let city = weatherArr.data.data.map(weather => new Forecast(weather));
//     response.send(city);
//   } catch (error) {
//     response.status(404).send('Oop, Check for a typo. Cannot retrieve movie data!');
//   }
// }
// class Forecast {
//   constructor(weather) {
//     this.description = weather.weather.description;
//     this.date = weather.valid_date;
//     this.low = weather.low_temp;
//     this.high = weather.max_temp;
//   }
// }

// module.exports = getWeather;

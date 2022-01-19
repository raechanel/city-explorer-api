'use strict';

console.log('hi guise');
const { response } = require('express');
// Must bring in express! MUST use require instead of import
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get('/', (request, response) => {
  response.send('hello');
})

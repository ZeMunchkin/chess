const express = require('express');
const path = require('path');

const app = express();

app.static(path.resolve(__dirname, '/client/public'));

const port = process.env.PORT || 7016;

app.listen(port, err => (
  err ? console.log(err) : console.log(`Listening on port ${port}`) // eslint-disable-line
));

const express = require('express');

const app = express();

app.use(express.static('client/public'));

const port = process.env.PORT || 7016;

app.listen(port, err => (
  err ? console.log(err) : console.log(`Listening on port ${port}`) // eslint-disable-line
));

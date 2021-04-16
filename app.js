import express from'express'
import bodyparser from 'body-parser'
import helmet from 'helmet'


const app = express();

// simple route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// set port, listen for requests
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
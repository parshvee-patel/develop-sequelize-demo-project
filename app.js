import express from'express'

// config env
require('dotenv').config()

//Local Import Files
import { routerV1 } from './routes'

const app = express();

app.use('/api/v1', routerV1)

// simple route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// set port, listen for requests
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
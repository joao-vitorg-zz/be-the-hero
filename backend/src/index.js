const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(routes)

  .listen(3333);

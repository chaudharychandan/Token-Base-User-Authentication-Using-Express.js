// Module imports
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose  = require('mongoose');
const app = express();
const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({
  type: '*/*'
}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening to port 3090');
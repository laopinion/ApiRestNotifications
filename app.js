'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const config = require('./config');

const api = require('./routers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Documentación https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api);

app.get('/', function(req, res){
  res.status(200).send('Hola welcome');
});

module.exports = app;

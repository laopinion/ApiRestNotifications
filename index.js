'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
mongoose.Promise = require('bluebird');
// Con esto creamos un file .env donde estan mis datos de conexión como variables de entorno.
require('dotenv').config();

// mongodb://<dbuser>:<dbpassword>@ds119044.mlab.com:19044/heroku_w44m715d
const db = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/notifications';

mongoose.connect(db, { useMongoClient: true }, (err, res) => {
  if (err) return console.log('Error al conectar con la base de datos: ', err);
  console.log('Conexión a la base de datos establecidad....');
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server on port http://localhost:${port}`);
  });
});

'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, { useMongoClient: true }, (err, res) => {
  if (err) return console.log('Error al conectar con la base de datos: ', err);
  console.log('Conexión a la base de datos establecidad....');
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server on port http://localhost:${port}`);
  });
});

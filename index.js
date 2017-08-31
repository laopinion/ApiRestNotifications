'use strict'

const app = require('./app');
const config = require('./config');

app.listen(config.port, function(){
  console.log(`Server on port ${config.port}`)
});


'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
// Con esto creamos un file .env donde estan mis datos de conexión como variables de entorno.
require('dotenv').config();

//Generar ids unicos
const uuidv1 = require('uuid/v1');

function createToken(user){
  const id = uuidv1();
  const payload = {
    sub: id,// revisar crear ids aleaterios
    iat: moment().unix(),
    exp: moment().add(1, 'year').unix(),
  }
  // Con moment add indicamos en que tiempo la fecha va caducar lo habitual son 14 days
  return jwt.encode(payload, process.env.JWT);
}

function decodeToken(token){
  // Las Promise se usan apartir de ES6 o ES2015 que es lo mismo
  const decoded = new Promise((resolve, reject) => {
    try{
      const payload = jwt.decode(token, process.env.JWT);

      if(payload.exp <= moment().unix()){
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }

      resolve(payload.sub)
    } catch (err){
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  });

  return decoded;
}

module.exports = {
  createToken,
  decodeToken
}
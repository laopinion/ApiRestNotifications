'use strict'

const services = require('../services');

function isAuth(req, res, next){
  // Validamos que dentro del headers venga el token,
  // Si lo tiene nos da true y lo invertimos con ! para que de false
  if(!req.headers.authorization){
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  // Desglosamos el parametro o valor authorization que viene un (pre token)  
  const token = req.headers.authorization.split(' ')[1];// Con split separamos en un array

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response =>{
      res.status(response.status)
    })  
}

module.exports = isAuth;
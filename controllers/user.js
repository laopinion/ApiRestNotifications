'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const service = require('../services');

// Registro de un user
function signUp(req, res){
  // console.log('data del user a crear -> ', req);
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save((err) => {
    if(err) res.status(500).send({ message: 'Error al crear el usuario: '+ err});

    return res.status(200).send({ token: service.createToken(user) });
  });
}

// Inicio de sesión de un user
function signIn(req, res){
  // el req.fields es gracias a express-formidable para poder enviar los fetch type post
  // console.log('Esto es el body con fields ', req.fields )
  /* 
    Nota llega un json normal porque lo estoy mandando de otra pagina porque con el express-formidable no funciono,
    si funciona dentro de la misma ruta.
  */
  console.log('Esto es el body ', req.body)

  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).send({ message: err });

    if (!user) return res.status(404).send({ message: 'No existe el usuario' });

    // console.log('data', user)
    // console.log('Clave hast', user.password);
    // console.log('display name', user.displayName);
    // console.log('Clave hast user', req.body.password);

    // Primero la clave que esta enviando el request y la clave que esta en la database;
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
      if(err) return res.status(404).send({ message: 'Authentication failed. Wrong password.' });
      
      if(isMatch){
        req.user = user;
        res.status(200).send({
          message: 'Te has logeado correctamente '+ req.user.displayName,
          token: service.createToken(user),
          status: 'success'
        });
      }else{
        res.status(404).send({ message: 'Authentication failed. Wrong password.' });
      }
    });
  });
}

module.exports = {
  signUp,
  signIn,
}
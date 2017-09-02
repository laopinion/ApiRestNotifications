'use strict'

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const notifiCtrl = require('../controllers/notifications');
const userCtrl = require('../controllers/user');


/* app.get('/createToken/:token', function(req, res){
  
}); */
api.get('/createToken/:token', notifiCtrl.createToken);

/* app.post('/sendMessanging', function(req, res){

});
 */
api.post('/sendMessanging', auth, notifiCtrl.sendMessanging);

// Registro de un user 
// api.post('/signup', userCtrl.signUp);

// Iniciar seseion
api.post('/signin', userCtrl.signIn);

api.get('/private', auth, function(req, res){
  res.status(200).send({ message: 'Tienes acceso tu id '+ req.user });
});

module.exports = api;

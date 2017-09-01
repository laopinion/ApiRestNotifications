'use strict'

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const notifiCtrl = require('../controllers/notifications');
const userCtrl = require('../controllers/user');


/* app.get('/createToken/:token', function(req, res){
  
}); */
api.get('/createToken/:token', auth, notifiCtrl.createToken);

/* app.post('/sendMessanging', function(req, res){

});
 */
api.post('/sendMessanging', auth, notifiCtrl.sendMessanging);

// Registro de un user 
// api.post('/signup', userCtrl.signUp);

// Iniciar seseion
api.post('/signin', userCtrl.signIn);

api.get('/private', auth, function(req, res){

  res.stata(200).send({ message: 'Estás autenticado correctamente y tu _id es:'+ req.user });
});

module.exports = api;

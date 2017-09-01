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

api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);

module.exports = api;

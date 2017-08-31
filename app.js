'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const admin = require("firebase-admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Documentación https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Documentación -> https://firebase.google.com/docs/cloud-messaging/admin/manage-topic-subscriptions
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notificacionesop.firebaseio.com'
});

app.get('/', function(req, res){
  res.status(200).send('Hola welcome');
});

app.get('/createToken/:token', function(req, res){
  // console.log('Create token post ', req.params.token);
  const currentToken = req.params.token;
  const topic = 'newnews';

  admin.messaging().subscribeToTopic(currentToken, topic)
    .then(function(response) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully subscribed to topic:", response);
      res.status(200).send({ message: 'response data ', response});
    })
    .catch(function(error) {
      console.log("Error subscribing to topic:", error);
      res.status(500).send({ message: 'response data ', error});
    });
});

// Documentación https://firebase.google.com/docs/cloud-messaging/admin/send-messages
app.post('/sendMessanging', function(req, res){
  const topic = 'newnews';
  // console.log('data post -> ', req.body);
  // res.status(200).send({ message: 'response data '});
  const payload = req.body;
  admin.messaging().sendToTopic(topic, payload)
    .then(function(response) {
      // See the MessagingTopicResponse reference documentation for the
      // contents of response.
      console.log("Successfully sent message:", response);
      res.status(200).send({ message: 'response data ', response});
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
      res.status(500).send({ message: 'response data ', error});
    });
});

module.exports = app;

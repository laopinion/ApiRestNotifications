'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const admin = require("firebase-admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Documentación -> https://firebase.google.com/docs/cloud-messaging/admin/manage-topic-subscriptions
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notificacionesop.firebaseio.com'
});

app.get('/createToken/:token', function(req, res){
  // console.log('Create token post ', req.params.token);
  const currentToken = req.params.token.slice(6);
  // console.log('Create token post ', currentToken);

  // console.log('Key -> ', config.key);

  const topic = 'newnews';

  admin.messaging().subscribeToTopic(currentToken, topic)
    .then(function(response) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully subscribed to topic:", response);
      res.status(200).send({ message: 'response data ', data});
    })
    .catch(function(error) {
      console.log("Error subscribing to topic:", error);
      res.status(500).send({ message: 'response data ', error});
    });

  // const url = 'https://iid.googleapis.com/iid/v1/'+currentToken+'/rel/topics/newnews';
  
  // fetch(url, {
  //   'method': 'POST',
  //   'headers': {
  //     'Authorization': 'key=' + config.key,
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(function(response){
  //   return response.json();
  // })
  // .then(function(data){
  //   console.log(data);
  //   res.status(200).send({ message: 'response data ', data});
  // })
  // .catch(function(error) {
  //   console.error(error);
  //   res.status(500).send({ message: 'response data ', error});
  // })

});

module.exports = app;

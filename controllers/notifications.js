'use strict'

const admin = require("firebase-admin");

// Documentación -> https://firebase.google.com/docs/cloud-messaging/admin/manage-topic-subscriptions
// const serviceAccount = require('../serviceAccountKey.json');
const serviceAccount = require('../serviceAccountKeyProd.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://notificacionesop-a233e.firebaseio.com'
});

/*
  // dev:  
  databaseURL: 'https://notificacionesop.firebaseio.com'

  Datababaseurl prodcution
  databaseURL: "https://notificacionesop-a233e.firebaseio.com"
 */
function createToken(req, res){
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
}

// Documentación https://firebase.google.com/docs/cloud-messaging/admin/send-messages
function sendMessanging(req, res){
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
}

module.exports = {
  createToken,
  sendMessanging
}
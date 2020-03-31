const express = require('express');

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes
  .post('/sessions', SessionController.create)

  .get('/ongs', OngsController.index)
  .post('/ongs', OngsController.create)

  .get('/profile', ProfileController.index)

  .get('/incidents', IncidentController.index)
  .post('/incidents', IncidentController.create)
  .delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

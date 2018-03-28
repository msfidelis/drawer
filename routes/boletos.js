'use strict';

const boletosController     = require('../modules/boletos/controllers/boletos');
const bradescoController    = require('../modules/boletos/controllers/bradesco');
const itauController    = require('../modules/boletos/controllers/itau');
const santanderController    = require('../modules/boletos/controllers/santander');

module.exports = app => {
    app.post('/boletos/bradesco', bradescoController.create);
    app.post('/boletos/santander', santanderController.create);
    app.post('/boletos/itau', itauController.create);
    app.get('/boletos/:id', boletosController.read);
};
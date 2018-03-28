'use strict';

const printerController = require('../modules/printer/controllers/printer');

module.exports = app => {

    app.post('/printer', printerController.create);



    app.get('/printer/:id', (req, res) => {});

}
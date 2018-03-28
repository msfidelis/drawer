'use strict';

const express       = require('express');
const consign       = require('consign');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const helmet 	    = require('helmet');
const cors	        = require('cors');
const validator     = require('express-validator');
const exphbs        = require('express-handlebars');
const path          = require('path');
const Promise       = require('bluebird');

const helpers = {};

module.exports = () => {

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    // app.use(helmet()); 
    app.use(cors());
    app.use(validator());

    app.engine('handlebars', 
        exphbs({ 
            defaultLayout: 'boleto', 
            helpers: helpers 
        })
    );
    
    app.set('view engine', 'handlebars');

    app.use(express.static(path.join(__dirname, '../static')));

    consign()
        .include('routes')
        .into(app);

    return app;
}
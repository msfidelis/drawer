'use strict';

const hash  = require('take-my-hash');
const pdf   = require('../../../lib/pdf');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create = (req, res) => {

    const options = { 
        format: 'Letter', 
        base: req.protocol + '://' + req.get('host') 
    };

    const key = hash.sha1(JSON.stringify(new Date()));
    const body = req.body.html;
    const savePath = `tmp/printer/${key}.pdf`;

    pdf.file(body, savePath, options)
        .then(success => res.status(201).json({status: 201, id: key, link: success.filename}))
        .catch(err => res.status(500).json(err));

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.read = (req, res) => {

};
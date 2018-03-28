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
    const filename = `${key}.pdf`;
    const link = req.protocol + '://' + req.get('host') + '/printer/' + key;

    pdf.store(body, filename, options)
        .then(success => res.status(201).json({id: key, status: 201, link: link, savepath: success.filename}))
        .catch(err => res.status(500).json(err));

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.read = (req, res) => {
    const key = req.params.id;
    const filename = `${key}.pdf`;

    pdf.read(key).then(stream => {
        res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        stream.pipe(res);
    });

};
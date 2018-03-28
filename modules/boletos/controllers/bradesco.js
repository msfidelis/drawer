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
        base: req.protocol + '://' + req.get('host') // Assets
    };
    
    res.render('boletos/bradesco', (err, data) => {

        const key = hash.sha1(JSON.stringify(new Date()));
        const savePath = `tmp/boletos/bradesco/${key}.pdf`;
        
        pdf.file(data, savePath, options)
            .then(success => res.status(201).json({status: 201, id: key, link: success.filename}))
            .catch(err => res.status(500).json(err));

    });

};
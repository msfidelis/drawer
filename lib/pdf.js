'use strict';

const raj   = require('raj-tools');
const hash  = require('take-my-hash');
const pdf   = require('html-pdf');
const Promise = require('bluebird');

/**
 * Convert PDF to a File
 * @param {*} html 
 * @param {*} path 
 * @param {*} options 
 */
module.exports.file = (html, path, options = {}) => {

    return new Promise ((resolve, reject) => {

        const  defaultOptions = { 
            format: 'Letter' 
        };

        const mergedOptions = raj.merge(defaultOptions, options);

        console.log(mergedOptions);

        pdf.create(html, mergedOptions).toFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });

    });


};
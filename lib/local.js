'use strict';

const pdf       = require('html-pdf');
const Promise   = require('bluebird');
const raj       = require('raj-tools');
const fs        = require('fs');


class LocalStorage {
    
    constructor() {};

    /**
     * Save PDF file on Localstorage
     * @param {*} html 
     * @param {*} filename 
     * @param {*} options 
     */
    save(html, filename, options = {}) {
        return new Promise ((resolve, reject) => {

            const path = `tmp/${filename}`;

            const  defaultOptions = { 
                format: 'Letter'
            };
    
            const mergedOptions = raj.merge(defaultOptions, options);
        
            pdf.create(html, mergedOptions).toFile(path, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
    
        })
    };

    /**
     * Read PDF on Storage
     * @param {*} key 
     */
    read(key) {

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(`tmp/${key}.pdf`);
            resolve (stream);
        })

    };

}

module.exports = new LocalStorage();
'use strict';

const raj   = require('raj-tools');
const hash  = require('take-my-hash');
const pdf   = require('html-pdf');
const Promise = require('bluebird');
const S3    = require('./s3');
const localStorage = require('./local');

/**
 * Convert PDF to a File
 * @param {*} html 
 * @param {*} path 
 * @param {*} options 
 */
// module.exports.file = (html, path, options = {}) => {

//     return new Promise ((resolve, reject) => {

//         const  defaultOptions = { 
//             format: 'Letter' 
//         };

//         const mergedOptions = raj.merge(defaultOptions, options);

//         console.log(mergedOptions);

//         pdf.create(html, mergedOptions).toFile(path, (err, data) => {
//             if (err) reject(err);
//             resolve(data);
//         });

//     });

// };


module.exports.buffer2s3 = (html, options) => {

};


class PDF {
    
    /**
     * 
     */
    constructor() {

        if (process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY) {
            this.storage = S3;
        } else {
            this.storage = localStorage;
        }

    }

    /**
     * Store file using the adapter
     * @param {*} html 
     * @param {*} filename 
     * @param {*} options 
     */
    store(html, filename, options = {}) { 
        return this.storage.save(html, filename, options);
    } 

    /**
     * Read a File
     * @param {*} key 
     */
    read(key) {
        return this.storage.read(key);
    }
    
    /**
     * Send to Temp Folder - Used on Development mode
     * @param {*} html 
     * @param {*} path 
     * @param {*} options 
     */
    sendToLocalPath(html, filename, options = {}) {
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
    
        });
    }

    sendTos3() {

    }
}

module.exports = new PDF();
const formidable = require('formidable');
const fs  =require('fs');
const _ = require('lodash');


// Product Schema
const Product = require('../models/product');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');

// Create a new product
exports.create = async(req, res) => {
    
    // Formidable is used to handle form data. we are using it to hanf=dle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true // Extension for images

    form.parse(req, (err, fields, files) => {
        if(err)
        {
            return res.status(400).json({msg: 'Image could not be uploaded'});
        }

        // Create new product now
        let product = new Product(fields);

        // Handle files
        if(files.photo)
        {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        // Save the new product
        product.save((err, data) => {
            if(err)
            return res.status(400).json({msg: errorHandler(err)});

            res.json({
                product: data
            });
        });

    });

};
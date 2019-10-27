const formidable = require('formidable');
const fs  =require('fs');
const _ = require('lodash');


// Product Schema
const Product = require('../models/product');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');


// Find product by id
exports.productById = async(req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product)
        {
            return res.status(400).json({msg: 'Product not found'});
        }

        req.product = product;
        next();
    });
};

// Get a single product
exports.read = async(req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// Create a new product
exports.create = async(req, res) => {
    
    // Formidable is used to handle form data. we are using it to handle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true // Extension for images

    form.parse(req, (err, fields, files) => {
        if(err)
        {
            return res.status(400).json({msg: 'Image could not be uploaded'});
        }

        // check for all fields
        const {name, description, price, quantity, category, shipping} = fields;
        if(!name || !description || !price || !quantity || !category || !shipping)
        {
            return res.status(400).json({
                err: "All fields are required"
            })
        }

        // Create new product now
        let product = new Product(fields);

        // Handle files
        if(files.photo)
        {
            // Validate file size less than 1 MB
            if(files.photo.size > 1000000)
            {
                return res.status(400).json({
                    msg: "File size should be less than 1 mb"
                })
            }

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

// Update a product
exports.update = async(req, res) => {
    // Formidable is used to handle form data. we are using it to handle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true // Extension for images

    form.parse(req, (err, fields, files) => {
        if(err)
        {
            return res.status(400).json({msg: 'Image could not be uploaded'});
        }

        // check for all fields
  //      const {name, description, price, quantity, category, shipping} = fields;
  //        if(!name || !description || !price || !quantity || !category || !shipping)
  //      {
  //        return res.status(400).json({
  //          err: "All fields are required"
  //    })
  // }

        // Update product
        let product = req.product;
        product = _.extend(product, fields);

        // Handle files
        if(files.photo)
        {
            // Validate file size less than 1 MB
            if(files.photo.size > 1000000)
            {
                return res.status(400).json({
                    msg: "File size should be less than 1 mb"
                })
            }

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

}

// Delete a product
exports.remove = async(req, res) => {
    let product = req.product;

    // Remove from DB
    product.remove((err, deletedProduct) => {
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            msg: "Product successfully deleted"
        })
    });

};
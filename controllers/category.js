const Category = require('../models/category');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = async(req, res) => {
    const category = new Category(req.body);

    await category.save((err, data) => {
        if(err)
        {
            return res.status(400).json({error: errorHandler(err)});
        }

        else
        res.json({
            category: data
        })
    });
};
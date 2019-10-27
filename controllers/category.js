const Category = require('../models/category');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');


// Get categpry by id
exports.categoryById = async(req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category)
        {
            return res.status(400).json({error: "Category does not exist"});
        }
        req.category = category;
        next();
    });
}

// Read all categories
exports.read = async(req, res) => {
    
    return res.json(req.category);
};


// Create new category
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
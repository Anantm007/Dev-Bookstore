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

// Get a single category
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

// Update a category
exports.update = async(req, res) => {
    const category = req.category;

    // update the only field i.e. name
    category.name = req.body.name;
    category.save((err, data) => {
        if(err)
        {
            return res.status(400).json({msg: errorHandler(err)})
        }

        return res.json(data);
    });
};


// Delete a category
exports.remove = async(req, res) => {
    const category = req.category;

    category.remove((err, data) => {
        if(err)
        {
            return res.status(400).json({msg: errorHandler(err)})    
        }

         return res.json({
            msg: "Category successfully deleted"
        });
    })

};


// Get all categories
exports.list = async(req, res) => {
    Category.find().exec((err, data) => {
        if(err)
        {
            return res.status(400).json({msg: errorHandler(err)})
        }

        return res.json(data);
    });
};
const User = require('../models/user');
const {Order} = require('../models/order');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');

// Find user by id
exports.userById = async(req, res, next, id) => {
    
    User.findById(id).exec((err, user) => {
        if(err)
        return res.status(400).json({msg: "User not found"});

        // Add to object req and return user
        req.profile = user;

        next();
    })
};

// Get a single logged in user
exports.read = async(req, res) => {
    // Don't send password and salt
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

// Update a user profile
exports.update = async(req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {
        if(err)
        return res.status(400).json({msg: "You are not authorized to perform this action"});
        
        user.hashed_password = undefined;
        user.salt = undefined;
    
        return res.json(user);
        
    });
}

// Purchase history of the user
exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

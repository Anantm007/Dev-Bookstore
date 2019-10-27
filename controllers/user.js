const User  =require('../models/user');

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
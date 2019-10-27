const User = require('../models/user');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');


// Signup a new user
exports.signup = async(req, res) => {
    
    // Create New User
    const user = new User(req.body);

    // Save
    await user.save((err, user) => {
        if(err)
        {
            return res.status(400).json({msg: errorHandler(err)});
        }

        user.hashed_password = undefined;
        user.salt = undefined;
        
        res.json({user});
    })
}
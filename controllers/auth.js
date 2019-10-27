const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check 

// User Schema
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
};

// Signin existing user
exports.signin = async(req, res) => {
    
    // find user based on email
    const {email, password} = req.body;

    const user = await User.findOne({email});

    // If user is found
    if(user)
    {
        // make sure email and password match
        // create authenticate method in user model
        if(!user.authenticate(password))
        {
            return res.json(401).json({err: "Invalid Credentials"})
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})

        // return response with user and send to client
        const{_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
    }

    else
    return res.status(400).json({err: "Email not fuond"})


};

// Signout User
exports.signout = async(req, res) => {
    res.clearCookie('t')
    res.json({msg: "You have successfully logged out"})
}

// Use as middleware to protect routes
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

// Middleware for currently logged in user
exports.isAuth = async(req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user)
    {   
        return res.status(403).json({err: "Access denied"});
    }

    next();
};


// Middleware for Admin
exports.isAdmin = async(req, res, next) => {
    
    // Not Admin
    if(req.profile.role === 0)
    {
        console.log("object");
        return res.status(403).json({err: "Admin access required"});
    }    

    next();
};
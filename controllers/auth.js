const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check 

// Config Variables
require('dotenv').config();

// User Schema
const User = require('../models/user');

// Handle database error
const {errorHandler} = require('../helpers/dbErrorHandler');

// nodemailer to send emails
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : false,
    port : 25,
    auth : {
        user : process.env.EMAILID,
        pass : process.env.EMAILPASSWORD
    },
    tls : {
        rejectUnauthorized : false
    }});




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

    // Send welcome email
    let HelperOptions ={

        from : process.env.NAME + '<'+ (process.env.EMAILID)+'>' ,
        to : user.email,
        subject : "Welcome to Dev Bookstore",
        text : "Hello " + user.name + ", \n\nWelcome to Dev BookStore. This is a fully functional e-commerce app built on MERN stack along with payment gateway. \nAny suggestions are always welcome. \n\nRegards, \nAnant Mathur"
    };

    transporter.sendMail(HelperOptions,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent");
    });
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
            return res.status(401).json({err: "Invalid Credentials"})
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
        return res.status(403).json({err: "Admin access required"});
    }    

    next();
};
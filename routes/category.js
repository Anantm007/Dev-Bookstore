const express = require('express');
const router = express.Router();

// Middleware
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');

// Require the actual controller
const { categoryById, create, read} = require('../controllers/category');

// Routes
router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);


// Automatically run this function and populate in req when a parameter is found
router.param('categoryId', categoryById);
router.param("userId", userById);

module.exports = router;
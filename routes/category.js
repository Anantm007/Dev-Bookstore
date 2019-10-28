const express = require('express');
const router = express.Router();

// Middleware
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');

// Require the actual controller
const { categoryById, create, read, update, remove, list} = require('../controllers/category');

// Routes
router.get('/category/:categoryId', read);
router.get('/categories', list);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);


// Automatically run this function and populate in req when a parameter is found
router.param('categoryId', categoryById);
router.param("userId", userById);

module.exports = router;
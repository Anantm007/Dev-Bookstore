const express = require('express');
const router = express.Router();

// Middleware
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');

// Require the actual controller
const {create, productById, read, remove, update} = require('../controllers/product');

// Routes
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove )
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update )


// Automatically run this function and populate in req when a parameter is found
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
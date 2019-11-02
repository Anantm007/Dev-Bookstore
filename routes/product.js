const express = require('express');
const router = express.Router();

// Middleware
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');

// Require the actual controller
const {create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, listSearch, photo} = require('../controllers/product');

// Routes
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/categories', listCategories);
router.get('/products/related/:productId', listRelated);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove )
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update )
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

// Automatically run this function and populate in req when a parameter is found
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
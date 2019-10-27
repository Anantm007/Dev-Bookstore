const express = require('express');
const router = express.Router();

// Middleware
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');

// Require the actual controller
const {create} = require('../controllers/category');

// Routes
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);


router.param("userId", userById);

module.exports = router;
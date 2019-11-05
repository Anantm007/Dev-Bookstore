const express = require('express');
const router = express.Router();

const {requireSignin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {generateToken, processPayment} = require('../controllers/braintree');


router.param('userId', userById);

module.exports = router;
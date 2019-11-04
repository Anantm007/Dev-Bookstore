const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config()

// Connect to braintree payment gateway
const gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT_ID,
    publicKey:    process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:   process.env.BRAINTREE_PRIVATE_KEY
});

// Generate token for user and send to client
exports.generateToken = async(req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if(err)
        {
            res.status(500).json({msg: "Server error"});
        }

        else
        {
            res.json(response)
        }
    })
};

// Process payment
exports.processPayment = async(req, res) => {
    let nonceFromClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    // charge
    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result) => {
        if(error)
        {
            res.status(500).json(error);
        }

        else
        {
            res.json(result);
        }
    })
}
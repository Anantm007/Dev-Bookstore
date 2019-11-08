// Schema and error handler
const {Order, CartItem} = require('../models/order');
const {errorHandler} = require("../helpers/dbErrorHandler");
const User = require("../models/user");
// Create order
exports.create = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

// Push order to user history
exports.addOrderToUserHistory = async(req, res, next) => {
    let history = []

    // Order to be saved
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    });

    // Push order history in database by updating user order history
    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (err, data) => {
        if(err)
        {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            })
        }

        next();
    })
}

exports.listOrders = async(req, res) => {
    Order.find()
    .populate('user', "_id name address")
    .sort('-created')
    .exec((err, orders) => {
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        return res.json(orders);
    })
}
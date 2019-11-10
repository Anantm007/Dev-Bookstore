// Schema and error handler
const {Order, CartItem} = require('../models/order');
const {errorHandler} = require("../helpers/dbErrorHandler");
const User = require("../models/user");

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



// Return order by id
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
        if(err || !order)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        
        req.order = order;
        next();
    })
}

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

    // Send order confirmation email to user and admin
    let HelperOptions ={

        from : process.env.NAME + '<'+ (process.env.EMAILID)+'>' ,
        to : "anant.mathur007@gmail.com",
        subject : "Hey admin, a purchase has been made!",
        text : "Hello Anant, \n\nA purchase of Rs. " + req.body.order.amount + " has been made by " + req.profile.name + "\n\nRegards, \nDev Bookstore"
    };
    
    transporter.sendMail(HelperOptions,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent");
    });

    let HelperOptions2 ={

        from : process.env.NAME + '<'+ (process.env.EMAILID)+'>' ,
        to : req.profile.email,
        subject : "Your order on Dev Bookstore was successful",
        text : "Hello " + req.profile.name + ", \n\nYou have successfully made purchase of Rs. " + req.body.order.amount + "on Dev Bookstore. Please check your dashboard to track the status of your order.\n\nRegards, \nDev Bookstore"
    };
    
    transporter.sendMail(HelperOptions2,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent");
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

// List all orders for admin
exports.listOrders = (req, res) => {
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

// Return various status values of the enum
exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

// Update order status
exports.UpdateOrderStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (err, order) => {
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(order);
    });
}
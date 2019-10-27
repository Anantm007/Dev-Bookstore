const express = require('express');
const app = express();

// Database
const mongoose = require('mongoose');

// Middleware utilities
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// Config Variables
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');


// MongoDB Setup
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log("Database Connected..."));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Routes middleware
app.use('/api',authRoutes);

// Listening to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
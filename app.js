const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const userRoutes = require('./routes/user');


// MongoDB Setup
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log("Database Connected..."));


// Routes middleware
app.use('/api',userRoutes);

// Listening to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
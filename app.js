const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Setup
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log("Database Connected..."));


// Routes
app.get('/', (req, res) => {
    res.send("Hello from node");
});

// Listening to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
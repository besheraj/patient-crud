const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// Json bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Middlewear


//Connect To DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB')
    })

// Listen
app.listen(4000, () => console.log('Server is up and running'));
const express = require('express');
const mongoose = require('mongoose');
const City = require('./models/City')
const Country = require('./models/Country')
//connect to Mongo Db

mongoose.connect('mongodb://localhost/world')
.then(data => {
    console.log('Mongo DB connection success!')
})
.catch(err => {
    console.log('Mongo DB connection failed: ' + err.message)
})

const app = express();

const cities = require('./routes/cities');
const countries = require('./routes/countries');
app.use('/cities', cities);
app.use('/countries', countries)



app.listen(5000)
console.log('App running on localhost:5000');

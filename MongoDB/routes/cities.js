const express = require('express');
const router = express.Router();
const City = require('../models/City');


router.get('/', (req, res, next) => {
    const query = req.query;

    City.find(query)
    .then(cities => {
        res.json({
            confirmation: 'success',
            data:cities
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
})

router.get('/add', (req, res, next) => {
    const details = req.query
    
    City.create(details)
    .then(
        res.json({
            confirmation: 'success',
            data: details
        })
    )
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
})

router.get('/update/:id', (req, res, next) => {
    const updatedDetails = req.query
    const cityId = req.params.id

    City.findByIdAndUpdate(cityId,  updatedDetails, {new:true})
    .then(city => {
        res.json({
            confirmation: 'success',
            data: city
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
})

router.get('/:id', (req, res, next) => {
    City.findById(req.params.id)
    .then(city => {
        res.json({
            confirmation: 'success',
            data: city
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: 'City ' + req.params.id + ' not found.' 
        })
    })
})


module.exports = router;

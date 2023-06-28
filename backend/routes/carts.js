var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const moment = require("moment")
const Trip = require('../models/carts')

const carts = new carts({
    departure : req.body.departure,
    arrival : req.body.arrival, 
    date : req.body.date, 
    price : req.body.price,
})
        
router.post('/', (req, res) => { 
    Trip.findOne({ trip: { $regex: new RegExp(req.body.trip, 'i') } })
.then(dbData => {
    if (dbData === null) {
        const carts = new carts({
        departure : req.body.departure,
        arrival : req.body.arrival, 
        date : req.body.date, 
        price : req.body.price,
    })
	carts.save().then(newCart => {
        res.json({result :true, carts: newCart})
    })

    }})
});





module.exports = router;
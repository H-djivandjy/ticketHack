var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const moment = require("moment")
const Trip = require('../models/carts')

// const carts = new carts({
//     departure : req.body.departure,
//     arrival : req.body.arrival, 
//     date : req.body.date, 
//     price : req.body.price,
// })

/**
 * La page "cart" affiche tous les trajets ajoutés au panier avec la possibilité de les supprimer.


Au dessous de ces trajets se trouve le total du panier avec un bouton pour les payer. Au clic sur ce bouton,  le panier est vidé, les trajets payés sont enregistrés dans les réservations (bookings) et l’utilisateur est redirigé vers la page bookings.
 */
        
router.post('/', (req, res) => {
    Trip.findOne({ trip: { $regex: new RegExp(req.body.trip, 'i')} })
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
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const moment = require("moment")

//----------- Model Import -----------
const Trip = require('../models/trips');


//----------- Module Function Import -----------
const {checkField} = require('../modules/checkField');
const { format } = require('morgan');


//!________________________________________________________________ Methode 1
// router.get('/', (req,res)=>{
//   //* ------------- FRONT INPUT EXTRACTION -------------
//   const departureInput = req.body.departure
//   const arrivalInput = req.body.arrival
//   const dateInput = req.body.date

//   //* ------------- EMPTY INPUT CHECKING -------------
//   if(!checkField(req.body, ["departure", "arrival", "date"])){
//     res.json({result:   false, error: 'Missing or empty fields'})
//     return;
//   } 
  
//   //* ---------- FrontEnd DATE FORMATING -----------------
//   const dateYear = dateInput.substr(6, 9);
//   const dateMonth = dateInput.substr(3, 2);
//   const dateDay = dateInput.substr(0, 2);

//   const frontDateFormatted = `${dateYear}-${dateMonth}-${dateDay}`

//   //__________________________________________
//   //// const regexPattern = new RegExp(`^${frontDateFormatted}`);
//   //// date: { $regex: regexPattern } 
//   //// const pattern = /^(\d{4}-\d{2}-\d{2})/
//   //__________________________________________

//   Trip.find({departure: { $regex : new RegExp(departureInput, "i") }, arrival: { $regex : new RegExp(arrivalInput, "i")} }).then(dbData_FilteredByReq =>{
    
    
//     for (let i =0; i< dbData_FilteredByReq.length; i++){
//       //----------------> Converting ISO DB date into string
//       const DbDate_str = dbData_FilteredByReq[i].date.toISOString()
//       //----------------> Matching frontend date with DB date
//       const searchResult = DbDate_str.startsWith(frontDateFormatted) 

//       if (searchResult){
//         const targetTrip = []
//         targetTrip.push(dbData_FilteredByReq[i])
//         console.log(targetTrip)
//         //! ------------ RES not working !!!
//         // res.json({ result: true, trips : targetTrip })
//         // res.json({ result: true, trips : dbData_FilteredByReq[i] })
//         //  res.json({ trips : targetTrip })
//       }
      
//     }

//   })
  
// })


//!________________________________________________________________ Methode 2

router.post('/', (req, res) => {
  // const { departure, arrival, date } = req.body;
  const departure = req.body.departure
  const arrival = req.body.arrival
  const date = req.body.date

  console.log(date)

  //* ------------- EMPTY INPUT CHECKING -------------
  // if (!checkField(req.body, ["departure", "arrival", "date"])) {
  //   res.json({ result: false, error: 'Missing or empty fields' });
  //   return;
  // }
  //* ---------- FrontEnd DATE FORMATING -----------------
  const dateYear = date.substr(0, 4);
  const dateMonth = date.substr(5, 2);
  const dateDay = date.substr(8, 2);
  const frontDateFormatted = `${dateYear}-${dateMonth}-${dateDay}`;
  // console.log( frontDateFormatted)
  
  //* ---------- Matching Trip Extraction -> DB -----------------
  Trip.find({
    departure: { $regex: new RegExp(departure, "i") },
    arrival: { $regex: new RegExp(arrival, "i") }
  }).then(dbData_FilteredByReq => {
    const targetTrips = dbData_FilteredByReq.filter(trip => {
      const dbDate_str = trip.date.toISOString();
      return dbDate_str.startsWith(frontDateFormatted);
    });

    res.json({ result: true, trips: targetTrips });
  }).catch(error => {
    console.error(error);
    res.json({ error: 'Sorry, could not find itinary' });
  });
});


    
/**
 * La page "cart" affiche tous les trajets ajoutés au panier avec la possibilité de les supprimer.


Au dessous de ces trajets se trouve le total du panier avec un bouton pour les payer. Au clic sur ce bouton,  le panier est vidé, les trajets payés sont enregistrés dans les réservations (bookings) et l’utilisateur est redirigé vers la page bookings.
 */





module.exports = router;

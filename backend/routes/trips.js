var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

//----------- Model Import -----------
const Trip = require('../models/trips');


//----------- Module Function Import -----------
const {checkField} = require('../modules/checkField')


router.get('/', (req,res)=>{
  let userInput = []
  const departureInput = req.body.departure
  const arrivalInput = req.body.arrival
  userInput.push(departureInput,arrivalInput )
  // console.log(userInput)

  if (!departureInput || !arrivalInput){
    res.json({ result: false, error: 'Empty field'})
  }else{
    res.json({ result: true, message: userInput})

  }
  // const departureInput = req.body.departure
  // const arrivalInput = req.body.arrival

  // Trip.find().then(data =>{
  //   console.log(data)
  //   res.json({ trips : data })
  // })

})


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });




module.exports = router;

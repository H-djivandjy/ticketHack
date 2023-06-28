var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// ----------- DB Connection --------------
require('./models/connection');


//----------- ROUTES IMPORT ---------------
var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');

const cors = require('cors');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//----------- ROUTES PREFIX --------------
app.use('/', indexRouter);
app.use('/trips', tripsRouter);

module.exports = app;

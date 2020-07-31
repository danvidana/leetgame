const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();

// connection to  db
mongoose.connect('mongodb://localhost/crud-mongo')
        .then(db => console.log('db connected'))
        .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');
const { ppid } = require('process');
const { proppatch } = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
//app.use(express.static('src/public'));

app.use(require("./controllers/authController"));


//routes
app.use('/', indexRoutes);

app.use('/public', express.static('public'));

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})

module.exports = app;

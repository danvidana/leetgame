const mongoose = require("mongoose");
const config = require('./config');

mongoose.connect(config.db ,{
    userNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Database is connected database.js"))
.catch(err => console.log("Error", err))
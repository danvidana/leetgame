const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.db ,{
    userNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Database is connected"))
.catch(err => console.log("Error", err))
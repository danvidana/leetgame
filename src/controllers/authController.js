const express = require("express");
const router = express.Router();
const User = require("../model/User");
//const jwt = require("jsonwebtoken");
const config = require("../config");
const path = require("path");
const cookieParser = require("cookie-parser");


//Para registrar un usuario

router.post("/signup", async(req,res,next) => {
    const {username, email, password} = req.body;

    const user = newUser({
        username,
        email,
        password
    });

    user.password = await user.encryptPassword(user.password);
    
    await user.save();

    console.log(user);
    res.json(user);
})

module.exports = router;

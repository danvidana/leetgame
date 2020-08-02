const express = require('express');
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyToken = require("./verifyToken")

// Para que el usuario se registre
router.post("/signup",async (req,res,next)=>{
     const {username,email,password} = req.body
   
    const user = new User({
        username:username,
        email: email,
        password: password
    });
    
   user.password = await user.encryptPassword(user.password);
  await user.save();
//    const token =  jwt.sign({id:user._id ,
//                             idAdmin:true,
// },config.secret,{
//         expiresIn: 60*60*24
//     })
     res.json({auth:true, token})
})








module.exports = router;
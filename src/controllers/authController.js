const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
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

// Para que el usuario haga login
router.post("/login",async (req,res,next)=>{
    console.log(req.body)
    const {email,password} = req.body;
   
    const user = await User.findOne({email:email});
    console.log(email,password)
    if (!user){
        return res.status(404).send("The user does not exist")
    }
    else {
      const valid =  await user.validatePassword(password)
      if (!valid){
          return res.status(401).json({auth:false,token:null});
      }
      else {
       const token =  jwt.sign({id:user._id}, config.secret,{
            expiresIn: 60*60*24
        })
        res.cookie('token', token , {
            httpOnly:true,
            maxAge: 30000
        })
     res.redirect('home')

      }
      
    }
})

module.exports = router;

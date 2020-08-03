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

// Para que el usuario haga login
router.post("/login",async (req,res,next)=>{
    console.log(req.body)
    const {email,password} = req.body;
   
    const user = await User.findOne({email:email});
    console.log(email,password)
    if (!user){
       // return res.status(404).send("The user does not exist")

       const user = new User({
        email: email,
        password: password
    });
    
   user.password = await user.encryptPassword(user.password);
  await user.save();
   const token =  jwt.sign({id:user._id ,
                            idAdmin:true,
},config.secret,{
        expiresIn: 60*60*24
    })
    // res.json({auth:true, token})
     res.redirect('/')
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

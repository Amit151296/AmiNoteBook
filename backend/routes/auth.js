const express = require('express')
const routes = express.Router()
const User=require("../models/User")
const { body, validationResult } = require('express-validator');


//create a user POST -api/auth/createuser Not need of authentication. 
routes.post('/createUser',
   [
    body('username',"Please Enter valid user Name").isLength({min:3}),
    body('email',"Please Enter correct format of email").isEmail(),
    body('password',"Enter more the 5 character").isLength({ min: 5 }),
   ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    try {
        const dublicatmail=await User.findOne({"email":req.body.email})
        console.log(dublicatmail)
        if (dublicatmail){
          return res.status(400).json({"error":"The user with same email already exists"})
        }
     
    const user= await User.create({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
      })

    return res.status(200).json({"success":`${req.body.username} your entry has been save`})
    } catch (error) {
      return res.status(500).json({"error":error})
    }
    
})

module.exports=routes
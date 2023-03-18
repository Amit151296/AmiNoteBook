const express = require('express')
const routes = express.Router()
const User=require("../models/User")
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET="A@m#it15$%#"
//create a user POST -api/auth/createuser Not need of authentication. 
routes.post('/createUser',
   [
    body('username',"Please Enter valid user Name").isLength({min:3}),
    body('email',"Please Enter correct format of email").isEmail(),
    body('password',"Enter more the 5 character").isLength({ min: 5 }),
   ], async (req, res) => {
    
    //validating request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    
    //checking if user already exist
    try {
        const dublicatmail=await User.findOne({"email":req.body.email})
        if (dublicatmail){
          return res.status(400).json({"error":"The user with same email already exists"})
        }
        
        // creating hash of password with the help of salt
        const salt =await bcrypt.genSalt(10);
        const securePassword =await bcrypt.hash(req.body.password, salt);
        
        //inserting data into user
        const user= await User.create({
            username: req.body.username,
            email:req.body.email,
            password: securePassword,
          })
        
        //generating authentication token with the help of JWT
        const data={"_id":user._id}
        const authToken = jwt.sign(data, JWT_SECRET);

    return res.status(200).json({"success":authToken})
    } catch (error) {
      return res.status(500).json(error)
    }
    
})

//login endpoint method -POST
routes.post('/login',async (req, res) => {
    
  const {email,password}=req.body
  try {
      //Not Allow 1) Email id not in Database 2) password is incorrect.
      const user =await User.findOne({"email":email})
      const comparePass = await bcrypt.compare(password,user.password)
      if (!user || !comparePass){
        return res.status(401).json({"Authentication Error":"Please Authenticate with correct credential"})
      }
        //generating authentication token with the help of JWT
        const data={"_id":user._id}
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({"success":authToken})

    } catch (error) {
      return res.status(500).json({"error":error.message})
    }
})

module.exports=routes
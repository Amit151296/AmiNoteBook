const express = require('express')
const routes = express.Router()
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
// const user = require("../models/Users")
//create a user POST -api/auth/createuser Not need of authentication. 
routes.post('/createUser',
   [
    body('username',"Please Enter valid user Name").isLength({min:3}),
    body('email',"Please Enter correct format of email").isEmail(),
    body('password',"Passwoed length should greater then 5").isLength({ min: 5 }),
   ],(req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    //Frist method to save users in Database from request body
    // const user=User(req.body)
    // user.save()

    // Method 2
    User.create({
      username: req.body.username,
      email:req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
      .catch(err => console.log(err.message));
    
})


module.exports=routes
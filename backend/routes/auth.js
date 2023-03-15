const express = require('express')
const routes = express.Router()
const User=require("../models/User")
// const user = require("../models/Users")
//create a user POST -api/auth/createuser Not need of authentication. 
routes.post('/createUser', (req, res) => {
    console.log(req.body)
    const user=User(req.body)
    user.save()
    obj=[{"name":"Amit"},{"role":"Software Engineer"}]
    res.send(req.body)
})


module.exports=routes
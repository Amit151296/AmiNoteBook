const express = require('express')
const routes = express.Router()

routes.post('/', (req, res) => {
    console.log(req.body)
    obj=[{"name":"Amit"},{"role":"Software Engineer"}]
    res.send(obj)
})


module.exports=routes
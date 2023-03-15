const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    const notesName=req.query.name
    msg=`The name of the notes is ${notesName}`
    res.send(msg)
})


module.exports=routes
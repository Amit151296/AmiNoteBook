const express = require('express')
const Notes = require("../models/Notes")
const routes = express.Router()
const jwt = require('jsonwebtoken');
const JWT_SECRET = "A@m#it15$%#"
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult} = require('express-validator');


// Get All the Notes - GET :- api/notes/fetchallnotes (Login required)
routes.get('/fetchallnotes', fetchUser, async (req, res) => {
  const userId = req._id
  const notes = await Notes.find({ "user": userId })
  if (!notes) {
    return res.status(500).json({ "error": "Some error occurs" })
  }
  return res.status(200).json({ "success": notes })
})


//Add notes  POST :- api/notes/addnotes (login required)
routes.post('/addnotes', fetchUser,
  [
    body('title', "Please enter atleast 3 character").isLength({ min: 3 }),
    body('description', "Please enter at least 5 character").isLength({ min: 5 })
  ],
  async (req, res) => {

    //validating request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req._id
    const { title, description, tag } = req.body
    //checking if user already exist
    try {
      //inserting data into Notes
      const notes = await Notes.create({
        "user": userId,
        "title": title,
        "description": description,
        "tag": tag
      })
      return res.status(200).json({ "success": notes})
    } catch (error) {
      return res.status(500).json(error.message)
    }

  })
//Update the user notes  PUT :- api/notes/updatenotes (login required)
routes.put('/updatenotes/:id',fetchUser,async (req, res) => {

    try {
      const userId = req._id
      const id=req.params.id
      const note=await Notes.findById(id)
      //If invaild id then will send not found error
      if(!note){
        res.status(404).send("No Notes found")
      }

      //validating same person wants to access there note only
      if (note.user.toString() != userId){
        res.status(401).send("Not Allow")
      }

      const {title,description,tag}=req.body
      const updatedNotes={}
      if(title && title.length>3){updatedNotes.title=title}
      if(description && description.length>5)(updatedNotes.description=description)
      if(tag)(updatedNotes.tag=tag)
      // newNote=await Notes.findByIdAndUpdate(id,{$set:updatedNotes},{new:true})
      newNote=await Notes.findByIdAndUpdate(id,updatedNotes,{new:true})

      return res.status(200).json({ "success": newNote})
      //inserting data into Notes
    
    } catch (error) {
      return res.status(500).json(error.message)
    }

  })

//Api for delete the nodes
routes.delete('/deletenote/:id',fetchUser,async (req, res) => {

    try {
      const userId = req._id
      const id=req.params.id
      const note=await Notes.findById(id)
      //If invaild id then will send not found error
      if(!note){
        res.status(404).send("No Notes found")
      }

      //validating same person wants to access there note only
      if (note.user.toString() != userId){
        res.status(401).send("Not Allowed")
      }

      delnotes=await Notes.findByIdAndDelete(id)

      return res.status(200).json({ "success": delnotes})
      //inserting data into Notes
    
    } catch (error) {
      return res.status(500).json(error.message)
    }

  })


module.exports = routes
const express = require('express');

const router = express.Router();

const Entry = require('../models/Entry.model');
const Log = require('../models/Log.model');



// Get All //////////////////////////////////////////////////

router.get("/entrys", async (req, res)=>{
    try{
        const allEntrys = await Entry.find().populate("log")
        res.status(200).json(allEntrys);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Entry"});
    }
}); 



// Get by id //////////////////////////////////////////////////

router.get("/entrys/:id", async (req, res) => {
    try {
    // destructure the id via route params
    const {id} = req.params;
    
    // find the user via Id.
    const singleEntry = await Entry.findById(id).populate("log")
    res.status(200).json(singleEntry);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the entrys"});
    }
});



// Create //////////////////////////////////////////////////

router.post("/entrys", async (req, res) => {
    const {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image , cochort , projects } = req.body;

    try{
    const newEntry = await Entry.create({title, value, description});

    res.status(200).json(newEntry);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Entry"});
    }
});



// Update //////////////////////////////////////////////////

router.put("/entrys/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {title, value, description} = req.body

      /* Find the user via the id and send it back to the client */
      const updateEntry = await Entry.findByIdAndUpdate(id, {title, value, description}, { new: true });
      res.status(200).json(updateEntry);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Log"});
    }
  });



// Delete //////////////////////////////////////////////////

router.delete("/entrys/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
        await Entry.findByIdAndDelete(id);
      res.status(204).json("Entry was deleted");
    } catch (error) {
        res.status(500).json({message: "Error while creating the Entry"});
    }
  });

module.exports = router;
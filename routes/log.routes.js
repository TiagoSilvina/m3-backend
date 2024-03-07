/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Log Routes */
const router = express.Router();

/* Require the Log Model */
const Log = require("../models/Log.model");


/* ROUTES */



// Get All //////////////////////////////////////////////////

router.get("/logs", async (req, res)=>{
    try{
        const allLogs = await Log.find()
        res.status(200).json(allLogs);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Log"});
    }
}); 



// Get by id //////////////////////////////////////////////////

router.get("/logs/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
        // find the user via Id.
    const singleLog = await Log.findById(id);
    res.status(200).json(singleLog);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the Log"});
    }
});



// Create //////////////////////////////////////////////////

router.post("/logs", async (req, res) => {
    const {title, somethingElse} = req.body;

    try{
    const newLog = await Log.create({/* poperties */});

    res.status(200).json(newLog);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Log"});
    }
});



// Update //////////////////////////////////////////////////

router.put("/logs/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {title, somethingElse} = req.body

        if( !title|| !somethingElse){
            return res.status(400).json({message: "Please fill all mandatory fields!"})
          }

      /* Find the user via the id and send it back to the client */
      const updateLog = await 
      Log.findByIdAndUpdate(id, {title, somethingElse}, { new: true });
      res.status(200).json(updateLog);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Log"});
    }
  });

  

// Delete //////////////////////////////////////////////////

router.delete("/logs/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;

      /* Find the user via the id and send it back to the client */
      await Log.findByIdAndDelete(id);
      res.status(200).json("Log was deleted");
    } catch (error) {
        res.status(500).json({message: "Error while deleting the Log"});
    }
  })

/* Export the router */ 
module.exports = router;

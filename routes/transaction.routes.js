const express = require('express');

const router = express.Router();

const {isAuthenticated} = require('../middleware/jwt.middleware');

const transaction = require('../models/Transaction.model');

// Create //////////////////////////////////////////////////

router.post("/", isAuthenticated, (req, res) => {

  const {_id}= req.payload;

  const { text,
          type,
          category,
          description,
          amount,
          date,
          receipt,
           } = req.body;

  transaction
    .create({ text,
              type,
              category,
              description,
              amount,
              date,
              receipt,
              user:_id})
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});
// Get All //////////////////////////////////////////////////

router.get("/",isAuthenticated, (req, res) => {

  const {_id}= req.payload;

  transaction
    .find({user:_id})
    .then((allTransaction) => res.json(allTransaction))
    .catch((error) => res.json(error));
});

// Get by id //////////////////////////////////////////////////

router.get("/:transactionId", isAuthenticated, (req, res) => {

  const {_id}= req.payload;

  const { transactionId } = req.params;
  transaction
    .findById(transactionId)
    .populate("user")
    .then((transaction) => res.json(transaction))
    .catch((error) => res.json(error));
});

// Update //////////////////////////////////////////////////

router.put("/:transactionId", (req, res) => {
  // Object destructuring
  const { transactionId } = req.params;
  const { text,
          type,
          category,
          description,
          amount,
          date,
          receipt,
          } = req.body;

  transaction
    .findByIdAndUpdate(transactionId, 
      { text,
        type,
        category,
        description,
        amount,
        date,
        receipt }, { new: true })
    .then(() => {
      res.json({ message: "transaction Updated!" });
    })
    .catch(() => {
      res.json({ message: "Failed to Update transaction." });
    });
});

// Delete //////////////////////////////////////////////////

router.delete("/:transactionId", (req, res) => {
  const { transactionId } = req.params;

  transaction
    .findByIdAndDelete(transactionId)
    .then(() => {
      res.json({ message: "transaction deleted" });
    })
    .catch(() => {
      res.json({ error: "Failed to delete a transaction" });
    });
});

module.exports = router;
const express = require('express');

const router = express.Router();

const transaction = require('../models/Transaction.model');

// Create //////////////////////////////////////////////////

router.post("/transaction", (req, res) => {
  const { text, amount } = req.body;

  transaction
    .create({ text, amount})
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});
 
// Get All //////////////////////////////////////////////////

router.get("/transactions", (req, res) => {
  transaction
    .find()
    .then((allTransaction) => res.json(allTransaction))
    .catch((error) => res.json(error));
});

// Get by id //////////////////////////////////////////////////

router.get("/:transactionId", (req, res) => {
  const { transactionId } = req.params;
  transaction
    .findById(transactionId)
    .then((transaction) => res.json(transaction))
    .catch((error) => res.json(error));
});

// Update //////////////////////////////////////////////////

router.put("/:transactionId", (req, res) => {
  // Object destructuring
  const { transactionId } = req.params;
  const { text, amount} = req.body;

  transaction
    .findByIdAndUpdate(transactionId, { text, amount }, { new: true })
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
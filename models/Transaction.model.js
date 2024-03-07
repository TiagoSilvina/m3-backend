const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
    title: {type: String, required: true},
    value: {type: Number, required: true},
    description: {type: String, required: true},
  })
   
  const Transaction = mongoose.model("Transaction", transactionsSchema);
  module.exports = Transaction;

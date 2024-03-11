const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    text: {type: String, required: true},
    amount: {type: Number, required: true},
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["Income", "Expense"]},
    description: {type: String},
    category: { type: String, enum: 
    ["Debt Payments", "Education", "Entertainment", "Food",
     "Healthcare", "Housing", "Insurance", "Miscellaneous",
      "Transportation", "Salary", "Investments"]},    
  })
   
  const Transaction = mongoose.model("Transaction", transactionSchema);
  module.exports = Transaction;

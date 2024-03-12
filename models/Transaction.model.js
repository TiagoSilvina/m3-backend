const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    text: {type: String, required: true},
    type: { type: String, required: true, 
        enum: ["Income", "Expense"]},
    category: { type: String, required: true, 
        enum: ["Debt Payments", "Education", "Entertainment", "Food",
     "Healthcare", "Housing", "Insurance", "Other",
      "Transportation", "Paycheck", "Investments"]},    
    description: {type: String},
    amount: {type: Number, required: true},
    date: { type: Date, default: Date.now },
    receipt: {type: String},
  })
   
  const Transaction = mongoose.model("Transaction", transactionSchema);
  module.exports = Transaction;

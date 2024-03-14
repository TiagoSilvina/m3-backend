const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    img: {type: String, 
        default:"https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"},
    transctions: [ { type: Schema.Types.ObjectId, ref: "Transaction" }]
  },
  
);

const User = model("User", userSchema);

module.exports = User;

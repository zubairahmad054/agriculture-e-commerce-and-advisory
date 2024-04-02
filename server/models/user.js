const mongoose = require("mongoose");
const User = new mongoose.Schema({
  Uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Cpassword: { type: String, required: true },
  loc: { type: String, required: true },
  type: { type: String, required: true },
  phone: { type: Number, required: false, default: null },
});

const model = mongoose.model("User", User);
module.exports = model;

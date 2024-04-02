const mongoose = require("mongoose");
const bloges = new mongoose.Schema({
  image: { type: String, required: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
});

const model = mongoose.model("bloges", bloges);
module.exports = model;

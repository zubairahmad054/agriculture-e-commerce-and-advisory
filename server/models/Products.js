const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rented: { type: Boolean, required: true, default: false },
});

const model = mongoose.model("products", productsSchema);
module.exports = model;

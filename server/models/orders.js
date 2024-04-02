const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  product: { type: Object, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  delivered: { type: Boolean, required: true, default: false },
});

const model = mongoose.model("orders", ordersSchema);
module.exports = model;

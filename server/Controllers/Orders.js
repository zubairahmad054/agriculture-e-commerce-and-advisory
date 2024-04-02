const Orders = require("../models/orders");
const fs = require("fs");
module.exports = {
  AllOrders: async (req, res) => {
    const orders = await Orders.find();
    if (orders) {
      res.send(orders).status(200);
    } else {
      res.send({}).status(400);
    }
  },
  postOrders: async (req, res) => {
    console.log(req.body);
    const orders = new Orders(req.body);
    try {
      await orders.save();
      res.send("ok").status(200);
    } catch {
      res.send().status(400);
    }
  },
  updateOrder: async (req, res) => {
    console.log(req.body);
    const toUpdateOrder = await Orders.findById(req.body.id);
    if (req.body.state == 1) {
      toUpdateOrder.delivered = true;
    }
    if (req.body.state == 0) {
      toUpdateOrder.delivered = false;
    }

    try {
      await toUpdateOrder.save();
      res.send("ok").status(200);
    } catch {
      res.send().status(400);
    }
  },
};

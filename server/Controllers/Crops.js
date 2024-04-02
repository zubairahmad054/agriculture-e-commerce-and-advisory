const Products = require("../models/Products");
const fs = require("fs");
const Crop=require('../models/projection')
module.exports = {
  AllProducts: async (req, res) => {
    const products = await Products.find();
    if (products) {
      res.send(products).status(200);
    } else {
      res.send({}).status(400);
    }
  },
  postProducts: async (req, res) => {
    console.log(req.body);
    const products = new Products(req.body);
    try {
      await products.save();
      res.send("ok").status(200);
    } catch {
      res.send().status(400);
    }
  },
  uploadProduct: async (req, res) => {
    // const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    console.log(req.file.filename);
    const products = new Products({
      name: req.body.Name,
      description: req.body.desc,
      image: "http://localhost:1337/uploads/" + req.file.filename,
      category: req.body.Category,
      price: req.body.Price,
    });
    try {
      await products.save();
      console.log("Registered");
      res.send().status(201);
    } catch (e) {
      res.send(e);
      console.log("error");
    }
  },
  updateProduct: async (req, res) => {
    // console.log(req.body, "update Product");
    const toUpdateProduct = await Products.findById(req.body.id);
    console.log(toUpdateProduct);
    if (req.body.state == 1) {
      toUpdateProduct.rented = true;
    }
    if (req.body.state == 0) {
      toUpdateProduct.rented = false;
    }

    try {
      await toUpdateProduct.save();
      res.send("ok").status(200);
    } catch {
      res.send().status(400);
    }
  },
  Projection:async(req,res)=>{
    console.log(req.body)
    try {
      await Crop.insertMany(req.body)
      }
      // const cropData = req.body.data;
  
      // // Flatten and save the crop data
      // const crops = [];
      // for (const region in cropData) {
      //   for (const city in cropData[region]) {
      //     for (const crop in cropData[region][city]) {
      //       const demand = cropData[region][city][crop].demand;
      //       const supply = cropData[region][city][crop].supply;
      //       crops.push({ region, city, crop, demand, supply });
      //     }
      //   }
      // }
  
      // await Crop.insertMany(crops);
      // res.status(201).json({ message: 'Crop data saved successfully.' });
    catch (error) {
      console.error('Failed to save crop data', error);
      res.status(500).json({ error: 'Failed to save crop data.' });
    }
  }
};

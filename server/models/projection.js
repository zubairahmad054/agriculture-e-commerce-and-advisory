const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());


// Define Crop Schema and Model
const cropSchema = new mongoose.Schema({
  region: String,
  city: String,
  crops:[
  ],
  demand: Number,
  supply: Number
});

const Crop = mongoose.model('projection', cropSchema);
module.exports = Crop;
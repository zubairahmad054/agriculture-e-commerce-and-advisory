const Crop = require("../models/projection");
const express = require('express');
const app = express();
app.post('/api/crop-data', async (req, res) => {
    console.log(req.body)
    try {
      const cropData = req.body.data;
  
      // Flatten and save the crop data
      const crops = [];
      for (const region in cropData) {
        for (const city in cropData[region]) {
          for (const crop in cropData[region][city]) {
            const demand = cropData[region][city][crop].demand;
            const supply = cropData[region][city][crop].supply;
            crops.push({ region, city, crop, demand, supply });
          }
        }
      }
  
      await Crop.insertMany(crops);
      res.status(201).json({ message: 'Crop data saved successfully.' });
    } catch (error) {
      console.error('Failed to save crop data', error);
      res.status(500).json({ error: 'Failed to save crop data.' });
    }
  });
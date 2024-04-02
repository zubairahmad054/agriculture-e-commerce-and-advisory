const data = {
  "Faisalabad": {
    "Rice": { "demand": 50, "supply": 60 },
    "Wheat": { "demand": 80, "supply": 90 },
    "Sugarcane": { "demand": 70, "supply": 80 },
    "Cotton": { "demand": 90, "supply": 100 },
    "Maize": { "demand": 60, "supply": 70 }
  },
  "Lahore": {
    "Rice": { "demand": 40, "supply": 45 },
    "Wheat": { "demand": 70, "supply": 75 },
    "Sugarcane": { "demand": 55, "supply": 60 },
    "Cotton": { "demand": 80, "supply": 85 },
    "Maize": { "demand": 50, "supply": 55 }
  },
  "Gujranwala": {
    "Rice": { "demand": 35, "supply": 40 },
    "Wheat": { "demand": 60, "supply": 65 },
    "Sugarcane": { "demand": 45, "supply": 50 },
    "Cotton": { "demand": 70, "supply": 75 },
    "Maize": { "demand": 40, "supply": 45 }
  },
  "Sargodha": {
    "Rice": { "demand": 30, "supply": 35 },
    "Wheat": { "demand": 50, "supply": 55 },
    "Sugarcane": { "demand": 40, "supply": 45 },
    "Cotton": { "demand": 60, "supply": 65 },
    "Maize": { "demand": 35, "supply": 40 }
  },
  "Sahiwal": {
    "Rice": { "demand": 25, "supply": 30 },
    "Wheat": { "demand": 40, "supply": 45 },
    "Sugarcane": { "demand": 35, "supply": 40 },
    "Cotton": { "demand": 50, "supply": 55 },
    "Maize": { "demand": 30, "supply": 35 }
  },
  "southernPunjab": {
    "Dera Ghazi Khan": {
      "Rice": { "demand": 20, "supply": 25 },
      "Wheat": { "demand": 90, "supply": 95 },
      "Sugarcane": { "demand": 75, "supply": 80 },
      "Cotton": { "demand": 95, "supply": 100 },
      "Maize": { "demand": 55, "supply": 60 }
    },
    "Multan": {
      "Rice": { "demand": 15, "supply": 20 },
      "Wheat": { "demand": 85, "supply": 90 },
      "Sugarcane": { "demand": 70, "supply": 75 },
      "Cotton": { "demand": 90, "supply": 95 },
      "Maize": { "demand": 50, "supply": 55 }
    },
    "Bahawalpur": {
      "Rice": { "demand": 10,
      "supply": 15 },
      "Wheat": { "demand": 80, "supply": 85 },
      "Sugarcane": { "demand": 65, "supply": 70 },
      "Cotton": { "demand": 85, "supply": 90 },
      "Maize": { "demand": 45, "supply": 50 }
    }
  },
  "northernPunjab": {
    "Rawalpindi": {
      "Rice": { "demand": 5, "supply": 10 },
      "Wheat": { "demand": 30, "supply": 35 },
      "Sugarcane": { "demand": 20, "supply": 25 },
      "Cotton": { "demand": 30, "supply": 35 },
      "Maize": { "demand": 15, "supply": 20 }
    }
  }
};

// Convert the data into an array of objects
const dataArray = [];

for (const city in data) {
  const cityObj = { city };
  const crops = data[city];
  const cropsArray = [];

  for (const crop in crops) {
    const cropObj = { crop, ...crops[crop] };
    cropsArray.push(cropObj);
  }

  cityObj.crops = cropsArray;
  dataArray.push(cityObj);
}

export default dataArray
console.log(dataArray);

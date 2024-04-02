const express = require("express");
const Router = express.Router();
const productsController = require("../Controllers/Crops");
const ordersController = require("../Controllers/Orders");
const userController = require("../Controllers/User.js");
const BlogController = require("../Controllers/Blogs.js");
const StripeController = require("../Controllers/Stripe.js");
const CropsController=require('../Controllers/Crops')
//const projectionController = require("../Controllers/projection.js")
const isAuthenticated = require("../middleware/middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/FYP FINAL EVALUTION/Final Iteration/Project/server/uploads");
  },
  filename: (re, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
Router.get("/allBlogs", BlogController.AllBlogs);
Router.post("/createBlog", BlogController.Create);
Router.post("/api/register", userController.Register);
Router.post("/api/login", userController.Login);
Router.post("/api/update", userController.Update);
Router.get("/allProducts", productsController.AllProducts);
Router.post("/postProducts", productsController.postProducts);
Router.post("/updateProduct", productsController.updateProduct);
Router.post("/postOrders", ordersController.postOrders);
Router.post("/updateOrder", ordersController.updateOrder);
Router.post("/stripeOrder", StripeController.postOrders);
Router.post("/getOrder", StripeController.getOrderData);
Router.get("/allOrders", ordersController.AllOrders);
Router.post("/sendProjections",CropsController.Projection);
Router.post(
  "/uploadProduct",
  upload.single("uploadedImage"),
  productsController.uploadProduct
);
module.exports = Router;

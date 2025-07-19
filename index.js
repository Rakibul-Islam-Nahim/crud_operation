const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Products = require("./models/product.model.js"); // Importing the Product model
const ProductsRouter = require("./router/product.router.js"); // Importing the ProductsRouter

// Middleware Part
app.use(express.json()); // Middleware to parse JSON bodies

// Router Part
app.use("/api/products", ProductsRouter); // Using the ProductsRouter for handling product-related routes the prefix will always be /api/products then the rest will comes from the router filer

// Connecting to MongoDB
mongoose
  .connect("mongodb://localhost:27017/basic")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Sever is running on port 3000");
    });
  })
  .catch(console.error());

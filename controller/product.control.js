const express = require("express");
const Products = require("../models/product.model.js"); // Importing the Product model

const getProducts = async (req, res) => {
  try {
    const products = await Products.find(); // this will use the model to find all the products in the database and then store it in the const products variable
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params; // this will get the id from the request parameters
    const product = await Products.findById(id); // this will use the model to find the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // if the product is not found, it will return a 404 status code with a message
    }
    res.status(200).json(product); // if the product is found, it will return a 200 status code with the product data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body); // This will use the model and pass the request body json to the MongoDB. Thus creating a new product.
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // this will get the id from the request parameters
    const product = await Products.findByIdAndUpdate(id, req.body); // this will use the model to find the product by ID and update it with the request body
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // if the product is not found, it will return a 404 status code with a message
    }
    const updatedProduct = await Products.findById(id); // after updating, we find the product again to get the updated data
    res.status(200).json(updatedProduct); // if the product is found, it will return a 200 status code with the updated product data
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // this will get the id from the request parameters
    const product = await Products.findByIdAndDelete(id); // this will use the model to find the product by ID and delete it
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // if the product is not found, it will return a 404 status code with a message
    }
    res.status(200).json({ message: "Product deleted successfully" }); // if the product is found and deleted, it will return a 200 status code with a success message
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// export all the functions
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

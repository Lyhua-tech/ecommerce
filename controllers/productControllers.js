const Products = require("../models/Products");
const Categories = require("../models/Categories");
const baseController = require("../utils/baseControllers");

const productController = baseController(Products, Categories);

module.exports = productController;

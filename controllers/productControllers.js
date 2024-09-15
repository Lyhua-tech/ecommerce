const Products = require("../models/Products");

exports.getAll = async (req, res, next) => {
  try {
    const products = await Products.findAll();

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const newItem = await Products.create({
      name: req.body.name,
      price: req.body.price,
    });
    res.status(201).json({
      status: "success",
      data: {
        newItem,
      },
    });
  } catch (error) {}
};

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

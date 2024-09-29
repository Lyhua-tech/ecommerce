const Categories = require("../models/Categories");

exports.addCategories = async (req, res) => {
  try {
    const categories = await Categories.bulkCreate(req.body);

    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

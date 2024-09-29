const express = require("express");
const categoryController = require("../controllers/categoriescontrollers");

const router = express.Router();

router.route("/addcategories").post(categoryController.addCategories);

module.exports = router;

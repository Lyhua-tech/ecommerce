const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.route("/").get(productControllers.getAll).post(productControllers.addProduct);

module.exports = router;

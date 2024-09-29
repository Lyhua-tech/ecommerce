const express = require("express");
const productControllers = require("../controllers/productControllers");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router
  .route("/product")
  .get(productControllers.getAll)
  .post(
    authControllers.protected,
    authControllers.restrictRole("seller"),
    productControllers.createOne,
  );

router
  .route("product/:id")
  .get(productControllers.getOneRecord)
  .patch(
    authControllers.protected,
    authControllers.restrictRole("seller"),
    productControllers.updateOneRecord,
  )
  .delete(
    authControllers.protected,
    authControllers.restrictRole("seller"),
    productControllers.deleteaRecord,
  );

module.exports = router;

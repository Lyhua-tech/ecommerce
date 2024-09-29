const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router
  .route("/seller")
  .patch(
    authController.protected,
    authController.restrictRole("buyer"),
    authController.becomeSeller,
  );

module.exports = router;

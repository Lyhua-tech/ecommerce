const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/").get(authController.protected);

module.exports = router;

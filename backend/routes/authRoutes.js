const express = require("express");
const registerController = require("../controllers/authController/registerController");
const loginController = require("../controllers/authController/loginController");
const logoutController = require("../controllers/authController/logoutController");
const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Logout
router.post("/logout", logoutController);

module.exports = router;

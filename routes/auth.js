const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);

module.exports = router;

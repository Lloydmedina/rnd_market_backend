const express = require("express");
const router = express.Router();
const users_ = require("../controllers/loginController");
router.post("/login", users_.login);

module.exports = router
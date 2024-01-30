const express = require("express");
const router = express.Router();
const users_ = require("../controllers/userAccessController");

router.get("/:id", users_.userAccessCtrl);
module.exports = router
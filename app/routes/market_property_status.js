const express = require("express");
const router = express.Router();
const aaa_ = require("../controllers/market_property_statusController");

router.get("/", aaa_.getAll);
router.get("/:id", aaa_.findOne);
module.exports = router
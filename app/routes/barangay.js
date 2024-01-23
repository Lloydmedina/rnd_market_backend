const express = require("express");
const router = express.Router();
const aaa_ = require("../controllers/barangayController");

router.get("/", aaa_.getAll);
router.get("/:uId", aaa_.findOne);
module.exports = router
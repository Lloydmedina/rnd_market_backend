const express = require("express");
const router = express.Router();
const aaa_ = require("../controllers/officeController");

router.get("/", aaa_.getAllOffice);
router.get("/:id", aaa_.findOffice);
module.exports = router
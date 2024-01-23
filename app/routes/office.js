const express = require("express");
const router = express.Router();
const aaa_ = require("../controllers/officeController");

router.get("/", aaa_.getAllOffice);
router.get("/:uId", aaa_.findOffice);
module.exports = router
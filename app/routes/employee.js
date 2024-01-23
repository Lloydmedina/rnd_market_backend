const express = require("express");
const router = express.Router();
const emps_ = require("../controllers/employeeController");

router.get("/", emps_.getAllEmployee);
router.get("/:eId", emps_.findEmployee);
module.exports = router
const express = require("express");
const router = express.Router();
const aaa_ = require("../controllers/personController");

router.get("/", aaa_.getAllPerson);
router.get("/:pId", aaa_.findPerson);
module.exports = router
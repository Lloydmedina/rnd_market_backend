const express = require("express");
const router = express.Router();
const users_ = require("../controllers/sysLogsController");

router.get("/",users_.getSyslogs);
module.exports = router
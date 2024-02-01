const express = require("express");
const router = express.Router();
const users_ = require("../controllers/userController");

router.get("/", users_.getAllUsers);
router.get("/roles", users_.getAllUsersRoles);
router.get("/user_request", users_.getUsersRequest);
router.get("/:uId", users_.findUser);
router.get("/user_logs", users_.getSyslogs);
router.post("/reset_password", users_.changePassword);
router.get("/user_access", users_.userAccessCtrl);

module.exports = router
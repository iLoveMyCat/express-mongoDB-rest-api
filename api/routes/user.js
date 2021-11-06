const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/user");
const verifyAuth = require("../middlewares/verify-authorization");

router.post("/signup", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/", verifyAuth, usersControllers.getAllUsers);
router.get("/:userId", verifyAuth, usersControllers.getUser);
router.patch("/:userId", verifyAuth, usersControllers.updateUser);
router.delete("/:userId", verifyAuth, usersControllers.deleteUser);

module.exports = router;

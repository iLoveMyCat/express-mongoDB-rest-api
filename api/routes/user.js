const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/user");

router.post("/signup", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/", usersControllers.getAllUsers);
router.get("/:userId", usersControllers.getUser);
router.patch("/:userId", usersControllers.updateUser);
router.delete("/:userId", usersControllers.deleteUser);

module.exports = router;

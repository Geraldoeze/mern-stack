const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const userController = require("../controllers/user-controller");
const fileUpload = require("../middlewaree/file-upload");

router.get("/", userController.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  // [
  //   check("name").not().isEmpty(),
  //   check("email").normalizeEmail().isEmail(),
  //   check("password").isLength({ min: 6 }),
  // ],
  userController.createNewUser
);

router.post("/login", userController.loginUser);

module.exports = router;

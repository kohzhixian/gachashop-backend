const express = require("express");
const usersController = require("../controllers/users-controllers");
const { check } = require("express-validator");

const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/login", usersController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router.route("/signup")
.get( userController.renderSignup)
.post(
  WrapAsync(userController.signup),
);

router.route("/login")
.get(userController.renderLogin)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  userController.login
);

router.get("/logout",userController.logout);

module.exports = router;

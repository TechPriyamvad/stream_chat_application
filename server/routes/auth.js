const express = require("express");
const { signup, login } = require("../controllers/auth.js");

const router = express.Router();
//route to signup function
router.post("/signup", signup);
//route to login function
router.post("/login", login);

module.exports = router;

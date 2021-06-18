const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

//req take the data from form while res send the data to html
router.post("/signUp", authController.signUp);

router.post("/logIn", authController.logIn);

router.get("/logOut", authController.logOut);

module.exports = router;

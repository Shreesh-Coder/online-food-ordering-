const express = require("express");

const router = express.Router();

//req take the data from form while res send the data to html
router.get("/",(req, res) =>{
    // res.send("<h1>Home Page</h1>");
    res.render("index");
});

router.get("/First",(req, res) =>{ //Going to render next page 
    // res.send("<h1>Home Page</h1>");
    res.render("First");
});

module.exports = router;

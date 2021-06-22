const express = require("express");
const { restart } = require("nodemon");
const execPHP = require('../execphp.js')();
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


router.get("*.php", (req, res) =>{
    execPHP.phpFolder = "Admin";
    execPHP.parseFile("/db.php", (phpResult) =>{           
    });
    execPHP.parseFile(req.originalUrl, (phpResult) =>{
        // console.log(phpResult);        
        res.write(phpResult);      
        res.end();
    })
});



router.post("*.php", (req, res) =>{
    console.log("======================================");
    data = req.body;
    execPHP.phpFolder = "Admin";
    execPHP.parseFile(`/onPost.php`, (phpResult) =>{}, data);
    execPHP.parseFile("/db.php", (phpResult) =>{
        // res.write(phpResult);        
    })
    execPHP.parseFile(req.originalUrl, (phpResult) =>{
        // console.log(phpResult);        
        res.send(phpResult);      
        res.end();
    })
});

module.exports = router;


const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env"})

const app = express(); //For starting server 

const db = mysql.createConnection({ //Creating connection to the database
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

app.set('view engine', 'hbs'); //For viewing the html 

db.connect((error) =>{ // Connecting to the data base
    if(error){
        console.log(error);
    }else{
        console.log("MYSQL Connected...")
    }
}) 

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory)); //Make sure that server using the files in public dir

//Parse url- enconded bodies (as sent by Html forms)
app.use(express.urlencoded({extended: false}));

//Parse JSON- bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));


app.listen(5000, () =>{
    console.log("Server started on Port 5000.")
})
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({ //Creating connection to the database
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.signUp = (req, res) =>{
    console.log(req.body); //Getting the data from front end.

    const {name, email, password, passwordConfirm} = req.body;

    //Checking if email is already present or not.
    db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
        if(error){
            console.log(error);
            return;
        }

        if(results.length > 0){
            return res.render("First", {
                message: "That email is already in Registered"
            });
        }else if(password !== passwordConfirm){
            return res.render("First", {
                message: "Password do not match"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword}, (error, results) =>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render("First", {
                    message: "User Registered"
                });
            }    


        });
    });
}


exports.logIn = async (req, res) =>{
    try{
        const {email, password} = req.body;
        console.log(req.body);
        //Checking for empty field
        if(!email || !password){
            return res.status(400).render("First", {
                message: "Please provied email and password"
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, resutls) =>{
            console.log(resutls);
            //If no resutls then user is not registered or password is wrong 
            if(resutls.length === 0 || !(await bcrypt.compare(password, resutls[0].password))){
                res.status(401).render("First", {
                    message: 'Email or Password is incorrect'
                })
            }else{ //If everything is ok
                const id = resutls[0].id;

                //Making a token for cookie
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);
                
                //Setting the cookies options
                const cookieOption = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //converting time into mille seconds.
                    ),
                    httpOnly: true
                }

                //Setting up the cookie
                res.cookie("jwt", token, cookieOption);
                res.status(200).render("index", {name: resutls[0].name});
            }
        });

    }catch(error){
        console.log(error);
    }    
}

exports.logOut = (req, res) =>{
    res.clearCookie("jwt");
    return res.redirect("/");
}
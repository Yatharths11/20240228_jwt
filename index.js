// Importing required modules
require('dotenv').config();
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()


// My module to handle interaction with database
const myDB = require('./myDB')

// My port
const port = 8080


//Creating secrete key : secret key is same alwasy as it is used for encryption
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('base64')
// console.log('Generated Secret Key:', secretKey);


//enabling express to interact with json
app.use(express.json())
app.use(express.urlencoded( { extended: true }))


// API to register a new user
app.get( '/login', (req, res) => {
    //add  user to database and return in console
    let username= req.body.username;
    let password = req.body.password;
    
    let user = {
        "username": username,
        "password" : password
    }
    myDB.verifyPassword(user)
        .then((data) => {
            if (data) {
                console.log("User verified");
                // const secret_key = process.env.ACCESS_TOKEN_SECRET
                const access_token = jwt.sign({name:user.username},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' })
                res.send(`User verified! \n Your access token is ${access_token}` );
                
            } else {
                console.log("User not verified");
                res.status(401).send("Invalid Username or Password");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });           
})

// API to confirm if the user already exists or not
app.post('/register',(req,res)=>{
    const username= req.body.username
    const password = req.body.password

    //check data base if password is correct

    //create a token and return it 
})

app.get('/posts/user',(req,res)=>{
    //retunr the posts by the user

})


app.put("/updateprofile",(req,res)=> {
   let profile = req.body;
   let token = req.headers['authorization'].split(" ")[1];

})

app.get('/posts/all',(req,res)=>{

})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
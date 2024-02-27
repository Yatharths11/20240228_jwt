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


// API to confirm if the users exists or not
app.get( '/login', (req, res) => {
    //add  user to database and return in console
    let username= req.body.username;
    let password = req.body.password;
    
    let user = {
        "username": username,
        "password" : password
    }
    //check data base if password is correct
    myDB.verifyPassword(user)
        .then((data) => {
            if (data) {
                console.log("User verified");

                //when user is authenticated create token
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


// API to register the user
app.post('/register',(req,res)=>{
    const username= req.body.username
    const password = req.body.password

    const user = {
        "username": username,
        "password" : password
    }
    myDB.registerUser(user)
    .then((result) =>{
        if(result){
            res.send(`New User Created with Username: ${user.username} created successfully`) 
        }
    } )
})

app.use((req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userData = { userId: decodedToken.userId, username: decodedToken.username };
      next();
    } catch (error) {
        console.log("here ",error)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });


  app.get('/posts/:username', (req, res) => {
    // Return the posts by the user
    let username = req.params.username;

    myDB.findPostsByUsername(username)
        .then((posts) => {
            res.json({posts:posts[0].posts}); // Corrected from res.json(data) to res.json(posts)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});


app.get('/posts/all/view', (req, res) => {
    myDB.getAllPosts()
        .then(data => {
            let response = []; // Initialize as an array
            data.forEach(element => {
                const username = element.username;
                const posts = element.posts;
                response.push({
                    username: username,
                    posts: posts
                });
            });
            res.json(response);

        })
        .catch(e => {
            console.log(e);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
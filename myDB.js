const mongoose = require('mongoose')


//Connecting to Mongodb Database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Users');
}
//when connection is successful
main().then(
    console.log("Database Connnected")
).catch(err => console.log(err));


const User_schema = new mongoose.Schema({
    username: {
        type: String,
        require:true,
        unique: true,
    },
    password: String,
})


let User = new mongoose.model('User', User_schema);

// User.insertMany([
//     {
//         "username": "user123",
//         "password": "pass@123"
//     },
//     {
//         "username": "john_doe",
//         "password": "qwerty456"
//     },
//     {
//         "username": "alice_in_wonderland",
//         "password": "p@ssword"
//     },
//     {
//         "username": "random_user",
//         "password": "randomPass789"
//     },
//     {
//       "username": "john_doe",
//       "password": "qwerty456"
//     },
//     {
//       "username": "alice_in_wonderland",
//       "password": "p@ssword"
//     },
//     {
//       "username": "random_user",
//       "password": "randomPass789"
//     },
//     {
//       "username": "coding_ninja",
//       "password": "codingRocks2022"
//     },
//     {
//       "username": "web_dev_master",
//       "password": "webDev@123"
//     },
//     {
//       "username": "tech_guru",
//       "password": "guruTech567"
//     },
//     {
//       "username": "python_lover",
//       "password": "ilovepython"
//     },
//     {
//       "username": "java_junkie",
//       "password": "javaIsCool"
//     },
//     {
//       "username": "frontend_wizard",
//       "password": "frontendMagic"
//     }
// ])


const posts_schema = new mongoose.Schema({
    "username": String,
    "posts":[String]
})

let Posts = new mongoose.model("Posts",posts_schema)

// Posts.insertMany([
//     {
//         "username": "user123",
//         "posts": "Exploring the vast world of coding with user123! #CodingJourney"
//     },
//     {
//         "username": "alice_in_wonderland",
//         "posts": "Lost in the wonderland of technology, Alice is discovering the magic of programming! #TechAdventures"
//     },
//     {
//         "username": "random_user",
//         "posts": "Embracing randomness in the tech universe with random_user! #CodeSurprises"
//     },
//     {
//         "username": "coding_ninja",
//         "posts": "Silent but deadly – coding_ninja strikes again, crafting elegant code solutions! #CodeNinja"
//     },
//     {
//         "username": "web_dev_master",
//         "posts": "Mastering the art of web development with web_dev_master!  #WebDevJourney"
//     },
//     {
//         "username": "tech_guru",
//         "posts": "Dispensing tech wisdom and insights, follow the path of enlightenment with tech_guru! #TechWisdom"
//     },
//     {
//         "username": "python_lover",
//         "posts": "In a passionate affair with Python, join the journey of Python lover! #PythonPassion"
//     },
//     {
//         "username": "java_junkie",
//         "posts": "Fueling the addiction to Java, Java_junkie can't get enough of the Java world! #JavaAddiction"
//     },
//     {
//         "username": "frontend_wizard",
//         "posts": "Casting spells with HTML, CSS, and JS - witness the magic of frontend_wizard! #FrontendMagic"
//     },
//     {
//         "username": "coding_enthusiast",
//         "posts": "Passionate about every line of code, coding_enthusiast is on a perpetual coding high! #CodePassion"
//     }
// ])
// console.log("data insertion compelete")

async function verifyPassword(user) {
    try {
      const foundUser = await User.findOne({ username: user.username });
  
      if (!foundUser || !(foundUser.password == user.password)) {
        throw new Error('Invalid Username or Password');
      } else {
        return true; // Return true if verification is successful
      }
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error to be caught in the outer catch block
    }
  }

  async function registerUser(user) {
    try {
        await User.insertMany([user]);
        console.log(`User ${user.username} created successfully`);
        return true;
    } catch (e) {
        console.error(`Error inserting user ${user.username}: ${e}`);
        return false;
    }
}


module.exports = {verifyPassword,
                    registerUser}
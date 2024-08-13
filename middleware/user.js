const { User } = require("../db");


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.username;
    const user = User.find({
        username :  username,
        password : password
    })
    if(!user){
        res.statue(403).json({
            msg: "User not exist"
        })
    }else{
        next();
    }
}

module.exports = userMiddleware;
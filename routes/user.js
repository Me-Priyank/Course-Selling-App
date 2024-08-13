const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const { Course } = require("../db");
const userMiddleware = require("../middleware/user");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;
     User.create({
        username ,
        password 
    })
    res.json({
        msg : "user created"
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({});
    res.json({
        Course
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router
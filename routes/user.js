const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const { Course } = require("../db");
const userMiddleware = require("../middleware/user");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username ,
        password 
    })
    res.json({
        msg : "user created"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
   const allCourses = await Course.find({});
    res.json({
        allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
   await  User.updateOne({
        username : username
    },{
        "$push": {purchasedCourses : courseId}
    })
    res.json({
        msg : "purchase complese!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.headers.username
    })

    const courses = await Course.findOne({
        _id : { "$in": user.purchasedCourses}
    })
    res.json({
        courses 
    })
});

module.exports = router
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin , Course } = require("../db");
const { title } = require("process");
const { describe } = require("node:test");
const router = Router();

// Admin Routes
router.post('/signup',  (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
         Admin.create({
        username : username,
        password : password
    })
    res.json({msg : 'Admin created'});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
       const newCourse =  await Course.create({
        
        title ,
        price ,
        description 
    })
    console.log(newCourse);
    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
   const allCourses = await Course.find({});
    res.json({
        allCourses
    })

});

module.exports = router;
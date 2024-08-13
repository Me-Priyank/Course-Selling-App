const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const { title } = require("process");
const { describe } = require("node:test");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;
         Admin.create({
        username : username,
        password : password
    })
    res.json({msg : 'Admin created'});
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
         Course.create({
        
        title ,
        price ,
        description 
    })
    res.json({
        message: 'Course created successfully', courseId: Course._id
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
   Course.find({});
    res.json({
        Course
    })

});

module.exports = router;
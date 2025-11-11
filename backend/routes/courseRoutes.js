const express = require('express') ; 
const router = express.Router() ; 

let courses = [
    {id : 1, title: "Phishing Fundamentals", level : "Beginner", points: 100},
    {id : 2, title: "OPSec Fundamentals",level : "Beginner", points: 100},
    {id : 3, title: "VPN Fundamentals",level : "Beginner", points: 100},
]

router.get('/', (req,res) =>{
    res.json(courses) ; 
})

//same thing but with id now

router.get('/:id', (req,res)=> {
    const courseID = parseInt(req.params.id) ; 
    const course = courses.find(c => c.id === courseID) ; 
    if(course){
        res.json(course) ; 
    }
    else {
        res.status(404).json({ message: 'course not found' }) ; 
    }
})

module.exports = router ; 

//so we got our courses set up and now we can use it in our server.js file;

const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

function getErrorMessage(err){
    if(err.errors){
        for ( let errName in err.errors){
            íf(err.errors[errName].message)
                return err.errors[errName].message;
        }
    }else{
        return "Unknown server error";
    }
}

exports.create = function (req, res){
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    console.log(req.body.email);

    Student.findOne({email: req.body.email}, (err, student) =>{
        if(err){return getErrorMessage(err);}
        console.log("Student found: "+student._id);
        req.id = student._id;
        course.creator = student._id;
        console.log("Line 29 : "+course.creator);
        student.courses.push(course._id);
        student.save();
    }).then(function(){
       course.save((err)=>{
           if(err){
               return res.status(400).send({
                   message: getErrorMessage(err)
               });
           }else{
               console.log("Final object of course: "+course);
               res.status(200).json(course);
           }
       }); 
    });
};

exports.list = function(req, res){
    Course.find().sort("courseCode").exec((err, courses)=>{
        if(err){
            console.log(courses);
            return res.status(400).send({
                message: getErrorMessage(err),
            });
        }else{
            res.status(200).json(courses);
        }
    });
};

exports.courseById = function(req, res, next, id){
    if(id){
        Course.findById(id).exec((err, course)=>{
            if(err) return next(err);
            if(!course) return next(new Error("Course not found " + id));
            req.course = course;
            next();
        });
    }else{
        res.status(400);
    }
    
};

exports.read = function(req, res){
    res.status(200).json(req.course);
};

exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

exports.delete = function (req, res){
    const course = req.course;
    Student.findByIdAndUpdate(course.creator,
        {$pull: { 'courses': {$in: course._id}}}, function(err, model){
            if(err) console.log(err);
            console.log(model);
        }).then(course.remove((err)=>{
            if(err){
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            }else{
                res.status(200).json(course);
            }
        }));
    
};

exports.hasAuthorization = function (req, res, next) {
    //console.log('in hasAuthorization - creator: ',req.course.creator)
    //console.log('in hasAuthorization - student: ',req._id)
    console.log('has authorization: '+req)

    if (req.course.creator._id !== req._id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};

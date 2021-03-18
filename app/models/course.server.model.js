const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseCode:{ type: Number, trim: true, required: 'Course Code can not be blank'},
    courseName:{ type: String, trim: true, required: 'Course Name can not be blank'},
    section:{ type: Number, trim: true, required: 'Section Number is mandatory'},
    semester:{type: Number, trim: true, require: 'Semester can not be blank'},
    
});

mongoose.model('Course', CourseSchema);
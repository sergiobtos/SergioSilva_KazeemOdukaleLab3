const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseCode:{ type: Number, unique: true, required: 'Course Code can not be blank'},
    courseName:{ type: String, required: 'Course Name can not be blank'},
    section:{ type: Number, required: 'Section Number is mandatory'},
    semester:{type: Number, require: 'Semester can not be blank'},
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});

mongoose.model('Course', CourseSchema);
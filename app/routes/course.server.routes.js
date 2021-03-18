var student = require('../controllers/students.server.controller');
var course = require('../controllers/courses.server.controller');

module.exports = function(app){
    app.route('/api/courses')
       .get(course.list)
       .post(course.create);
    //.post(student.requiresLogin, course.create);

    app.route('/api/courses/:courseId')
    .get(course.read)
    .delete(course.delete);
    //.delete(student.requiresLogin, course.delete);

    app.param('courseId', course.courseById);
};
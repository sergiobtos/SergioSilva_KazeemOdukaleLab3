var students = require('../../app/controllers/students.server.controller');

module.exports = function(app){

    app.get('/students', students.requiresLogin, students.list);
    //app.get('/students', students.list);

    app.post('/create', students.create);

    app.post('/signin', students.authenticate);

    app.get('/signout', students.signout);

    app.get('/welcome', students.welcome);

    app.get('/read_cookie', students.isSignedIn);

    app.get('/api/coursesByStudent/:studentId', students.requiresLogin,students.listCoursesByStudent);
};
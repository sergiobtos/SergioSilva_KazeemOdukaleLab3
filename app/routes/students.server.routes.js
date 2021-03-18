var students = require('../../app/controllers/students.server.controller');
var express = require('express');
//var router = express.Router();

module.exports = function(app){

    app.get('/students', students.requiresLogin, students.list);
    //app.get('/students', students.list);

    app.post('/create', students.create);

    app.post('/signin', students.authenticate);

    app.get('/signout', students.signout);

    app.get('/welcome', students.welcome);

    app.get('/read_cookie', students.isSignedIn);
};
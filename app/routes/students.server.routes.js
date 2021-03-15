var students = require('../../app/controllers/students.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function(app){

    app.post('/create', students.create);
}
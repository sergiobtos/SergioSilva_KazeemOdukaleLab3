var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){

    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true
    });
    const connection = mongoose.connection;
    connection.once('open', ()=>{
      console.log("MongoDB database connection established successfully");
    });

    require('../app/models/student.server.model');

    return db;
};
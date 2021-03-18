var config = require("./config"),
  express = require("express"),
  morgan = require("morgan"),
  compress = require("compression"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = function () {
  var app = express();

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  const corsOptions = {
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(methodOverride());
  app.use(methodOverride("_method"));
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );

  require('../app/routes/course.server.routes.js')(app);
  require("../app/routes/students.server.routes.js")(app);

  return app;
};
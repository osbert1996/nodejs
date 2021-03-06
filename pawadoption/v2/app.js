var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    flash = require('express-flash-2');
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Dog = require("./models/dog"),
    Comment = require("./models/comment"),
    seed = require("./seeds"),
    favicon = require("serve-favicon"),
    path = require('path');

var commentRoutes = require("./routes/comment"),
    dogRoutes = require("./routes/dogs"),
    indexRoutes = require("./routes/index");

//add mongoose and connect to pawadoption db.
//it will check if the selected db is available.
//if it's not available then it will create a new one.
// mongoose.connect('mongodb://localhost/pawadoption', {
//     useMongoClient: true
// });
var url = process.env.DATABASEURL || 'mongodb://localhost/pawadoption';
mongoose.connect(url, {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, 'public', '/images/dog-icon.ico')));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//seed db
// seed();

//passport setting
app.use(require("express-session")({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// var Dog = mongoose.model("Dog", dogSchema);

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/dogs", dogRoutes);
app.use("/dogs/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';
app.listen(port, ip, function() {
    console.log("Server has started");
});
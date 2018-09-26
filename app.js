

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://groovecoders:groove94@ds145562.mlab.com:45562/groove').then(()=>console.log("started db"), err=>console.log(err));
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// Routes
app.use('/admin', routes);
app.use('/users', users);

    // static routing
app.use('/style', express.static(path.join(__dirname, '/style')))
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use('/scripts', express.static(path.join(__dirname, '/scripts')))
app.use('/samples', express.static(path.join(__dirname, '/samples')))
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/tone', express.static(path.join(__dirname, '/node_modules/tone/build/')))
    

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
    // Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});





























// const port = process.env.PORT || 3000

// app.set('port', port);

// app.use(function (err, req, res, next) {
//     console.error(err, err.stack);
//     res.status(500).send(err);
// });

// app.listen(process.env.PORT || 3000, function(){
// 	console.log("listening on server",port);
// });

// module.exports = app;










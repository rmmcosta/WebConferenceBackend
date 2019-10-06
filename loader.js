const app = require('./server');
const router = require('./routes/main.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const sanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const validator = require('express-validator');

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'web conference rmmcosta',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 1*60*60*1000//miliseconds
    }
}));

//
app.use(validator());

app.use(router());
const app = require('./server');
const router = require('./routes/main.route');
const routerTest = require('./routes/unittests.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(expressSanitizer());

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

app.use('/',router);
app.use('/test',routerTest);
const app = require('./server');
const router = require('./routes/main.route');
const routerAuth = require('./routes/auth.route');
const routerTest = require('./routes/unittests.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const userModel = require('./models/user');
const index = require('./models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const userSequelize = userModel(sequelize, Sequelize);

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
        maxAge: 1 * 60 * 60 * 1000//miliseconds
    }
}));

//if we want to reuse the session
app.use((req, res, next) => {
    if (global.sessData === undefined) {
        global.sessData = req.session;
        global.sessData.ID = req.sessionID;
        console.log('session created!');
    } else {
        console.log('session exists', global.sessData.ID);
    }
    next();
});

//auth
app.use(passport.initialize());
app.use(passport.session());//persistent login sessions
require('./routes/auth.route')(app, passport);
require('./config/passport/passport')(passport, userSequelize);

app.use('/', router);
app.use('/', routerAuth);
app.use('/test', routerTest);
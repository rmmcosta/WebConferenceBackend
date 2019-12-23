//const router = require('express').Router();
const authController = require('../controllers/auth.controller');

//signin router
//router.post('/signin',authController.signin);

module.exports = (app, passport) => {
    //signin
    console.log(passport);
    passport.authenticate();
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signinFailure'
    }));

    app.get('/signinFailure', authController.signinFailure);//error on signin
    app.get('/signinSuccess', isLoggedIn, authController.signinSuccess);

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    //signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signupFailure'
    }));

    app.get('/signupFailure', authController.signupFailure);
    app.get('/signupSuccess', authController.signupSuccess);
};

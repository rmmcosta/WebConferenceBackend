//const router = require('express').Router();
const authController = require('../controllers/auth.controller');

//signin router
//router.post('/signin',authController.signin);

module.exports = (app, passport) => {
    //signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signin'
    }));

    app.get('/signin', authController.signin);
    app.get('/signinSuccess', isLoggedIn, authController.signinSuccess);

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    //signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup'
    }));

    app.get('/signup', authController.signup);
    app.get('/signupSuccess', authController.signupSuccess);
};

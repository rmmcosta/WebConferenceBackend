const authController = require('../controllers/auth.controller');

module.exports = (app, passport) => {

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signinFailure'
    }));

    // app.post('/signin', function (req, res, next) {
    //     passport.authenticate('local-signin', function (err, user, info) {
    //         console.log('authenticate:', info);
    //         if (err) { console.log(err);return next(err); }
    //         if (!user) { return res.send('not ok'); }
    //         req.logIn(user, function (err) {
    //             if (err) { return next(err); }
    //             return res.send('ok');
    //         });
    //     })(req, res, next);
    // });

    app.get('/signinFailure', authController.signinFailure);//error on signin
    app.get('/signinSuccess', isLoggedIn, authController.signinSuccess);

    function isLoggedIn(req, res, next) {
        // console.log('is logged in');
        // return next();
        console.log('1st is auth:',req.isAuthenticated());
        if (req.isAuthenticated()) {
            console.log('is authenticated');
            return next();
        }
        res.redirect('/signinFailure');
    }

    //signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signupFailure'
    }));

    app.get('/signupFailure', authController.signupFailure);
    app.get('/signupSuccess', authController.signupSuccess);

    app.get('/logout',authController.logout);
};

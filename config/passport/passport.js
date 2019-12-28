const bcrypt = require('bcrypt-nodejs');

module.exports = function (passport, userSequelize) {
    // console.log('userSequelize', userSequelize);
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userSequelize.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    //signup
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {
        const getHash = (pwd) => {
            return bcrypt.hashSync(pwd, 8);
        }
        userSequelize.findOne({ where: { email: email } })
            .then((err, user) => {
                if (err) { return done(err); }
                if (user) { return done(null, false); }
                const userRec = {
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    username: req.body.username,
                    type: req.body.type,
                    email: email,
                    password: getHash(password),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                userSequelize.create(userRec).then((newUser) => {
                    if (!newUser) {
                        return done(null, false);
                    } else {
                        return done(null, newUser);
                    }
                });
            });
    }));

    //signin
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {
        userSequelize.findOne({ where: { email: email } })
            .then((user) => {
                console.log('find user and validate password');
                if (user) {
                    //validate password
                    let isValid = bcrypt.compareSync(password, user.password);
                    if (isValid) {
                        // console.log(user);
                        // console.log(user.get());
                        console.log('login is valid');
                        return done(null, user);
                    }
                }
                return done(null, false);
            });
    }));
};
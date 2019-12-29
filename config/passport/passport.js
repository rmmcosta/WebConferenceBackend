const bcrypt = require('bcrypt');

module.exports = function (passport, userSequelize) {
    // console.log('userSequelize', userSequelize);
    const LocalStrategy = require('passport-local').Strategy;

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log('serialize user');
        done(null, user.id);
    });

    // used to deserialize the user
    // passport.deserializeUser(function (id, done) {
    //     userSequelize.findById(id, function (err, user) {
    //         done(err, user);
    //     });
    // });

    passport.deserializeUser(function (id, done) {
        console.log('user sequelize',userSequelize);
        userSequelize.findByPk(id).then((user) => {
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
                console.log('find one',err);
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
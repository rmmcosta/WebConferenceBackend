const bcrypt = require('bcrypt-nodejs');

module.exports = function (passport, userModel) {
    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        userModel.findById(id).then((user)=>{
            if(user) {
                done(null,user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};
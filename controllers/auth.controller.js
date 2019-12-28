const jsonMessages = require('../assets/jsonMessages/login');

const signinFailure = function(req,res) {
    res.status(jsonMessages.login.invalid.status)
    .end(jsonMessages.login.invalid.message.eng);
};

const signupFailure = function(req,res) {
    res.status(jsonMessages.login.duplicate.status)
    .send(jsonMessages.login.duplicate.message.eng);
};

const signinSuccess = function(req,res) {
    console.log('signin success!');
    res.status(jsonMessages.login.signinSucces.status)
    .end(jsonMessages.login.signinSucces.message.eng);
};

const signupSuccess = function(req,res) {
    res.send(jsonMessages.login.signupSuccess.status)
    .end(jsonMessages.login.signupSuccess.message.eng);
};

module.exports.signinFailure = signinFailure;
module.exports.signupFailure = signupFailure;
module.exports.signinSuccess = signinSuccess;
module.exports.signupSuccess = signupSuccess;
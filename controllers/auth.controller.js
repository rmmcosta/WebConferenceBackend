const jsonMessages = require('../assets/jsonMessages/login');

const signinFailure = function (req, res) {
    res.status(jsonMessages.login.invalid.status)
        .send(jsonMessages.login.invalid.message.eng);
};

const signupFailure = function (req, res) {
    res.status(jsonMessages.login.duplicate.status)
        .send(jsonMessages.login.duplicate.message.eng);
};

const signinSuccess = function (req, res) {
    console.log('signin success!');
    res.status(jsonMessages.login.signinSucces.status)
        .send(jsonMessages.login.signinSucces.message.eng);
};

const signupSuccess = function (req, res) {
    res.status(jsonMessages.login.signupSuccess.status)
        .send(jsonMessages.login.signupSuccess.message.eng);
};

const logout = (req, res, err) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('logout err',err);
            res.status(jsonMessages.login.logoutError.status)
                .send(jsonMessages.login.logoutError.message.eng);
        }
        res.status(jsonMessages.login.logoutSuccess.status)
            .send(jsonMessages.login.logoutSuccess.message.eng);
    });
}

module.exports.signinFailure = signinFailure;
module.exports.signupFailure = signupFailure;
module.exports.signinSuccess = signinSuccess;
module.exports.signupSuccess = signupSuccess;
module.exports.logout = logout;
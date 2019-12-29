const jsonMessages = require('../assets/jsonMessages/login');

const signinFailure = function (req, res) {
    res.sendStatus(jsonMessages.login.invalid.status)
        .end(jsonMessages.login.invalid.message.eng);
};

const signupFailure = function (req, res) {
    res.sendStatus(jsonMessages.login.duplicate.status)
        .send(jsonMessages.login.duplicate.message.eng);
};

const signinSuccess = function (req, res) {
    console.log('signin success!');
    res.sendStatus(jsonMessages.login.signinSucces.status)
        .end(jsonMessages.login.signinSucces.message.eng);
};

const signupSuccess = function (req, res) {
    res.send(jsonMessages.login.signupSuccess.status)
        .end(jsonMessages.login.signupSuccess.message.eng);
};

const logout = (req, res, err) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('logout err',err);
            res.sendStatus(jsonMessages.login.logoutError.status)
                .end(jsonMessages.login.logoutError.message.eng);
        }
        res.sendStatus(jsonMessages.login.logoutSuccess.status)
            .end(jsonMessages.login.logoutSuccess.message.eng);
    });
}

module.exports.signinFailure = signinFailure;
module.exports.signupFailure = signupFailure;
module.exports.signinSuccess = signinSuccess;
module.exports.signupSuccess = signupSuccess;
module.exports.logout = logout;
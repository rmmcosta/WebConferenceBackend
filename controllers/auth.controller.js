const signin = function(req,res) {
    res.send('signin');
};

const signup = function(req,res) {
    res.send('signup');
};

const signinSuccess = function(req,res) {
    res.send('signin success');
};

const signupSuccess = function(req,res) {
    res.send('signup success');
};

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.signinSuccess = signinSuccess;
module.exports.signupSuccess = signupSuccess;
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const controllerParticipant = require('../controllers/participant.controller');
const jsonMessagesFolder = __dirname + "../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesFolder+"db");

//root route
rooter.get('/', function(req,res){
    res.send('RMMCosta version of a WebConference!');
    res.end();
});

//participants
router.get('/conferences/:idconf/participants',
    controllerParticipant.readParticipants);
router.post('/conferences/:idconf/participants/:idparticipant',
    controllerParticipant.saveParticipant);
router.delete('/conferences/:idconf/participants/:idparticipant',
    isLoggedIn, controllerParticipant.deleteParticipant);

//local functions
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.status(jsonMessages.login.unauthorized.status)
            .send(jsonMessages.login.unauthorized);
        return next();
    }
}

module.exports = router;
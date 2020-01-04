const router = require('express').Router();
const controllerParticipant = require('../controllers/participant.controller');
const controllerSpeaker = require('../controllers/speaker.controller');
const controllerSponsor = require('../controllers/sponsor.controller');
const controllerMail = require('../controllers/mail.controller');
const jsonMessagesFolder = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesFolder + "login");
const { sanitizeParam, body, check } = require('express-validator');

//root route
router.get('/', function (req, res) {
    res.send('RMMCosta version of a WebConference!');
    res.end();
});

//participants
router.get('/conferences/:idconf/participants',
    controllerParticipant.readParticipants);

router.delete('/conferences/:idconf/participants/:idparticipant',
    isLoggedIn, controllerParticipant.deleteParticipant);

router.post('/conferences/:idconf/participants/:idparticipant',
    [
        sanitizeParam('idconf').trim().escape(),
        sanitizeParam('idparticipant').trim().escape(),
        body('name').trim().escape().not().isEmpty(),
        check('idconf').not().isEmpty(),
        check('idparticipant').isEmail()
    ],
    controllerParticipant.saveParticipant
);

//speakers
router.get('/conferences/:idconf/speakers',
    controllerSpeaker.readSpeakers);

router.delete('/conferences/:idconf/speakers/:idspeaker',
    isLoggedIn, controllerSpeaker.deleteSpeaker);

//sponsors
router.get('/conferences/:idconf/sponsors',
    controllerSponsor.readSponsors);

router.delete('/conferences/:idconf/sponsors/:idsponsor',
    isLoggedIn, controllerSponsor.deleteSponsor);

//contacts
router.post('/contacts/emails',
    [
        body('name').trim().escape().not().isEmpty(),
        body('email').trim().escape().not().isEmpty().isEmail(),
        body('msg').trim().escape().not().isEmpty(),
        //only validates phone if the value is inputed
        body('phone').if((value, { req }) => req.body.phone).isMobilePhone()
    ],
    controllerMail.sendEmail
);

//local functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(jsonMessages.login.unauthorized.status)
            .send(jsonMessages.login.unauthorized);
        res.redirect('/');
    }
}

module.exports = router;
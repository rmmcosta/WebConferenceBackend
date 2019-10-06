const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const participant = require('../controllers/participant.controller');

router.post('/participants',function(req,res){
    console.log('post participants');
    let result = participant.participantCreate(req.body.name,req.body.email);
    res.send('Participant created: ' + JSON.stringify(result));
});

module.exports = router;
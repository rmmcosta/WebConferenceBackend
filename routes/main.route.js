const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const participant = require('../controllers/participant.controller');

router.post('/participants',function(req,res){
    console.log('post participants');
    participant.participantCreate(req.body.name,req.body.email);
});

module.exports = router;
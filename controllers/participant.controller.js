const connect = require('../config/connectMySQL');
const jsonMessagesFolder = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesFolder + "db");
const { validationResult } = require('express-validator');
const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const ParticipantModel = require('./../models/participant');
const Participant = ParticipantModel(sequelize, Sequelize);
//console.log(Participant);

const saveParticipant = function (req, res) {
    const errors = validationResult(req);
    //console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // console.log(req.params.idconf);
    // console.log(req.params.idparticipant);
    // console.log(req.body.name);
    Participant.create({
        name: req.body.name,
        email: req.params.idparticipant,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(function (participant) {
        if (participant) {
            //console.log(participant);
            res.send(participant);
        } else {
            res.status(400).send('Error in insert new participant!');
        }
    });
}

const readParticipants = function (req, res) {
    res.send('ok');
}

const deleteParticipant = function (req, res) {
    res.send('ok');
}

/*function(req,res){
    console.log('post participants');
    let result = participant.participantCreate(req.body.name,req.body.email);
    res.send('Participant created: ' + JSON.stringify(result));
} */

module.exports.readParticipants = readParticipants;
module.exports.saveParticipant = saveParticipant;
module.exports.deleteParticipant = deleteParticipant;
const jsonMessagesFolder = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesFolder + "db");
const { validationResult } = require('express-validator');
const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const ParticipantModel = require('./../models/participant');
const ConfParticipantModel = require('./../models/conf_participant');
const ConfParticipant = ConfParticipantModel(sequelize, Sequelize);
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

    //only create the participant if not exists already

    Participant.findOrCreate(
        {
            where: { email: req.params.idparticipant },
            defaults: {
                name: req.body.name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        .then(([participant, participantcreated]) => {
            if (participant) {
                ConfParticipant.findOrCreate(
                    {
                        where: {
                            ConferenceId: req.params.idconf,
                            ParticipantId: participant.id
                        },
                        defaults: {
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    })
                    .then(([confparticipant, confparticipantcreated]) => {
                        if (!confparticipant) {
                            res.status(400).send('Error in insert new participant!');
                            return;
                        }
                        if (participantcreated) {
                            res.send('Registered with Success!');
                            return;
                        }
                        if (confparticipantcreated) {
                            res.send('Registered with Success!');
                        } else {
                            res.send('Participant already registered for this conference!');
                        }
                    });
            } else {
                res.status(400).send('Error in insert new participant!');
            }
        });

    // This is the logic to use if we don't want to check if 
    // the participant already exists and if it's already added to
    // the conference
    /*Participant.create({
        name: req.body.name,
        email: req.params.idparticipant,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(function (participant) {
        if (participant) {
            ConfParticipant.create({
                ConferenceId: req.params.idconf,
                ParticipantId: participant.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(function (confparticipant) {
                if (confparticipant) {
                    res.send('Participant creted and added to the Conference!');
                } else {
                    res.status(400).send('Error in adding the participant to the conference');
                }
            });
        } else {
            res.status(400).send('Error in insert new participant!');
        }
    });*/
}

const readParticipants = function (req, res) {
    if (req.params.idconf>0) {
        ConfParticipant.findAll(
            {
                where: {
                    ConferenceId: req.params.idconf
                },
                attributes: ['ParticipantId']
            })
            .then(result => {
                //console.log(result[0].dataValues.ParticipantId);
                let ids = [];
                result.forEach(element => {
                    ids.push(element.dataValues.ParticipantId);
                });
                console.log(ids);
                Participant.findAll(
                    {
                        where: {
                            id: ids
                        }
                    })
                    .then(participants => {
                        res.send(participants);
                    });
            });
    } else {
        Participant.findAll().then(participants => {
            res.send(participants);
        });
    }
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
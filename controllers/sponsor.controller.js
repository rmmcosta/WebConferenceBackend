const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const SponsorModel = require('./../models/sponsor');
const ConfSponsorModel = require('./../models/conf_sponsor');
const ConfSponsor = ConfSponsorModel(sequelize, Sequelize);
const Sponsor = SponsorModel(sequelize, Sequelize);
const { validationResult } = require('express-validator');

const saveSponsor = function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (req.params.idsponsor > 0) {
        updateSponsor(req);
    } else {
        createSponsor(req);
    }

    function createSponsor(req) {
        Sponsor.create({
            name: req.body.name,
            logo: req.body.logo,
            category: req.body.category,
            link: req.body.link,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(newSponsor => {
                console.log(`New sponsor ${newSponsor.name}, with id ${newSponsor.id} has been created.`);
                ConfSponsor.create({
                    ConferenceId: req.params.idconf,
                    SponsorId: newSponsor.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .then(() => {
                        res.send(newSponsor);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).send('Internal Server Error');
                    })
                    ;
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            })
            ;
    }

    function updateSponsor(req) {
        Sponsor.update({
            name: req.body.name,
            logo: req.body.logo,
            category: req.body.category,
            link: req.body.link,
            updatedAt: new Date()
        }, { where: { id: req.params.idsponsor } })
            .then(updatedSponsor => {
                console.log(updatedSponsor)
                res.send('ok');
            })
    }
}

const readSponsors = function (req, res) {
    if (req.params.idconf > 0) {
        ConfSponsor.findAll(
            {
                where: {
                    ConferenceId: req.params.idconf
                },
                attributes: ['SponsorId']
            })
            .then(result => {
                //console.log(result[0].dataValues.SponsorId);
                let ids = [];
                result.forEach(element => {
                    ids.push(element.dataValues.SponsorId);
                });
                console.log(ids);
                Sponsor.findAll(
                    {
                        where: {
                            id: ids
                        }
                    })
                    .then(Sponsors => {
                        res.send(Sponsors);
                    });
            });
    } else {
        Sponsor.findAll().then(Sponsors => {
            res.send(Sponsors);
        });
    }
}

const readSponsor = function (req, res) {
    Sponsor.findAll(
        {
            where: {
                id: req.params.idsponsor
            }
        })
        .then(Sponsors => {
            res.send(Sponsors);
        });
}

const deleteSponsor = function (req, res) {
    ConfSponsor.destroy({
        where: {
            sponsorid: req.params.idsponsor
        }
    });
    Sponsor.destroy({
        where: {
            id: req.params.idsponsor
        }
    });
    res.send('ok');
}

module.exports.readSponsors = readSponsors;
module.exports.deleteSponsor = deleteSponsor;
module.exports.saveSponsor = saveSponsor;
module.exports.readSponsor = readSponsor;
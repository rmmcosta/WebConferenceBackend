const index = require('./../models/index');
const Sequelize = index.Sequelize;
const sequelize = index.sequelize;
const SponsorModel = require('./../models/sponsor');
const ConfSponsorModel = require('./../models/conf_sponsor');
const ConfSponsor = ConfSponsorModel(sequelize, Sequelize);
const Sponsor = SponsorModel(sequelize, Sequelize);

const readSponsors = function (req, res) {
    if (req.params.idconf>0) {
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

module.exports.readSponsors = readSponsors;
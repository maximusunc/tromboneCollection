const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Trombone
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getTrombone: function(req, res) {
        db.Trombone
            .findById({_id: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateTrombone: function(req, res) {
        db.Trombone
            .update({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    deleteTrombone: function(req, res) {
        db.Trombone
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createTrombone: function(req, res) {
        db.Trombone
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
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
        console.log("id: " + req.params.id);
        console.log(req.body);
        db.Trombone
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    search: function(req, res) {
        db.Trombone
            .find({maker: req.body})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    save: function(req, res) {
        db.Trombone
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Trombone
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
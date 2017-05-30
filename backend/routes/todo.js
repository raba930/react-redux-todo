import passport from 'passport';
import express from 'express';
import Account from '../models/Account';

let router = express.Router();
router.put('/add', passport.authenticate('token', { session: false }), function(req, res) {
    // use mongoose validators instead of ifs
    if (!req.body.todo || !req.body.todo.text) {
        res.status(400).json({error: 'Todo missing'});
        return;
    }
    Account.update({
        token: req.user.token
    }, { $push: {
        todos: req.body.todo
    }   }, err => {
        if (err) res.status(500).json(err);
        else res.json({status: 200});
    });
});

router.delete('/remove/:id', passport.authenticate('token', { session: false }), function(req, res) {
    Account.update({
        token: req.user.token
    }, { $pull: {
        todos: { _id: req.params.id }
    }   }, err => {
        if (err) res.status(500).json(err);
        else res.json({status: 200});
    });
});

router.get('/todos', passport.authenticate('token', { session: false }), function(req, res) {
    Account.find({
        token: req.user.token
    }, (err, data) => {
        if (err) res.status(500).json(err);
        res.json({todos: data[0].todos});
    });
});

module.exports = router;

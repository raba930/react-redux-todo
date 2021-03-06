import passport from 'passport';
import express from 'express';
import Account from '../models/Account';
import _ from 'underscore';

let router = express.Router();
router.put('/add', passport.authenticate('token', { session: false }), function(req, res) {
    const todos = req.body.todos;
    // use mongoose validators instead of ifs
    if (!todos || !todos.length) {
        return res.status(400).json({error: 'Todo missing'});
    }
    if (_.find(todos, todo => !todo.text )) {
        return res.status(400).json({error: 'Todo text missing'});
    }
    Account.update({
        token: req.user.token
    }, { $pushAll: {
        todos: todos
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
    }   }, (err, data) => {
        if (err) res.status(500).json(err);
        else res.json({status: 200});
    });
});

router.get('/todos', passport.authenticate('token', { session: false }), function(req, res) {
    Account.findOne({
        token: req.user.token
    }, (err, data) => {
        if (err) res.status(500).json(err);
        res.json({todos: data.todos});
    });
});

module.exports = router;

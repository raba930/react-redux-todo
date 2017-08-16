import passport from 'passport';
import express from 'express';
import Account from '../models/Account';
import _ from 'underscore';

let router = express.Router();
router.put('/', passport.authenticate('token', { session: false }), function(req, res) {
    const todos = req.body.todos;
    // use mongoose validators instead of ifs
    if (!todos || !todos.length) {
        return res.status(400).json({error: 'Todo missing'});
    }
    if (_.find(todos, todo => !todo.text )) {
        return res.status(400).json({error: 'Todo text missing'});
    }
    Account.findOneAndUpdate({
        token: req.user.token
    }, { $push: {
        todos: { $each: todos }
    }   }, {
        new: true
    }, (err, acc) => {
        if (err) res.status(500).json(err);
        else res.json({todos: acc.todos});
    });
});

router.post('/completed/:id', passport.authenticate('token', { session: false }), function(req, res) {
    if (typeof req.body.completed !== 'boolean') return res.status(400).end();
    Account.update({
        token: req.user.token,
        'todos._id': req.params.id
    }, { $set: {
        'todos.$.completed': req.body.completed
    } }, (err, data) => {
        if (err) res.status(400).json(err);
        else if (data && data.n === 0) res.status(404).end();
        else res.json({status: 200});
    });
});

router.post('/info/:id', passport.authenticate('token', { session: false }), function(req, res) {
    if (typeof req.body.info !== 'string') return res.status(400).end();
    Account.update({
        token: req.user.token,
        'todos._id': req.params.id
    }, { $set: {
        'todos.$.info': req.body.info
    } }, (err, data) => {
        if (err) res.status(400).json(err);
        else if (data && data.n === 0) res.status(404).end();
        else res.json({status: 200});
    });
});

router.delete('/completed', passport.authenticate('token', { session: false }), function(req, res) {
    Account.update({
        token: req.user.token,
    }, { $pull: {
        todos: { completed: true }
    }   }, (err, data) => {
        if (err) res.status(500).json(err);
        else res.json({status: 200});
    });
});

router.delete('/:id', passport.authenticate('token', { session: false }), function(req, res) {
    Account.update({
        token: req.user.token
    }, { $pull: {
        todos: { _id: req.params.id }
    }   }, (err, data) => {
        if (err) res.status(500).json(err);
        else res.json({status: 200});
    });
});

router.get('/', passport.authenticate('token', { session: false }), function(req, res) {
    Account.findOne({
        token: req.user.token
    }, (err, data) => {
        if (err) res.status(500).json(err);
        res.json({todos: data.todos});
    });
});

module.exports = router;

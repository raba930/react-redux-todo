import passport from 'passport';
import jwt from 'jwt-simple';
import express from 'express';
import path from 'path';
import Account from '../models/Account';
import dbConfig from '../db.js';

let router = express.Router();
let appRoot = path.dirname(require.main.filename).replace(/\/bin/, '');
router.put('/todo/add', passport.authenticate('token', { session: false }), function(req, res) {
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

router.delete('/todo/remove/:id', passport.authenticate('token', { session: false }), function(req, res) {
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

router.get('*', function(req, res) {
    res.sendFile('/public/index.html', { root: appRoot });
});


router.post('/api/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }
    var token = jwt.encode({user: req.body.username}, dbConfig.secret);
    Account.register(new Account({ username : req.body.username, token: token}), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({ error : err.message });
        }
        res.json({status: 200, username: req.body.username, token: token});
    });
});

router.post('/api/login', passport.authenticate('local', { session: false }), function(req, res) {
    res.json({token: req.user.token});
});

router.post('/api/token', passport.authenticate('token', { session: false }), function(req, res) {
    res.json(req.user);
});

router.post('/ping', passport.authenticate('token', { session: false }), function(req, res) {
    res.json(req.user);
});

module.exports = router;

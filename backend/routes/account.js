import passport from 'passport';
import jwt from 'jwt-simple';
import express from 'express';
import Account from '../models/Account';
import dbConfig from '../db.js';

let router = express.Router();

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }
    var token = jwt.encode({user: req.body.username}, dbConfig.secret);
    Account.register(new Account({ username : req.body.username, token: token}), req.body.password, function(err, account) {
        if (err) {
            if (err.name === 'UserExistsError') {
                return res.status(409).send(err);
            }
            return res.sendStatus(500);
        }
        res.json({status: 200, username: req.body.username, token: token});
    });
});

router.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
    res.json({
        token: req.user.token,
        todos: req.user.todos
    });
});

router.post('/token', passport.authenticate('token', { session: false }), function(req, res) {
    res.json(req.user);
});

module.exports = router;

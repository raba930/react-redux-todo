import passport from 'passport';
import jwt from 'jwt-simple';
import express from 'express';
import path from 'path';
import Account from '../models/account';
import dbConfig from '../db.js';

let router = express.Router();
let appRoot = path.dirname(require.main.filename).replace(/\/bin/, '');

router.get('*', function(req, res) {
    res.sendFile('/public/index.html', { root: appRoot });
});

router.post('/api/register', function(req, res) {
    var token = jwt.encode({user: req.body.username}, dbConfig.secret);
    Account.register(new Account({ username : req.body.username, token: token}), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({ error : err.message });
        }
        res.json({status: '200', username: req.body.username, token: token});
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

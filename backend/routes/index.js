import passport from 'passport';
import jwt from 'jwt-simple';
import express from 'express';
import path from 'path';
import Account from '../models/Account';
import Todo from '../models/Todo';
import dbConfig from '../db.js';

let router = express.Router();
let appRoot = path.dirname(require.main.filename).replace(/\/bin/, '');
router.put('/todo/add', passport.authenticate('token', { session: false }), function(req, res) {
    let td = new Todo;
    td.token = req.user.token;
    td.text = req.body.text;
    td.id = req.body.id;
    td.info = req.body.info;
    td.completed = req.body.completed;
    td.save(
        err => {
            if (err) res.status(500).json({status: '500'});
            res.json({status: '200'});
        }
    );
});

router.delete('/todo/remove/:id', passport.authenticate('token', { session: false }), function(req, res) {
    Todo.remove({token: req.user.token, id: req.params.id}, (err, data) => {
        console.log('--- ', req.params.id);
        res.end('bb');
    })


});

router.get('/db', passport.authenticate('token', { session: false }), function(req, res) {

    Todo.find({
        token: req.user.token
    }, (err, data) => {
        if (err) res.status(500).json({status: '500'})
            console.log('---- ', data);
        res.end('---');
    });
});

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

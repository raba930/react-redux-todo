import express from 'express';
import path from 'path';

let router = express.Router();
let appRoot = path.dirname(require.main.filename).replace(/\/bin/, '');

router.get('*', function(req, res) {
    res.sendFile('/public/index.html', { root: appRoot });
});

module.exports = router;

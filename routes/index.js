var express = require('express');
// var budget = require('budget.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.params.add__value);

    res.render('index', { title: 'cool', condition: true, anyArray: [1, 2, 3] });
});

/* Post home page. */
router.post('/', function(req, res, next) {
    console.log(req.body.add__value);
    res.render('index', { title: 'cool', condition: true, anyArray: [1, 2, 3] });
});

module.exports = router;
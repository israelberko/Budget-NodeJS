var express = require('express');
var expense = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/expense');
var budget = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/budget');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.params.add__value);

    res.render('index', { title: 'cool', condition: true, anyArray: [1, 2, 3] });
});

/* Post home page. */
router.post('/', function(req, res, next) {
    console.log(req.body.add__value);
    var budgetController = new budget();
    budgetController.addItem(req.body.add__type, req.body.add__description, req.body.add__value);
    console.log(`budget is : ${budgetController.testing()}`);
    res.render('index', { title: 'cool', condition: true, anyArray: [1, 2, 3] });
});

module.exports = router;
var express = require('express');
var expense = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/expense');
var budget = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/budget');
var BudgetDetails = require('../models/BudgetDetails');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.params.add__value);

    res.render('index', { title: 'cool', condition: true, anyArray: [1, 2, 3] });
});

/* Post home page. */
router.post('/', function(req, res, next) {
    var budgetDetails = new BudgetDetails(req.session.budgetDetails ? req.session.budgetDetails : {});

    budgetDetails.addItem(req.body.add__type, req.body.add__description, req.body.add__value);
    req.session.budgetDetails = budgetDetails;
    var incomes = budgetDetails.generateArray(budgetDetails.data.allItems.inc);
    var expenses = budgetDetails.generateArray(budgetDetails.data.allItems.exp);
    res.render('index', { title: 'cool', condition: true, incomes: incomes, expenses: expenses });
});

module.exports = router;
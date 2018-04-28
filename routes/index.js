var express = require('express');
var expense = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/expense');
var budget = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/budget');
var BudgetDetails = require('../models/BudgetDetails');
var Budget = require('../models/budget');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("req.query.budget__date: " + req.query.budget__date);
    console.log("req.user: " + req.user._id);
    var date = req.query.budget__date;
    var monthName, year;
    if (typeof date !== 'string') {
        year="2018";
    } else {
        var dateSplit = date.split(',');
        monthName = dateSplit[0];
        year = dateSplit[1];
    }

    var incomes = {};
    var expenses = {};

    Budget.findOne({'user': req.user, 'year': year}, 'year month data', function (err, budget) {
        if (err) {
            return console.log("error query the DB");
        }
        console.log('%s %s is a %s.', budget.data.toString(), budget.year,
            budget.month);
        var budgetDetails = new BudgetDetails(budget.data);
        budgetDetails.testing();
        console.log("income: " + budgetDetails.data.allItems.inc.toString());

        incomes = budgetDetails.generateArray(budgetDetails.data.allItems.inc);
        expenses = budgetDetails.generateArray(budgetDetails.data.allItems.exp);

        console.log("incomes: " + incomes.length);
        res.render('index', {
            incomes: incomes,
            expenses: expenses,
            bDate: req.query.budget__date
        });
    });


    console.log("incomes: " + incomes.length);
    console.log("expenses: " + expenses);
});

/* Post home page. */
router.post('/monthDisplay', isLoggedIn, function (req, res, next) {
        res.render('index', {
            title: 'co11ol',
            incomes: {},
            expenses: {},
            bDate: "cooolll"
        });
    }
);
router.post('/', isLoggedIn, function (req, res, next) {
    // var budgetDetails = new BudgetDetails(req.session.budgetDetails ? req.session.budgetDetails : {});
    //
    //
    // req.session.budgetDetails = budgetDetails;
    // var incomes = budgetDetails.generateArray(budgetDetails.data.allItems.inc);
    // var expenses = budgetDetails.generateArray(budgetDetails.data.allItems.exp);

    var date = req.query.budget__date;
    var monthName, year;
    if (typeof date !== 'string') {
        year="2018";
    } else {
        var dateSplit = date.split(',');
        monthName = dateSplit[0];
        year = dateSplit[1];
    }

    // how to solve the async of the functions
    var incomes = {};
    var expenses = {};
    Budget.findOne({'user': req.user, 'year': year}, 'year month data', function (err, budget) {
        if (err) {
            return console.log("error query the DB");
        }
        console.log('%s %s is a %s.', budget.data.toString(), budget.year,
            budget.month);
        var budgetDetails = new BudgetDetails(budget.data);
        budgetDetails.addItem(req.body.add__type, req.body.add__description, req.body.add__value);
        budgetDetails.testing();
        console.log("income: " + budgetDetails.data.allItems.inc.toString());

        incomes = budgetDetails.generateArray(budgetDetails.data.allItems.inc);
        expenses = budgetDetails.generateArray(budgetDetails.data.allItems.exp);

        console.log("incomes: " + incomes.length);
        res.render('index', {
            incomes: incomes,
            expenses: expenses,
            bDate: req.query.budget__date
        });
    });

    //TODO: decide if year & month data belongs in the data field or get spot in the high level field
    //select user id and year & month if exists show the data and update if not create and show
    //set the current year & month

    // var newBudget = Budget();
    // newBudget.year = "2019";
    // newBudget.month = "07";
    // newBudget.data = budgetDetails;
    // newBudget.user = req.user;
    // newBudget.save(function (err, result) {
    //     if (err) {
    //         req.flash('failure', 'Failure bought product!');
    //     }
    //     req.flash('success', 'Successfully bought product!');
    // });

    // res.render('index', {
    //     incomes: incomes,
    //     expenses: expenses,
    //     bDate: req.body.budget__date
    // });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

module.exports = router;
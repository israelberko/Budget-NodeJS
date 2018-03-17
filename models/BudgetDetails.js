var expense = require('../models/budget/expense');
var income = require('../models/budget/income');


module.exports = function BudgetDetails(oldBudgetDetails) {
    this.data = oldBudgetDetails.data || {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1,
    };

    this.testing = function() {
        console.log(this.data);
    };

    this.addItem = function(type, des, val) {
        var newItem;

        //Create new ID
        if (this.data.allItems[type].length > 0) {
            ID = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;;
        } else {
            ID = 0;
        }

        //Create new item base on type
        if (type === 'exp') {
            newItem = new expense(ID, des, val);
        } else if (type === 'inc') {
            newItem = new income(ID, des, val);
        }

        //Push it to the data structure
        this.data.allItems[type].push(newItem);

        //Return the new Element
        return newItem;
    };

    this.generateArray = function(items) {
        var arr = [];
        for (var id in items) {
            arr.push(items[id]);
        }
        return arr;
    };
};
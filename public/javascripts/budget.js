var expense = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/expense');
var income = require('/Users/israelb/Developer tools/learning-Nodejs/budget-handlebars/public/javascripts/income');

var budgetController = (function() {

    this.data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1
    };

});

budgetController.prototype.testing = function() {
    console.log(this.data);
};

budgetController.prototype.addItem = function(type, des, val) {
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

module.exports = budgetController;

// module.exports = {
//     calculateTotal: function(type) {
//         var sum = 0;
//         data.allItems[type].forEach(function(current) {
//             sum += current.value;
//         });

//         data.totals[type] = sum;
//     },


//     deleteItem: function(type, id) {
//         var ids, index;
//         ids = data.allItems[type].map(function(current) {
//             return current.id;
//         });

//         index = ids.indexOf(id);

//         if (index !== -1) {
//             data.allItems[type].splice(index, 1);
//         }

//     },
//     calculateBudget: function() {
//         //calculate total income and expenses
//         calculateTotal('exp');
//         calculateTotal('inc');

//         //calculate the budget: income - expenses
//         data.budget = data.totals.inc - data.totals.exp;

//         //calculate the precentage of income thet we spent
//         if (data.totals.inc > 0) {
//             data.precentage = Math.round((data.totals.exp / data.totals.inc) * 100);
//         } else {
//             data.precentage = -1;
//         }
//     },
//     calculatePrecentages: function() {
//         data.allItems.exp.forEach(function(curr) {
//             curr.calcPrecentages(data.totals.inc);
//         });
//     },
//     getPrecentages: function() {
//         var allPrec =
//             data.allItems.exp.map(function(curr) {
//                 return curr.getPrecentage();
//             });

//         return allPrec;
//     },
//     getBudget: function() {
//         return {
//             budget: data.budget,
//             totalIncome: data.totals.inc,
//             totalExpense: data.totals.exp,
//             precentage: data.precentage
//         }
//     }
// };
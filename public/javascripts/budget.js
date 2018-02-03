// BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.precentage = -1;
    };

    Expense.prototype.calcPrecentages = function(totalIncome) {
        if (totalIncome > 0) {
            this.precentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.precentage = -1;
        }
    };

    Expense.prototype.getPrecentage = function() {
        return this.precentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });

        data.totals[type] = sum;
    };

    var data = {
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

    return {
        addItem: function(type, des, val) {
            var newItem;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;;
            } else {
                ID = 0;
            }

            //Create new item base on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push it to the data structure
            data.allItems[type].push(newItem);

            //Return the new Element
            return newItem;
        },
        deleteItem: function(type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the precentage of income thet we spent
            if (data.totals.inc > 0) {
                data.precentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.precentage = -1;
            }
        },
        calculatePrecentages: function() {
            data.allItems.exp.forEach(function(curr) {
                curr.calcPrecentages(data.totals.inc);
            });
        },
        getPrecentages: function() {
            var allPrec =
                data.allItems.exp.map(function(curr) {
                    return curr.getPrecentage();
                });

            return allPrec;
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp,
                precentage: data.precentage
            }
        },
        testing: function() {
            console.log(data);
        }
    };

})();

var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLable: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        precentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            console.log(Math.round(int.length / 3)); //TODO - fix the ',' number
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHTML, element;
            //create html string with placehplder tags
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }

            //replace the placeholder tags with actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },
        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },
        displayBudget: function(obj) {
            var type;
            type = obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLable).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'exp');

            if (obj.precentage > 0) {
                document.querySelector(DOMstrings.precentageLabel).textContent = obj.precentage + '%';
            } else {
                document.querySelector(DOMstrings.precentageLabel).textContent = '---';
            }
        },
        displayPercentages: function(precentages) {
            var fields = document.querySelectorAll(DOMstrings.expensePercLabel);

            nodeListForEach(fields, function(current, index) {
                if (precentages[index] > 0) {
                    current.textContent = precentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
        displayMonth: function() {
            var year, month, months;
            var now = new Date();
            months = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'Ocober', 'November', 'December'
            ];
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

        },
        changedType: function() {
            var fields = document.querySelectorAll(DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        // document.querySelector(DOM.inputBtn).addEventListener('click', window.location.reload());

        // //key press event on the anywhere on the document
        // document.addEventListener('keypress', function(event) {
        //     if (event.keyCode === 13 || event.which === 13) {
        //         ctrlAddItem();
        //     }
        // });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)
    };


    var updateBudget = function() {
        //1.calc the budget
        budgetCtrl.calculateBudget();
        //2.return the budget
        var budget = budgetCtrl.getBudget();
        //3.dispaly the budget on the ui
        UICtrl.displayBudget(budget);
    }

    var updatePrecentages = function() {
        //1. calculate the precentages
        budgetCtrl.calculatePrecentages();
        //2. read them from the budget controller
        var percentages = budgetCtrl.getPrecentages();
        //3. update UI
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function() {
        //1.get the field input data
        var input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2.add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3.add tge item to the UI
            UICtrl.addListItem(newItem, input.type);
            //4. clear the fields
            UICtrl.clearFields();
            //5.calculate and update budget
            updateBudget();
            //6. calculate and update precentages
            updatePrecentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            //1. delete the item from the data structre
            budgetCtrl.deleteItem(type, id);
            //2. delete the item from the ui
            UICtrl.deleteListItem(itemID);
            //3. update and show the new budget
            updateBudget();
            //4. calculate and update precentages
            updatePrecentages();
        }
    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                precentage: 0
            });
        }
    }

})(budgetController, UIController);

controller.init();
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


module.exports = Expense;
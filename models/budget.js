var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    month: { type: String, require: true },
    year: { type: String, require: true },
    data: { type: Object, require: true }
});


module.exports = mongoose.model('Budget', budgetSchema);
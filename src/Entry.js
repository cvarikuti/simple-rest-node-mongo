
var mongoose = module.parent.exports.mongoose;

var entrySchema = mongoose.Schema({
    itemname: String,
    id: {type: String, unique: true},
    cost: Number
   });
var entry = mongoose.model('Entry', entrySchema);
module.exports = entry;
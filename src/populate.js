var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/test');
module.exports.mongoose = mongoose;

var Entry = require("./Entry.js")
var Customer = require("./Customer.js")

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	 var bigco = new Customer( { name: "BigCo", id: "00002", email:"accounts@big.co"});
    bigco.save(function(err, o) { console.log(err)});

    var acme = new Customer( { name: "Acme", id: "00001", email:"accounts@acme.com"});
    acme.save(function(err, o) { console.log(err)});
   
   
   var widget = new Entry( { itemname: "Widget", id: "1", cost:"5.00"});
   widget.save();
   
   var thingummy = new Entry( { itemname: "Thingummy", id: "2", cost:"5000.00"});
   thingummy.save();
   
	//process.exit(0);  
});




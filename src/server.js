var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo-data/test');
module.exports.mongoose = mongoose;
var Customer     =   require("./Customer.js");
var Entry = require("./Entry.js")
var router      =   express.Router();
var db = mongoose.connection;

console.log("starting");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.get("/",function(req,res){
    res.json({"message" : "mongo rest server app"});
});

app.get("/customers", function(req,res){
	Customer.find({}, function(err, data) {
		if (!err && data) {
			for (i in data) {
				data[i].__v = undefined;
				data[i]._id = undefined;
			}
			res.json(data);
		}
	});
});
	    
	    
app.post("/customers", function(req,res){
	var c = new Customer(req.body);
	c.save()
	Customer.findOne({id:c.id}, function(err, data) {
		
		if (!err && data) {
			// remove internal fields from Mongo
			data.__v = undefined;
			data._id = undefined;
			
			res.set("Location","/customers/"+c.id);
			res.status(201).json(data);
		}
	});
	
});

app.get("/customers/:id", function(req,res){
	var response = {};
	Customer.findOne({id: req.params.id} ,function(err,data){
	// This will run Mongo Query to fetch data based on ID.
		if(!err && data) {
			// remove internal fields from Mongo
			data.__v = undefined;
			data._id = undefined;
			res.json(data); 
		}
		else {
			res.sendStatus(404);
		}
	});
});

app.get("/cat", function(req,res){
	 Entry.find({}, function(err, data) {
	 for (i in data) {
			 data[i].__v = undefined;
			 data[i]._id = undefined;
		 }
	 if (!err && data) res.json(data);
	 });
 });
    

app.post("/cat", function(req,res){
	var e = new Entry(req.body);
	e.save();
	Entry.findOne({id:e.id}, function(err, data) {
		if (!err) {
			// remove internal fields from Mongo
			data.__v = undefined;
			data._id = undefined;
			
			res.set("Location","/cat/"+e.id);
			res.status(201).json(data);
		}
	});

});

app.get("/cat/:id", function(req,res){
	var response = {};
	Entry.findOne({id: req.params.id} ,function(err,data){
	// This will run Mongo Query to fetch data based on ID.
		if(!err && data) {
			// remove internal fields from Mongo
			data.__v = undefined;
			data._id = undefined;
			res.json(data);
						   
		}
		else {
			res.sendStatus(404);
		}
	});
});

app.listen(8000);
console.log("Listening to PORT 8000");
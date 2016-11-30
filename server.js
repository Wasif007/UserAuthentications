var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;
var id=1;
var users=[];
var body_parser=require('body-parser');
var db=require('./db.js');
var _=require('underscore');
app.use(body_parser.json());
//Get all users
app.get("/user",function(req,res){
res.send(users);
});

//Post a user
app.post("/user",function(req,res){
var body=req.body;
body.id=id;
id++;
users.push(body);
res.send(body);
});

//Post /users
app.post("/users",function(req,res){
	var body=_.pick(req.body,'email','password');
	db.user.create(body).then(function(user){
		res.send(user.toJSON());
	},function(e){
		res.status(400).json(e);
	});
});

db.sequelize.sync({force:true}).then(function()
{
app.listen(PORT,function(){
	console.log("Listening on port"+PORT);
});
});
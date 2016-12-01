var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;
var id=1;
var users=[];
var body_parser=require('body-parser');
var db=require('./db.js');
var _=require('underscore');
var bcrypt=require('bcrypt');
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
		res.send(user.toPublicJSON());
	},function(e){
		res.status(400).json(e);
	});
});

//Post /users/login
app.post("/users/login",function(req,res){
var body=_.pick(req.body,'email','password');

	if(typeof body.email!=='string' || typeof body.password!=='string')
	{
		return res.status(404).send();
	}
	db.user.findOne({
		where:{
			email:body.email
		}
	}).then(function(user){
		if(!user || !bcrypt.compareSync(body.password,user.get('hashed_password')))
		{
			return res.status(404).send();
		}
		return res.status(200).send(user.toPublicJSON());
	},function(){
		res.status(500).send();
	})
});
//Get all users
app.get("/users/all",function(req,res){
db.user.all().then(function(values){
res.send(values);
});
});

//about route
app.get("/about",function(req,res){
res.send("made on request of Naeem Siddiq");
});
db.sequelize.sync({force:true}).then(function()
{
app.listen(PORT,function(){
	console.log("Listening on port"+PORT);
});
});
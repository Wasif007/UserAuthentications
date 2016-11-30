var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;
var users=[];
var body_parser=require('body-parser');

app.use(body_parser.json());
//Get all users
app.get("/user",function(req,res){
res.send(users);
});

//Post a user
app.post("/user",function(req,res){
var body=req.body;
console.log(body.password);
res.send(body);
});

app.listen(PORT,function(){
console.log("Listening on PORT :"+PORT);
});
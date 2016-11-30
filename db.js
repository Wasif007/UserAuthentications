var Squeleizer=require('sequelize');
var sequelize = new Squeleizer(undefined,undefined,undefined,{
"dialect":"sqlite",
"storage":__dirname+"/data/user-api.sqlite"
});

var db={};
db.user=sequelize.import(__dirname+"/models/users.js");
db.sequelize=sequelize;
db.Squeleizer=Squeleizer;
module.exports=db;
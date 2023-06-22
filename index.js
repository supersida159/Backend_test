var express=require("express");
var app=express();
app.set('view engine','ejs')
app.set('views','./views')

var useRouter= require('./routes/user.route')


// require fs (filesystem) module
var shortid = require('shortid');


var bodyParser= require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/users',useRouter)


app.listen(3000,()=> console.log("send data"));
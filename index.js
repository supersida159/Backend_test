var express=require("express");
var app=express();
app.set('view engine','pug')
app.set('views','./views')
var bodyParser= require('body-parser');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// require fs (filesystem) module
var shortid = require('shortid');

// change permission of myFile.txt to 775

db.defaults({ users: [{name:"Tung", age: "19"}]})
  .write()
// const db = new LowSync(new JSONFileSync('file.json'), {})



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const users = [

  ];

app.get('/users',(req,res)=>{
    res.render('users/index',{
        users: db.get('users').value()
    })
});

app.get('/users/create',(req,res)=>{

    res.render('users/create',{
    })
});

app.post('/users/create',(req,res)=>{

    // db.data=req.body,
    // db.write(),
    // users.push(req.body),
    req.body.id = shortid.generate()
    db.get('users')
        .push(req.body)
        .write()
    res.redirect('/users')
    
});

app.get('/users/:id',(req,res)=>{
    var id = req.params.id;

    var user = db.get('users').find({id: id}).value();
    console.log(user);
    res.render('index',
    {users: user}
    )
});

app.get('/users/search',function(req,res){

    var q=req.query.p
    console.log(q)
    var matchusers=users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1
    })
    console.log(matchusers)

    res.render('users/index',{
        users: matchusers
    })
})
app.listen(3000,()=> console.log("send data"));
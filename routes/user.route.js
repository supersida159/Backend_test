var express=require("express");
var router=express.Router();

var Controller=require("../controller/controller.modules")
var shortid = require('shortid');

var db = require('../db')


router.get('/',Controller.index);

router.get('/create',Controller.create);


router.post('/create',(req,res)=>{
    console.log(req.body)
    req.body.id = shortid.generate()
    db.get('users')
        .push(req.body)
        .write()
    res.redirect('/users')
    
});

router.get('/:id',(req,res)=>{
    var id = req.params.id;

    var user = db.get('users').find({id: id}).value();
    console.log(user);
    res.render('index',
    {users: user}
    )
});

router.get('/search',function(req,res){

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
module.exports = router;

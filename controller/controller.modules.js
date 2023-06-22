

var db=require("../db")

module.exports.index=function(req,res){
    res.render('users/index',{
        users: db.get('users').value()
    })
};
module.exports.create = function(req,res){

    res.render('users/create',{
    })
}
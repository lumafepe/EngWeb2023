var axios = require('axios')
var logger = require('./logger.js')

exports.createUser = (obj,extraValues,callback) =>{
    axios.post(
        "http://localhost:3000/alunos",
        {"nome":obj.nome}
    ).then(resp => {
        logger.log("created user: " + resp.data);
        callback(extraValues)
    }).catch(error => {
        logger.log('Error creating user: ' + error);
        callback(extraValues)
    });
}

exports.getUser = (id,extraValues,callback)=>{
    axios.get('http://localhost:3000/users/'+ id)
    .then(function(resp){
        var user = resp.data
        logger.log("Got user with id "+user.id+" and name:"+user.nome)
        extraValues['user']=user
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting userwith id "+id +" " + erro)
        extraValues['user']=[]
        callback(extraValues)
    })
}
exports.getUsers = (extraValues,callback)=>{
    axios.get('http://localhost:3000/users/')
    .then(function(resp){
        users = resp.data
        logger.log("Got "+users.length+" users")
        extraValues['users']=users
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting users: " + erro)
        extraValues['users']=[]
        callback(extraValues)
    })
}

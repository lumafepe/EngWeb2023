var axios = require('axios')

exports.getUser = (id,extraValues,callback)=>{
    axios.get('http://localhost:3000/users/'+ id)
    .then(function(resp){
        var user = resp.data
        console.log("Got user with id "+user.id+" and name:"+user.nome)
        extraValues['user']=user
        callback(extraValues)
    })
    .catch(erro => {
        console.log("Error getting userwith id "+id +" " + erro)
        extraValues['user']=null
        callback(extraValues)
    })
}
exports.getUsers = (extraValues,callback)=>{
    axios.get('http://localhost:3000/users/')
    .then(function(resp){
        users = resp.data
        console.log("Got "+users.length+" users")
        values={}
        users.forEach((user, pos) => values[user.id]=user.nome);
        console.log(values)
        extraValues['users']=values
        callback(extraValues)
    })
    .catch(erro => {
        console.log("Error getting users: " + erro)
        extraValues['users']=null
        callback(extraValues)
    })
}

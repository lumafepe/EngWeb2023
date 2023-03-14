var axios = require('axios');
const { isObject } = require('util');
var logger = require('./logger.js')

exports.createTask = (obj) =>{
    axios.post(
        "http://localhost:3000/tasks",
        {
            "done":false,
            "dueDate":obj.dueDate,
            "user":obj.user,
            "desc":obj.desc
        }
    ).then(resp => {
        logger.log("created task: " + resp.data);
    }).catch(error => {
        logger.log('Error creating task: ' + error);
    });
}

exports.getTask = (id,extraValues,callback)=>{
    axios.get('http://localhost:3000/tasks/'+ id)
    .then(function(resp){
        var task = resp.data
        logger.log("Got task with id "+task.id)
        extraValues['task']=task
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting task: " + erro)
        extraValues['task']=null
        callback(extraValues)
    })
}
exports.getTasks = (extraValues,callback)=>{
    axios.get('http://localhost:3000/tasks/')
    .then(function(resp){
        var tasks = resp.data
        logger.log("Got "+tasks.length+" tasks")
        extraValues['tasks']=tasks
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting tasks: " + erro)
        extraValues['tasks']=[]
        callback(extraValues)
    })
}
exports.getTasksDone = (extraValues,callback)=>{
    axios.get('http://localhost:3000/tasks?done=true')
    .then(function(resp){
        tasks = resp.data
        logger.log("Got "+tasks.length+" tasks")
        extraValues['tasksDone']=tasks
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting tasks: " + erro)
        extraValues['tasksDone']=[]
        callback(extraValues)
    })
}
exports.getTasksTodo= (extraValues,callback)=>{
    axios.get('http://localhost:3000/tasks?done=false')
    .then(function(resp){
        tasks = resp.data
        logger.log("Got "+tasks.length+" tasks")
        extraValues.tasksTodo=tasks
        callback(extraValues)
    })
    .catch(erro => {
        logger.log("Error getting tasks: " + erro)
        extraValues.tasksTodo=[]
        callback(extraValues)
    })
}
exports.updateTask = (id,obj)=>{
    axios.put(
        "http://localhost:3000/tasks/"+id,
        {
            "done":obj.done,
            "dueDate":obj.dueDate,
            "user":obj.user,
            "desc":obj.desc
        }
    ).then(resp => {
        logger.log("edited task: " + resp.data);
    }).catch(error => {
        logger.log('Error editing task: ' + error);
    });
}
exports.deleteTask=(id)=>{
    axios.put(
        "http://localhost:3000/tasks/"+id
    ).then(resp => {
        logger.log("deleted task with id: " + id);
    }).catch(error => {
        logger.log('Error deleting task: ' + error);
    });   
}
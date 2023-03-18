var axios = require('axios');

exports.createTask = (obj, extraValues, callback) => {
    axios.post(
        "http://localhost:3000/tasksToDo",
        {
            "dueDate": obj.dueDate,
            "user": obj.user,
            "desc": obj.desc
        }
    ).then(resp => {
        console.log("created task: " + resp.data);
        callback(extraValues);
    }).catch(error => {
        console.log('Error creating task: ' + error);
        callback(extraValues);
    });
}

exports.getTasksDone = (extraValues, callback) => {
    axios.get('http://localhost:3000/tasksDone')
        .then(function (resp) {
            tasks = resp.data
            console.log("Got " + tasks.length + " tasks")
            extraValues['tasksDone'] = tasks
            callback(extraValues)
        })
        .catch(erro => {
            console.log("Error getting tasks: " + erro)
            extraValues['tasksDone'] = []
            callback(extraValues)
        })
}
exports.getTasksTodo = (extraValues, callback) => {
    axios.get('http://localhost:3000/tasksToDo')
        .then(function (resp) {
            tasks = resp.data
            console.log("Got " + tasks.length + " tasks")
            extraValues.tasksTodo = tasks
            callback(extraValues)
        })
        .catch(erro => {
            console.log("Error getting tasks: " + erro)
            extraValues.tasksTodo = []
            callback(extraValues)
        })
}

exports.updateTask = (id, obj, extraValues, callback) => {
    axios.put(
        "http://localhost:3000/tasksToDo/" + id,
        {
            "dueDate": obj.dueDate,
            "user": obj.user,
            "desc": obj.desc
        }
    ).then(resp => {
        console.log("edited task: " + resp.data);
        callback(extraValues)
    }).catch(error => {
        console.log('Error editing task: ' + error);
        callback(extraValues)
    });
}
exports.deleteTaskToDo = (id, extraValues, callback) => {
    axios.delete(
        "http://localhost:3000/tasksToDo/" + id
    ).then(resp => {
        console.log("deleted task with id: " + id);
        callback(extraValues);
    }).catch(error => {
        console.log('Error deleting task: ' + error);
        callback(extraValues);
    });
}
exports.deleteTaskDone = (id, extraValues, callback) => {
    axios.delete(
        "http://localhost:3000/tasksDone/" + id
    ).then(resp => {
        console.log("deleted task with id: " + id);
        callback(extraValues);
    }).catch(error => {
        console.log('Error deleting task: ' + error);
        callback(extraValues);
    });
}

exports.markAsDone = (id, extraValues, callback) => {
    axios.get('http://localhost:3000/tasksToDo/' + id)
        .then(function (resp) {
            axios.delete('http://localhost:3000/tasksToDo/'+id)
                .then((resp2) => {
                    callback(extraValues)
                })
                .catch(erro => {
                    console.log("Error creating task: " + erro)
                    callback(extraValues)
                })
            axios.post('http://localhost:3000/tasksDone/',
                {
                    "dueDate": resp.data.dueDate,
                    "user": resp.data.user,
                    "desc": resp.data.desc
                })
                .then((resp2) => {
                    callback(extraValues)
                })
                .catch(erro => {
                    console.log("Error creating task: " + erro)
                    callback(extraValues)
                })
        })
        .catch(erro => {
            console.log("Error getting task: " + erro)
            callback(extraValues)
        })
}
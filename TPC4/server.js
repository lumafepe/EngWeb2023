var http = require('http')
var axios = require('axios')
var users = require('./users.js')
var tasks = require('./tasks.js')
var logger = require('./logger.js')
var url = require('url');
var static = require('./static.js')
var template = require('./template.js')
const { parse } = require('querystring');


// Aux function to process body

function collectRequestBodyData(request, callback, extraData) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body), extraData);
        });
    }
    else {
        callback(null, extraData);
    }
}

var formServer = http.createServer((req, res) => {
    var message = { "data": "", "color": 0xccaa00 }
    var editForm=null
    logger.log(req.method + " " + req.url)
    if (static.staticResource(req))
        static.serveStaticResource(req, res)
    else {
        switch (req.method) {
            case "GET":{
                if(req.url.length>1){
                    editForm=req.url.substring(1)
                }
                break
            }
            case "POST": {
                if (req.url.substring(1)>1){
                    var id = req.url.substring(1)
                    collectRequestBodyData(req, (result, extra) => {
                        if (result) {
                            console.dir(result)
                            tasks.updateTask(extra,result)
                            message.data = "Edited task with sucess"
                            message.color = 0x00ff00
                        }
                        else {
                            message.data = "Failed to edit task"
                            message.color = 0xff4030
                        }
                    }, id);
                    break
                }
                else{
                    collectRequestBodyData(req, (result, extra) => {
                        if (result) {
                            tasks.createTask(result)
                            message.data = "Created task with sucess"
                            message.color = 0x00ff00
                        }
                        else {
                            message.data = "Failed to create task"
                            message.color = 0xff4030
                        }
                    }, null);
                }
                break
            }
            case "DELETE":{
                var id = req.url.substring(1)
                tasks.deleteTask(id)
                message.data = "deleted task with sucess"
                message.color = 0x00ff00
                break
            }
        }
        tasks.getTask(editForm,{"message":message},(values0)=>{
            users.getUsers(values0,(values1)=>{
                tasks.getTasksDone(values1,(values2)=>{
                    tasks.getTasksTodo(values2,(values)=>{
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(template.page(values.task,values.message,values.users,values.tasksDone,values.tasksTodo,new Date().toISOString().substring(0, 16)))
                        res.end()
                    })
                })
            }) 
        }
        )
        
    }

});

formServer.listen(7777, () => {
    logger.log("Server listening on 7777...")
})
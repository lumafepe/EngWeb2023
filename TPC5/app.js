const express = require('express');
const path = require('path');
const http = require('http');
const users = require('./users.js');
const tasks = require('./tasks.js');
const bodyParser = require('body-parser');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));



const getEditData=(d,id,callback)=>{
  users.getUser(id,d,(d1)=>{
    d1.edit=d1.user
    getMainData(d1,callback)
  })
}

const getMainData = (d,callback) => {
  users.getUsers(d, (d1) => {
    tasks.getTasksTodo(d1,(d2)=>{
      tasks.getTasksDone(d2,(d3)=>{
        for (var i=0;i<d3.tasksTodo.length-d3.tasksDone.length;i++){
          d3.tasksDone.push(null) 
        }
        for (var i=0;i<d3.tasksDone.length-d3.tasksTodo.length;i++){
          d3.tasksTodo.push(null)
        }
        d3.pairs = d3.tasksDone.map((e, i)=>{return [e, d3.tasksTodo[i]]})
        d3.date=new Date().toISOString().substring(0, 16)
        callback(d3)
      })
    })
  })
}


const renderData = (d)=>{
  res=d.res
  res.render('index.pug',d)
}


app.post('/:id', (req, res)=> {
  tasks.updateTask(req.params.id,req.body,{'res':res},(d)=>{
    d.res.redirect('/')
  })
});


app.post('/', (req, res)=> {
    console.log(req.body)
    tasks.createTask(req.body,{'res':res},(d)=>{
      d.res.redirect('/')
    })
})

app.get('/todo/:id/delete',(req,res)=>{
  tasks.deleteTaskToDo(req.params.id,{'res':res},(d)=>{
    d.res.redirect('/')
  })
})

app.get('/done/:id/delete',(req,res)=>{
  tasks.deleteTaskDone(req.params.id,{'res':res},(d)=>{
    d.res.redirect('/')
  })
})

app.get('/:id/done',(req,res)=>{
  tasks.markAsDone(req.params.id,{'res':res},(d)=>{
    d.res.redirect('/')
  })
})

app.get('/:id', (req, res)=> {
  getEditData({'res':res},req.params.id,renderData)
});

app.get('/', (req, res)=> {
  getMainData({'res':res},renderData)
})


const server = http.createServer(app);
const port = 7777;
server.listen(port);
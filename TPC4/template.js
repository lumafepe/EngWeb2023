var users = require('./users.js')

exports.page = (edit,error,usersData,done,todo,date) => {
    var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>TaskManagert</title>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-teal">
                        <h1>Task Manager</h1>
                    </header>`
    //top bar with information
    if (error)
        pagHTML +=` <p style="background-color:${error.color};">${error.data}</p>`
    //create task form    
    pagHTML += `
		            <form class="w3-container" method="POST">
                        <fieldset>
                            <label>Done</label>
                            <input class="w3-check w3-round" type="checkbox" name="done">
                            <br>
                            <label>Due date</label>
                            <input class="w3-input w3-round" type="date" name="dueDate">
                            <label>User</label>
                            <select class="w3-select" name="user">
                                <option value="" disabled selected>Choose your option</option>
                                `
    //user select for task
    for (var i=0;i<usersData.length;i++)   
        pagHTML +=             `
                                <option value="${usersData[i].id}">${usersData[i].nome}</option>
                            `
    pagHTML +=              `
                            </select> 
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="textarea" name="desc">
                        </fieldset>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Add</button>
                    </form>
    `
    //edit form
    console.log(edit)
    if (edit){
        pagHTML += `
		            <form class="w3-container" method="POST">
                        <fieldset>
                            <label>Done</label>
                            <input class="w3-check w3-round" type="checkbox" name="done" value="${edit.done}">
                            <label>Due date</label>
                            <input class="w3-input w3-round" type="date" name="dueDate" value="${edit.dueDate}">
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="textarea" name="desc" value="${edit.desc}">
                        </fieldset>s
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
                    </form>
                    `
    }
    //show tasks
    for (var i=0;i<todo.length-done.length;i++){
        done.push(null) 
    }
    for (var i=0;i<done.length-todo.length;i++){
        todo.push(null) 
    }
    var pairs = done.map(function(e, i) {
        return [e, todo[i]];
      });
    pagHTML += `
                    <table class="w3-table">
                      <tr>
                        <th>Todo</th>
                        <th>Done</th>
                      </tr>
                      `
    for (var i=0;i<pairs.length;i++){
        pagHTML +='<tr><td>'
        if (pairs[i][0])
            pagHTML +=`<div class="w3-card-4 w3-teal">
                            <div class="w3-row">
                                <div class="w3-col m12 l9">
                                    <p>${pairs[i][0].desc}</p>
                                    <p>${pairs[i][0].dueDate}</p>
                                </div>
                                <div class="w3-col m4 l3 w3-cell-middle">
                                    <a href="${pairs[i][0].id}">✎</a>
                                </div>
                            </div>
                        </div>
                        `
        pagHTML += '</td><td>'
        if (pairs[i][1])
            pagHTML +=`
                            <div class="w3-card-4 w3-teal">
                                <p>${pairs[i][1].desc}</p>
                                <p>${pairs[i][1].dueDate}</p>
                            </div>`
        pagHTML+='</td></tr>'
    }
    
    pagHTML+=    '</table>'
    
    //end of the page
    pagHTML +=`
                    <footer class="w3-container w3-blue">
                        <h5>Generated by LP in ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>`
    return pagHTML
}

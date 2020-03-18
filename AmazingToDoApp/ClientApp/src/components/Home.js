import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.setDone = this.setDone.bind(this);
        this.showNewTaskText = this.showNewTaskText.bind(this);
        this.hideNewTaskText = this.hideNewTaskText.bind(this);
        this.state = { tasks: [], loading: true };
        fetch('api/TaskItems/GetItems')
            .then(response => response.json())
            .then(data => {
                this.setState({ tasks: data, loading: false });
            });
    }

   

    setDone(task) {
        this.setState(this.state.tasks.map(idx => idx.id === task.id ? idx.isDone = true : idx.isDone = idx.isDone));

        fetch(`api/TaskItems/${task.id}/PutTaskItem`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: task.id, task: task })
        })
        
    }

    saveNewTask() {
        let name = document.getElementById("1").value;
        let desc = document.getElementById("2").value;

        fetch('api/TaskItems/NewTaskItem', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, desc: desc})
        })
            .then(id => {
                let newTask = { id: id, taskName: name, taskDescription: desc, isDone: false }
                this.setState(() => this.state.tasks.push(newTask));
            })
        this.hideNewTaskText();
                //let butt = document.getElementById("newTask");
                //let text = document.getElementById("text");
                //let textArea = document.getElementById("textArea");
                //let sub = document.getElementById("submit");
                //butt.removeAttribute("style");
                //text.style.visibility = "hidden";
                //textArea.style.visibility = "hidden";
                //sub.style.visibility = "hidden";
    }

    showNewTaskText() {
        let butt = document.getElementById("newTask");
        let name = document.getElementById("text");
        let desc = document.getElementById("textArea");
        let sub = document.getElementById("submit");
        butt.style.display = "none";
        name.style.visibility = "visible";
        desc.style.visibility = "visible";
        sub.style.visibility = "visible";
    }

    hideNewTaskText() {
        let butt = document.getElementById("newTask");
        let text = document.getElementById("text");
        let textArea = document.getElementById("textArea");
        let sub = document.getElementById("submit");
        butt.removeAttribute("style");
        text.style.visibility = "hidden";
        text.removeAttribute("value");
        textArea.style.visibility = "hidden";
        textArea.removeAttribute("value");
        sub.style.visibility = "hidden";
    }

    renderTasksTable(tasks) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description of the Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task =>
                        <tr key={task.taskName} style={{ textDecoration: task.isDone ? 'line-through' : 'none' }} >
                            <td>{task.taskName}</td>
                            <td>{task.taskDescription}</td>
                            <td>{task.isDone ? 'Complete' : 'Incomplete'}</td>
                            <td>
                                <button onClick={() => this.setDone(task)} style={{ visibility: task.isDone ? 'hidden' : 'visible' }}>Done</button>
                            </td>
                            <td>
                                <button style={{ visibility: task.isDone ? 'hidden' : 'visible' }}>Edit Task</button>
                            </td>
                        </tr>
                        )}
                        <tr>
                        <td id="newTask">
                            <button onClick={() => this.showNewTaskText()}>New Task</button>
                        </td>
                        <td id="text" style={{ visibility: 'hidden' }} >
                                <input type="text" id="1" />
                            </td>
                        <td id="textArea" style={{ visibility: 'hidden' }}>
                            <textarea id="2"></textarea>
                            </td>
                        <td id="submit" style={{ visibility: 'hidden' }}>
                            <button type="submit" onClick={() => this.saveNewTask()}>Submit</button>
                            </td>

                        </tr>
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTasksTable(this.state.tasks);
        return (
            <div>
                <h1>Hello, world!</h1>
                <p>Welcome to your new single-page application, built with:</p>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                    <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                </ul>
                {contents}
            </div>
        );
    }
}

import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.setDone = this.setDone.bind(this);
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
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                {contents}
            </div>
        );
    }
}

import React, {useEffect} from 'react';
import '../app.css';
import {NavLink, useNavigate} from "react-router-dom";

export function Task() {
    const [tasks, setTasks] = React.useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const f = async () => {
            let data;
            try {
                const response = await fetch('/api/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                data = await response.json();
            } catch (error) {
                console.log('Error getting tasks: ', error.message);
                console.log(error.stack);
            }

            setTasks(data);
        }
        f();
    }, []);

    const handleSubmit = async (task) => {
        task.preventDefault();

        const formData = new FormData(task.target);
        const newTask = Object.fromEntries(formData.entries());
        console.log(newTask);
        newTask.username = username;

        try {
            const response = await fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            const data = await response.json();
            console.log(data.msg);
        } catch (error) {
            console.error('Error creating task: ', error)
            return;
        }

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setTasks(updatedTasks);

        console.log('Task saved: ', newTask);

        task.target.reset();
    };

    const handleDelete = async (indexToDelete) => {
        const title = tasks[indexToDelete].title
        const username = tasks[indexToDelete].username

        console.log("Need to delete: ", title, username)

        const task = { title: title, username: username};

        let data;
        try {
            const response = await fetch('/api/task', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            data = await response.json();

            if (response.status === 200) {
                const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
                setTasks(updatedTasks);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            } else {
                console.log('Error deleting task: ', response.status, data.msg);
            }
        } catch (error) {
            console.error('Error deleting task: ', error)
        }
    };


    return (
        <main>
            <table width="100%" id="task">
                <tbody>
                <tr>
                    <td className="task-table">
                        <div className="info-box">
                            <p className="text-task-explain">
                                You can use this page to create tasks that don't necessarily need a time frame, but just
                                need to be finished.
                            </p>
                        </div>

                        <form method="get" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="task title" name="title" required/>
                                </label>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </td>
                    <td>
                        <ul>
                            {/*This is all from the database*/}
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    <button onClick={() => handleDelete(index)}
                                            style={{
                                                marginRight: "10px",
                                                backgroundColor: "#e4acac",
                                                color: "black",
                                                border: "1px solid black",
                                                padding: "2px 5px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}>Finished</button>

                                    <label htmlFor={`task-${index}`}>{task.title}</label>
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
    );
}
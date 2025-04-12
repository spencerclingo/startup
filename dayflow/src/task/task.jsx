import React, {useEffect} from 'react';
import '../app.css';
import {NavLink, useNavigate} from "react-router-dom";

export function Task() {
    const [tasks, setTasks] = React.useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const handleSubmit = (task) => {
        task.preventDefault();

        const formData = new FormData(task.target);
        const newTask = Object.fromEntries(formData.entries());

        const title = newTask.title;

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setTasks(updatedTasks);

        console.log('Task saved: ', newTask);

        task.target.reset();
    };

    const handleDelete = (indexToDelete) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
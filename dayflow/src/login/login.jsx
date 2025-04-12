import React from 'react';
import '../app.css';
import {useNavigate} from "react-router-dom";
import {AuthState} from "./authState";

export function Login({ onSetUserName, onSetAuthState }) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any form validation or data processing here
        const action = event.nativeEvent.submitter.name;
        const formData = new FormData(event.target);
        const newEvent = Object.fromEntries(formData.entries());

        let username = String(newEvent.username);
        const password = String(newEvent.password);

        if (action === "login") {
            // Handle login logic
            console.log("Logging in...");

            // Normally, I would check if the username matches the password in the database
            // I don't have a database rn, so I can just let them through

            // const valid = verifyUser(username, password);
            // if (!valid) {
            //      localStorage.setItem("authentication", JSON.stringify(AuthState.Unauthenticated));
            //     return;
            // }

        } else if (action === "create") {
            // Handle account creation logic
            console.log("Creating account...");
            // Perform account creation logic or API call here

            // Verify username doesn't already exist
            // const valid = verifyNewUser(username);
            // if (!valid) {
            //     return;
            // }

            // Put it into the database
            // createUser(username, password);
        }

        if (username.includes('@')) {
            username = username.split('@')[0];
        }

        localStorage.setItem("username", username);
        onSetUserName(username);
        localStorage.setItem("authentication", JSON.stringify(AuthState.Authenticated));
        onSetAuthState(AuthState.Authenticated);
        navigate('/calendar');
    };

    return (
        <main className="main login-main">

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>
                        <input type="text" placeholder="your@email.com" name="username"/>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <input type="password" placeholder="password" name="password"/>
                    </label>
                </div>
                <button className="login-button" type="submit" name="login">Login</button>
                <button className="login-button" type="submit" name="create">Create</button>
            </form>
        </main>
    );
}
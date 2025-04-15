import React from 'react';
import '../app.css';
import {useNavigate} from "react-router-dom";
import {AuthState} from "./authState";

export function Login({ onSetUserName }) {
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    async function verifyUser(formData) {
        console.log("attempting login user side");

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data.msg);

            return response.status === 200;

            // return response.ok;
        } catch (error) {
            console.error('Error logging in: ', error)
            return false;
        }
    }

    async function verifyNewUser(formData) {
        console.log("attempting create user side");

        try {
            const response = await fetch('/api/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data.msg);

            return response.ok;
        } catch (error) {
            console.error('Error logging in: ', error)
            return false;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        // Perform any form validation or data processing here
        const action = event.nativeEvent.submitter.name;
        const formData = new FormData(event.target);
        const newEvent = Object.fromEntries(formData.entries());

        let username = String(newEvent.username);
        const password = String(newEvent.password);

        let valid;

        if (action === "login") {
            // Handle login logic
            console.log("Logging in...");

            valid = await verifyUser(newEvent);
            if (!valid) {
                localStorage.setItem("authentication", JSON.stringify(AuthState.Unauthenticated));
                onSetAuthState(AuthState.Unauthenticated);
                setErrorMessage('Invalid username or password. Please try again.');
                return;
            }

        } else if (action === "create") {
            // Handle account creation logic
            console.log("Creating account...");
            // Perform account creation logic or API call here

            // Verify username doesn't already exist
            valid = await verifyNewUser(newEvent);
            if (!valid) {
                localStorage.setItem("authentication", JSON.stringify(AuthState.Unauthenticated));
                setErrorMessage('User already registered. Please try again.');
                return;
            }
        }

        if (valid) {
            if (username.includes('@')) {
                username = username.split('@')[0];
            }

            localStorage.setItem("username", username);
            onSetUserName(username);
            navigate('/calendar');
        }
    };

    return (
        <main className="main login-main">
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>
                        <input type="text" placeholder="your@email.com" name="username" required/>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <input type="password" placeholder="password" name="password" required/>
                    </label>
                </div>
                <button className="login-button" type="submit" name="login">Login</button>
                <button className="login-button" type="submit" name="create">Create</button>
            </form>
        </main>
    );
}
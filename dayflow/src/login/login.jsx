import React from 'react';
import {useNavigate} from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any form validation or data processing here
        navigate('/calendar');
    };

    return (
        <main style="text-align: center" className="main">

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>
                        <input type="text" placeholder="your@email.com"/>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <input type="password" placeholder="password"/>
                    </label>
                </div>
                <button type="submit">Login</button>
                <button type="submit">Create</button>
            </form>
        </main>
    );
}
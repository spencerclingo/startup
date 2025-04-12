import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { Event } from './event/event';
import { Task } from './task/task';
import { Landing } from './landing/landing';
import {AuthState} from "./login/authState";

export default function App() {
    // const [authState, setAuthState] = React.useState(
    //     localStorage.getItem('username') ? AuthState.Authenticated : AuthState.Unauthenticated
    // );
    const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
    // const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    // const [authState, setAuthState] = React.useState(currentAuthState);
    const [authState, setAuthState] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('authentication')) || AuthState.Unauthenticated;
        } catch {
            return AuthState.Unauthenticated;
        }
    });

    const handleSetUserName = (username) => {
        setUserName(username);
        localStorage.setItem('username', username);
    };

    const handleSetAuthState = (authState) => {
        setAuthState(authState);
        localStorage.setItem('authState', JSON.stringify(authState));
    }

    return (
        <BrowserRouter>
            <div className='body no-extra-space'>
                <header className="header">
                    <nav>
                        <NavLink className="logo" to="calendar">
                            <img src="DayFlow%20logo.png" height="50px" width="50px" alt="logo"/>
                        </NavLink>
                        <NavLink className="logo-text" to="calendar">DayFlow</NavLink>
                        <div className="nav">
                            {authState === AuthState.Authenticated && (
                                <NavLink to="calendar" className="nav-link">Home</NavLink>
                            )}
                            {authState === AuthState.Authenticated && (
                                <NavLink to="event" className="nav-link">Event</NavLink>
                            )}
                            {authState === AuthState.Authenticated && (
                                <NavLink to="task" className="nav-link">Task</NavLink>
                            )}
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Landing />} exact />
                    <Route path='/login' element={<Login
                        onSetUserName={handleSetUserName}
                        onSetAuthState={handleSetAuthState}
                    />} exact />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/event' element={<Event />} />
                    <Route path='/task' element={<Task />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <div className="footer_container">
                        <p>Spencer Clingo</p>
                        <a href="https://github.com/spencerclingo/startup">
                            GitHub
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='main'>404: Return to sender. Address unknown.</main>;
}
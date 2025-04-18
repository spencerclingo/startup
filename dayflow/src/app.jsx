import React, {useEffect} from 'react';
import './app.css';
import {BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { Event } from './event/event';
import { Task } from './task/task';
import { Landing } from './landing/landing';
import {AuthState} from "./login/authState";
import {useVerifyAuth} from "./components/helper";

export default function App() {
    const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
    const { isLoading, isAuthenticated } = useVerifyAuth(username);
    const authState = isAuthenticated ? AuthState.Authenticated : AuthState.Unauthenticated;

    const handleSetUserName = (username) => {
        setUserName(username);
        localStorage.setItem('username', username);
    };

    React.useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

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
                            <>
                                <NavLink to="calendar" className="nav-link">Home</NavLink>
                                <NavLink to="event" className="nav-link">Event</NavLink>
                                <NavLink to="task" className="nav-link">Task</NavLink>
                            </>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Landing/>} exact/>
                    <Route path='/login' element={<Login
                        onSetUserName={handleSetUserName}
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
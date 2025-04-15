import React, {useEffect, useState} from 'react';
import '../app.css';
import {NavLink, useNavigate} from "react-router-dom";
import DailySchedule from "../components/dailySchedule";
import {useVerifyAuth, useInspirationQuote} from "../components/helper";

export function Calendar() {
    const [events, setEvents] = useState([]);
    const username = React.useState(localStorage.getItem('username'));
    const { quote, loading, error } = useInspirationQuote();
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useVerifyAuth(username);

    useEffect(() => {
        if (isLoading) return; // Wait for auth check to complete

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Only fetch events if authenticated
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                setEvents(data.msg === "Unauthorized" ? [] : data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]);
            }
        };
        fetchEvents();
    }, [isLoading, isAuthenticated, navigate]); // Include dependencies

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    const logoutFunction = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.status === 204) {
                navigate('/');
            }
        } catch (error) {
            console.log(error.stack);
            console.log(error.msg);
        }
    }

    return (
        <div className="container">
            <main className="event_main_container">
                <div className="calendar-main-container">
                    <div className="username">
                        <p>Hello {username}!</p>
                    </div>
                    <div className="multi-button-container">
                        <NavLink to="/event">
                            <button className="button calendar-button">
                                Create Event
                            </button>
                        </NavLink>
                        <NavLink to="/task">
                            <button className="button calendar-button">
                                Create Task
                            </button>
                        </NavLink>
                    </div>
                    <div className="quote-box">
                        <h3 className="quote">Quote:</h3>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {!loading && !error && (
                            <>
                                <p>{quote.quote}</p>
                                <p>- {quote.author}</p>
                            </>
                        )}
                    </div>
                    <div>
                        <button onClick={logoutFunction}  style={{
                            marginTop: '20px',
                            backgroundColor: '#e4acac',
                            color: 'black',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '209px'
                        }}>Logout
                        </button>
                    </div>
                </div>
                <DailySchedule events={events}/> {}

            </main>
        </div>
    );
}
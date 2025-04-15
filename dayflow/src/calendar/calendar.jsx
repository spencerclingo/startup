import React, {useEffect, useState} from 'react';
import '../app.css';
import {NavLink} from "react-router-dom";
import DailySchedule from "../components/dailySchedule";

export function Calendar() {
    const [events, setEvents] = useState([]);
    const username = React.useState(localStorage.getItem('username') || '');

    useEffect( () => {
        const f= async () => {
            let data2;
            try {
                const response = await fetch('/api/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                data2 = await response.json();
                // console.log(data2.msg);
            } catch (error) {
                console.log('Error getting events: ', error.message);
                console.log(error.stack);
            }

            let storedEvents;
            if (data2.msg === "Unauthorized") {
                storedEvents = [];
            } else {
                storedEvents = data2;
            }

            setEvents(storedEvents);
        }
        f();
    }, []);

    return (
        <div className="container">
            <main className="event_main_container">
                <div className="calendar-main-container">
                    <div className="username">
                        {/*<p>Hello {username}!</p>*/}
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
                        <p>Activity leads to productivity.</p>
                        <p>-Jim Rohn</p>
                    </div>
                </div>
                <DailySchedule events={events} /> {}

            </main>
        </div>
    );
}
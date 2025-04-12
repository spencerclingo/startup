import React, {useEffect, useState} from 'react';
import '../app.css';
import {NavLink} from "react-router-dom";
import DailySchedule from "../components/dailySchedule";

export function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // TODO: Get rid of this to fetch the data from MongoDB
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    }, []);

    return (
        <main className="main_container">
            <div className="calendar-main-container">
                <div className="username">
                    <p>Hello Spencer!</p>
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
    );
}
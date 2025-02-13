import React from 'react';
import '../app.css';
import {NavLink, useNavigate} from "react-router-dom";
import DailySchedule from '../components/dailySchedule';

export function Event() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        {/*TODO: Change this to POST once I have a backend*/}
    };

    return (
        <div className="container">
            <main className="event_main_container">


                <div className="left-box">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="Event Name" name="event_name" required
                                           className="event-full-width-container"/>
                                </label>
                            </div>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="Start Time" name="start_time" required
                                           className="event-half-width-container"/>-
                                    <input type="text" placeholder="End Time" name="end_time" required
                                           className="event-half-width-container"/>
                                </label>
                            </div>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="Friend's Email Address" name="email"
                                           className="event-full-width-container"/>
                                </label>
                            </div>
                            <button type="submit">Create Event</button>
                        </form>

                        <div className="websocket-box">
                            Talk to friend here
                        </div>
                    </div>
                </div>

                <DailySchedule /> {}

            </main>
        </div>
    );
}
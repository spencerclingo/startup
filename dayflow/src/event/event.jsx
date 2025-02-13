import React from 'react';
import '../app.css';
import {NavLink, useNavigate} from "react-router-dom";

export function Event() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <div className="container">
            <main className="event_main_container">

                {/*TODO: Change this to POST once I have a backend*/}
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
                                           className="event-half-width-container"/> -
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


                <table className="calendar-table" id="table">
                    <tbody>
                    <tr>
                        <td>6:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3:00pm</td>
                        {/*Existing event from database*/}
                        <td className="event">Class</td>
                    </tr>
                    <tr>
                        <td>3:30pm</td>
                        <td className="event">Class</td>
                    </tr>
                    <tr>
                        <td>4:00pm</td>
                        <td className="event">Class</td>
                    </tr>
                    <tr>
                        <td>4:30pm</td>
                        <td className="event">Class</td>
                    </tr>
                    <tr>
                        <td>5:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:00pm</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
}
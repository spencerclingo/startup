import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

export function Event() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any form validation or data processing here
        navigate('/calendar');
    };

    return (
        <main style="text-align: center" className="main">

            {/*TODO: Change this to POST once I have a backend*/}

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>
                        <input type="text" placeholder="Event Name" name="event_name" required style="width:200px"/>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <input type="text" placeholder="Start Time" name="start_time" required style="width:89px"/> -
                        <input type="text" placeholder="End Time" name="end_time" required style="width:89px"/>
                    </label>
                </div>
                <div className="field">
                    <label>
                        <input type="text" placeholder="Friend's Email Address" name="email" style="width:200px"/>
                    </label>
                </div>
                <NavLink to="calendar">
                    <button type="submit">Create Event</button>
                </NavLink>
            </form>

            <div style="padding: 160px 20%; border: 1px solid black; margin-top: 10px">
                Talk to friend here
            </div>


            <table style="margin-right: 7%; margin-top: 10px; margin-bottom: 10px" id="table">
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
    );
}